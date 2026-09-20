import { useMemo } from 'react'
import * as THREE from 'three'
import { destinationById, JOURNEY_ORDER } from '../../data/destinations'

// The world's floor IS the path — a single continuous ribbon threaded through
// every stage anchor with a CatmullRomCurve3, replacing the old flat plane +
// gridHelper + circular per-stage platforms (a minimap, regardless of what
// sat on each pad). Width and enclosure (side walls) change smoothly along
// the curve per chapter, so walking it reads as moving through one evolving
// building, not teleporting between islands. Every stage installation now
// draws its own ground disc/base at destination.position, so this component's
// only job is the connective architecture between them.
//
// Elevation is deliberately kept flat (y=0 throughout): PlayerController has
// no ground-height sampling, so real ramps would require new collision work
// this redesign is explicitly not meant to touch. "Elevation/threshold"
// changes are expressed through width and wall-height instead.
const CHAPTER_PROFILE = {
	home: { width: 3.0, wallHeight: 0 },
	projects: { width: 7.2, wallHeight: 2.3 },
	experience: { width: 8.2, wallHeight: 3.2 },
	skills: { width: 5.2, wallHeight: 1.5 },
	about: { width: 3.6, wallHeight: 0.55 },
	contact: { width: 10.5, wallHeight: 0 },
}

const SEGMENTS = 180

// The Spark chapter now has its own dedicated cinematic ground (see
// SparkInstallation.jsx's ReflectiveGround) — the ribbon collapses to zero
// width within this radius of the world origin (home's fixed position) so it
// doesn't poke a bare strip through that environment's floor. Vertex COUNT
// stays identical either way (widths just collapse to 0, not removed), so
// nothing downstream that indexes into `samples` (e.g. ToolkitLattice's
// arc-position math) is affected.
const SPARK_CLEARANCE = 15

function buildSpine() {
	const anchors = JOURNEY_ORDER.map((id) => destinationById[id].position)
	const points = anchors.map(([x, y, z]) => new THREE.Vector3(x, y, z))
	const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45)

	// Arc-length position (0-1) of each anchor along the curve, from chordal
	// distance — used to interpolate the per-chapter width/wallHeight profile
	// as a smooth function of distance travelled, not just anchor index.
	const chordLengths = [0]
	for (let i = 1; i < points.length; i++) chordLengths.push(chordLengths[i - 1] + points[i].distanceTo(points[i - 1]))
	const total = chordLengths[chordLengths.length - 1]
	const anchorT = chordLengths.map((length) => length / total)
	const profiles = JOURNEY_ORDER.map((id) => CHAPTER_PROFILE[id])

	const profileAt = (t) => {
		let i = 0
		while (i < anchorT.length - 2 && t > anchorT[i + 1]) i++
		const span = anchorT[i + 1] - anchorT[i] || 1
		const local = Math.min(1, Math.max(0, (t - anchorT[i]) / span))
		const a = profiles[i]
		const b = profiles[i + 1]
		return { width: a.width + (b.width - a.width) * local, wallHeight: a.wallHeight + (b.wallHeight - a.wallHeight) * local }
	}

	const samples = []
	for (let i = 0; i <= SEGMENTS; i++) {
		const t = i / SEGMENTS
		const point = curve.getPointAt(t)
		const tangent = curve.getTangentAt(t)
		const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
		samples.push({ point, perp, ...profileAt(t) })
	}
	return samples
}

// A flat triangle-strip ribbon: two vertices (left/right edge) per sample.
function buildFloorGeometry(samples) {
	const positions = []
	const normals = []
	const indices = []
	samples.forEach(({ point, perp, width }) => {
		const half = point.length() < SPARK_CLEARANCE ? 0 : width / 2
		positions.push(point.x + perp.x * half, point.y, point.z + perp.z * half)
		positions.push(point.x - perp.x * half, point.y, point.z - perp.z * half)
		normals.push(0, 1, 0, 0, 1, 0)
	})
	for (let i = 0; i < samples.length - 1; i++) {
		const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1
		indices.push(a, c, b, b, c, d)
	}
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
	geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
	geometry.setIndex(indices)
	return geometry
}

