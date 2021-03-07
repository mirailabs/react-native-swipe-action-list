import React from 'react';
import {Animated} from 'react-native';

const ActionRowBack = ({
  renderLeftHiddenItem,
  renderRightHiddenItem,
  opacityAnim,
}) => {
  const leftOpacity = opacityAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 1],
  });
  const rightOpacity = opacityAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 1, 0],
  });
  return (
    <Animated.View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: leftOpacity,
        }}>
        {renderLeftHiddenItem()}
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          opacity: rightOpacity,
        }}>
        {renderRightHiddenItem()}
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(ActionRowBack);
