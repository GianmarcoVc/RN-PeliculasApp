import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Ionicons';

const HeaderHome = ({ navigation }: StackHeaderProps) => {
	const { top } = useSafeAreaInsets();

	return (
		<LinearGradient
			colors={['black', 'transparent']}
			style={{ ...styles.container, paddingTop: top + 20 }}
		>
			{/* Logo */}
			<Image
				source={require('../../assets/logo.png')}
				style={{ width: 140, height: 35, tintColor: '#ddd' }}
			/>

			{/* Search */}
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => navigation.navigate('SearchScreen')}
			>
				<Icon size={25} color='white' name='search-sharp' />
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default HeaderHome;
