import { Image } from 'react-native';
import { urlImage } from '../api/movieDB';
import { ProductionCompany } from '../interfaces/movieDBInterface';

const CompanyCard = ({ company }: { company: ProductionCompany }) => {
	return (
		<Image
			source={{ uri: urlImage(company.logo_path) }}
			style={{ width: 230, height: 50, marginRight: 15 }}
		/>
	);
};

export default CompanyCard;
