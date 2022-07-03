import { Movie } from './movieDBInterface';

// Actor Full Information
export interface CastFull {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null;
	gender: number;
	homepage: null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
}

// Actor Credits
export interface CastCredits {
	cast: Movie[];
	crew: Movie[];
	id: number;
}
