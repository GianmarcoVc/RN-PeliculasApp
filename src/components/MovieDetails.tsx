import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../interfaces/creditsInterface';
import { Movie, MovieFull } from '../interfaces/movieDBInterface';
import ActorCard from './ActorCard';
import CollectionCard from './CollectionCard';
import HorizontalSlider from './HorizontalSlider';

interface DetailsProps {
	cast: Cast[];
	movie?: MovieFull | null;
	similar: Movie[];
}

const MovieDetails = ({ cast, movie, similar }: DetailsProps) => {
	return (
		<>
			<View style={{ paddingHorizontal: 20 }}>
				{/* Lista de Actores */}
				<Text style={{ ...styles.title, marginTop: 20 }}>Elenco</Text>
				<FlatList
					data={cast}
					horizontal={true}
					style={{ marginBottom: 10 }}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => `${item.cast_id}${item.id}`}
					renderItem={({ item }) => <ActorCard actor={item} />}
				/>
				{/* Coleccion */}
				{movie?.belongs_to_collection && (
					<CollectionCard collection={movie.belongs_to_collection} />
				)}
			</View>
			<HorizontalSlider title='Similares' movies={similar} />
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		marginBottom: 15,
		fontWeight: 'bold',
		color: 'whitesmoke',
	},
});

export default MovieDetails;
