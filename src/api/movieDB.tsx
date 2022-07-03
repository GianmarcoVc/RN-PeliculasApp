import axios from 'axios';

type Path = 'movie' | 'person' | 'collection';

const apiDB = (type: Path) =>
	axios.create({
		baseURL: `https://api.themoviedb.org/3/${type}`,
		params: {
			api_key: '7204da9e560ede55e46ceb41aa95c8ad',
			language: 'es-MX',
		},
	});

export const search = (query: string) =>
	axios.create({
		baseURL: `https://api.themoviedb.org/3/search/movie`,
		params: {
			api_key: '7204da9e560ede55e46ceb41aa95c8ad',
			language: 'es-MX',
			query,
		},
	});

export const urlImage = (path: string | null) =>
	`https://image.tmdb.org/t/p/w500${path}`;

export default apiDB;
