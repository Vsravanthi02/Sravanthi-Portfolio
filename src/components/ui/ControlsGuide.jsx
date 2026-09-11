function ControlsGuide({ isMobile, cameraMode = 'THIRD_PERSON' }) {
	return (
		<div className="controls-guide">
			<p className="hud-kicker">{isMobile ? 'TOUCH MODE' : 'FIELD CONTROLS'}</p>
			<div className="control-row"><span className="key-group">{isMobile ? 'SWIPE' : 'W A S D'}</span><span>{isMobile ? 'Move' : 'Move'}</span></div>
			<div className="control-row"><span className="key-group">{isMobile ? 'DRAG' : 'MOUSE'}</span><span>Look around</span></div>
			{!isMobile && <div className="control-row"><span className="key-group">SHIFT</span><span>Sprint</span></div>}
			{!isMobile && <div className="control-row"><span className="key-group">V</span><span>{cameraMode === 'FIRST_PERSON' ? '3rd Person' : '1st Person'}</span></div>}
			<div className="control-row"><span className="key-group">{isMobile ? 'TAP' : 'E'}</span><span>Interact</span></div>
			{!isMobile && <div className="control-row"><span className="key-group">R</span><span>Reset zoom</span></div>}
			{!isMobile && <div className="control-row"><span className="key-group">ESC</span><span>Release mouse</span></div>}
		</div>
	)
}

export default ControlsGuide