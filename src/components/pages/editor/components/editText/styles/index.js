import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		zIndex: 60,
	},
	hideModal: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 20,
	},
	modal: {
		position: 'relative',
		zIndex: 30,
		width: '100%',
		height: 100,
		borderTopWidth: 1,
		borderTopColor: '#88888830',
		backgroundColor: '#F1F3F4',
		flexDirection: 'column',
	},
	modalContentFlex: {
		position: 'relative',
		width: '100%',
		height: '50%',
	},
	modalContent: {
		width: '100%',
		height: '100%',
	},
	tabText: {
		fontSize: 17,
		fontFamily: 'SFUIDisplay-Medium',
		fontWeight: '600',
		textTransform: 'uppercase',
	},
});
