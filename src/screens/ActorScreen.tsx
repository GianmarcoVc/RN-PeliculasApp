import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import Icon from '@expo/vector-icons/AntDesign';

import { urlImage } from '../api/movieDB';
import { HorizontalSlider, Loading } from '../components';
import { useActorDetails } from '../hooks/useActorDetails';

interface Props extends StackScreenProps<RootStackParams, 'ActorScreen'> {}

const Biography = ({ biography, place }: any) => {
	return (
		<>
			{!!biography && <Text style={styles.biography}>{biography}</Text>}

			<Text
				style={{
					...styles.subtitle,
					textAlign: !!biography ? 'right' : 'left',
				}}
			>
				{place}
			</Text>
		</>
	);
};

const ActorDetailsScreen = ({ navigation, route }: Props) => {
	const actor = route.params;
	const { actorFull, cast, crew, isLoading } = useActorDetails(actor.id);

	return (
		<ScrollView>
			{/* Actor Image */}
			<Image
				style={styles.profile}
				source={{ uri: urlImage(actor.profile_path) }}
			/>
			{/* Actor Information */}
			<View style={styles.container}>
				<View style={styles.header}>
					<View>
						<Text style={styles.subtitle}>{actor.known_for_department}</Text>
						<Text style={styles.title}>{actor.name}</Text>
					</View>
					<Icon
						size={30}
						color='white'
						name={actor.gender === 1 ? 'woman' : 'man'}
					/>
				</View>

				{isLoading ? (
					<Loading size={40} />
				) : (
					<Biography
						biography={actorFull?.biography}
						place={actorFull?.place_of_birth}
					/>
				)}
			</View>

			{!!cast.length && <HorizontalSlider title='Cast' movies={cast} />}
			{!!crew.length && <HorizontalSlider title='Crew' movies={crew} />}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	profile: {
		height: 500,
	},
	container: {
		padding: 20,
		paddingBottom: 0,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	subtitle: {
		color: '#a0a0a0',
	},
	title: {
		fontSize: 22,
		color: 'white',
	},
	biography: {
		color: '#ccc',
		fontSize: 16,
		lineHeight: 25,
		marginVertical: 30,
	},
});

export default ActorDetailsScreen;
