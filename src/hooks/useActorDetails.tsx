import { useState, useEffect } from 'react';
import apiDB from '../api/movieDB';
import { Movie } from '../interfaces/movieDBInterface';
import { CastFull, CastCredits } from '../interfaces/castInterface';

interface ActorState {
	cast: Movie[];
	crew: Movie[];
	actorFull: CastFull | null;
	isLoading: boolean;
}

export const useActorDetails = (actorID: number) => {
	const [actorDetails, setActorDetails] = useState<ActorState>({
		cast: [],
		crew: [],
		actorFull: null,
		isLoading: true,
	});

	const getActorDetails = async () => {
		const actorDB = apiDB('person');

		const actorFullPromise = actorDB.get<CastFull>(`/${actorID}`);
		const actorCreditsPromise = actorDB.get<CastCredits>(
			`/${actorID}/movie_credits`
		);

		const res = await Promise.all([actorFullPromise, actorCreditsPromise]);

		setActorDetails({
			cast: res[1].data.cast,
			crew: res[1].data.crew,
			actorFull: res[0].data,
			isLoading: false,
		});
	};

	useEffect(() => {
		getActorDetails();
	}, []);

	return actorDetails;
};
