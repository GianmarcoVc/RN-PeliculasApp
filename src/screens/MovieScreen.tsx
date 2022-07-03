import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import Icon from '@expo/vector-icons/Ionicons';

import { urlImage } from '../api/movieDB';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { Loading, ModalVideo, MovieDetails } from '../components';

interface Props extends StackScreenProps<RootStackParams, 'MovieScreen'> {}

const MovieScreen = ({ navigation, route }: Props) => {
	const movie = route.params;
	const [openVideo, setOpenVideo] = useState(false);
	const { cast, trailerID, movieFull, similarMovies, isLoading } =
		useMovieDetails(movie.id);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<Image
					source={{ uri: urlImage(movie?.backdrop_path) }}
					style={styles.backImage}
				/>
				{/* Container Play Video */}
				<View style={styles.wrapperPlay}>
					{!!trailerID && (
						<TouchableOpacity
							activeOpacity={0.9}
							onPress={() => setOpenVideo(true)}
						>
							<Icon
								size={50}
								name='play-sharp'
								// color='#ffffffb5'
								color='#fff'
								style={styles.iconPlay}
							/>
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.principal}>
					<Image
						style={styles.posterMovie}
						source={{ uri: urlImage(movie.poster_path) }}
					/>
					<View style={styles.wrapperInformation}>
						<Text style={styles.titleMovie} numberOfLines={3}>
							{movie.title}
						</Text>
						{/* Wrapper Extra Information */}
						<View style={styles.flex}>
							<View style={styles.wrapperExtra}>
								<Icon size={15} color='#ccc' name='star-sharp' />
								<Text style={styles.textExtra}>{movie.vote_average}</Text>
							</View>
							<View style={styles.wrapperExtra}>
								<Icon size={15} color='#ccc' name='people-sharp' />
								<Text style={styles.textExtra}>{movie.vote_count}</Text>
							</View>
							<View style={styles.wrapperExtra}>
								<Icon size={15} color='#ccc' name='calendar-sharp' />
								<Text style={styles.textExtra}>{movie.release_date}</Text>
							</View>
						</View>
					</View>
				</View>
				{!!movie.overview && (
					<View style={styles.wrapperDescription}>
						<Text style={styles.title}>Historia</Text>
						<Text style={styles.textDescription}>{movie.overview}</Text>
					</View>
				)}
				{isLoading ? (
					<Loading size={50} />
				) : (
					<MovieDetails cast={cast} movie={movieFull} similar={similarMovies} />
				)}
			</ScrollView>
			<ModalVideo
				isOpen={openVideo}
				trailerID={trailerID}
				fcClose={setOpenVideo}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	// Backdroph Movie
	backImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: 250,
		width: '100%',
	},
	wrapperPlay: {
		height: 250,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0006',
	},
	iconPlay: {
		textShadowColor: '#363636ab',
		textShadowOffset: {
			height: 0,
			width: 0,
		},
		textShadowRadius: 5,
	},
	// Principal
	principal: {
		height: 110,
		flexDirection: 'row',
		marginHorizontal: 20,
	},
	posterMovie: {
		width: 130,
		bottom: 70,
		height: 180,
	},
	wrapperInformation: {
		flex: 1,
		paddingTop: 15,
		paddingLeft: 15,
	},
	titleMovie: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold',
		color: 'whitesmoke',
	},
	flex: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	wrapperExtra: {
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textExtra: {
		marginLeft: 5,
		marginRight: 15,
		color: '#ccc',
	},
	// Description
	wrapperDescription: {
		marginTop: 20,
		paddingBottom: 15,
		borderBottomWidth: 2,
		borderColor: '#cccccc7f',
		marginHorizontal: 20,
	},
	title: {
		fontSize: 18,
		marginBottom: 15,
		fontWeight: 'bold',
		color: 'whitesmoke',
	},
	textDescription: {
		fontSize: 16,
		color: '#bebebe',
		lineHeight: 23,
	},
});

export default MovieScreen;
