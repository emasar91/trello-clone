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
import { useTranslations } from 'next-intl'
import { ISliderItem } from '@/types/slider'

type Props = {
	showLeftItems: boolean
	items: ISliderItem[]
	translate: string
}

/**
 * A custom slider component for Section 2 of the home page.
 *
 * @param {object} props The component props.
 * @param {boolean} props.showLeftItems Whether to show the left items.
 * @param {array} props.items The items to display in the slider.
 *
 * @returns A JSX element representing the custom slider component.
 */
export function CustomSlider({ showLeftItems, items, translate }: Props) {
	const [isDragging, setIsDragging] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const sliderRef = useRef<Slider | null>(null)
	const t = useTranslations(translate)

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
							key={`item-${index}`}
							onClick={() => internalSetActiveIndex(index)}
							sx={CustomSliderLeftItemsContainerStyle(activeIndex, index)}
						>
							<Typography
								variant="h6"
								sx={CustomSliderLeftItemsTitleStyle}
								color="rgb(9, 30, 66)"
							>
								{t(`${item.title}.title`)}
							</Typography>
							<Typography
								component={'p'}
								sx={CustomSliderLeftItemsDescriptionStyle}
							>
								{t(`${item.title}.description`)}
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
								key={t(`${item.title}.title`)}
								aria-label={t(`${item.title}.title`)}
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
									src={t(`${item.title}.image`)}
									alt={t(`${item.title}.title`)}
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
