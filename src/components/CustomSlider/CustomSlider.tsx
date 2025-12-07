import { Box, Tabs, Tab, Typography, IconButton } from '@mui/material'
import Slider from 'react-slick'
import { useRef, useState } from 'react'
import {
	CustomSliderContainerStyle,
	CustomSliderContentContainerStyle,
	CustomSliderImageContainerStyle,
	CustomSliderImageStyle,
	CustomSliderLeftIconTabStyle,
	CustomSliderLeftItemsContainerColumnStyle,
	CustomSliderLeftItemsContainerStyle,
	CustomSliderLeftItemsDescriptionStyle,
	CustomSliderLeftItemsTitleStyle,
	CustomSliderRightIconTabStyle,
	CustomSliderTabsArrowPanelStyle,
	CustomSliderTabsPanelStyle,
	CustomSliderTabStyle,
} from './CustomSlider.styles'

import React from 'react'
import { useTranslations } from 'next-intl'
import { ArrowLeftIcon } from '@/public/assets/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
import { useWindowSize } from '@/hooks/useWindowsSize'

type Props = {
	showLeftItems: boolean
	items: { title: string }[]
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
	const sliderRefImages = useRef<Slider | null>(null)
	const sliderRefLeft = useRef<Slider | null>(null)
	const t = useTranslations(translate)

	const internalSetActiveIndex = (index: number) => {
		setActiveIndex(index)
		sliderRefImages.current?.slickGoTo(index)
		sliderRefLeft.current?.slickGoTo(index)
	}

	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_: number, next: number) => {
			setActiveIndex(next)
			sliderRefLeft.current?.slickGoTo(next)
			sliderRefImages.current?.slickGoTo(next)
		},
	}

	const width = useWindowSize()

	return (
		<Box sx={CustomSliderContainerStyle}>
			{showLeftItems &&
				(width !== null && width > 990 ? (
					<Box sx={CustomSliderLeftItemsContainerColumnStyle}>
						{items.map((item, index) => (
							<Box
								key={`item-${index}`}
								onClick={() => internalSetActiveIndex(index)}
								sx={CustomSliderLeftItemsContainerStyle(activeIndex, index)}
							>
								<Typography variant="h6" sx={CustomSliderLeftItemsTitleStyle}>
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
				) : (
					<Slider ref={sliderRefLeft} {...settings}>
						{items.map((item, index) => (
							<Box
								key={`item-${index}`}
								onClick={() => internalSetActiveIndex(index)}
								sx={CustomSliderLeftItemsContainerStyle(activeIndex, index)}
							>
								<Typography variant="h6" sx={CustomSliderLeftItemsTitleStyle}>
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
					</Slider>
				))}

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1.5rem',
					'@media (max-width: 990px)': {
						flexDirection: 'column-reverse',
						justifyContent: 'center',
						alignItems: 'center',
					},
				}}
			>
				<Box sx={{ display: 'flex', gap: '1.5rem' }}>
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

					{!showLeftItems && width !== null && width > 990 && (
						<Box sx={CustomSliderTabsArrowPanelStyle}>
							<IconButton
								onClick={() =>
									internalSetActiveIndex(
										activeIndex === 0 ? items.length - 1 : activeIndex - 1
									)
								}
								sx={CustomSliderLeftIconTabStyle}
								disableRipple
							>
								<ArrowLeftIcon />
							</IconButton>
							<IconButton
								onClick={() =>
									internalSetActiveIndex(
										activeIndex === items.length - 1 ? 0 : activeIndex + 1
									)
								}
								sx={CustomSliderRightIconTabStyle}
								disableRipple
							>
								<ArrowRightIcon />
							</IconButton>
						</Box>
					)}
				</Box>

				<Box
					sx={CustomSliderContentContainerStyle(isDragging, showLeftItems)}
					onMouseDown={() => setIsDragging(true)}
					onMouseUp={() => setIsDragging(false)}
					onMouseLeave={() => setIsDragging(false)}
				>
					<Slider ref={sliderRefImages} {...settings}>
						{items.map((item, index) => (
							<Box
								key={`index-${index}-${item.title}`}
								sx={CustomSliderImageContainerStyle}
							>
								<Box
									component="img"
									loading="lazy"
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
