'use client'
import CustomModal from '@/components/CustomModal/CustomModal'
import PageContainer from '@/components/pageContainer/PageContainer'
import VideoBox from '@/components/VideoBox/VideoBox'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
import Section3 from './components/Section3/Section3'
import Section4 from './components/Section4/Section4'
import Section5 from './components/Section5/Section5'
import { colorsLanding } from '@/constants'

/**
 * PageHome es el componente principal de la pagina de inicio.
 * Contiene las secciones 1, 2, 3, 4 y 5.
 * Seccion 1 contiene la seccion hero con un video como fondo.
 * Seccion 2 contiene la seccion de caracteristicas con un titulo, un subtitulo y una llamada a la accion.
 * Seccion 3 contiene la seccion de testimonios con un titulo, un subtitulo y una llamada a la accion.
 * Seccion 4 contiene la seccion de contacto con un titulo, un subtitulo y una llamada a la accion.
 * Seccion 5 contiene la seccion de contacto con un titulo, un subtitulo y una llamada a la accion.
 */
const PageHome = () => {
	return (
		<>
			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection1}>
				<Section1 />

				<CustomModal
					styles={{ width: '720px', height: 'auto', maxWidth: '80%' }}
				>
					<VideoBox VideoSrc="/assets/video/VideoTrello.mp4" />
				</CustomModal>
			</PageContainer>

			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection2}>
				<Section2 />
			</PageContainer>

			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection3}>
				<Section3 />
			</PageContainer>

			<PageContainer
				backgroundColor={colorsLanding.homePageBackgroundSection4}
				margin="-175px 0 0 0"
			>
				<Section4 />
			</PageContainer>

			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection5}>
				<Section5 />
			</PageContainer>
		</>
	)
}

export default PageHome
