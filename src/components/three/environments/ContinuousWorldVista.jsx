import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Photographic-Quality Cinematic Panoramic Golden-Hour World Vista.
// Matches primary visual benchmark media_1790162892176.jpg:
// - Global Celestial Sky: deep royal sapphire zenith, dusk violet transition, warm golden horizon,
//   natural directional wisps (NO procedural orange cloud blobs).
// - Portal Landscape Vista:
//     • Atmospheric perspective: 4 mountain ranges receding from dark foreground to hazy low-contrast distant peaks
//     • Setting sun nestled in mountain saddle with soft radial atmospheric glow (no harsh flares)
//     • Natural reflective lake/bay with organic, horizontal shimmering water ripples (NO straight glowing road)
//     • Subtle futuristic shoreline spires in atmospheric golden haze
//     • Dark evergreen threshold silhouettes framing the bottom of the portal
//     • Deep sapphire twilight in upper third ensuring crisp contrast for personal identity typography

function createGlobalSkyTexture() {
	const canvas = document.createElement('canvas')
	canvas.width = 2048
	canvas.height = 1024
	const ctx = canvas.getContext('2d')

	// 1. CELESTIAL SKY DOME (Smooth, continuous sunset gradient)
	// 1. CELESTIAL SKY DOME (Smooth, continuous sunset gradient)
	// y = 0 is zenith (+Y), y = 512 is horizon (Y = 0), y = 1024 is nadir (-Y)
	const grad = ctx.createLinearGradient(0, 0, 0, 1024)
	grad.addColorStop(0.00, '#060c18') // Deep midnight sapphire zenith
	grad.addColorStop(0.18, '#0e1834') // Twilight navy
	grad.addColorStop(0.30, '#1a2244') // Indigo blue
	grad.addColorStop(0.38, '#2e1e38') // Dusk mauve transition
	grad.addColorStop(0.44, '#562432') // Rose-plum twilight
	grad.addColorStop(0.47, '#8e3c20') // Warm sunset amber
	grad.addColorStop(0.49, '#d26a28') // Golden horizon glow (right at eye-level horizon!)
	grad.addColorStop(0.51, '#f09838') // Warmest horizon band
	grad.addColorStop(0.53, '#241624') // Mountain silhouette horizon
	grad.addColorStop(0.65, '#140e18') // Mid-mountain depth
	grad.addColorStop(1.00, '#060810') // Lower ground
	ctx.fillStyle = grad
	ctx.fillRect(0, 0, 2048, 1024)

	// 2. SUBTLE DIRECTIONAL SUNSET STRATUS
	const drawAtmosphericStrata = (y, h, colorStart, colorMid) => {
		const strGrad = ctx.createLinearGradient(0, y, 2048, y)
		strGrad.addColorStop(0.00, 'rgba(0,0,0,0)')
		strGrad.addColorStop(0.15, colorStart)
		strGrad.addColorStop(0.50, colorMid)
		strGrad.addColorStop(0.85, colorStart)
		strGrad.addColorStop(1.00, 'rgba(0,0,0,0)')
		ctx.fillStyle = strGrad
		ctx.fillRect(0, y, 2048, h)
	}

	drawAtmosphericStrata(455, 18, 'rgba(160, 60, 40, 0.15)', 'rgba(215, 110, 50, 0.22)')
	drawAtmosphericStrata(480, 14, 'rgba(180, 80, 45, 0.18)', 'rgba(235, 135, 65, 0.25)')
	drawAtmosphericStrata(500, 12, 'rgba(200, 100, 50, 0.20)', 'rgba(245, 155, 75, 0.28)')

	// 3. CONTINUOUS DISTANT MOUNTAIN HORIZON (Natural organic silhouette right at eye level)
	ctx.save()
	ctx.beginPath()
	ctx.moveTo(0, 1024)
	ctx.lineTo(0, 530)
	for (let x = 0; x <= 2048; x += 16) {
		const nx = x * 0.003
		const my = 518 + Math.sin(nx * 3) * 22 + Math.sin(nx * 7.5) * 12 + Math.cos(nx * 15) * 6
		ctx.lineTo(x, my)
	}
	ctx.lineTo(2048, 1024)
	ctx.closePath()
	const mtnGrad = ctx.createLinearGradient(0, 500, 0, 1024)
	mtnGrad.addColorStop(0.00, '#28182a')
	mtnGrad.addColorStop(0.30, '#1a101c')
	mtnGrad.addColorStop(1.00, '#060810')
	ctx.fillStyle = mtnGrad
	ctx.fill()

	// Soft golden rim along distant ridge
	ctx.lineWidth = 1.5
	ctx.strokeStyle = 'rgba(245, 165, 75, 0.40)'
	ctx.stroke()
	ctx.restore()

	const texture = new THREE.CanvasTexture(canvas)
	texture.generateMipmaps = true
	texture.minFilter = THREE.LinearMipmapLinearFilter
	texture.magFilter = THREE.LinearFilter
	texture.needsUpdate = true
	return texture
}

