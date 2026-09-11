import { useState } from 'react'

// Touch capability, not viewport width, decides the control scheme: a narrowed
// desktop window must keep keyboard/mouse controls, while a touch device keeps
// its touch controls even in landscape/wide layouts.
function hasTouchCapability() {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

function useIsMobile() {
	const [isMobile] = useState(hasTouchCapability)
	return isMobile
}

export default useIsMobile
