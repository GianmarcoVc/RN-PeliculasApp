import { useNavigation } from '@react-navigation/core';
import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { urlImage } from '../api/movieDB';
import { Collection } from '../interfaces/movieDBInterface';

const CollectionCard = ({ collection }: { collection: Collection }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.container}
			onPress={() =>
				navigation.navigate('CollectionScreen' as never, collection as never)
			}
		>
			<ImageBackground
				style={styles.background}
				source={{ uri: urlImage(collection.backdrop_path) }}
			/>
			<View style={styles.wrapper}>
				<Image
					style={styles.posterMovie}
					source={{ uri: urlImage(collection.poster_path) }}
				/>
				<Text style={styles.title}>{collection.name}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		overflow: 'hidden',
		marginTop: 25,
	},
	background: {
		flex: 1,
		height: 200,
	},
	wrapper: {
		height: 200,
		padding: 15,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#00000099',
	},
	posterMovie: {
		width: 120,
		height: 180,
		borderRadius: 5,
	},
	title: {
		maxWidth: 140,
		fontSize: 22,
		marginLeft: 20,
		color: 'whitesmoke',
		fontWeight: 'bold',
	},
});

export default CollectionCard;
