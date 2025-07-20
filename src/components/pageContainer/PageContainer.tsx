import React from 'react'

type Props = {
	children: React.ReactNode
}

const PageContainer = ({ children }: Props) => {
	return (
		<div className="bg-slate-400 w-full h-full flex flex-col justify-center items-center">
			<div className="w-full max-w-[1140] flex flex-col justify-center align-middle">
				{children}
			</div>
		</div>
	)
}

export default PageContainer