// A vertical quad strip along one edge, from the floor up to wallHeight(t) —
// used for both side walls. `sign` picks which edge (+1 left, -1 right).
function buildWallGeometry(samples, sign) {
	const positions = []
	const normals = []
	const indices = []
	let vertexCount = 0
	const segments = []
	samples.forEach(({ point, perp, width, wallHeight }) => {
		if (wallHeight < 0.05) { segments.push(null); return }
		const half = width / 2
		const bx = point.x + perp.x * half * sign
		const bz = point.z + perp.z * half * sign
		positions.push(bx, point.y, bz, bx, point.y + wallHeight, bz)
		normals.push(-perp.x * sign, 0, -perp.z * sign, -perp.x * sign, 0, -perp.z * sign)
		segments.push(vertexCount)
		vertexCount += 2
	})
	for (let i = 0; i < segments.length - 1; i++) {
		const s0 = segments[i]
		const s1 = segments[i + 1]
		if (s0 === null || s1 === null) continue
		indices.push(s0, s0 + 1, s1, s1, s0 + 1, s1 + 1)
	}
	const geometry = new THREE.BufferGeometry()
	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
	geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
	geometry.setIndex(indices)
	return geometry
}

// Thin emissive struts along Toolkit's stretch — a lighter, schematic lattice
// instead of a solid panel, matching "the underlying systems become visible."
function ToolkitLattice({ samples }) {
	const struts = useMemo(() => {
		const skillsT = 0.62 // approximate arc position of the skills chapter
		const list = []
		samples.forEach(({ point, perp, width, wallHeight }, index) => {
			const t = index / (samples.length - 1)
			if (Math.abs(t - skillsT) > 0.09) return
			if (index % 14 !== 0) return
			const half = width / 2
			list.push([point.x + perp.x * half, point.z + perp.z * half, wallHeight])
			list.push([point.x - perp.x * half, point.z - perp.z * half, wallHeight])
		})
		return list
	}, [samples])
	return (
		<group>
			{struts.map(([x, z, height], index) => (
				<mesh key={index} position={[x, height / 2, z]}>
					<boxGeometry args={[0.03, height, 0.03]} />
					<meshBasicMaterial color="#5fb8d6" transparent opacity={0.45} />
				</mesh>
			))}
		</group>
	)
}

function Pathway() {
	const samples = useMemo(() => buildSpine(), [])
	const floorGeometry = useMemo(() => buildFloorGeometry(samples), [samples])
	const leftWallGeometry = useMemo(() => buildWallGeometry(samples, 1), [samples])
	const rightWallGeometry = useMemo(() => buildWallGeometry(samples, -1), [samples])
	const edgeGeometry = useMemo(() => {
		const positions = []
		samples.forEach(({ point, perp, width }) => {
			const half = point.length() < SPARK_CLEARANCE ? 0 : width / 2
			positions.push(point.x + perp.x * half, point.y + 0.01, point.z + perp.z * half)
		})
		const geometry = new THREE.BufferGeometry()
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
		return geometry
	}, [samples])

	return (
		<group>
			<mesh geometry={floorGeometry}>
				<meshStandardMaterial color="#121a29" metalness={0.32} roughness={0.88} side={THREE.DoubleSide} />
			</mesh>
			<mesh geometry={leftWallGeometry}>
				<meshStandardMaterial color="#0c121e" metalness={0.4} roughness={0.75} side={THREE.DoubleSide} />
			</mesh>
			<mesh geometry={rightWallGeometry}>
				<meshStandardMaterial color="#0c121e" metalness={0.4} roughness={0.75} side={THREE.DoubleSide} />
			</mesh>
			<line geometry={edgeGeometry}>
				<lineBasicMaterial color="#3f6f86" transparent opacity={0.35} />
			</line>
			<ToolkitLattice samples={samples} />
		</group>
	)
}

export default Pathway
