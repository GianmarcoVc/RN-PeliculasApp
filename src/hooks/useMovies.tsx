import { useState, useEffect } from 'react';
import apiDB from '../api/movieDB';
import { Movie, MoviesResponse } from '../interfaces/movieDBInterface';

interface MoviesState {
	nowPlaying: Movie[];
	topRated: Movie[];
	popular: Movie[];
	upcoming: Movie[];
}

export const useMovies = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [moviesState, setMoviesState] = useState<MoviesState>({
		nowPlaying: [],
		topRated: [],
		popular: [],
		upcoming: [],
	});

	const getMovies = async () => {
		const movieDB = apiDB('movie');

		const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
		const topRatedPromise = movieDB.get<MoviesResponse>('/top_rated');
		const popularPromise = movieDB.get<MoviesResponse>('/popular');
		const upcomingPromise = movieDB.get<MoviesResponse>('/upcoming');

		const res = await Promise.all([
			nowPlayingPromise,
			topRatedPromise,
			popularPromise,
			upcomingPromise,
		]);

		setMoviesState({
			nowPlaying: res[0].data.results,
			topRated: res[1].data.results,
			popular: res[2].data.results,
			upcoming: res[3].data.results,
		});

		setIsLoading(false);
	};

	useEffect(() => {
		getMovies();
	}, []);

	return { ...moviesState, isLoading };
};