// Dedicated 2048x2048 high-resolution circular portal aperture landscape vista
function createPortalVistaTexture() {
	const canvas = document.createElement('canvas')
	canvas.width = 2048
	canvas.height = 2048
	const ctx = canvas.getContext('2d')

	// 1. SKY GRADIENT INSIDE PORTAL
	// Clear deep sapphire blue in upper 45% for supreme typography legibility
	const skyGrad = ctx.createLinearGradient(0, 0, 0, 1360)
	skyGrad.addColorStop(0.00, '#080f22') // Deep sapphire zenith
	skyGrad.addColorStop(0.25, '#0e1834') // Twilight navy (Name: Sravanthi Addagada zone)
	skyGrad.addColorStop(0.44, '#182246') // Indigo twilight (Role zone)
	skyGrad.addColorStop(0.58, '#2c1e38') // Dusk mauve transition
	skyGrad.addColorStop(0.70, '#58262a') // Rose plum
	skyGrad.addColorStop(0.80, '#923c1c') // Sunset amber
	skyGrad.addColorStop(0.90, '#c85e20') // Warm golden orange
	skyGrad.addColorStop(1.00, '#f28e2c') // Brilliant golden horizon
	ctx.fillStyle = skyGrad
	ctx.fillRect(0, 0, 2048, 1360)

	// Subtle atmospheric sunset strata on the horizon (framing, no blobs)
	for (let i = 0; i < 6; i++) {
		const sy = 1050 + i * 45
		const sGrad = ctx.createLinearGradient(0, sy, 2048, sy)
		sGrad.addColorStop(0.00, 'rgba(180, 80, 40, 0)')
		sGrad.addColorStop(0.25, 'rgba(220, 110, 50, 0.12)')
		sGrad.addColorStop(0.50, 'rgba(245, 140, 60, 0.18)')
		sGrad.addColorStop(0.75, 'rgba(220, 110, 50, 0.12)')
		sGrad.addColorStop(1.00, 'rgba(180, 80, 40, 0)')
		ctx.fillStyle = sGrad
		ctx.fillRect(0, sy, 2048, 20)
	}

	// 2. SETTING SUN & ATMOSPHERIC CORONA (Natural radial glow in mountain saddle)
	const sunGlow = ctx.createRadialGradient(1024, 1320, 6, 1024, 1320, 580)
	sunGlow.addColorStop(0.00, 'rgba(255, 255, 245, 1.0)') // Sun disc
	sunGlow.addColorStop(0.05, 'rgba(255, 242, 195, 0.95)')
	sunGlow.addColorStop(0.14, 'rgba(255, 205, 85, 0.75)') // Inner corona
	sunGlow.addColorStop(0.32, 'rgba(240, 120, 30, 0.45)') // Golden halo
	sunGlow.addColorStop(0.55, 'rgba(195, 65, 20, 0.18)')
	sunGlow.addColorStop(0.80, 'rgba(150, 40, 15, 0.05)')
	sunGlow.addColorStop(1.00, 'rgba(120, 25, 10, 0)')
	ctx.fillStyle = sunGlow
	ctx.fillRect(200, 750, 1648, 850)

	// 3. LAYERED MOUNTAIN RANGES WITH ATMOSPHERIC PERSPECTIVE
	// Helper to draw realistic mountain silhouettes using harmonic noise
	const drawMountainRange = (baseY, amp, freq, colorGrad, rimAlpha) => {
		ctx.save()
		ctx.beginPath()
		ctx.moveTo(0, 2048)
		ctx.lineTo(0, baseY)
		for (let x = 0; x <= 2048; x += 8) {
			const nx = x * freq
			// Combine multi-octave sine/cosine for authentic mountain ridgelines
			const elevation = Math.sin(nx * 1.5) * amp
				+ Math.cos(nx * 3.7) * (amp * 0.45)
				+ Math.sin(nx * 7.9) * (amp * 0.22)
				+ Math.cos(nx * 16.3) * (amp * 0.08)
			// Dip in the center (x=1024) to cradle the setting sun
			const centerDip = Math.exp(-Math.pow((x - 1024) / 380, 2)) * (amp * 0.55)
			ctx.lineTo(x, baseY + elevation + centerDip)
		}
		ctx.lineTo(2048, 2048)
		ctx.closePath()
		ctx.fillStyle = colorGrad
		ctx.fill()
		if (rimAlpha > 0) {
			ctx.lineWidth = 1.8
			ctx.strokeStyle = `rgba(255, 200, 100, ${rimAlpha})`
			ctx.stroke()
		}
		ctx.restore()
	}

	// Layer 4: Distant Mountain Peaks (Soft, low-contrast, hazy violet-taupe)
	const mtnGrad4 = ctx.createLinearGradient(0, 1140, 0, 1500)
	mtnGrad4.addColorStop(0.00, '#624858')
	mtnGrad4.addColorStop(0.40, '#4a3646')
	mtnGrad4.addColorStop(1.00, '#2c2030')
	drawMountainRange(1200, 70, 0.0022, mtnGrad4, 0.45)

	// Layer 3: Mid-Distant Mountain Ridge (Warm slate-plum)
	const mtnGrad3 = ctx.createLinearGradient(0, 1220, 0, 1600)
	mtnGrad3.addColorStop(0.00, '#483042')
	mtnGrad3.addColorStop(0.40, '#342232')
	mtnGrad3.addColorStop(1.00, '#1e1422')
	drawMountainRange(1270, 60, 0.0031, mtnGrad3, 0.38)

	// Layer 2: Midground Mountain Ridge (Darker, richer contrast)
	const mtnGrad2 = ctx.createLinearGradient(0, 1290, 0, 1700)
	mtnGrad2.addColorStop(0.00, '#2e1c2a')
	mtnGrad2.addColorStop(0.40, '#20141e')
	mtnGrad2.addColorStop(1.00, '#120c14')
	drawMountainRange(1335, 48, 0.0042, mtnGrad2, 0.30)

	// Layer 1: Near Shoreline Foothills (Deep silhouette)
	const mtnGrad1 = ctx.createLinearGradient(0, 1360, 0, 1800)
	mtnGrad1.addColorStop(0.00, '#1c1018')
	mtnGrad1.addColorStop(0.50, '#100a10')
	mtnGrad1.addColorStop(1.00, '#08060a')
	drawMountainRange(1390, 32, 0.0055, mtnGrad1, 0.20)

	// 4. TRANQUIL REFLECTIVE LAKE / BAY (y = 1420 to 2048)
	const lakeGrad = ctx.createLinearGradient(0, 1420, 0, 2048)
	lakeGrad.addColorStop(0.00, '#0a101c') // Deep navy at shoreline
	lakeGrad.addColorStop(0.35, '#0c1424')
	lakeGrad.addColorStop(0.70, '#0e182a')
	lakeGrad.addColorStop(1.00, '#060a12')
	ctx.fillStyle = lakeGrad
	ctx.fillRect(0, 1420, 2048, 628)

	// 5. NATURAL SUN REFLECTION ON WATER (Subtle, soft, organic — NO glowing road!)
	// Soft wide golden wash across the water surface
	const waterGlow = ctx.createRadialGradient(1024, 1420, 15, 1024, 1700, 480)
	waterGlow.addColorStop(0.00, 'rgba(255, 215, 120, 0.22)')
	waterGlow.addColorStop(0.20, 'rgba(245, 170, 70, 0.14)')
	waterGlow.addColorStop(0.50, 'rgba(215, 110, 40, 0.06)')
	waterGlow.addColorStop(0.80, 'rgba(160, 60, 20, 0.01)')
	waterGlow.addColorStop(1.00, 'rgba(100, 30, 10, 0)')
	ctx.fillStyle = waterGlow
	ctx.fillRect(0, 1420, 2048, 628)

	// Organic horizontal wave shimmer ripples (broken, varied widths, natural scattering)
	for (let y = 1425; y < 2040; y += 5) {
		const progress = (y - 1420) / 620
		// Ripple width expands naturally across the water
		const baseW = 120 + progress * 480
		// Small harmonic ripple variation across scanline
		const rippleCount = 3 + Math.floor(progress * 6)
		for (let r = 0; r < rippleCount; r++) {
			const xOffset = (Math.sin(y * 0.18 + r * 2.3) * 0.45) * baseW
			const rx = 1024 + xOffset
			const rw = (18 + Math.cos(y * 0.3 + r) * 12) * (1 + progress * 0.8)
			const alpha = (0.28 - progress * 0.18) * (0.6 + Math.sin(y * 0.5 + r * 1.8) * 0.4)
			if (alpha > 0.02) {
				ctx.fillStyle = `rgba(255, 225, 140, ${alpha})`
				ctx.fillRect(rx - rw / 2, y, rw, 1.8)
			}
		}
	}

	// 6. SUBTLE FUTURISTIC SHORELINE SKYLINE (Spires in warm atmospheric mist)
	const drawShorelineSpires = (startX, groundY, spires) => {
		ctx.save()
		spires.forEach(([dx, w, h]) => {
			const sx = startX + dx
			const sy = groundY - h
			// Semi-transparent atmospheric silhouette
			ctx.fillStyle = '#14101a'
			ctx.fillRect(sx, sy, w, h)
			// Delicate spire needle
			ctx.fillRect(sx + w / 2 - 0.75, sy - 8, 1.5, 8)
			// Tiny warm window beacon
			ctx.fillStyle = 'rgba(255, 200, 110, 0.45)'
			ctx.fillRect(sx + w / 2 - 1, sy + 4, 2, 2)
		})
		ctx.restore()
	}

	drawShorelineSpires(480, 1445, [
		[0, 12, 45], [16, 16, 75], [36, 14, 58], [54, 20, 110], [78, 12, 52], [94, 15, 70], [114, 10, 36],
	])
	drawShorelineSpires(1420, 1445, [
		[0, 11, 40], [15, 16, 72], [35, 13, 54], [52, 22, 118], [78, 15, 80], [98, 12, 48], [114, 16, 62],
	])

	// 7. SILHOUETTED EVERGREEN PINE THRESHOLD (Framing the bottom circular rim)
	ctx.save()
	ctx.fillStyle = '#060a08'
	for (let x = 40; x < 2008; x += 22) {
		const treeH = 45 + Math.sin(x * 0.06) * 20 + Math.cos(x * 0.14) * 8
		ctx.beginPath()
		ctx.moveTo(x - 14, 2048)
		ctx.lineTo(x, 2048 - treeH)
		ctx.lineTo(x + 14, 2048)
		ctx.fill()
	}
	ctx.restore()

	const texture = new THREE.CanvasTexture(canvas)
	texture.generateMipmaps = true
	texture.minFilter = THREE.LinearMipmapLinearFilter
	texture.magFilter = THREE.LinearFilter
	texture.needsUpdate = true
	return texture
}

