import {
	View,
	StyleSheet,
	Dimensions,
	Platform,
	TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	trailerID?: string;
	isOpen: boolean;
	fcClose: (arg: boolean) => void;
}

const { width, height: windowHeight } = Dimensions.get('window');

const ModalVideo = ({ trailerID, isOpen, fcClose }: Props) => {
	const { top } = useSafeAreaInsets();

	if (!trailerID) return null;

	return (
		<View
			style={{
				...styles.container,
				height: windowHeight + top,
				transform: [{ translateX: isOpen ? 0 : width }],
			}}
		>
			{/* Video Player */}
			<YoutubePlayer
				height={240}
				width={width}
				play={isOpen}
				videoId={trailerID}
				webViewStyle={{ opacity: 0.99 }}
				webViewProps={{
					androidLayerType:
						Platform.OS === 'android' && Platform.Version <= 22
							? 'hardware'
							: 'none',
				}}
			/>
			{/* Icon Close Modal */}
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.iconClose}
				onPress={() => fcClose(false)}
			>
				<Icon
					size={40}
					color='whitesmoke'
					name='close-outline'
					style={{ fontWeight: 'bold' }}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000e6',
	},
	iconClose: {
		width: 70,
		height: 70,
		bottom: 60,
		borderRadius: 100,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#161616',
		borderColor: '#353535',
		borderWidth: 1,
	},
});

export default ModalVideo;
