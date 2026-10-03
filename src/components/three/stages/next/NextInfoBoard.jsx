import { useState, useRef } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// RIGHT ARCHITECTURAL INFORMATION BOARD (CHAPTER 07 — WHAT'S NEXT)
// Based directly on media_1790773457536.jpg:
// - Grand monumental interactive information board framing the right terrace
// - Dark metallic/glass enclosure with glowing cyan-to-purple neon bezel
// - Header: CHAPTER 07 // WHAT'S NEXT / "Let's build what's next."
// - Inset container with main grounded career aspiration statement
// - 3 structured cards: OPPORTUNITIES, LEARNING, LET'S CONNECT
// - 2 prominent interactive action buttons:
//   [ 📄 VIEW RESUME ↗ ] & [ ✈ GET IN TOUCH ↗ ]
// - Supports direct 3D clicking, hover highlights, and [ E ] terminal activation
// ============================================================================

export default function NextInfoBoard({
	position = [-3.8, 0, 2.2],
	rotation = [0, Math.PI / 2 + 0.26, 0],
	isNearby = false,
	onSelect,
	onOpenResume,
	onOpenContact,
}) {
	const [hoveredBtn, setHoveredBtn] = useState(null)
	const [boardHovered, setBoardHovered] = useState(false)
	const glowRef = useRef()

	// Gentle ambient glow pulsation
	useFrame((state) => {
		if (glowRef.current) {
			const active = isNearby || boardHovered
			glowRef.current.intensity = active ? 1.6 + Math.sin(state.clock.elapsedTime * 3.0) * 0.4 : 0.8
		}
	})

	return (
		<group
			position={position}
			rotation={rotation}
			onPointerOver={() => setBoardHovered(true)}
			onPointerOut={() => setBoardHovered(false)}
		>
			{/* ── 1. MONUMENTAL STRUCTURAL BACKING & DARK GLASS SLAB ── */}
			{/* Heavy Obsidian Rear Housing */}
			<mesh position={[0, 2.85, -0.12]} receiveShadow>
				<boxGeometry args={[4.70, 5.20, 0.24]} />
				<meshStandardMaterial color="#0b1018" roughness={0.75} metalness={0.4} />
			</mesh>

			{/* Main Dark Frosted Glass Surface */}
			<mesh
				position={[0, 2.85, 0.01]}
				onClick={(e) => {
					e.stopPropagation()
					onSelect?.()
				}}
			>
				<planeGeometry args={[4.56, 5.06]} />
				<meshStandardMaterial
					color="#08101a"
					roughness={0.2}
					metalness={0.8}
					transparent
					opacity={0.96}
				/>
			</mesh>

			{/* Soft Halo Glow Backplane */}
			<mesh position={[0, 2.85, -0.01]}>
				<planeGeometry args={[4.76, 5.26]} />
				<meshBasicMaterial
					color="#00d2ff"
					transparent
					opacity={isNearby || boardHovered ? 0.22 : 0.08}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. NEON ACCENT BEZEL (CYAN TO PURPLE) ── */}
			{/* Top Rim */}
			<mesh position={[0, 5.37, 0.025]}>
				<planeGeometry args={[4.58, 0.03]} />
				<meshBasicMaterial color="#00d2ff" toneMapped={false} />
			</mesh>
			{/* Bottom Rim */}
			<mesh position={[0, 0.33, 0.025]}>
				<planeGeometry args={[4.58, 0.03]} />
				<meshBasicMaterial color="#a855f7" toneMapped={false} />
			</mesh>
			{/* Left Rim (Cyan) */}
			<mesh position={[-2.28, 2.85, 0.025]}>
				<planeGeometry args={[0.03, 5.06]} />
				<meshBasicMaterial color="#00d2ff" toneMapped={false} />
			</mesh>
			{/* Right Rim (Purple) */}
			<mesh position={[2.28, 2.85, 0.025]}>
				<planeGeometry args={[0.03, 5.06]} />
				<meshBasicMaterial color="#a855f7" toneMapped={false} />
			</mesh>

			{/* ── 3. HEADER SECTION ── */}
			<group position={[-1.95, 4.88, 0.04]}>
				{/* Status Pip & Tag: • CHAPTER 07 // WHAT'S NEXT */}
				<mesh position={[0.06, 0.16, 0]}>
					<circleGeometry args={[0.035, 16]} />
					<meshBasicMaterial color="#ffaa44" toneMapped={false} />
				</mesh>
				<Text
					position={[0.18, 0.16, 0]}
					fontSize={0.095}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.12}
					color="#ffaa44"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					CHAPTER 07 // WHAT'S NEXT
				</Text>

				{/* Title: WHAT'S NEXT */}
				<Text
					position={[0, -0.14, 0]}
					fontSize={0.34}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.05}
					color="#FAF8F2"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.title}
				</Text>

				{/* Subtitle: Let's build what's next. */}
				<Text
					position={[0, -0.44, 0]}
					fontSize={0.155}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.06}
					color="#9ecaff"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.subtitle}
				</Text>
			</group>

			{/* ── 4. MAIN STATEMENT CONTAINER (ROUNDED GLASS SLAB) ── */}
			<group position={[0, 3.70, 0.03]}>
				{/* Inner Box Slab */}
				<mesh>
					<planeGeometry args={[4.05, 1.05]} />
					<meshStandardMaterial
						color="#0c1624"
						roughness={0.25}
						metalness={0.7}
						transparent
						opacity={0.88}
					/>
				</mesh>
				{/* Outer Outline */}
				<mesh position={[0, 0, 0.002]}>
					<planeGeometry args={[4.07, 1.07]} />
					<meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.4} toneMapped={false} />
				</mesh>
				{/* Left Accent Bar */}
				<mesh position={[-2.01, 0, 0.005]}>
					<planeGeometry args={[0.04, 1.0]} />
					<meshBasicMaterial color="#a855f7" toneMapped={false} />
				</mesh>

				<Text
					position={[-1.85, 0.34, 0.01]}
					fontSize={0.118}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.02}
					maxWidth={3.75}
					lineHeight={1.65}
					color="#d8e8f8"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.mainStatement}
				</Text>
			</group>

			{/* ── 5. THREE STRUCTURED ACTION CARDS ── */}
			<group position={[0, 2.30, 0.03]}>
				{NEXT_CONTENT.cards.map((card, idx) => {
					// 3 cards laid out horizontally: X = -1.38, 0.0, 1.38
					const posX = (idx - 1) * 1.38
					const accent = card.accentColor

					return (
						<group key={card.number} position={[posX, 0, 0]}>
							{/* Card Glass Backing */}
							<mesh>
								<planeGeometry args={[1.28, 1.25]} />
								<meshStandardMaterial
									color="#0c1522"
									roughness={0.3}
									metalness={0.7}
									transparent
									opacity={0.92}
								/>
							</mesh>
							{/* Card Rim Border */}
							<mesh position={[0, 0, 0.002]}>
								<planeGeometry args={[1.30, 1.27]} />
								<meshBasicMaterial color={accent} wireframe transparent opacity={0.5} toneMapped={false} />
							</mesh>
							{/* Top Accent Strip */}
							<mesh position={[0, 0.62, 0.004]}>
								<planeGeometry args={[1.28, 0.025]} />
								<meshBasicMaterial color={accent} toneMapped={false} />
							</mesh>

							{/* Card Icon Bezel */}
							<group position={[-0.42, 0.38, 0.008]}>
								<mesh>
									<circleGeometry args={[0.11, 20]} />
									<meshBasicMaterial color={accent} transparent opacity={0.2} />
								</mesh>
								<mesh position={[0, 0, 0.001]}>
									<ringGeometry args={[0.10, 0.115, 20]} />
									<meshBasicMaterial color={accent} toneMapped={false} />
								</mesh>
								{/* Geometric Icon */}
								{idx === 0 && (
									/* Briefcase */
									<mesh>
										<planeGeometry args={[0.09, 0.07]} />
										<meshBasicMaterial color={accent} toneMapped={false} />
									</mesh>
								)}
								{idx === 1 && (
									/* Cap / Book */
									<mesh rotation={[0, 0, Math.PI / 4]}>
										<planeGeometry args={[0.08, 0.08]} />
										<meshBasicMaterial color={accent} toneMapped={false} />
									</mesh>
								)}
								{idx === 2 && (
									/* Connect / Users */
									<mesh>
										<circleGeometry args={[0.045, 12]} />
										<meshBasicMaterial color={accent} toneMapped={false} />
									</mesh>
								)}
							</group>

							{/* Card Title */}
							<Text
								position={[-0.48, 0.16, 0.01]}
								fontSize={0.095}
								font="/fonts/SegoeUI-Bold.ttf"
								letterSpacing={0.06}
								color="#FAF8F2"
								anchorX="left"
								anchorY="middle"
								material-toneMapped={false}
							>
								{card.title}
							</Text>

							{/* Card Description */}
							<Text
								position={[-0.48, -0.04, 0.01]}
								fontSize={0.074}
								font="/fonts/DMMono-Medium.ttf"
								letterSpacing={0.02}
								maxWidth={1.16}
								lineHeight={1.48}
								color="#9eb6cd"
								anchorX="left"
								anchorY="top"
								material-toneMapped={false}
							>
								{card.description}
							</Text>
						</group>
					)
				})}
			</group>

			{/* ── 6. BOTTOM ACTION BUTTONS: [ VIEW RESUME ↗ ] & [ GET IN TOUCH ↗ ] ── */}
			<group position={[0, 0.95, 0.04]}>
				{/* Button 1: [ 📄 VIEW RESUME ↗ ] */}
				<group
					position={[-1.02, 0, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onOpenResume?.()
					}}
					onPointerOver={(e) => {
						e.stopPropagation()
						setHoveredBtn('resume')
						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						setHoveredBtn(null)
						document.body.style.cursor = ''
					}}
				>
					{/* Hit target */}
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[1.90, 0.50]} />
						<meshBasicMaterial transparent opacity={0} depthWrite={false} />
					</mesh>
					{/* Dark Frosted Base */}
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[1.86, 0.44]} />
						<meshStandardMaterial
							color={hoveredBtn === 'resume' ? '#102236' : '#0a1420'}
							roughness={0.25}
							metalness={0.7}
							transparent
							opacity={0.96}
						/>
					</mesh>
					{/* Cyan Neon Rim */}
					<mesh position={[0, 0, 0.002]}>
						<planeGeometry args={[1.88, 0.46]} />
						<meshBasicMaterial
							color="#00d2ff"
							wireframe
							transparent
							opacity={hoveredBtn === 'resume' ? 1.0 : 0.65}
							toneMapped={false}
						/>
					</mesh>
					{/* Text & Icon: 📄 VIEW RESUME ↗ */}
					<Text
						position={[0, 0.005, 0.01]}
						fontSize={0.11}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						material-toneMapped={false}
					>
						VIEW RESUME  ↗
					</Text>
				</group>

				{/* Button 2: [ ✈ GET IN TOUCH ↗ ] */}
				<group
					position={[1.02, 0, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onOpenContact?.()
					}}
					onPointerOver={(e) => {
						e.stopPropagation()
						setHoveredBtn('contact')
						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						setHoveredBtn(null)
						document.body.style.cursor = ''
					}}
				>
					{/* Hit target */}
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[1.90, 0.50]} />
						<meshBasicMaterial transparent opacity={0} depthWrite={false} />
					</mesh>
					{/* Solid Vibrant Purple Fill (Matching Reference) */}
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[1.86, 0.44]} />
						<meshStandardMaterial
							color={hoveredBtn === 'contact' ? '#9333ea' : '#7c3aed'}
							roughness={0.3}
							metalness={0.5}
						/>
					</mesh>
					{/* Glowing Purple Rim */}
					<mesh position={[0, 0, 0.002]}>
						<planeGeometry args={[1.88, 0.46]} />
						<meshBasicMaterial
							color="#d8b4fe"
							wireframe
							transparent
							opacity={hoveredBtn === 'contact' ? 1.0 : 0.75}
							toneMapped={false}
						/>
					</mesh>
					{/* Text & Icon: ✈ GET IN TOUCH ↗ */}
					<Text
						position={[0, 0.005, 0.01]}
						fontSize={0.11}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						material-toneMapped={false}
					>
						GET IN TOUCH  ↗
					</Text>
				</group>
			</group>

			{/* Interactive [ E ] Badge on hover / proximity */}
			{(isNearby || boardHovered) && (
				<group position={[0, 0.38, 0.06]}>
					<mesh>
						<planeGeometry args={[1.4, 0.20]} />
						<meshBasicMaterial color="#081018" />
					</mesh>
					<mesh position={[0, 0, 0.001]}>
						<planeGeometry args={[1.4, 0.20]} />
						<meshBasicMaterial color="#00d2ff" wireframe toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0, 0.005]}
						fontSize={0.082}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color="#00d2ff"
						anchorX="center"
						anchorY="middle"
						material-toneMapped={false}
					>
						[ E ] EXPAND VIEW
					</Text>
				</group>
			)}

			{/* Accent Point Light (Managed via ChapterLightRig) */}
		</group>
	)
}
