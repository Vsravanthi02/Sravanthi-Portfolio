import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

// ============================================================================
// TOOLKIT STATION (CHAPTER 05 — THE ENGINEER'S TOOLKIT)
// Architectural Technology Monolith:
// - Physical 3D dark glass panel with cyan accent trim
// - Clean hierarchy:
//     NUMBER (01 - 07)
//     CATEGORY TITLE
//     SUBTITLE / FOCUS
//     VERIFIED TECHNOLOGY CHIPS
// - Pedestal with kinetic 3D technology centerpiece
// - Proximity & Hover feedback: accent rim glow + [ E ] INSPECT CATEGORY badge
// ============================================================================

export default function ToolkitStation({
	stationKey,
	data,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
	isNearby = false,
	isHovered = false,
	onSelect,
	onPointerOver,
	onPointerOut,
}) {
	const kineticMeshRef = useRef()
	const secondaryKineticRef = useRef()
	const pulseRef = useRef()

	// Gentle kinetic floating for the pedestal centerpiece
	useFrame((state, delta) => {
		const t = state.clock.elapsedTime
		if (kineticMeshRef.current) {
			kineticMeshRef.current.rotation.y += delta * 0.28
			kineticMeshRef.current.position.y = 0.88 + Math.sin(t * 1.3 + position[0]) * 0.028
		}
		if (secondaryKineticRef.current) {
			secondaryKineticRef.current.rotation.y -= delta * 0.35
			secondaryKineticRef.current.rotation.x = Math.sin(t * 0.8) * 0.08
		}
		if (pulseRef.current) {
			const s = 1 + Math.sin(t * 2.0) * 0.03
			pulseRef.current.scale.set(s, s, s)
		}
	})

	if (!data) return null

	const accentColor = data.accentColor || '#00d2ff'
	const secColor = data.secondaryColor || '#80e5ff'
	const active = isNearby || isHovered

	return (
		<group
			position={position}
			rotation={rotation}
			scale={[scale, scale, scale]}
			onClick={(e) => {
				e.stopPropagation()
				onSelect?.(data)
			}}
			onPointerDown={(e) => e.stopPropagation()}
			onPointerOver={(e) => {
				e.stopPropagation()
				document.body.style.cursor = 'pointer'
				onPointerOver?.(stationKey)
			}}
			onPointerOut={(e) => {
				e.stopPropagation()
				document.body.style.cursor = 'auto'
				onPointerOut?.()
			}}
		>
			{/* Hit area for easy click interaction */}
			<mesh position={[0, 1.5, 0]}>
				<cylinderGeometry args={[1.75, 1.75, 3.5, 16]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* Dedicated architectural station glow (Managed via ChapterLightRig) */}

			{/* ── 1. CIRCULAR BASE PLINTH ── */}
			{/* Lower Tier */}
			<mesh position={[0, 0.04, 0]} receiveShadow>
				<cylinderGeometry args={[1.25, 1.35, 0.08, 32]} />
				<meshStandardMaterial
					color={active ? '#142030' : '#0a1018'}
					roughness={0.70}
					metalness={0.30}
				/>
			</mesh>

			{/* Accent Rim Ring */}
			<mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.16, 1.25, 32]} />
				<meshBasicMaterial
					color={accentColor}
					transparent
					opacity={active ? 0.95 : 0.65}
					toneMapped={false}
				/>
			</mesh>

			{/* Upper Tier Platform */}
			<mesh position={[0, 0.12, 0]} receiveShadow>
				<cylinderGeometry args={[1.05, 1.15, 0.08, 32]} />
				<meshStandardMaterial
					color={active ? '#1b2a3c' : '#101824'}
					roughness={0.65}
					metalness={0.35}
				/>
			</mesh>

			{/* Low Pedestal Stand for Visual Centerpiece */}
			<mesh position={[0, 0.30, 0.28]}>
				<cylinderGeometry args={[0.32, 0.38, 0.30, 24]} />
				<meshStandardMaterial color="#142030" roughness={0.75} metalness={0.25} />
			</mesh>
			<mesh position={[0, 0.455, 0.28]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.27, 0.32, 24]} />
				<meshBasicMaterial
					color={accentColor}
					transparent
					opacity={0.85}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. VERTICAL DARK GLASS ARCHITECTURAL MONOLITH ── */}
			<group position={[0, 1.82, -0.28]}>
				{/* Dark Translucent Glass Slab */}
				<mesh>
					<boxGeometry args={[1.74, 2.62, 0.08]} />
					<meshStandardMaterial
						color="#080e16"
						roughness={0.20}
						metalness={0.80}
						transparent
						opacity={0.94}
					/>
				</mesh>

				{/* Outer Edge Trim Bezel */}
				<mesh position={[0, 0, 0.042]}>
					<planeGeometry args={[1.70, 2.58]} />
					<meshBasicMaterial
						color="#1e3248"
						wireframe
						transparent
						opacity={0.45}
					/>
				</mesh>

				{/* Top LED Accent Bar */}
				<mesh position={[0, 1.27, 0.045]}>
					<planeGeometry args={[1.56, 0.024]} />
					<meshBasicMaterial
						color={accentColor}
						transparent
						opacity={active ? 1.0 : 0.85}
						toneMapped={false}
					/>
				</mesh>

				{/* Left and Right Vertical Neon Edge Fins */}
				<mesh position={[-0.85, 0, 0.045]}>
					<planeGeometry args={[0.016, 2.50]} />
					<meshBasicMaterial color={accentColor} transparent opacity={0.65} toneMapped={false} />
				</mesh>
				<mesh position={[0.85, 0, 0.045]}>
					<planeGeometry args={[0.016, 2.50]} />
					<meshBasicMaterial color={accentColor} transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* Station Number Badge (01 - 07) */}
				<Text
					position={[0, 1.02, 0.05]}
					fontSize={0.30}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.12}
					color={accentColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.012}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{data.number}
				</Text>

				{/* Primary Category Title */}
				<Text
					position={[0, 0.70, 0.05]}
					fontSize={0.175}
					maxWidth={1.62}
					textAlign="center"
					lineHeight={1.08}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color={active ? '#FAF8F2' : '#edf4fb'}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{data.title}
				</Text>

				{/* Subtitle / Focus Line */}
				<Text
					position={[0, 0.44, 0.05]}
					fontSize={0.092}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color={secColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{data.subtitle}
				</Text>

				{/* Glowing Horizontal Accent Divider */}
				<mesh position={[0, 0.32, 0.045]}>
					<planeGeometry args={[1.50, 0.008]} />
					<meshBasicMaterial color={accentColor} transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* Key Technologies (Clean, bold, highly legible rows) */}
				<group position={[0, 0.16, 0.05]}>
					{data.keyTechPills?.slice(0, 5).map((tech, idx) => {
						const y = -idx * 0.205
						return (
							<group key={tech} position={[0, y, 0]}>
								{/* Sleek Row Strip */}
								<mesh>
									<planeGeometry args={[1.52, 0.17]} />
									<meshBasicMaterial color="#08121e" transparent opacity={0.92} />
								</mesh>
								{/* Accent Border */}
								<mesh position={[0, 0, 0.001]}>
									<planeGeometry args={[1.52, 0.17]} />
									<meshBasicMaterial color={accentColor} wireframe transparent opacity={0.42} />
								</mesh>
								{/* Left Glowing Dot Pip */}
								<mesh position={[-0.64, 0, 0.005]}>
									<circleGeometry args={[0.024, 12]} />
									<meshBasicMaterial color={accentColor} toneMapped={false} />
								</mesh>
								{/* Bold High-Contrast Technology Label */}
								<Text
									position={[-0.56, 0, 0.008]}
									fontSize={0.104}
									font="/fonts/SegoeUI-Bold.ttf"
									letterSpacing={0.04}
									color="#FAF8F2"
									anchorX="left"
									anchorY="middle"
									outlineWidth={0.005}
									outlineColor="#040810"
									material-toneMapped={false}
								>
									{tech}
								</Text>
							</group>
						)
					})}
				</group>

				{/* Bottom Interactive [ E ] INSPECT Prompt */}
				{active && (
					<group position={[0, -0.96, 0.05]}>
						<mesh>
							<planeGeometry args={[1.40, 0.20]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.20} />
						</mesh>
						<mesh position={[0, 0, 0.001]}>
							<planeGeometry args={[1.40, 0.20]} />
							<meshBasicMaterial color={accentColor} wireframe transparent opacity={0.75} />
						</mesh>
						<Text
							position={[0, 0, 0.008]}
							fontSize={0.075}
							font="/fonts/SegoeUI-Bold.ttf"
							letterSpacing={0.08}
							color="#FAF8F2"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							[ E ] INSPECT CATEGORY
						</Text>
					</group>
				)}
			</group>

			{/* ── 3. LOW PEDESTAL KINETIC 3D CENTERPIECE ── */}
			<group position={[0, 0, 0.24]}>
				{data.iconType === 'tensor' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh>
							<boxGeometry args={[0.26, 0.26, 0.26]} />
							<meshStandardMaterial
								color="#081828"
								metalness={0.7}
								roughness={0.2}
								wireframe
							/>
						</mesh>
						<mesh ref={pulseRef}>
							<octahedronGeometry args={[0.14, 0]} />
							<meshBasicMaterial color={accentColor} wireframe transparent opacity={0.85} toneMapped={false} />
						</mesh>
					</group>
				)}

				{data.iconType === 'agent' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh>
							<octahedronGeometry args={[0.22, 0]} />
							<meshStandardMaterial color="#0c1e30" metalness={0.8} roughness={0.15} />
						</mesh>
						<mesh ref={secondaryKineticRef}>
							<torusGeometry args={[0.32, 0.012, 12, 32]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.75} toneMapped={false} />
						</mesh>
					</group>
				)}

				{data.iconType === 'lens' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh rotation={[Math.PI / 2, 0, 0]}>
							<torusGeometry args={[0.25, 0.02, 16, 32]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.85} toneMapped={false} />
						</mesh>
						<mesh ref={secondaryKineticRef} rotation={[0, 0, Math.PI / 4]}>
							<torusGeometry args={[0.18, 0.015, 16, 32]} />
							<meshBasicMaterial color={secColor} transparent opacity={0.70} toneMapped={false} />
						</mesh>
						<mesh>
							<sphereGeometry args={[0.07, 16, 16]} />
							<meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.6} />
						</mesh>
					</group>
				)}

				{data.iconType === 'graph' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh>
							<cylinderGeometry args={[0.16, 0.16, 0.28, 6]} />
							<meshStandardMaterial color="#201508" metalness={0.6} roughness={0.3} wireframe />
						</mesh>
						<mesh ref={pulseRef}>
							<sphereGeometry args={[0.09, 12, 12]} />
							<meshBasicMaterial color={accentColor} toneMapped={false} />
						</mesh>
						<mesh position={[0.22, 0.10, 0]}>
							<sphereGeometry args={[0.04, 8, 8]} />
							<meshBasicMaterial color={secColor} toneMapped={false} />
						</mesh>
						<mesh position={[-0.20, -0.08, 0.12]}>
							<sphereGeometry args={[0.04, 8, 8]} />
							<meshBasicMaterial color={secColor} toneMapped={false} />
						</mesh>
					</group>
				)}

				{data.iconType === 'service' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh>
							<cylinderGeometry args={[0.22, 0.22, 0.24, 6]} />
							<meshStandardMaterial color="#062216" metalness={0.7} roughness={0.2} />
						</mesh>
						<mesh ref={secondaryKineticRef} rotation={[Math.PI / 2, 0, 0]}>
							<torusGeometry args={[0.30, 0.012, 12, 24]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.8} toneMapped={false} />
						</mesh>
					</group>
				)}

				{data.iconType === 'chart' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh position={[-0.10, -0.05, 0]}>
							<boxGeometry args={[0.06, 0.16, 0.06]} />
							<meshStandardMaterial color="#6a4ca8" metalness={0.5} roughness={0.3} />
						</mesh>
						<mesh position={[0, 0.02, 0]}>
							<boxGeometry args={[0.06, 0.28, 0.06]} />
							<meshStandardMaterial color="#8e6cd4" metalness={0.5} roughness={0.3} />
						</mesh>
						<mesh position={[0.10, 0.08, 0]}>
							<boxGeometry args={[0.06, 0.38, 0.06]} />
							<meshStandardMaterial color="#a993ff" metalness={0.5} roughness={0.3} />
						</mesh>
						<mesh ref={secondaryKineticRef} rotation={[0, 0, 0.3]}>
							<torusGeometry args={[0.28, 0.010, 12, 24]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.7} toneMapped={false} />
						</mesh>
					</group>
				)}

				{data.iconType === 'dev' && (
					<group ref={kineticMeshRef} position={[0, 0.88, 0]}>
						<mesh>
							<octahedronGeometry args={[0.22, 0]} />
							<meshStandardMaterial color="#0e2034" metalness={0.8} roughness={0.2} wireframe />
						</mesh>
						<mesh ref={pulseRef}>
							<boxGeometry args={[0.12, 0.12, 0.12]} />
							<meshBasicMaterial color={accentColor} toneMapped={false} />
						</mesh>
						<mesh ref={secondaryKineticRef} rotation={[Math.PI / 3, 0, 0]}>
							<torusGeometry args={[0.30, 0.012, 12, 32]} />
							<meshBasicMaterial color={secColor} transparent opacity={0.65} toneMapped={false} />
						</mesh>
					</group>
				)}
			</group>
		</group>
	)
}

