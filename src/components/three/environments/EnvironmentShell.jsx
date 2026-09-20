import { useMemo } from 'react'
import * as THREE from 'three'

// A genuine painted gradient sky (vertex-colored, not a flat dome): deep navy
// at the zenith, through a blue-violet atmospheric band, into a warm golden
// sunset near the horizon — bright enough to be a real compositional element,
// not a dark backdrop with one thin accent line. `fog={false}` keeps this
// crisp regardless of how tight the foreground fog is tuned.
function useSkyGeometry(radius, stops) {
	return useMemo(() => {
		const geometry = new THREE.SphereGeometry(radius, 40, 28, 0, Math.PI * 2, 0, Math.PI / 1.55)
		const position = geometry.attributes.position
		const colors = new Float32Array(position.count * 3)
		const color = new THREE.Color()
		const a = new THREE.Color()
		const b = new THREE.Color()
		for (let i = 0; i < position.count; i++) {
			const y = position.getY(i)
			const t = 1 - Math.max(0, Math.min(1, (y / radius + 1) / 2))
			let segment = stops.length - 2
			for (let s = 0; s < stops.length - 1; s++) {
				if (t >= stops[s][0] && t <= stops[s + 1][0]) { segment = s; break }
			}
			const [t0, c0] = stops[segment]
			const [t1, c1] = stops[segment + 1]
			const local = t1 > t0 ? (t - t0) / (t1 - t0) : 0
			a.set(c0)
			b.set(c1)
			color.copy(a).lerp(b, Math.max(0, Math.min(1, local)))
			colors[i * 3] = color.r
			colors[i * 3 + 1] = color.g
			colors[i * 3 + 2] = color.b
		}
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
		return geometry
	}, [radius, stops])
}

function SkyDome({ radius = 46 }) {
	const stops = useMemo(() => [
		[0, '#0a1626'],
		[0.32, '#13233d'],
		[0.56, '#2c3a5c'],
		[0.76, '#6a5a72'],
		[0.9, '#a97a5e'],
		[1, '#d9a066'],
	], [])
	const geometry = useSkyGeometry(radius, stops)
	return (
		<mesh geometry={geometry}>
			<meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} />
		</mesh>
	)
}

// Soft horizontal cloud streaks — stretched, blurred-looking ellipses at
// varying heights, warm-tinted where they catch the low sun. Cheap (a
// handful of transparent planes), but this is most of what separates "sky"
// from "gradient dome."
function Clouds({ items }) {
	return (
		<group>
			{items.map(([x, y, z, w, h, color, opacity], index) => (
				<mesh key={index} position={[x, y, z]} scale={[w, h, 1]}>
					<circleGeometry args={[1, 24]} />
					<meshBasicMaterial color={color} transparent opacity={opacity} fog={false} depthWrite={false} />
				</mesh>
			))}
		</group>
	)
}

// Positioned ahead of the player (positive z, toward the arch/horizon) — a
// cloud layer behind the camera is invisible from the default forward-facing
// establishing shot, which is where the visitor actually looks first.
const DEFAULT_CLOUDS = [
	[-16, 12, 34, 10, 1.2, '#8a7368', 0.17],
	[12, 14, 38, 12, 1.4, '#7c6a72', 0.15],
	[-4, 9.5, 30, 8, 1.0, '#a8825f', 0.2],
	[20, 8.5, 32, 7, 0.9, '#a8825f', 0.16],
	[-22, 10.5, 36, 7.5, 0.95, '#8a7368', 0.14],
]

// A soft, layered "sun" glow low on the horizon — visible but restrained.
function SunGlow({ position = [0, 6, 36], color = '#ffb45e' }) {
	return (
		<group position={position}>
			<mesh><circleGeometry args={[13, 40]} /><meshBasicMaterial color={color} transparent opacity={0.1} fog={false} depthWrite={false} /></mesh>
			<mesh><circleGeometry args={[7, 40]} /><meshBasicMaterial color={color} transparent opacity={0.16} fog={false} depthWrite={false} /></mesh>
			<mesh><circleGeometry args={[3.4, 40]} /><meshBasicMaterial color="#ffd08a" transparent opacity={0.26} fog={false} depthWrite={false} /></mesh>
		</group>
	)
}

// Irregular low-poly ridgelines — kept close enough to sit within the scene's
// existing fog range (so they're actually visible, just hazy) rather than
// past it (which would render them invisible regardless of color).
function Ridge({ position, points, color }) {
	const geometry = useMemo(() => {
		const shape = new THREE.Shape()
		shape.moveTo(points[0][0], 0)
		points.forEach(([x, y]) => shape.lineTo(x, y))
		shape.lineTo(points[points.length - 1][0], 0)
		shape.closePath()
		return new THREE.ExtrudeGeometry(shape, { depth: 1.4, bevelEnabled: false })
	}, [points])
	return (
		<mesh position={position} geometry={geometry}>
			<meshStandardMaterial color={color} roughness={1} />
		</mesh>
	)
}

// Two depth layers behind the arch: a nearer, slightly darker ridge and a
// farther, lighter/hazier one — this pairing (not just one ridgeline) is
// what actually reads as "layers of distant landscape" rather than one flat
// cutout.
const DEFAULT_RIDGES = [
	// Near layer — closer to the arch, darker, more defined peaks.
	{ position: [-22, 0, 26], color: '#1c2740', points: [[-10, 0], [-5, 5.2], [-1, 3.0], [4, 7.4], [8, 2.4], [11, 0]] },
	{ position: [4, 0, 25], color: '#182238', points: [[-11, 0], [-6, 3.8], [-1, 6.6], [3, 3.4], [7, 5.6], [12, 0]] },
	{ position: [26, 0, 27], color: '#1c2740', points: [[-9, 0], [-4, 4.4], [1, 2.2], [5, 6.2], [9, 0]] },
	// Far layer — behind the near ridge, lighter/warmer (atmospheric
	// perspective pulls distant terrain toward the horizon's warm tone).
	{ position: [-14, 0, 38], color: '#3a3550', points: [[-13, 0], [-6, 6.5], [0, 3.8], [6, 8.2], [13, 0]] },
	{ position: [16, 0, 40], color: '#40384f', points: [[-14, 0], [-7, 5.4], [0, 7.6], [7, 3.6], [14, 0]] },
]

function EnvironmentShell({ radius = 46, sunPosition, ridges = DEFAULT_RIDGES, clouds = DEFAULT_CLOUDS }) {
	return (
		<group>
			<SkyDome radius={radius} />
			<Clouds items={clouds} />
			<SunGlow position={sunPosition} />
			{ridges.map((ridge, index) => <Ridge key={index} {...ridge} />)}
		</group>
	)
}

export default EnvironmentShell
