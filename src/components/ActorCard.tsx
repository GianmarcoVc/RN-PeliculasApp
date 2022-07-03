import { Image, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Cast } from '../interfaces/creditsInterface';
import { urlImage } from '../api/movieDB';
import Icon from '@expo/vector-icons/FontAwesome5';

const ActorCard = ({ actor }: { actor: Cast }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.wrapperCard}
			onPress={() =>
				navigation.navigate('ActorScreen' as never, actor as never)
			}
		>
			{!!actor.profile_path ? (
				<Image
					style={styles.profile}
					source={{ uri: urlImage(actor.profile_path) }}
				/>
			) : (
				<View
					style={{
						...styles.profile,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#424242',
					}}
				>
					<Icon name='theater-masks' size={40} color='white' />
				</View>
			)}
			<Text style={styles.name} numberOfLines={1}>
				{actor.name}
			</Text>
			<Text style={styles.character} numberOfLines={1}>
				{actor.character}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrapperCard: {
		width: 110,
		marginRight: 15,
	},
	profile: {
		height: 120,
		borderRadius: 5,
	},
	name: {
		marginTop: 5,
		marginBottom: 3,
		color: '#dbdbdb',
		fontWeight: 'bold',
	},
	character: {
		fontSize: 12,
		color: '#979797',
		lineHeight: 16,
	},
});

export default ActorCard;
