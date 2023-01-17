## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)

### Installation
```bash
$ npm i react-native-instagram-alerts --save
```

### Basic Usage
```jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import InstagramAlert from 'react-native-instagram-alerts';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>

        <Text>I'm Instagram Alert</Text>
        <TouchableOpacity onPress={() => {
          this.showAlert();
        }}>
          <View style={styles.button}>
            <Text style={styles.text}>Try me!</Text>
          </View>
        </TouchableOpacity>

        <InstagramAlert
          show={showAlert}
          title="Instagram Alert"
          message="I have a message for you!"
          cancelText="Cancel"
          confirmText="Delete"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});

```

### Props

#### Basic

| Prop                     | Type      | Description                                    | Default |
| :----------------------- | :-------: | :--------------------------------------------: | :------ |
| show                     | `boolean` | Show / Hide awesome alert                      | false   |
| animatedValue            | `number`  | Animated value                                 | 0.3     |
| useNativeDriver          | `boolean` | Use native driver for animations               | false   |
| title                    | `string`  | Title text to display                          | hidden  |
| message                  | `string`  | Message text to display                        | hidden  |
| cancelText               | `string`  | Cancel button text                             | Cancel  |
| confirmText              | `string`  | Confirm button text                            | Confirm |
| onCancelPressed          | `func`    | Action to perform when Cancel is pressed       | -       |
| onConfirmPressed         | `func`    | Action to perform when Confirm is pressed      | -       |
| onDismiss                | `func`    | Callback for when alert is dismissed           | -       |
| customView               | `object`  | Custom view to render inside alert             | null    |
| modalProps               | `object`  | Additional props to pass for Modal             | -       |
| confirmButtonTestID      | `string`  | Confirm button testID                          | awesome-alert-confirm-btn|
| cancelButtonTestID       | `string`  | Cancel button testID                           | awesome-alert-cancel-btn|

#### Styling

| Prop                   | Type     | Description                  | Default |
| :--------------------- | :------: | :--------------------------: | :------ |
| alertContainerStyle    | `object` | Alert parent container style | -       |
| overlayStyle           | `object` | Overlay style                | -       |
| contentContainerStyle  | `object` | Alert popup style            | -       |
| contentStyle           | `object` | Alert popup content style    | -       |
| titleStyle             | `object` | Title style                  | -       |
| messageStyle           | `object` | Message style                | -       |
| actionContainerStyle   | `object` | Action container style       | -       |
| cancelButtonStyle      | `object` | Cancel button style          | -       |
| cancelButtonTextStyle  | `object` | Cancel button text style     | -       |
| confirmButtonStyle     | `object` | Confirm button style         | -       |
| confirmButtonTextStyle | `object` | Confirm button text style    | -       |
