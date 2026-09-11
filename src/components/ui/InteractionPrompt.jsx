function InteractionPrompt({ target, onInteract }) {
	if (!target) return null
	return (
		<button className="interaction-prompt" type="button" onClick={() => onInteract?.(target)}>
			<span className="interaction-key">E</span>
			<span><strong>{target.label}</strong><small>INTERACT</small></span>
		</button>
	)
}

export default InteractionPrompt