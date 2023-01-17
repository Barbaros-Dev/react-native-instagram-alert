import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)'
  },
  contentContainer: {
    backgroundColor: "#fff",
    width: 258,
    borderRadius: 20,
    position: "absolute",
    alignItems: "center"
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5
  },
  title: {
    fontSize: 17,
    fontWeight: "100",
    marginTop: 34
  },
  message: {
    color: "#B3B3B3",
    marginTop: 13,
    textAlign: "center",
    width: 221,
    paddingBottom: 115
  },
  confirmButton: {
    backgroundColor: "#fff",
    width: 258,
    height: 47,
    position: "absolute",
    bottom: 48,
    ustifyContent: "center",
    alignItems: "center"
  },
  confirmButtonText: {
    color: '#FF4D57'
  }
});

export default styles;
