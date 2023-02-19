import { Container } from '@mantine/core';
import HeroSection from './components/hero/hero-section';
import FeaturesSection from './components/feature/feature-section';
import LastChanges from './components/feature/last-changes';
import FooterSection from '../../components/footer/footer-section';
import PublicHeader from '../../components/header/public-header';

function HomePage() {
	return (
		<Container size='lg'>
			<PublicHeader />
			<HeroSection />
			<FeaturesSection />
			<LastChanges />
			<FooterSection />
		</Container>
	);
}

export default HomePage;
