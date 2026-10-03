import { useEffect, useRef } from 'react'

function usePlayerMovement({ enabled = true, isLocked = false, mobileInput = [0, 0], mobileLook = [0, 0] } = {}) {
	const keys = useRef({ w: false, a: false, s: false, d: false, shift: false })
	const lookDelta = useRef({ x: 0, y: 0 })

	useEffect(() => {
		if (!enabled) {
			keys.current = { w: false, a: false, s: false, d: false, shift: false }
			return
		}
		const handleKey = (event, value) => {
			if (!enabled) return
			const key = event.key.toLowerCase()
			if (key in keys.current || key === 'shift') keys.current[key] = value
		}
		const handleMove = (event) => {
			if (!enabled || !isLocked) return
			lookDelta.current.x += event.movementX
			lookDelta.current.y += event.movementY
		}
		const handleBlur = () => {
			keys.current = { w: false, a: false, s: false, d: false, shift: false }
		}
		const handleDown = (event) => handleKey(event, true)
		const handleUp = (event) => handleKey(event, false)
		document.addEventListener('keydown', handleDown)
		document.addEventListener('keyup', handleUp)
		document.addEventListener('mousemove', handleMove)
		window.addEventListener('blur', handleBlur)
		return () => {
			keys.current = { w: false, a: false, s: false, d: false, shift: false }
			document.removeEventListener('keydown', handleDown)
			document.removeEventListener('keyup', handleUp)
			document.removeEventListener('mousemove', handleMove)
			window.removeEventListener('blur', handleBlur)
		}
	}, [enabled, isLocked])

	return { keys, lookDelta, mobileInput, mobileLook }
}

export default usePlayerMovement