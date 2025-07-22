'use client'

import Image from 'next/image'
import React from 'react'
import ButtonLogin from '../Button/Button'
import TabsNavbar from '@/components/Navbar/components/TabsNavbar/TabsNavbar'

export default function NavBar() {
	return (
		<div className=" z-1300 w-full flex items-center justify-center hover:shadow-xl bg-white">
			<div className="flex w-full items-center  justify-between h-15 overflow-hidden pl-2 bg-white max-w-[1320]">
				<div className="flex items-center">
					<Image
						src="/assets/navbar.PNG"
						width={120}
						height={40}
						alt="Trelo clone"
					/>
					<div className="flex items-center">
						<TabsNavbar />
					</div>
				</div>
				<div>
					<ButtonLogin variant="text" text="login" />
					<ButtonLogin
						variant="contained"
						text="getFree"
						color="white"
						bgColor="rgb(0, 101, 255)"
						hoverColor="rgb(7, 71, 166)"
					/>
				</div>
			</div>
		</div>
	)
}
