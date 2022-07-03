import { LogBox } from 'react-native';

if (__DEV__) {
	const ignoreWarnings = ['ViewPropTypes will be removed from React Native'];

	LogBox.ignoreLogs(ignoreWarnings);
}
