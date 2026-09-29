import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

// ============================================================================
// SPARK QUESTION STATION
// 3D sculptural installation matching concept image (media_1790174690090.jpg):
// - Tiered, faceted translucent crystal geometry with internal luminous core
// - Concentric glowing floor rings (amber + cyan) on stone pavers
// - Dedicated localized real Three.js PointLight
// - Minimal Number stacked above Concept Title (e.g. 01 / PERCEPTION)
// - Philosophical cursive question in Marck Script (reveals when approaching)
// - Clean metadata tags (reveals when approaching)
// - Zero screen-space overlap: tiered Y layout & inward spatial text offsets
// ============================================================================

export default function SparkQuestionStation({
	station,
	isFocused,
	proximity, // 0 (far) to 1 (close)
	onSelect,
	isScreenLeft // true if +X (screen left)
}) {
	const {
		number,
		title,
		question,
		metadata,
		position,
		hoverY = 1.35,
		crystalScale = 0.52,
		accentColor,
		crystalGeometry
	} = station

	const groupRef = useRef()
	const crystalRef = useRef()
	const crystalMatRef = useRef()
	const stationLightRef = useRef()
	const floorRingRef = useRef()
	const amberRingRef = useRef()
	const detailGroupRef = useRef()

	// Gentle yaw orientation slightly facing inward toward the central courtyard walkway
	const rotationY = isScreenLeft ? Math.PI - 0.22 : Math.PI + 0.22

	// Text offset in local space:
	// Because group is rotated ~PI, local +X points toward global -X (screen right / center for left stations)
	// and local -X points toward global +X (screen left / center for right stations)
	const localTextX = isScreenLeft ? 0.85 : -0.85
	const textAnchor = isScreenLeft ? 'left' : 'right'

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximity || 0

		// 1. Crystal hovering and slow multi-axis rotation
		if (crystalRef.current) {
			crystalRef.current.position.y = hoverY + Math.sin(t * 1.5 + position[0]) * 0.06 + p * 0.10
			crystalRef.current.rotation.y += 0.007 * (1.0 + p * 1.8)
			crystalRef.current.rotation.x = Math.sin(t * 0.75) * 0.10
			crystalRef.current.rotation.z = Math.cos(t * 0.55) * 0.08
		}

		// 2. Crystal emissive intensity ramp
		if (crystalMatRef.current) {
			const pulse = Math.sin(t * 2.2 + position[0]) * 0.08
			crystalMatRef.current.emissiveIntensity = 0.40 + p * 0.75 + pulse
		}

		// 3. Localized PointLight
		if (stationLightRef.current) {
			stationLightRef.current.intensity = 0.15 + p * 0.85 + Math.sin(t * 2.0) * 0.05
			stationLightRef.current.distance = 2.4 + p * 2.8
		}

		// 4. Floor energy rings
		if (floorRingRef.current) {
			floorRingRef.current.opacity = 0.35 + p * 0.60 + Math.sin(t * 2.2) * 0.06
		}
		if (amberRingRef.current) {
			amberRingRef.current.opacity = 0.55 + p * 0.40
		}

		// 5. Detail question & metadata visibility:
		// When far away (p < 0.22): detail group is hidden so entrance view is clean and uncluttered
		// When approaching (p >= 0.22): reveals smoothly with slight elevation
		if (detailGroupRef.current) {
			const isVisible = p > 0.22
			detailGroupRef.current.visible = isVisible
			if (isVisible) {
				detailGroupRef.current.position.y = (p - 0.22) * 0.12
			}
		}
	})

	return (
		<group
			ref={groupRef}
			position={position}
			rotation={[0, rotationY, 0]}
			onClick={(e) => {
				e.stopPropagation()
				onSelect?.(station)
			}}
			onPointerDown={(e) => e.stopPropagation()}
		>
			{/* ── 1. GROUND ARTIFACT DAIS & CONCENTRIC GLOWING RINGS ── */}
			{/* Low stone plinth pad */}
			<mesh position={[0, 0.02, 0]} receiveShadow>
				<cylinderGeometry args={[0.74, 0.80, 0.04, 36]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.76} metalness={0.02} />
			</mesh>
			<mesh position={[0, 0.042, 0]}>
				<cylinderGeometry args={[0.62, 0.68, 0.02, 36]} />
				<meshStandardMaterial color="#0d121a" roughness={0.88} metalness={0.22} />
			</mesh>

			{/* Outer radiant amber ring */}
			<mesh position={[0, 0.054, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.56, 0.59, 44]} />
				<meshBasicMaterial
					ref={amberRingRef}
					color="#ffb45c"
					transparent
					opacity={0.65}
					toneMapped={false}
				/>
			</mesh>

			{/* Inner reactive cyan/accent ring */}
			<mesh position={[0, 0.056, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.42, 0.46, 44]} />
				<meshBasicMaterial
					ref={floorRingRef}
					color={accentColor}
					transparent
					opacity={0.50}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. SCULPTURAL FACETED CRYSTAL ── */}
			<group ref={crystalRef} position={[0, hoverY, 0]}>
				{crystalGeometry === 'icosahedron' && (
					<mesh scale={[crystalScale, crystalScale * 1.35, crystalScale]}>
						<icosahedronGeometry args={[1, 0]} />
						<meshStandardMaterial
							ref={crystalMatRef}
							color="#081624"
							emissive={accentColor}
							emissiveIntensity={0.50}
							flatShading
							roughness={0.16}
							metalness={0.55}
						/>
					</mesh>
				)}

				{crystalGeometry === 'cube' && (
					<mesh scale={[crystalScale * 0.95, crystalScale * 0.95, crystalScale * 0.95]} rotation={[0.4, 0.5, 0.2]}>
						<boxGeometry args={[1, 1, 1]} />
						<meshStandardMaterial
							ref={crystalMatRef}
							color="#081624"
							emissive={accentColor}
							emissiveIntensity={0.50}
							flatShading
							roughness={0.16}
							metalness={0.55}
						/>
					</mesh>
				)}

				{crystalGeometry === 'octahedron' && (
					<mesh scale={[crystalScale * 1.05, crystalScale * 1.40, crystalScale * 1.05]}>
						<octahedronGeometry args={[1, 0]} />
						<meshStandardMaterial
							ref={crystalMatRef}
							color="#081624"
							emissive={accentColor}
							emissiveIntensity={0.50}
							flatShading
							roughness={0.16}
							metalness={0.55}
						/>
					</mesh>
				)}

				{crystalGeometry === 'dodecahedron' && (
					<mesh scale={[crystalScale, crystalScale * 1.25, crystalScale]}>
						<dodecahedronGeometry args={[1, 0]} />
						<meshStandardMaterial
							ref={crystalMatRef}
							color="#081624"
							emissive={accentColor}
							emissiveIntensity={0.50}
							flatShading
							roughness={0.16}
							metalness={0.55}
						/>
					</mesh>
				)}

				{/* Internal luminous energy core */}
				<mesh scale={[0.16, 0.24, 0.16]}>
					<octahedronGeometry args={[1, 0]} />
					<meshBasicMaterial color="#e0f7ff" transparent opacity={0.85} toneMapped={false} />
				</mesh>

				{/* Floating orbital nano-shards */}
				{[-1, 1].map((dir, i) => (
					<mesh key={i} position={[dir * (crystalScale * 0.85), dir * 0.16, 0]} scale={0.055}>
						<tetrahedronGeometry args={[1, 0]} />
						<meshStandardMaterial
							color="#0c1e2f"
							emissive={accentColor}
							emissiveIntensity={0.70}
							flatShading
						/>
					</mesh>
				))}
			</group>

			{/* ── 3. LOCALIZED REAL THREE.JS POINTLIGHT ── */}
			<pointLight
				ref={stationLightRef}
				color={accentColor}
				intensity={0.20}
				distance={2.6}
				position={[0, 0.70, 0]}
				decay={2}
			/>

			{/* ── 4. 3D SPATIAL TYPOGRAPHY (Matching Concept Image) ── */}
			{/* Spatial Text Group: Positioned inward toward the central walkway */}
			<group position={[localTextX, hoverY, 0]}>
				{/* Always-visible Header: Number stacked cleanly above Concept Title */}
				<group position={[0, 0.15, 0]}>
					{/* Number 01 / 02 / 03 / 04 */}
					<Text
						position={[0, 0.20, 0]}
						fontSize={0.26}
						font="/fonts/SegoeUI-Bold.ttf"
						color={accentColor}
						anchorX={textAnchor}
						anchorY="middle"
						outlineWidth={0.010}
						outlineColor="#050a14"
						material-toneMapped={false}
						sdfGlyphSize={128}
					>
						{number}
					</Text>

					{/* Concept Title */}
					<Text
						position={[0, -0.04, 0]}
						fontSize={0.18}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.12}
						color="#FAF8F2"
						anchorX={textAnchor}
						anchorY="middle"
						outlineWidth={0.008}
						outlineColor="#050a14"
						material-toneMapped={false}
						sdfGlyphSize={128}
					>
						{title}
					</Text>
				</group>

				{/* Detail Group: Philosophical Question & Metadata (fades in as player approaches) */}
				<group ref={detailGroupRef} visible={false}>
					{/* The Philosophical Cursive Question (Marck Script) */}
					<Text
						position={[0, -0.22, 0]}
						maxWidth={2.2}
						fontSize={0.19}
						lineHeight={1.25}
						font="/fonts/MarckScript-Regular.ttf"
						letterSpacing={0.02}
						color="#F4F8FC"
						anchorX={textAnchor}
						anchorY="top"
						outlineWidth={0.006}
						outlineColor="#050a14"
						material-toneMapped={false}
						sdfGlyphSize={128}
					>
						{question}
					</Text>

					{/* Metadata Tags */}
					<group position={[0, -0.66, 0]}>
						{metadata.map((item, idx) => (
							<Text
								key={item}
								position={[0, -idx * 0.11, 0]}
								fontSize={0.085}
								font="/fonts/DMMono-Medium.ttf"
								letterSpacing={0.08}
								color="#9cb0c4"
								anchorX={textAnchor}
								anchorY="middle"
								outlineWidth={0.004}
								outlineColor="#050a14"
								material-toneMapped={false}
								sdfGlyphSize={64}
							>
								{item}
							</Text>
						))}
					</group>

					{/* Subtle Interaction Cue when player is close */}
					{proximity > 0.45 && (
						<group position={[0, -1.18, 0]}>
							<Text
								fontSize={0.085}
								font="/fonts/DMMono-Medium.ttf"
								letterSpacing={0.14}
								color={accentColor}
								anchorX={textAnchor}
								anchorY="middle"
								outlineWidth={0.004}
								outlineColor="#050a14"
								material-toneMapped={false}
							>
								[ E ] ENTER CONCEPT LAYER ↗
							</Text>
						</group>
					)}
				</group>
			</group>
		</group>
	)
}

