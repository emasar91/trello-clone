import React, { useState } from 'react'
import './BurguerIconMenu.css'

const BurguerIconMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleOpen = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<button
			className={`menu ${isMenuOpen ? 'open' : ''}`}
			onClick={handleOpen}
			aria-expanded={isMenuOpen}
			aria-label="Toggle menu"
		>
			<span className="bar bar1" />
			<span className="bar bar2" />
			<span className="bar bar3" />
		</button>
	)
}

export default BurguerIconMenu
