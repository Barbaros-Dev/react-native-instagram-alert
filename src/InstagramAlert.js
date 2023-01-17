import React, { Component } from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackHandler,
  Modal,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

const HwBackHandler = BackHandler;
const HW_BACK_EVENT = 'hardwareBackPress';

const { OS } = Platform;

export default class InstagramAlert extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.springValue = new Animated.Value(props.animatedValue);

    this.state = {
      showSelf: false,
    };

    if (show) this._springShow(true);
  }

  componentDidMount() {
    HwBackHandler.addEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }

  _springShow = (fromConstructor) => {
    const { useNativeDriver = false } = this.props;

    this._toggleAlert(fromConstructor);
    Animated.spring(this.springValue, {
      toValue: 1,
      bounciness: 10,
      useNativeDriver,
    }).start();
  };

  _springHide = () => {
    const { useNativeDriver = false } = this.props;

    if (this.state.showSelf === true) {
      Animated.spring(this.springValue, {
        toValue: 0,
        tension: 10,
        useNativeDriver,
      }).start();

      setTimeout(() => {
        this._toggleAlert();
        this._onDismiss();
      }, 70);
    }
  };

  _toggleAlert = (fromConstructor) => {
    if (fromConstructor) this.state = { showSelf: true };
    else this.setState({ showSelf: !this.state.showSelf });
  };

  _onDismiss = () => {
    const { onDismiss } = this.props;
    onDismiss && onDismiss();
  };

  _renderAlert = () => {
    const animation = { transform: [{ scale: this.springValue }] };

    const { showProgress } = this.props;
    const { title, message, customView = null } = this.props;

    const {
      showCancelButton,
      cancelText,
      cancelButtonStyle,
      cancelButtonTextStyle,
      onCancelPressed,
      cancelButtonTestID
    } = this.props;

    const {
      showConfirmButton,
      confirmText,
      confirmButtonStyle,
      confirmButtonTextStyle,
      onConfirmPressed,
      confirmButtonTestID
    } = this.props;

    const {
      alertContainerStyle,
      overlayStyle,
      progressSize,
      progressColor,
      contentContainerStyle,
      contentStyle,
      titleStyle,
      messageStyle,
      actionContainerStyle,
    } = this.props;

    const cancelButtonData = {
      testID: cancelButtonTestID,
      text: cancelText,
      buttonStyle: cancelButtonStyle,
      buttonTextStyle: cancelButtonTextStyle,
      onPress: onCancelPressed,
    };

    const confirmButtonData = {
      testID: confirmButtonTestID,
      text: confirmText,
      buttonStyle: confirmButtonStyle,
      buttonTextStyle: confirmButtonTextStyle,
      onPress: onConfirmPressed,
    };

    return (
      <View style={[styles.container, alertContainerStyle]}>
        <TouchableWithoutFeedback onPress={this._onTapOutside}>
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.contentContainer, animation, contentContainerStyle]}
        >
          <View style={[styles.content, contentStyle]}>
            {title ? (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            ) : null}
            {message ? (
              <Text style={[styles.message, messageStyle]}>{message}</Text>
            ) : null}
            {customView}
          </View>
          <View style={{ backgroundColor: "#EFEFEF", position: "absolute", width: 258, height: 1, bottom: 95 }}></View>
          <View style={{ backgroundColor: "#EFEFEF", position: "absolute", width: 258, height: 1, bottom: 48 }}></View>
          <View style={[styles.action, actionContainerStyle]}>
            
            <TouchableOpacity onPress={confirmButtonData.onPress} style={{ backgroundColor: "#fff", width: 258, height: 47, position: "absolute", bottom: 48, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#FF4D57" }}>{confirmButtonData.text}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "#EFEFEF", position: "absolute", width: 258, height: 1, bottom: 48 }}></View>
            <TouchableOpacity onPress={cancelButtonData.onPress} style={{ backgroundColor: "#fff", width: 258, height: 47, position: "absolute", bottom: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: "center", alignItems: "center" }}>
              <Text>{cancelButtonData.text}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  };

  render() {
    const { show, showSelf } = this.state;
    const { modalProps = {}, closeOnHardwareBackPress } = this.props;

    const wrapInModal = OS === 'android' || OS === 'ios';

    return showSelf ?
      wrapInModal ? (
        <Modal
          animationType="none"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            if (showSelf && closeOnHardwareBackPress) {
              this._springHide();
            }
          }}
          {...modalProps}
        >
          {this._renderAlert()}
        </Modal>
      ) : this._renderAlert()
    : null;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    const { showSelf } = this.state;

    if (show && !showSelf) this._springShow();
    else if (show === false && showSelf) this._springHide();
  }

  componentWillUnmount() {
    HwBackHandler.removeEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }
}

InstagramAlert.propTypes = {
  show: PropTypes.bool,
  animatedValue: PropTypes.number,
  useNativeDriver: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
  customView: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]),
  modalProps: PropTypes.object,
  cancelButtonTestID: PropTypes.string,
  confirmButtonTestID: PropTypes.string
};

InstagramAlert.defaultProps = {
  show: false,
  animatedValue: 0.3,
  useNativeDriver: false,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  customView: null,
  modalProps: {},
  cancelButtonTestID: 'instagram-alert-cancel-btn',
  confirmButtonTestID: 'instagram-alert-confirm-btn'
};
