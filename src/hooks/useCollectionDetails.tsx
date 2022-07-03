import { useEffect, useState } from 'react';
import apiDB from '../api/movieDB';
import { CollectionFull } from '../interfaces/movieDBInterface';

interface CollectionState {
	collectionFull?: CollectionFull;
	isLoading: boolean;
}

export const useCollectionDetails = (collectionID: number) => {
	const [collectionDetails, setCollectionDetails] = useState<CollectionState>({
		collectionFull: undefined,
		isLoading: true,
	});

	const getCollectionDetails = async () => {
		const collectionDB = apiDB('collection');
		const { data } = await collectionDB.get<CollectionFull>(`/${collectionID}`);

		setCollectionDetails({
			collectionFull: data,
			isLoading: false,
		});
	};

	useEffect(() => {
		getCollectionDetails();
	}, []);

	return collectionDetails;
};
