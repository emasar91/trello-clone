import { Box, Typography, Tabs, Tab } from '@mui/material'
import Slider from 'react-slick'
import { useRef, useState } from 'react'

const items = [
	{
		title: 'Inbox',
		desc: 'When it’s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
		image: '/assets/inbox-slider.webp',
	},
	{
		title: 'Boards',
		desc: 'Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!”',
		image: '/assets/board-slider.webp',
	},
	{
		title: 'Planner',
		desc: 'Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.',
		image: '/assets/planner-slider.webp',
	},
]

export default function FeatureSlider() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const sliderRef = useRef<Slider | null>(null)

	const settings = {
		arrows: false,
		infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_: number, next: number) => setActiveIndex(next),
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				gap: 4,
			}}
		>
			{/* IZQUIERDA */}
			<Box
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 200 }}
			>
				{items.map((item, index) => (
					<Box
						key={item.title}
						onClick={() => {
							setActiveIndex(index)
							sliderRef.current?.slickGoTo(index)
						}}
						sx={{
							cursor: 'pointer',
							padding: '1rem 1rem 1rem 1.5rem',
							borderRadius: 2,
							boxShadow: activeIndex === index ? 4 : 0,
							borderLeft:
								activeIndex === index
									? '0.5rem solid #00c7e5'
									: '0.5rem solid transparent',
							transition: 'all 0.3s ease',
							bgcolor: '#fff',
						}}
					>
						<Typography
							variant="h6"
							sx={{ mb: '0.5rem', fontWeight: 600 }}
							color="rgb(9, 30, 66)"
						>
							{item.title}
						</Typography>
						<Typography
							component={'p'}
							sx={{ fontSize: '1rem', lineHeight: 1.5 }}
							color="rgb(9, 30, 66)"
						>
							{item.desc}
						</Typography>
					</Box>
				))}
			</Box>

			{/* DERECHA */}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: '1.5rem',
				}}
			>
				{/* TABS SUPERIORES */}
				<Box>
					<Tabs
						value={activeIndex}
						onChange={(_, newValue) => {
							setActiveIndex(newValue)
							sliderRef.current?.slickGoTo(newValue)
						}}
						sx={{
							'& .MuiTabs-indicator': {
								display: 'none',
							},
							'& .MuiTabs-scroller	': {
								height: '1rem',
							},
							minHeight: '0',
							marginLeft: 'auto',
							width: 'max-content',
						}}
					>
						{items.map((item, index) => (
							<Tab
								key={item.title}
								aria-label={item.title}
								disableFocusRipple
								disableTouchRipple
								disableRipple
								sx={{
									minWidth: activeIndex === index ? '60px' : '8px',
									width: activeIndex === index ? '60px' : '8px',
									height: '8px',
									minHeight: '8px',
									padding: 0,
									margin: '0px 4px !important',
									borderRadius: '6px',
									backgroundColor:
										activeIndex === index ? 'rgb(132,142,160)' : 'rgb(9,30,66)',
									color: 'transparent',
									transition: 'all 0.3s ease-in-out',
									'&:hover': {
										backgroundColor:
											activeIndex === index ? '#7A8599' : '#B0B0B0',
									},
									'& .MuiTab-wrapper': {
										display: 'none',
									},
									'&.Mui-selected': {
										color: 'transparent',
									},
								}}
							/>
						))}
					</Tabs>
				</Box>

				{/* SLIDER */}
				<Box
					sx={{
						width: '100%',
						maxWidth: 720,
						mx: 'auto',
						cursor: isDragging ? 'grabbing' : 'grab',
					}}
					onMouseDown={() => setIsDragging(true)}
					onMouseUp={() => setIsDragging(false)}
					onMouseLeave={() => setIsDragging(false)}
				>
					<Slider ref={sliderRef} {...settings}>
						{items.map((item, index) => (
							<Box key={index} sx={{ padding: '0 4px' }}>
								<Box
									component="img"
									src={item.image}
									alt={item.title}
									sx={{
										width: '100%',
										height: 'auto',
										borderRadius: 2,
										pointerEvents: 'none',
									}}
								/>
							</Box>
						))}
					</Slider>
				</Box>
			</Box>
		</Box>
	)
}
