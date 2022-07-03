import { useState, useEffect } from 'react';
import { search } from '../api/movieDB';
import { Movie, MoviesResponse } from '../interfaces/movieDBInterface';

interface SearchState {
	results: Movie[];
	isLoading: boolean;
}

export const useSearch = (query: string) => {
	const [searchDetails, setResults] = useState<SearchState>({
		results: [],
		isLoading: false,
	});

	const getMovies = async () => {
		setResults({ ...searchDetails, isLoading: true });

		const { data } = await search(query).get<MoviesResponse>('');

		setResults({
			results: data.results,
			isLoading: false,
		});
	};

	useEffect(() => {
		query.length && getMovies();
	}, [query]);

	return searchDetails;
};
