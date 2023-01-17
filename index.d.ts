import React from 'react';
import { ModalProps } from 'react-native';

export interface InstagramAlertProps {
  show?: boolean;
  useNativeDriver?: boolean;
  title?: string;
  message?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
  onDismiss?: () => void;
  customView?: JSX.Element | React.ReactNode;
  alertContainerStyle?: object;
  overlayStyle?: object;
  contentContainerStyle?: object;
  contentStyle?: object;
  titleStyle?: object;
  messageStyle?: object;
  actionContainerStyle?: object;
  cancelButtonColor?: string;
  cancelButtonTextStyle?: object;
  cancelButtonStyle?: object;
  confirmButtonColor?: string;
  confirmButtonTextStyle?: object;
  confirmButtonStyle?: object;
  modalProps?: ModalProps;
}

declare class InstagramAlert extends React.Component<InstagramAlertProps> {}

export default InstagramAlert;
