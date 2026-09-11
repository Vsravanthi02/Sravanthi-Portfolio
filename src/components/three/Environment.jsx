import { useMemo } from 'react'

const asteroidPositions = [[-9, 2.5, -8], [8, -1, -10], [10, 3, 4], [-10, 1, 6], [-7, 4, -16], [8, 5, -19]]

function Environment({ isMobile }) {
	const platformPoints = useMemo(() => isMobile ? 48 : 80, [isMobile])
	return (
		<group>
			<mesh rotation={[-Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[7, 7.4, 0.28, platformPoints]} />
				<meshStandardMaterial color="#253a55" metalness={0.82} roughness={0.36} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]}>
				<cylinderGeometry args={[7.28, 7.55, 0.22, platformPoints]} />
				<meshStandardMaterial color="#0c1728" metalness={0.9} roughness={0.42} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
				<cylinderGeometry args={[5.85, 5.85, 0.06, platformPoints]} />
				<meshStandardMaterial color="#152a43" metalness={0.9} roughness={0.28} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.19, 0]}>
				<cylinderGeometry args={[3.6, 3.6, 0.045, platformPoints]} />
				<meshStandardMaterial color="#203d59" metalness={0.85} roughness={0.3} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.235, 0]}>
				<cylinderGeometry args={[2.15, 2.15, 0.04, platformPoints]} />
				<meshStandardMaterial color="#294964" metalness={0.85} roughness={0.26} />
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
				<torusGeometry args={[6.35, 0.018, 8, platformPoints]} />
				<meshBasicMaterial color="#7ceaff" transparent opacity={0.9} />
			</mesh>
			{[2.8, 4.25, 5.6].map((radius) => (
				<mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]}>
					<torusGeometry args={[radius, 0.009, 6, platformPoints]} />
					<meshBasicMaterial color={radius === 4.25 ? '#9b87ff' : '#265d84'} transparent opacity={0.6} />
				</mesh>
			))}
			{[2.15, 3.6, 5.95].map((radius) => (
				<mesh key={`light-${radius}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.27, 0]}>
					<torusGeometry args={[radius, radius === 3.6 ? 0.025 : 0.014, 6, platformPoints]} />
					<meshBasicMaterial color={radius === 3.6 ? '#63dcff' : '#397594'} transparent opacity={radius === 3.6 ? 0.8 : 0.55} />
				</mesh>
			))}
			{Array.from({ length: 12 }, (_, index) => {
				const angle = (index / 12) * Math.PI * 2
				return <mesh key={`radial-${index}`} rotation={[-Math.PI / 2, 0, angle]} position={[0, 0.22, 0]}>
					<boxGeometry args={[0.018, 5.6, 0.012]} />
					<meshBasicMaterial color="#6da6c4" transparent opacity={0.35} />
				</mesh>
			})}
			{[[-6.4, 0, 0], [6.4, 0, 0], [0, 0, -6.4], [0, 0, 6.4]].map(([x, y, z], index) => (
				<mesh key={`edge-${index}`} position={[x, 0.45, z]}>
					<cylinderGeometry args={[0.16, 0.2, 0.7, 10]} />
					<meshStandardMaterial color="#31516d" emissive="#174b68" emissiveIntensity={0.7} metalness={0.8} />
				</mesh>
			))}
			{[[-5.6, 0, -4.3], [5.6, 0, -4.3], [-5.6, 0, 4.3], [5.6, 0, 4.3]].map(([x, y, z], index) => (
				<group key={index} position={[x, y, z]}>
					<mesh position={[0, 0.42, 0]}>
						<boxGeometry args={[0.35, 0.75, 0.35]} />
						<meshStandardMaterial color="#41617b" emissive="#164c69" emissiveIntensity={0.6} metalness={0.9} roughness={0.25} />
					</mesh>
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.83, 0]}>
						<torusGeometry args={[0.46, 0.018, 6, 20]} />
						<meshBasicMaterial color="#6be1ff" transparent opacity={0.8} />
					</mesh>
					<pointLight color="#6be1ff" intensity={1.2} distance={2.5} position={[0, 0.9, 0]} />
				</group>
			))}
			{[-1, 1].map((side) => <group key={`dock-${side}`} position={[side * 6.3, 0.18, 0]} rotation={[0, 0, side * 0.08]}>
				<mesh><boxGeometry args={[1.05, 0.12, 2.7]} /><meshStandardMaterial color="#304d68" metalness={0.88} roughness={0.28} /></mesh>
				<mesh position={[0, 0.08, 0]}><boxGeometry args={[0.7, 0.015, 2.1]} /><meshBasicMaterial color="#5fdcff" transparent opacity={0.6} /></mesh>
			</group>)}
			{asteroidPositions.map((position, index) => (
				<mesh key={index} position={position} scale={0.45 + index * 0.12} rotation={[0.3, index, 0.5]}>
					<icosahedronGeometry args={[1, 1]} />
					<meshStandardMaterial color="#1a2438" roughness={1} />
				</mesh>
			))}
			<group position={[-10, -1, -12]}>
				<mesh><sphereGeometry args={[2.2, 20, 14]} /><meshStandardMaterial color="#183151" emissive="#10233e" emissiveIntensity={0.4} roughness={0.8} /></mesh>
				<mesh rotation={[0.4, 0.2, 0]}><torusGeometry args={[2.55, 0.025, 8, 48]} /><meshBasicMaterial color="#4b8eb3" transparent opacity={0.35} /></mesh>
			</group>
			<group position={[11, 4, -16]}>
				<mesh><sphereGeometry args={[1.25, 16, 12]} /><meshStandardMaterial color="#332857" emissive="#432f7b" emissiveIntensity={0.45} roughness={0.82} /></mesh>
				<pointLight color="#826eff" intensity={4} distance={7} />
			</group>
			<group position={[0, 0, -8]}>
				{[-2.4, -1.2, 1.2, 2.4].map((x, index) => <mesh key={index} position={[x, 0.8 + (index % 2) * 0.25, 0]}><boxGeometry args={[0.5, 1.45 + (index % 2) * 0.45, 0.5]} /><meshStandardMaterial color="#28455f" emissive="#173b5c" emissiveIntensity={0.5} metalness={0.7} /></mesh>)}
			</group>
			<group position={[0, 5, -18]}>
				<mesh position={[-3, 0, 0]} scale={[3.4, 1.2, 1]}><sphereGeometry args={[1, 16, 10]} /><meshBasicMaterial color="#183c66" transparent opacity={0.035} /></mesh>
				<mesh position={[3, 1.3, 0]} scale={[2.6, 1, 1]}><sphereGeometry args={[1, 16, 10]} /><meshBasicMaterial color="#40306f" transparent opacity={0.028} /></mesh>
			</group>
		</group>
	)
}

export default Environment