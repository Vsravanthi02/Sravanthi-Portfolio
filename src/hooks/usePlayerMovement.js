import { useEffect, useRef } from 'react'

function usePlayerMovement({ enabled = true, isLocked = false, mobileInput = [0, 0], mobileLook = [0, 0] } = {}) {
	const keys = useRef({ w: false, a: false, s: false, d: false, shift: false })
	const lookDelta = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const handleKey = (event, value) => {
			const key = event.key.toLowerCase()
			if (key in keys.current || key === 'shift') keys.current[key] = value
		}
		const handleMove = (event) => {
			if (!enabled || !isLocked) return
			lookDelta.current.x += event.movementX
			lookDelta.current.y += event.movementY
		}
		const handleDown = (event) => handleKey(event, true)
		const handleUp = (event) => handleKey(event, false)
		document.addEventListener('keydown', handleDown)
		document.addEventListener('keyup', handleUp)
		document.addEventListener('mousemove', handleMove)
		return () => {
			document.removeEventListener('keydown', handleDown)
			document.removeEventListener('keyup', handleUp)
			document.removeEventListener('mousemove', handleMove)
		}
	}, [enabled, isLocked])

	return { keys, lookDelta, mobileInput, mobileLook }
}

export default usePlayerMovement