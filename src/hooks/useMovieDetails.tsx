import { useEffect, useState } from 'react';
import apiDB from '../api/movieDB';
import {
	Movie,
	MovieFull,
	VideosResponse,
	MoviesResponse,
} from '../interfaces/movieDBInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieState {
	isLoading: boolean;
	movieFull?: MovieFull;
	trailerID?: string;
	cast: Cast[];
	similarMovies: Movie[];
}

export const useMovieDetails = (movieID: number) => {
	const [movieDetails, setMovieDetails] = useState<MovieState>({
		isLoading: true,
		movieFull: undefined,
		trailerID: undefined,
		cast: [],
		similarMovies: [],
	});

	const getMovieDetails = async () => {
		const movieDB = apiDB('movie');

		const detailsPromise = movieDB.get<MovieFull>(`/${movieID}`);
		const videosPromise = movieDB.get<VideosResponse>(`/${movieID}/videos`);
		const creditsPromise = movieDB.get<CreditsResponse>(`/${movieID}/credits`);
		const similarPromise = movieDB.get<MoviesResponse>(`/${movieID}/similar`);

		const res = await Promise.all([
			detailsPromise,
			videosPromise,
			creditsPromise,
			similarPromise,
		]);

		// Obtener ID del Trailer
		const videos = res[1].data.results;
		let trailerID = videos.find((video) => video.type === 'Trailer')?.key;

		setMovieDetails({
			isLoading: false,
			movieFull: res[0].data,
			trailerID,
			cast: res[2].data.cast,
			similarMovies: res[3].data.results,
		});
	};

	useEffect(() => {
		getMovieDetails();
	}, [movieID]);

	return movieDetails;
};
