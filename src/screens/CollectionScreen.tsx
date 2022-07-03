import {
	Image,
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	ImageBackground,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import { useCollectionDetails } from '../hooks/useCollectionDetails';
import { HorizontalSlider } from '../components';
import { urlImage } from '../api/movieDB';

interface Props extends StackScreenProps<RootStackParams, 'CollectionScreen'> {}

const CollectionScreen = ({ navigation, route }: Props) => {
	const collection = route.params;
	const { collectionFull, isLoading } = useCollectionDetails(collection.id);

	return (
		<ImageBackground
			style={{ flex: 1 }}
			source={{ uri: urlImage(collection?.backdrop_path) }}
		>
			{/* Collection Information */}
			<View style={styles.container}>
				<Image
					style={styles.posterMovie}
					source={{ uri: urlImage(collection?.poster_path) }}
				/>
				<Text style={styles.title}>{collection.name}</Text>

				{isLoading ? (
					<ActivityIndicator style={{ marginTop: 30 }} size={50} />
				) : (
					<>
						<Text style={styles.description} numberOfLines={5}>
							{collectionFull?.overview}
						</Text>
						<View style={{ maxHeight: 270 }}>
							<HorizontalSlider
								title='Películas'
								movies={collectionFull?.parts}
							/>
						</View>
					</>
				)}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000d1',
	},
	posterMovie: {
		width: 200,
		height: 310,
		borderRadius: 5,
	},
	title: {
		fontSize: 22,
		color: 'white',
		marginTop: 20,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	description: {
		marginBottom: 10,
		lineHeight: 23,
		fontSize: 16,
		maxWidth: '90%',
		color: '#ccc',
		textAlign: 'justify',
		overflow: 'scroll',
	},
});

export default CollectionScreen;
