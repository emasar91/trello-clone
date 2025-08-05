import { Box, Tabs, Tab, Typography } from '@mui/material'
import Slider from 'react-slick'
import { useRef, useState } from 'react'
import {
	CustomSliderContainerStyle,
	CustomSliderContentContainerStyle,
	CustomSliderImageContainerStyle,
	CustomSliderImageStyle,
	CustomSliderLeftItemsContainerColumnStyle,
	CustomSliderLeftItemsContainerStyle,
	CustomSliderLeftItemsDescriptionStyle,
	CustomSliderLeftItemsTitleStyle,
	CustomSliderTabsPanelStyle,
	CustomSliderTabStyle,
} from './CustomSlider.styles'

import React from 'react'

type Props = {
	showLeftItems: boolean
	items: {
		title: string
		desc: string
		image: string
	}[]
}

/**
 * A custom slider component for Section 2 of the home page.
 *
 * @param {object} props The component props.
 * @param {boolean} props.showLeftItems Whether to show the left items.
 * @param {array} props.items The items to display in the slider.
 * @param {string} props.items[].title The title of the item.
 * @param {string} props.items[].desc The description of the item.
 * @param {string} props.items[].image The image of the item.
 *
 * @returns A JSX element representing the custom slider component.
 */
export function CustomSlider({ showLeftItems, items }: Props) {
	const [isDragging, setIsDragging] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const sliderRef = useRef<Slider | null>(null)

	const internalSetActiveIndex = (index: number) => {
		setActiveIndex?.(index)
		sliderRef.current?.slickGoTo(index)
	}

	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_: number, next: number) => {
			setActiveIndex?.(next)
		},
	}

	return (
		<Box sx={CustomSliderContainerStyle}>
			{showLeftItems && (
				<Box sx={CustomSliderLeftItemsContainerColumnStyle}>
					{items.map((item, index) => (
						<Box
							key={item.title}
							onClick={() => internalSetActiveIndex(index)}
							sx={CustomSliderLeftItemsContainerStyle(activeIndex, index)}
						>
							<Typography
								variant="h6"
								sx={CustomSliderLeftItemsTitleStyle}
								color="rgb(9, 30, 66)"
							>
								{item.title}
							</Typography>
							<Typography
								component={'p'}
								sx={CustomSliderLeftItemsDescriptionStyle}
							>
								{item.desc}
							</Typography>
						</Box>
					))}
				</Box>
			)}

			<Box>
				<Box>
					<Tabs
						value={activeIndex}
						onChange={(_, newValue) => internalSetActiveIndex(newValue)}
						sx={CustomSliderTabsPanelStyle}
					>
						{items.map((item, index) => (
							<Tab
								key={item.title}
								aria-label={item.title}
								disableFocusRipple
								disableTouchRipple
								disableRipple
								sx={CustomSliderTabStyle(activeIndex, index)}
							/>
						))}
					</Tabs>
				</Box>

				<Box
					sx={CustomSliderContentContainerStyle(isDragging)}
					onMouseDown={() => setIsDragging(true)}
					onMouseUp={() => setIsDragging(false)}
					onMouseLeave={() => setIsDragging(false)}
				>
					<Slider ref={sliderRef} {...settings}>
						{items.map((item, index) => (
							<Box key={index} sx={CustomSliderImageContainerStyle}>
								<Box
									component="img"
									src={item.image}
									alt={item.title}
									sx={CustomSliderImageStyle}
								/>
							</Box>
						))}
					</Slider>
				</Box>
			</Box>
		</Box>
	)
}
