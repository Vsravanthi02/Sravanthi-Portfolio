import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

// With ACESFilmic tone mapping now on the Canvas renderer, the ToneMapping
// postprocessing effect is removed to avoid double-applying it. Bloom is
// tightened: higher threshold ensures only genuinely emissive surfaces (arch
// trim, crystal) catch it, not the broad HDRI sky. Vignette is softer since
// the HDRI itself provides natural edge darkening through its sky gradient.
function PostProcessing({ isMobile }) {
	if (isMobile) return null
	return (
		<EffectComposer multisampling={0}>
			<Bloom intensity={0.22} luminanceThreshold={0.75} luminanceSmoothing={0.3} mipmapBlur radius={0.55} />
			<Vignette eskil={false} offset={0.24} darkness={0.42} />
		</EffectComposer>
	)
}

export default PostProcessing
