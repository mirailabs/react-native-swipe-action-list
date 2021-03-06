import React from 'react';
import {Text} from 'react-native';
import renderer from 'react-test-renderer';

import SwipeActionList from './SwipeActionList';

describe('<SwipeActionList />', () => {
  it('renders (smoke test)', () => {
    const data = [0, 1, 2, 3];
    const keyExtractor = x => `${x}`;
    const renderItem = data => <Text>{data.item}</Text>;
    const renderLeftHiddenItem = () => <Text>left hidden item</Text>;
    const renderRightHiddenItem = () => <Text>right hidden item</Text>;
    const tree = renderer
      .create(
        <SwipeActionList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderLeftHiddenItem={renderLeftHiddenItem}
          renderRightHiddenItem={renderRightHiddenItem}
        />,
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
