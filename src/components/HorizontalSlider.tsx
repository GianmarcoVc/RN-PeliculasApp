import { FlatList, StyleSheet, Text, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import { Movie } from '../interfaces/movieDBInterface';

interface Props {
	title?: string;
	movies?: Movie[];
}

const HorizontalSlider = ({ title, movies }: Props) => {
	return (
		<View style={{ marginTop: 10 }}>
			{title && <Text style={styles.title}>{title}</Text>}
			<FlatList
				data={movies}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => `${item.vote_count + item.id}`}
				renderItem={({ item: movie }: any) => (
					<MovieCard movie={movie} width={140} height={200} />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 21,
		color: '#ccc',
		fontWeight: '500',
		paddingLeft: 20,
		marginBottom: 15,
	},
});

export default HorizontalSlider;
