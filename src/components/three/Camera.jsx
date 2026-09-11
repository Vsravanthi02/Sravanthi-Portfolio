import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function Camera() {
	const { camera } = useThree()

	useEffect(() => {
		camera.lookAt(0, 0, 0)
	}, [camera])

	return null
}

export default Camera
