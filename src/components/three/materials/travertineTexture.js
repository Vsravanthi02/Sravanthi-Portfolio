import * as THREE from 'three'

// Photorealistic Procedural Roman Travertine Limestone Material Generator.
// Accurately replicates high-end architectural visualization travertine:
// - Authentic warm sand/beige base tones (#dcd3c2 to #c2b59f)
// - Delicate horizontal sedimentary strata and natural mineral veining
// - Large-scale coursed ashlar masonry seams with subtle recessed mortar joints
// - Natural tactile surface relief and micro-pores without excessive noise
let cachedTravertine = null

export function getTravertineMaterials() {
	if (cachedTravertine) return cachedTravertine

	const width = 1024
	const height = 1024

	// 1. ALBEDO MAP: Honed Roman Travertine Limestone
	const albedoCanvas = document.createElement('canvas')
	albedoCanvas.width = width
	albedoCanvas.height = height
	const actx = albedoCanvas.getContext('2d')

	// Warm natural limestone base gradient
	const baseGrad = actx.createLinearGradient(0, 0, 0, height)
	baseGrad.addColorStop(0.00, '#d2ccc1') // Neutral warm limestone
	baseGrad.addColorStop(0.35, '#c7c1b6')
	baseGrad.addColorStop(0.70, '#beb8ad')
	baseGrad.addColorStop(1.00, '#b8b2a7')
	actx.fillStyle = baseGrad
	actx.fillRect(0, 0, width, height)

	// Natural horizontal sedimentary stratification (fine, organic)
	for (let y = 0; y < height; y += 2) {
		const noise = Math.sin(y * 0.03) * Math.cos(y * 0.01) + Math.sin(y * 0.075) * 0.25
		const alpha = 0.02 + Math.abs(noise) * 0.03
		actx.fillStyle = noise > 0 ? `rgba(252, 248, 240, ${alpha})` : `rgba(155, 140, 120, ${alpha * 1.2})`
		actx.fillRect(0, y, width, 2)
	}

	// Soft stone cloud mottling (natural mineral density shifts)
	for (let i = 0; i < 50; i++) {
		const cx = Math.random() * width
		const cy = Math.random() * height
		const rx = 80 + Math.random() * 160
		const ry = 30 + Math.random() * 50
		const alpha = 0.02 + Math.random() * 0.03
		actx.save()
		actx.beginPath()
		actx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
		actx.fillStyle = i % 2 === 0 ? `rgba(255, 252, 246, ${alpha})` : `rgba(168, 150, 128, ${alpha})`
		actx.filter = 'blur(14px)'
		actx.fill()
		actx.restore()
	}

	// Large-scale coursed ashlar block seams (clean, high-end masonry)
	const blockH = 128
	const blockW = 256

	for (let y = 0; y < height; y += blockH) {
		const row = Math.floor(y / blockH)
		const offset = (row % 2) * (blockW / 2)

		// Horizontal joint: soft highlight on bottom edge, subtle shadow in joint
		actx.fillStyle = 'rgba(255, 252, 244, 0.12)'
		actx.fillRect(0, y + 1.5, width, 1.5)
		actx.fillStyle = 'rgba(95, 82, 68, 0.22)'
		actx.fillRect(0, y, width, 1.5)

		// Vertical joints
		for (let x = -blockW; x <= width + blockW; x += blockW) {
			const bx = x + offset
			actx.fillStyle = 'rgba(255, 252, 244, 0.10)'
			actx.fillRect(bx + 1.5, y, 1.5, blockH)
			actx.fillStyle = 'rgba(95, 82, 68, 0.22)'
			actx.fillRect(bx, y, 1.5, blockH)
		}
	}

	// Fine natural stone pitting & pores (subtle, high-end)
	for (let i = 0; i < 3500; i++) {
		const px = Math.random() * width
		const py = Math.random() * height
		const pw = 1 + Math.random() * 2
		const ph = 1 + Math.random() * 1.5
		const pAlpha = 0.025 + Math.random() * 0.04
		actx.fillStyle = `rgba(110, 95, 78, ${pAlpha})`
		actx.fillRect(px, py, pw, ph)
	}

	const albedoTexture = new THREE.CanvasTexture(albedoCanvas)
	albedoTexture.wrapS = THREE.RepeatWrapping
	albedoTexture.wrapT = THREE.RepeatWrapping
	albedoTexture.repeat.set(1, 1)
	albedoTexture.needsUpdate = true

	// 2. BUMP / RELIEF MAP (Tactile stone relief & joint depth)
	const bumpCanvas = document.createElement('canvas')
	bumpCanvas.width = 512
	bumpCanvas.height = 512
	const bctx = bumpCanvas.getContext('2d')
	bctx.fillStyle = '#808080'
	bctx.fillRect(0, 0, 512, 512)

	// Horizontal micro-grooves
	for (let y = 0; y < 512; y += 4) {
		const val = Math.floor(128 + Math.sin(y * 0.08) * 6)
		bctx.fillStyle = `rgb(${val}, ${val}, ${val})`
		bctx.fillRect(0, y, 512, 2)
	}

	// Ashlar joint indentations in bump map
	const bBlockH = 64
	const bBlockW = 128
	bctx.fillStyle = '#555555'
	for (let y = 0; y < 512; y += bBlockH) {
		bctx.fillRect(0, y, 512, 1.5)
		const row = Math.floor(y / bBlockH)
		const offset = (row % 2) * (bBlockW / 2)
		for (let x = -bBlockW; x <= 512 + bBlockW; x += bBlockW) {
			bctx.fillRect(x + offset, y, 1.5, bBlockH)
		}
	}

	const bumpTexture = new THREE.CanvasTexture(bumpCanvas)
	bumpTexture.wrapS = THREE.RepeatWrapping
	bumpTexture.wrapT = THREE.RepeatWrapping
	bumpTexture.repeat.set(1, 1)
	bumpTexture.needsUpdate = true

	// 3. WET HONED STONE PAVING FOR THE PLAZA
	const plazaCanvas = document.createElement('canvas')
	plazaCanvas.width = 1024
	plazaCanvas.height = 1024
	const pctx = plazaCanvas.getContext('2d')

	// Dark slate/charcoal base with wet stone tonal shifts
	pctx.fillStyle = '#10151e'
	pctx.fillRect(0, 0, width, height)

	// Large format architectural paver joints (clean rectilinear slabs)
	const slabW = 256
	const slabH = 128
	for (let y = 0; y < height; y += slabH) {
		const row = y / slabH
		const xOffset = (row % 2) * (slabW / 2)
		for (let x = -slabW; x < width + slabW; x += slabW) {
			const rx = x + xOffset
			const shade = Math.floor(Math.sin(rx * 0.04 + y * 0.02) * 4)
			pctx.fillStyle = `rgb(${16 + shade}, ${21 + shade}, ${30 + shade})`
			pctx.fillRect(rx + 1.5, y + 1.5, slabW - 3, slabH - 3)

			// Subtle surface wetness variation
			pctx.fillStyle = 'rgba(255, 255, 255, 0.015)'
			pctx.fillRect(rx + 4, y + 4, slabW - 8, slabH - 8)
		}
	}

	// Refined dark joint lines
	pctx.strokeStyle = '#060a10'
	pctx.lineWidth = 2.5
	for (let y = 0; y <= height; y += slabH) {
		pctx.beginPath()
		pctx.moveTo(0, y)
		pctx.lineTo(width, y)
		pctx.stroke()
	}
	for (let y = 0; y < height; y += slabH) {
		const row = y / slabH
		const xOffset = (row % 2) * (slabW / 2)
		for (let x = -slabW; x < width + slabW; x += slabW) {
			const rx = x + xOffset
			pctx.beginPath()
			pctx.moveTo(rx, y)
			pctx.lineTo(rx, y + slabH)
			pctx.stroke()
		}
	}

	const plazaTexture = new THREE.CanvasTexture(plazaCanvas)
	plazaTexture.wrapS = THREE.RepeatWrapping
	plazaTexture.wrapT = THREE.RepeatWrapping
	plazaTexture.repeat.set(3, 3)
	plazaTexture.needsUpdate = true

	cachedTravertine = {
		albedo: albedoTexture,
		bump: bumpTexture,
		plaza: plazaTexture,
	}

	return cachedTravertine
}
