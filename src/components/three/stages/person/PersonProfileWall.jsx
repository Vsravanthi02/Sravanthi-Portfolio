import { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Text, useTexture } from '@react-three/drei'
import { PERSON_PROFILE } from '../../../../data/personData'

// ============================================================================
// LEFT PROFILE ARCHITECTURAL INSTALLATION (CHAPTER 06 — THE PERSON)
// Physical illuminated portrait installation based on media_1790761295168.jpg:
// - Monumental dark monolithic structural wall framing the left flank
// - Header: [ 06 ] THE PERSON / Beyond the code.
// - Vertical portrait frame: dark obsidian bevel, glowing cyan/purple rim,
//   slight glass reflection, and high-resolution photo from /images/sravanthi.jpg
// - Integrated architectural nameplate: SRAVANTHI ADDAGADA / AI / GENAI ENGINEER
// - Location badge & personal quote
// ============================================================================

function PortraitImageMesh() {
	const texture = useTexture(PERSON_PROFILE.photoUrl)
	texture.colorSpace = THREE.SRGBColorSpace
	texture.generateMipmaps = true
	texture.minFilter = THREE.LinearMipmapLinearFilter
	texture.magFilter = THREE.LinearFilter

	return (
		<mesh position={[0, 0, 0.02]}>
			<planeGeometry args={[1.68, 2.24]} />
			<meshBasicMaterial map={texture} toneMapped={false} />
		</mesh>
	)
}

function PortraitFallback() {
	return (
		<group position={[0, 0, 0.02]}>
			<mesh>
				<planeGeometry args={[1.68, 2.24]} />
				<meshStandardMaterial color="#0e1420" roughness={0.4} metalness={0.6} />
			</mesh>
			<Text
				position={[0, 0.15, 0.01]}
				fontSize={0.28}
				font="/fonts/SegoeUI-Bold.ttf"
				color="#35d8ff"
				anchorX="center"
				anchorY="middle"
			>
				SA.
			</Text>
			<Text
				position={[0, -0.22, 0.01]}
				fontSize={0.08}
				font="/fonts/DMMono-Medium.ttf"
				color="#88a4c0"
				anchorX="center"
				anchorY="middle"
				letterSpacing={0.12}
			>
				PORTRAIT INSTALLATION
			</Text>
		</group>
	)
}

