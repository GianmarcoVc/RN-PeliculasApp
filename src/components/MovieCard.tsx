import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Movie } from '../interfaces/movieDBInterface';
import { urlImage } from '../api/movieDB';
import { useNavigation } from '@react-navigation/native';

interface Props {
	movie: Movie;
	width?: number;
	height?: number;
	carousel?: boolean;
}

const MovieCard = ({
	movie,
	width = 140,
	height = 200,
	carousel = false,
}: Props) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={{
				...styles.container,
				width,
				height,
				marginLeft: carousel ? 0 : 20,
			}}
			activeOpacity={0.8}
			onPress={() =>
				navigation.navigate('MovieScreen' as never, movie as never)
			}
		>
			{!movie.poster_path ? (
				<View style={styles.wrapperPosterAlt}>
					<Text style={styles.titlePoster}>{movie.title}</Text>
				</View>
			) : (
				<Image
					style={styles.posterImage}
					source={{ uri: urlImage(movie.poster_path) }}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		marginBottom: 20,
	},
	wrapperPosterAlt: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#070707',
	},
	titlePoster: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
	},
	posterImage: {
		flex: 1,
		borderRadius: 10,
	},
});

export default MovieCard;
