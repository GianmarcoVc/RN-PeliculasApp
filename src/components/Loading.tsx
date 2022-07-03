import { View, ActivityIndicator } from 'react-native';

const Loading = ({ size }: { size: number }) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', paddingVertical: 20 }}>
			<ActivityIndicator color='#2f68d3' size={size} />
		</View>
	);
};

export default Loading;
