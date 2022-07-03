import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/MaterialIcons';

import { urlImage } from '../api/movieDB';
import { Movie } from '../interfaces/movieDBInterface';

import { RootStackParams } from '../navigation/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const CardCarousel = ({ movie }: { movie: Movie }) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

	return (
		<View style={{ height: 600 }}>
			<ImageBackground
				resizeMode='cover'
				style={{ flex: 1 }}
				source={{ uri: urlImage(movie.poster_path) }}
			/>
			<LinearGradient
				style={styles.container}
				colors={['transparent', '#141414']}
			>
				{/* Contenido */}
				<View style={styles.wrapper}>
					{/* Informacion */}
					<View style={{ flex: 0.9 }}>
						<Text style={styles.title}>{movie.title}</Text>
						<View style={styles.wrapperInformation}>
							<View style={styles.wrapperExtra}>
								<Icon size={18} color='#ccc' name='star' />
								<Text style={styles.textExtra}>{movie.vote_average}</Text>
							</View>
							<View style={styles.wrapperExtra}>
								<Icon size={18} color='#ccc' name='people' />
								<Text style={styles.textExtra}>{movie.vote_count}</Text>
							</View>
						</View>
					</View>
					{/* Icon */}
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => navigation.navigate('MovieScreen', movie)}
					>
						<Icon name='play-circle-outline' size={60} color='#ccc' />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 3,
		justifyContent: 'flex-end',
	},
	wrapper: {
		padding: 20,
		paddingBottom: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 25,
		fontWeight: '600',
		color: 'whitesmoke',
		marginBottom: 15,
	},
	wrapperInformation: {
		flexDirection: 'row',
	},
	wrapperExtra: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textExtra: {
		marginLeft: 5,
		marginRight: 15,
		color: '#ccc',
		fontSize: 16,
	},
});

export default CardCarousel;
