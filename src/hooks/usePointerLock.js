import { useCallback, useEffect, useState } from 'react'

function usePointerLock() {
	const [isLocked, setIsLocked] = useState(false)

	useEffect(() => {
		const handleChange = () => setIsLocked(document.pointerLockElement !== null)
		document.addEventListener('pointerlockchange', handleChange)
		return () => document.removeEventListener('pointerlockchange', handleChange)
	}, [])

	const requestPointerLock = useCallback((element) => {
		if (element && document.pointerLockElement !== element) element.requestPointerLock()
	}, [])

	const exitPointerLock = useCallback(() => {
		if (document.pointerLockElement) document.exitPointerLock()
	}, [])

	return { isLocked, requestPointerLock, exitPointerLock }
}

export default usePointerLock