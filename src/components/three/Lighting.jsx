function Lighting() {
	return (
		<>
			<ambientLight intensity={0.7} color="#7892b5" />
			<hemisphereLight skyColor="#3e79a8" groundColor="#11182b" intensity={1.2} />
			<directionalLight position={[-4, 7, 3]} intensity={2.4} color="#b6ddff" />
			<pointLight position={[3, 3, 5]} intensity={16} distance={14} color="#78d9ff" />
			<pointLight position={[-5, 2, 1]} intensity={14} distance={12} color="#7563ff" />
			<pointLight position={[0, 0.3, 5]} intensity={7} distance={9} color="#39c8e9" />
		</>
	)
}

export default Lighting
