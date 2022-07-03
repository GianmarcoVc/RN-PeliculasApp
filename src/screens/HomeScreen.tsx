import { useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Dimensions, ScrollView } from 'react-native';

import { useMovies } from '../hooks/useMovies';
import { Movie } from '../interfaces/movieDBInterface';
import {
	HeaderHome,
	Loading,
	CardCarousel,
	HorizontalSlider,
} from '../components';

const { width: screenWidth } = Dimensions.get('window');
interface Props extends StackScreenProps<any, any> {}

const HomeScreen = ({ navigation }: Props) => {
	const { nowPlaying, topRated, popular, upcoming, isLoading } = useMovies();

	useEffect(() => {
		navigation.setOptions({
			header: (props) => <HeaderHome {...props} />,
		});
	}, []);

	if (isLoading) {
		return <Loading size={60} />;
	}

	return (
		<ScrollView>
			<View style={{ marginBottom: 10 }}>
				<Carousel
					loop
					autoplay
					data={nowPlaying}
					inactiveSlideScale={1}
					autoplayInterval={4000}
					itemWidth={screenWidth}
					sliderWidth={screenWidth}
					loopClonesPerSide={nowPlaying.length - 1}
					keyExtractor={(item, index) => `${index}`}
					renderItem={({ item }: { item: Movie }) => (
						<CardCarousel movie={item} />
					)}
				/>
			</View>
			<HorizontalSlider title='Populares' movies={popular} />
			<HorizontalSlider title='Mejor Valorados' movies={topRated} />
			<HorizontalSlider title='Próximos Estrenos' movies={upcoming} />
		</ScrollView>
	);
};

export default HomeScreen;
