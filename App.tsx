import './ignoreWarnings.js';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='light' />
			<Navigation />
		</NavigationContainer>
	);
}
