import { useQuery } from '@tanstack/react-query';
import { Container } from '@mantine/core';
import Footer from 'src/components/Footer/Footer';
import Header from '../../components/Header/Header';
import { getStats } from './API';
import HeroSection from './components/HeroSection/HeroSection';
import ImportantNote from './components/ImportantNote/ImportantNote';
import FeaturesSection from './components/FeaturesSection';
import LastChanges from './components/LastChanges';

function HomePage() {
  const { data: stats } = useQuery({
    queryKey: ['appStats'],
    queryFn: getStats,
  });

  return (
    <Container size="lg">
      <Header />
      <HeroSection stats={stats} />
      <ImportantNote />
      <FeaturesSection stats={stats} />
      <LastChanges />
      <Footer />
    </Container>
  );
}

export default HomePage;
