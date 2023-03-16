import { useQuery } from '@tanstack/react-query';
import { Container } from '@mantine/core';
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
		</Container>
	);
}

export default HomePage;
