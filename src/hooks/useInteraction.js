import { useEffect, useMemo, useState } from 'react'

function useInteraction({ playerPosition, targets = [], enabled = true, distance = 1.8, onInteract }) {
	const [nearby, setNearby] = useState(null)
	const nearest = useMemo(() => {
		if (!enabled) return null
		let closest = null
		let closestDistance = distance
		for (const target of targets) {
			const dx = playerPosition[0] - target.position[0]
			const dz = playerPosition[2] - target.position[2]
			const nextDistance = Math.sqrt(dx * dx + dz * dz)
			if (nextDistance < closestDistance) {
				closest = target
				closestDistance = nextDistance
			}
		}
		return closest
	}, [distance, enabled, playerPosition, targets])

	useEffect(() => setNearby(nearest), [nearest])

	useEffect(() => {
		const handleKey = (event) => {
			if (event.key.toLowerCase() === 'e' && nearby) onInteract?.(nearby)
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [nearby, onInteract])

	return nearby
}

export default useInteraction