export default function PersonProfileWall({ position = [5.6, 0, 0.6], rotation = [0, -Math.PI / 2 - 0.32, 0] }) {
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = PERSON_PROFILE.photoUrl
		img.onerror = () => setHasError(true)
	}, [])

	return (
		<group position={position} rotation={rotation}>
			{/* ── 1. MONUMENTAL STRUCTURAL WALL ── */}
			<mesh position={[0, 3.2, -0.15]} receiveShadow>
				<boxGeometry args={[4.4, 6.4, 0.30]} />
				<meshStandardMaterial color="#1a2029" roughness={0.82} metalness={0.15} />
			</mesh>

			{/* Architectural Travertine Reveal Trim */}
			<mesh position={[-2.18, 3.2, -0.05]}>
				<boxGeometry args={[0.06, 6.4, 0.34]} />
				<meshStandardMaterial color="#364356" roughness={0.65} metalness={0.25} />
			</mesh>

			{/* Concealed Vertical Cyan Accent Strip */}
			<mesh position={[-2.22, 3.2, 0.02]}>
				<boxGeometry args={[0.02, 6.2, 0.02]} />
				<meshBasicMaterial color="#00d2ff" toneMapped={false} />
			</mesh>

			{/* ── 2. HEADER: [ 06 ] THE PERSON / Beyond the code. ── */}
			<group position={[-0.92, 5.35, 0.02]}>
				{/* Pill Badge [ 06 ] */}
				<mesh position={[-0.55, 0.05, 0]}>
					<planeGeometry args={[0.54, 0.44]} />
					<meshBasicMaterial color="#00d2ff" transparent opacity={0.18} />
				</mesh>
				<mesh position={[-0.55, 0.05, 0.001]}>
					<planeGeometry args={[0.54, 0.44]} />
					<meshBasicMaterial color="#00d2ff" wireframe transparent opacity={0.8} />
				</mesh>
				<Text
					position={[-0.55, 0.05, 0.008]}
					fontSize={0.22}
					font="/fonts/SegoeUI-Bold.ttf"
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					{PERSON_PROFILE.chapterNumber}
				</Text>

				{/* Title: THE PERSON */}
				<Text
					position={[-0.15, 0.12, 0.008]}
					fontSize={0.24}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{PERSON_PROFILE.title}
				</Text>

				{/* Subtitle: Beyond the code. */}
				<Text
					position={[-0.15, -0.12, 0.008]}
					fontSize={0.12}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.08}
					color="#8ec5e8"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{PERSON_PROFILE.subtitle}
				</Text>
			</group>

			{/* ── 3. INTEGRATED VERTICAL PORTRAIT INSTALLATION ── */}
			<group position={[0, 3.45, 0.02]}>
				{/* Dark Obsidian Frame Surround Backing */}
				<mesh position={[0, 0, 0]}>
					<planeGeometry args={[1.90, 2.46]} />
					<meshStandardMaterial color="#090e15" roughness={0.35} metalness={0.7} />
				</mesh>

				{/* Glowing Cyan/Purple Neon Edge Border (Clean Solid Strips, no wireframe diagonals) */}
				{/* Top Glow Rim */}
				<mesh position={[0, 1.18, 0.025]}>
					<planeGeometry args={[1.78, 0.035]} />
					<meshBasicMaterial color="#00d2ff" toneMapped={false} />
				</mesh>
				{/* Bottom Glow Rim */}
				<mesh position={[0, -1.18, 0.025]}>
					<planeGeometry args={[1.78, 0.035]} />
					<meshBasicMaterial color="#00d2ff" toneMapped={false} />
				</mesh>
				{/* Left Glow Rim */}
				<mesh position={[-0.88, 0, 0.025]}>
					<planeGeometry args={[0.035, 2.36]} />
					<meshBasicMaterial color="#00d2ff" toneMapped={false} />
				</mesh>
				{/* Right Glow Rim (Purple gradient transition) */}
				<mesh position={[0.88, 0, 0.025]}>
					<planeGeometry args={[0.035, 2.36]} />
					<meshBasicMaterial color="#a855f7" toneMapped={false} />
				</mesh>

				{/* Outer Soft Halo Glow Backplane */}
				<mesh position={[0, 0, -0.005]}>
					<planeGeometry args={[2.00, 2.56]} />
					<meshBasicMaterial color="#00d2ff" transparent opacity={0.16} toneMapped={false} />
				</mesh>

				{/* High-Resolution Portrait Photo */}
				{!hasError ? (
					<Suspense fallback={<PortraitFallback />}>
						<PortraitImageMesh />
					</Suspense>
				) : (
					<PortraitFallback />
				)}

				{/* Clean Sheen Pane */}
				<mesh position={[0, 0, 0.03]}>
					<planeGeometry args={[1.68, 2.24]} />
					<meshBasicMaterial color="#ffffff" transparent opacity={0.04} depthWrite={false} />
				</mesh>
			</group>

			{/* ── 4. ARCHITECTURAL NAMEPLATE & DETAILS ── */}
			<group position={[-0.95, 1.82, 0.04]}>
				{/* SRAVANTHI ADDAGADA */}
				<Text
					position={[0, 0.16, 0]}
					fontSize={0.165}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{PERSON_PROFILE.name}
				</Text>

				{/* AI / GENAI ENGINEER */}
				<Text
					position={[0, -0.04, 0]}
					fontSize={0.105}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.12}
					color="#35d8ff"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{PERSON_PROFILE.role}
				</Text>

				{/* Location: 📍 India */}
				<Text
					position={[0, -0.22, 0]}
					fontSize={0.092}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.08}
					color="#9bb7d4"
					anchorX="left"
					anchorY="middle"
				>
					📍 {PERSON_PROFILE.location}
				</Text>

				{/* Inscribed Personal Quote */}
				<group position={[0, -0.52, 0]}>
					<Text
						position={[0, 0, 0]}
						fontSize={0.096}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.03}
						maxWidth={2.2}
						lineHeight={1.45}
						color="#e2ecf8"
						anchorX="left"
						anchorY="top"
					>
						“ {PERSON_PROFILE.quote} ”
					</Text>
				</group>
			</group>

			{/* Soft Downward Grazing Light over Portrait Frame (Managed via ChapterLightRig) */}
		</group>
	)
}
