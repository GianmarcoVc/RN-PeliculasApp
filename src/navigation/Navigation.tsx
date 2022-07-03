import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Movie, Collection } from '../interfaces/movieDBInterface';
import { Cast } from '../interfaces/creditsInterface';
import {
	HomeScreen,
	SearchScreen,
	MovieScreen,
	ActorScreen,
	CollectionScreen,
} from '../screens';
import Icon from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootStackParams = {
	HomeScreen: undefined;
	SearchScreen: undefined;
	MovieScreen: Movie;
	ActorScreen: Cast;
	CollectionScreen: Collection;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				header: ({ navigation }) => <Header navigation={navigation} />,
				headerTransparent: true,
				cardStyle: {
					backgroundColor: '#141414',
				},
			}}
		>
			<Stack.Screen name='HomeScreen' component={HomeScreen} />
			<Stack.Screen name='SearchScreen' component={SearchScreen} />
			<Stack.Screen name='MovieScreen' component={MovieScreen} />
			<Stack.Screen name='ActorScreen' component={ActorScreen} />
			<Stack.Screen name='CollectionScreen' component={CollectionScreen} />
		</Stack.Navigator>
	);
};

const Header = ({ navigation }: any) => {
	const { top } = useSafeAreaInsets();

	return (
		<View style={{ ...styles.boxIcon, marginTop: top }}>
			<TouchableOpacity
				activeOpacity={0.9}
				style={{ width: 40 }}
				onPress={() => navigation.goBack()}
			>
				<Icon
					size={30}
					color='white'
					name='arrow-back-outline'
					style={styles.iconStyles}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	boxIcon: {
		padding: 20,
	},
	iconStyles: {
		margin: 5,
		textShadowColor: '#363636ab',
		textShadowOffset: {
			height: 0,
			width: 0,
		},
		textShadowRadius: 5,
	},
});

export default Navigation;