function ContinuousWorldVista({ archRadius = 5.2, archZ = 9.5 }) {
	const globalSky = useMemo(() => createGlobalSkyTexture(), [])
	const portalVista = useMemo(() => createPortalVistaTexture(), [])
	const apertureMeshRef = useRef()

	// Portal aperture plane dimensions (placed behind the spatial tunnel exit)
	const planeW = archRadius * 2.35
	const planeH = archRadius * 2.35
	const planeZ = archZ + 2.6
	const planeCY = archRadius * 1.05

	// Smoothly fade out the 2D aperture vista plane as the player walks forward
	// towards the portal (z > 3.8m -> 6.5m), revealing the continuous 360-degree
	// celestial sky sphere and monumental colonnade of The Build without any plane clipping.
	useFrame(({ camera }) => {
		if (!apertureMeshRef.current) return
		const cz = camera.position.z
		if (cz <= 3.8) {
			apertureMeshRef.current.visible = true
			apertureMeshRef.current.material.opacity = 1.0
		} else if (cz >= 6.5) {
			apertureMeshRef.current.visible = false
			apertureMeshRef.current.material.opacity = 0.0
		} else {
			apertureMeshRef.current.visible = true
			const fade = 1.0 - (cz - 3.8) / 2.7
			apertureMeshRef.current.material.opacity = THREE.MathUtils.clamp(fade, 0, 1)
		}
	})

	return (
		<group position={[0, 0, 0]} userData={{ cameraIgnore: true }}>
			{/* 1. SEAMLESS CELESTIAL SKY SPHERE (130 units radius) */}
			<mesh position={[0, 3.0, 0]}>
				<sphereGeometry args={[130, 48, 32]} />
				<meshBasicMaterial map={globalSky} side={THREE.BackSide} toneMapped={false} fog={false} />
			</mesh>

			{/* 2. DEDICATED HIGH-RESOLUTION PORTAL APERTURE VISTA */}
			<mesh ref={apertureMeshRef} position={[0, planeCY, planeZ]} rotation={[0, Math.PI, 0]}>
				<planeGeometry args={[planeW, planeH]} />
				<meshBasicMaterial map={portalVista} side={THREE.DoubleSide} transparent opacity={1.0} toneMapped={false} fog={false} />
			</mesh>
		</group>
	)
}

export default ContinuousWorldVista
