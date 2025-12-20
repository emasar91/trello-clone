import React, { useState } from 'react'
import './BurguerIconMenu.css'

/**
 * BurguerIconMenu es un componente que renderiza un menu desplegable.
 * @returns {JSX.Element} - El componente BurguerIconMenu.
 */
const BurguerIconMenu = ({ onClick }: { onClick: () => void }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	/**
	 * Toggle the menu open state.
	 * @returns {void} - Nothing
	 */
	const handleOpen = () => {
		setIsMenuOpen(!isMenuOpen)
		onClick()
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
