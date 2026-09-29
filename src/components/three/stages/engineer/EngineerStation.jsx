import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

// ============================================================================
// ENGINEER STATION (CHAPTER 04 — THE ENGINEER)
// Architectural Exhibition Installation:
// - Physical 3D panel communicates WHAT the work area is (pure architectural clarity)
// - Layout:
//     NUMBER (01-06)
//     TITLE
//     ONE SHORT SUBTITLE
//     ARCHITECTURAL TAG
//     2-3 SHORT KEYWORDS (XML • GENERATION • VALIDATION, etc.)
// - Narrowed width (1.52m) and height (2.40m) preserving sunset/mountain horizon
// - Low-profile kinetic 3D centerpiece on pedestal (zero text occlusion)
// - Interactive [ E ] EXPLORE badge opening detailed technical terminal
// ============================================================================

export default function EngineerStation({
	stationKey,
	data,
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	isNearby = false,
	isHovered = false,
	onSelect,
	onPointerOver,
	onPointerOut
}) {
	const centerMeshRef = useRef()
	const secondaryMeshRef = useRef()
	const pulseRef = useRef()

	// Gentle kinetic floating for the station centerpieces at low pedestal height
	useFrame((state, delta) => {
		const t = state.clock.elapsedTime
		if (centerMeshRef.current) {
			centerMeshRef.current.rotation.y += delta * 0.22
			centerMeshRef.current.position.y = 0.86 + Math.sin(t * 1.2 + position[0]) * 0.025
		}
		if (secondaryMeshRef.current) {
			secondaryMeshRef.current.rotation.y -= delta * 0.30
			secondaryMeshRef.current.rotation.x = Math.sin(t * 0.7) * 0.06
		}
		if (pulseRef.current) {
			pulseRef.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.03)
		}
	})

	if (!data) return null

	const isMethodology = Boolean(data.isMethodology || stationKey === 'howIEngineer' || data.number === '01')
	const accentColor = isMethodology ? '#4eaed4' : (data.accentColor || '#35d8ff')
	const secColor = isMethodology ? '#8bb5d4' : (data.secondaryColor || '#ffb45c')
	const active = isNearby || isHovered

	return (
		<group
			position={position}
			rotation={rotation}
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
				<cylinderGeometry args={[1.6, 1.6, 3.4, 16]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* ── 1. CIRCULAR BASE PLINTH ── */}
			{/* Lower Tier */}
			<mesh position={[0, 0.04, 0]} receiveShadow>
				<cylinderGeometry args={[1.15, 1.25, 0.08, 32]} />
				<meshStandardMaterial
					color={active ? '#15202e' : '#0c121a'}
					roughness={0.72}
					metalness={0.28}
				/>
			</mesh>

			{/* Accent Rim Ring */}
			<mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.08, 1.15, 32]} />
				<meshBasicMaterial
					color={accentColor}
					transparent
					opacity={isMethodology ? (active ? 0.60 : 0.25) : (active ? 0.95 : 0.60)}
					toneMapped={false}
				/>
			</mesh>

			{/* Upper Tier Platform */}
			<mesh position={[0, 0.12, 0]} receiveShadow>
				<cylinderGeometry args={[0.98, 1.08, 0.08, 32]} />
				<meshStandardMaterial
					color={active ? '#1c2838' : '#121822'}
					roughness={0.65}
					metalness={0.35}
				/>
			</mesh>

			{/* Low Pedestal Stand for Visual Centerpiece */}
			<mesh position={[0, 0.30, 0.24]}>
				<cylinderGeometry args={[0.30, 0.36, 0.30, 24]} />
				<meshStandardMaterial color="#18222e" roughness={0.75} metalness={0.25} />
			</mesh>
			<mesh position={[0, 0.455, 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.26, 0.30, 24]} />
				<meshBasicMaterial
					color={accentColor}
					transparent
					opacity={isMethodology ? 0.45 : 0.85}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. VERTICAL DARK GLASS ARCHITECTURAL MONOLITH ── */}
			{/* Narrower (1.52m) and lower height (2.40m) for maximum negative space and horizon visibility */}
			<group position={[0, 1.75, -0.32]}>
				{/* Dark Translucent Glass Slab */}
				<mesh>
					<boxGeometry args={[1.52, 2.40, 0.08]} />
					<meshStandardMaterial
						color={isMethodology ? '#060a12' : '#080e16'}
						roughness={isMethodology ? 0.32 : 0.20}
						metalness={isMethodology ? 0.68 : 0.80}
						transparent
						opacity={0.92}
					/>
				</mesh>

				{/* Subtle Edge Trim Bezel */}
				<mesh position={[0, 0, 0.042]}>
					<planeGeometry args={[1.48, 2.36]} />
					<meshBasicMaterial
						color={isMethodology ? '#141e2a' : '#1a2636'}
						wireframe
						transparent
						opacity={isMethodology ? 0.22 : 0.32}
					/>
				</mesh>

				{/* Top Monolith Accent LED Bar */}
				<mesh position={[0, 1.15, 0.045]}>
					<planeGeometry args={[1.36, isMethodology ? 0.020 : 0.024]} />
					<meshBasicMaterial
						color={accentColor}
						transparent
						opacity={isMethodology ? (active ? 0.65 : 0.35) : (active ? 1.0 : 0.85)}
						toneMapped={false}
					/>
				</mesh>

				{/* Station Number (01 - 06) */}
				<Text
					position={[0, 0.90, 0.05]}
					fontSize={isMethodology ? 0.18 : 0.19}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.12}
					color={isMethodology ? '#5ec2e7' : accentColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{data.number}
				</Text>

				{/* Primary Title (Clean, Bold, High Contrast) */}
				<Text
					position={[0, 0.62, 0.05]}
					fontSize={0.145}
					maxWidth={1.44}
					textAlign="center"
					lineHeight={1.12}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color={active ? '#FAF8F2' : (isMethodology ? '#d6e4f0' : '#f0f5fa')}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.009}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{data.title}
				</Text>

				{/* Subtitle / Focus Line */}
				<Text
					position={[0, 0.40, 0.05]}
					fontSize={0.118}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color={isMethodology ? '#8bb5d4' : secColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{data.subtitle}
				</Text>

				{/* Subtle Horizontal Divider */}
				<mesh position={[0, 0.24, 0.045]}>
					<planeGeometry args={[1.15, 0.012]} />
					<meshBasicMaterial
						color={active ? accentColor : (isMethodology ? '#1f2e3d' : '#2d3e52')}
						transparent
						opacity={isMethodology ? 0.45 : 0.70}
						toneMapped={false}
					/>
				</mesh>

				{/* Architectural Tag (METHODOLOGY for 01 / QUINTESYS WORK for 02-06) */}
				<Text
					position={[0, 0.06, 0.05]}
					fontSize={isMethodology ? 0.076 : 0.082}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={isMethodology ? 0.16 : 0.14}
					color={isMethodology ? '#6ba8cc' : accentColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{data.tag || data.inscription}
				</Text>

				{/* 2-3 Short Storytelling Keywords Pill */}
				{data.keywords && (
					<group position={[0, -0.22, 0.05]}>
						<mesh>
							<planeGeometry args={[1.36, 0.20]} />
							<meshBasicMaterial
								color={isMethodology ? '#09121a' : '#0b1522'}
								transparent
								opacity={0.92}
							/>
						</mesh>
						<mesh position={[0, 0, 0.002]}>
							<planeGeometry args={[1.34, 0.18]} />
							<meshBasicMaterial
								color={accentColor}
								wireframe
								transparent
								opacity={isMethodology ? 0.22 : 0.45}
							/>
						</mesh>
						<Text
							position={[0, 0, 0.005]}
							fontSize={0.074}
							font="/fonts/DMMono-Medium.ttf"
							letterSpacing={0.06}
							color={isMethodology ? '#c8dde8' : '#FAF8F2'}
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							{data.keywords}
						</Text>
					</group>
				)}

				{/* Bottom Monolith Decorative Bezel */}
				<mesh position={[0, -1.05, 0.045]}>
					<planeGeometry args={[1.10, 0.01]} />
					<meshBasicMaterial color={isMethodology ? '#182432' : '#2d3e52'} />
				</mesh>
			</group>

			{/* ── 3. LOW-PROFILE 3D SCULPTURAL CENTERPIECE (Zero text occlusion) ── */}
			<group position={[0, 0, 0.24]}>
				{stationKey === 'howIEngineer' && (
					/* Station 01: Methodology & Practice Loop (Cool, Subtle, Conceptual) */
					<group ref={centerMeshRef}>
						<mesh>
							<cylinderGeometry args={[0.20, 0.24, 0.16, 6]} />
							<meshStandardMaterial color="#0c1824" roughness={0.55} metalness={0.45} />
						</mesh>
						<mesh ref={pulseRef}>
							<cylinderGeometry args={[0.13, 0.16, 0.18, 6]} />
							<meshBasicMaterial color="#4eaed4" wireframe transparent opacity={0.60} toneMapped={false} />
						</mesh>
						<group ref={secondaryMeshRef}>
							{[0, 1, 2, 3, 4, 5].map((idx) => {
								const rad = (idx * Math.PI) / 3
								const px = Math.cos(rad) * 0.34
								const pz = Math.sin(rad) * 0.34
								return (
									<group key={idx} position={[px, 0, pz]}>
										<mesh>
											<octahedronGeometry args={[0.034, 0]} />
											<meshBasicMaterial color={idx % 2 === 0 ? '#5ec2e7' : '#8bb5d4'} toneMapped={false} />
										</mesh>
										<mesh position={[-px * 0.4, 0, -pz * 0.4]} rotation={[0, -rad, 0]}>
											<planeGeometry args={[0.15, 0.006]} />
											<meshBasicMaterial color="#4eaed4" transparent opacity={0.35} side={THREE.DoubleSide} toneMapped={false} />
										</mesh>
									</group>
								)
							})}
						</group>
						<mesh rotation={[Math.PI / 3, 0, 0]}>
							<torusGeometry args={[0.40, 0.005, 8, 36]} />
							<meshBasicMaterial color="#4eaed4" transparent opacity={0.45} toneMapped={false} />
						</mesh>
					</group>
				)}

				{stationKey === 'cognosPaginated' && (
					/* Station 02: Cognos → Power BI Paginated Reports (RDL Generation) */
					<group ref={centerMeshRef}>
						{[-0.08, 0, 0.08].map((y, idx) => (
							<mesh key={idx} position={[0, y, 0]} rotation={[0, (idx * Math.PI) / 6, 0]}>
								<boxGeometry args={[0.36 - idx * 0.03, 0.024, 0.28 - idx * 0.02]} />
								<meshStandardMaterial
									color={idx === 1 ? secColor : '#1b2c3d'}
									transparent
									opacity={0.75}
									roughness={0.3}
								/>
							</mesh>
						))}
						<mesh position={[0, 0, 0]}>
							<cylinderGeometry args={[0.016, 0.016, 0.34, 16]} />
							<meshBasicMaterial color={secColor} toneMapped={false} />
						</mesh>
						<mesh rotation={[Math.PI / 4, 0, 0]}>
							<torusGeometry args={[0.34, 0.006, 8, 32]} />
							<meshBasicMaterial color={secColor} transparent opacity={0.8} toneMapped={false} />
						</mesh>
					</group>
				)}

				{stationKey === 'cognosDesktop' && (
					/* Station 03: Cognos → Power BI Desktop / Visuals (PBIP Visual Containers) */
					<group ref={centerMeshRef}>
						<mesh>
							<boxGeometry args={[0.32, 0.20, 0.32]} />
							<meshStandardMaterial color="#102234" transparent opacity={0.6} wireframe />
						</mesh>
						{[-0.08, 0.08].map((x, xi) =>
							[-0.08, 0.08].map((z, zi) => (
								<mesh key={`${xi}-${zi}`} position={[x, 0, z]}>
									<boxGeometry args={[0.11, 0.12, 0.11]} />
									<meshStandardMaterial
										color={xi === zi ? accentColor : '#1a334d'}
										roughness={0.4}
										metalness={0.6}
									/>
								</mesh>
							))
						)}
						<mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
							<torusGeometry args={[0.36, 0.006, 8, 36]} />
							<meshBasicMaterial color={accentColor} transparent opacity={0.7} toneMapped={false} />
						</mesh>
					</group>
				)}

				{stationKey === 'genaiEngineering' && (
					/* Station 04: LLM / GenAI Engineering (Transformer Attention & QLoRA Weights) */
					<group ref={centerMeshRef}>
						<mesh>
							<octahedronGeometry args={[0.22, 1]} />
							<meshBasicMaterial color="#a993ff" wireframe transparent opacity={0.75} toneMapped={false} />
						</mesh>
						<mesh ref={pulseRef}>
							<sphereGeometry args={[0.10, 16, 16]} />
							<meshBasicMaterial color="#c4b5fd" toneMapped={false} />
						</mesh>
						<group ref={secondaryMeshRef}>
							<mesh rotation={[Math.PI / 4, 0, 0]}>
								<torusGeometry args={[0.34, 0.007, 8, 36]} />
								<meshBasicMaterial color="#a993ff" transparent opacity={0.8} toneMapped={false} />
							</mesh>
							<mesh rotation={[-Math.PI / 4, 0, 0]}>
								<torusGeometry args={[0.30, 0.006, 8, 36]} />
								<meshBasicMaterial color="#ffb45c" transparent opacity={0.7} toneMapped={false} />
							</mesh>
						</group>
					</group>
				)}

				{stationKey === 'aiSystems' && (
					/* Station 05: AI Systems / Automation (Microservice Pipeline & Orchestration) */
					<group ref={centerMeshRef}>
						<mesh>
							<cylinderGeometry args={[0.16, 0.16, 0.20, 8]} />
							<meshStandardMaterial color="#162c3e" roughness={0.4} metalness={0.6} />
						</mesh>
						{[-0.22, 0.22].map((x, idx) => (
							<mesh key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
								<cylinderGeometry args={[0.014, 0.014, 0.16, 8]} />
								<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
							</mesh>
						))}
						{[-0.22, 0.22].map((z, idx) => (
							<mesh key={idx} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
								<cylinderGeometry args={[0.014, 0.014, 0.16, 8]} />
								<meshBasicMaterial color="#ffb45c" toneMapped={false} />
							</mesh>
						))}
						<mesh rotation={[Math.PI / 2, 0, 0]}>
							<torusGeometry args={[0.34, 0.006, 8, 36]} />
							<meshBasicMaterial color="#6fe7ff" transparent opacity={0.75} toneMapped={false} />
						</mesh>
					</group>
				)}

				{stationKey === 'softwareEngineering' && (
					/* Station 06: Software Engineering Practice (Code Brackets, Tests & Docker Container) */
					<group ref={centerMeshRef}>
						<mesh>
							<boxGeometry args={[0.26, 0.26, 0.26]} />
							<meshStandardMaterial
								color="#122536"
								roughness={0.2}
								metalness={0.8}
								transparent
								opacity={0.65}
							/>
						</mesh>
						<mesh ref={pulseRef}>
							<octahedronGeometry args={[0.10, 0]} />
							<meshBasicMaterial color="#ffb45c" toneMapped={false} />
						</mesh>
						<group ref={secondaryMeshRef}>
							<mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
								<torusGeometry args={[0.34, 0.007, 8, 36]} />
								<meshBasicMaterial color="#ffb45c" toneMapped={false} />
							</mesh>
							<mesh rotation={[-Math.PI / 4, 0, 0]}>
								<torusGeometry args={[0.36, 0.006, 8, 36]} />
								<meshBasicMaterial color="#35d8ff" toneMapped={false} />
							</mesh>
						</group>
					</group>
				)}

				{/* Exhibit Lighting: 01 has calm subtle light, 02-06 have balanced exhibition spotlighting */}
				{isMethodology ? (
					<pointLight
						position={[0, 0.9, 0.1]}
						color="#4eaed4"
						intensity={active ? 0.48 : 0.24}
						distance={2.0}
						decay={2}
					/>
				) : (
					<>
						{/* Primary Vibrant Centerpiece & Monolith Spotlight */}
						<pointLight
							position={[0, 0.9, 0.15]}
							color={accentColor}
							intensity={active ? 1.35 : 0.92}
							distance={2.6}
							decay={2}
						/>
						{/* Exhibition Gallery Pedestal Uplight */}
						<pointLight
							position={[0, 0.35, 0.32]}
							color="#ffd699"
							intensity={active ? 0.45 : 0.28}
							distance={1.8}
							decay={2}
						/>
					</>
				)}
			</group>

			{/* ── 4. SUBTLE INTERACTIVE EXPLORE BADGE ── */}
			<group position={[0, 0.22, 0.85]}>
				<mesh position={[0, 0, 0]}>
					<planeGeometry args={[0.68, 0.18]} />
					<meshBasicMaterial
						color={active ? '#FAF8F2' : '#0e1622'}
						transparent
						opacity={active ? 0.95 : 0.75}
					/>
				</mesh>
				<mesh position={[0, 0, 0.002]}>
					<planeGeometry args={[0.70, 0.20]} />
					<meshBasicMaterial
						color={active ? (isMethodology ? '#4eaed4' : accentColor) : (isMethodology ? '#1a2a38' : '#253548')}
						wireframe
						toneMapped={false}
					/>
				</mesh>
				<Text
					position={[0, 0, 0.008]}
					fontSize={0.068}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color={active ? '#060d17' : (isMethodology ? '#7a96ab' : '#9cb0c4')}
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					{isMethodology
						? (active ? '[ E ] METHODOLOGY' : '01 • METHODOLOGY')
						: (active ? '[ E ] EXPLORE' : `${data.number} • EXPLORE`)}
				</Text>
			</group>
		</group>
	)
}
