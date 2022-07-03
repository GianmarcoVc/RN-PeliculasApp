import {
	FlatList,
	StyleSheet,
	Text,
	View,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieCard } from '../components';
import { useSearch } from '../hooks/useSearch';
import { Movie } from '../interfaces/movieDBInterface';

const SearchScreen = () => {
	const { top } = useSafeAreaInsets();
	const [keySearch, setKeySearch] = useState('');
	const { results, isLoading } = useSearch(keySearch);

	return (
		<View style={{ ...styles.container, marginTop: top + 80 }}>
			<View style={styles.wrapperTitle}>
				<Text style={styles.title}>Buscar Películas</Text>
				<Icon name='movie-open' size={30} color='white' />
			</View>
			<TextInput
				maxLength={30}
				autoFocus={true}
				value={keySearch}
				style={styles.inputText}
				keyboardType='web-search'
				selectionColor='#479cc4'
				onChangeText={setKeySearch}
				placeholder='Busca tu Pelicula Favorita'
			/>
			{!!keySearch.length && (
				<View style={styles.wrapperSubtitle}>
					<Text style={styles.subtitle}>{`Relacionados con ${keySearch}`}</Text>
					{isLoading && (
						<ActivityIndicator size={25} style={{ marginLeft: 10 }} />
					)}
				</View>
			)}
			{!!results.length && (
				<FlatList
					data={results}
					numColumns={2}
					contentContainerStyle={{
						alignItems: 'center',
					}}
					keyExtractor={(item) => `${item.vote_count + item.id}`}
					renderItem={({ item: movie }: { item: Movie }) => (
						<MovieCard movie={movie} />
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	wrapperTitle: {
		marginBottom: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
	},
	inputText: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginBottom: 30,
		backgroundColor: '#efefef',
		borderRadius: 5,
	},
	wrapperSubtitle: {
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	subtitle: {
		fontSize: 22,
		color: '#ccc',
		fontWeight: '500',
	},
});

export default SearchScreen;
