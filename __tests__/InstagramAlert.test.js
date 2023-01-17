import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import InstagramAlert from '../src/InstagramAlert';

import props from './props';

test('renders correctly', () => {
  const tree = renderer.create(<InstagramAlert {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
