import { useQuery } from '@tanstack/react-query';
import { Container } from '@mantine/core';
import CookieConsent from 'react-cookie-consent';
import HeroSection from './components/hero/hero-section';
import FeaturesSection from './components/feature/feature-section';
import LastChanges from './components/feature/last-changes';
import FooterSection from '../../components/footer/footer-section';
import PublicHeader from '../../components/header/public-header';
import { getStats } from '../../shared/api';

function HomePage() {
	const { data: stats } = useQuery(['appStats'], () => getStats());

	return (
		<Container size='lg'>
			<PublicHeader />
			<HeroSection stats={stats} />
			<FeaturesSection stats={stats} />
			<LastChanges />
			<FooterSection />
			<CookieConsent
				location='bottom'
				buttonText='Я согласен'
				cookieName='CeCorporaCookie'
				style={{ background: '#2B373B' }}
				buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
				expires={150}>
				Этот сайт использует файлы cookie для улучшения работы сайта и его контента. Так же мы
				используем сторонние сервисы, которые могут собирать информацию о вас. Продолжая
				использовать сайт, вы соглашаетесь с использованием файлов cookie и сторонних сервисов.
			</CookieConsent>
		</Container>
	);
}

export default HomePage;
