import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useInteraction from '../../hooks/useInteraction'

function InteractionSystem({ playerPositionRef, targets, enabled, onNearby, onInteract }) {
	const [position, setPosition] = useState([0, 0, 0])
	const nearby = useInteraction({ playerPosition: position, targets, enabled, onInteract })

	useEffect(() => onNearby?.(nearby), [nearby, onNearby])

	useFrame((state) => {
		if (state.clock.elapsedTime % 0.08 < 0.02) setPosition([...playerPositionRef.current])
	})

	return null
}

export default InteractionSystem