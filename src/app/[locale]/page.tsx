import PageHome from '@/components/Pages/PageHome/PageHome'
import './globals.css'
import RedirectIfLoggedIn from '@/components/RedirectIfLoggedIn/RedirectIfLoggedIn'

const HomePage = () => {
	return (
		<RedirectIfLoggedIn>
			<PageHome />
		</RedirectIfLoggedIn>
	)
}

export default HomePage
