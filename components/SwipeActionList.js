import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const Defaults = {
  ANIM_COLOR_DURATION: 200,
  ANIM_HEIGHT_DURATION: 150,
};

function ActionRowBack({leftView, rightView, opacityAnim}) {
  const leftOpacity = opacityAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 1]
  });
  const rightOpacity = opacityAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 1, 0]
  });
  return (
    <Animated.View style={{flex: 1}}>
      <Animated.View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: leftOpacity}}>
        {leftView}
      </Animated.View>
      <Animated.View style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: rightOpacity}}>
        {rightView}
      </Animated.View>
    </Animated.View>
  );
}

export default class SwipeActionList extends React.Component {
  constructor(props) {
    super(props);
    const opacityAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(0);
      return acc;
    }, {});
    const colorAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(0);
      return acc;
    }, {});
    const rowHeightAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(1);
      return acc;
    }, {});
    this.state = {
      opacityAnims,
      colorAnims,
      rowHeightAnims
    }
  }

  renderItem = (data, rowMap) => {
    const key = this.props.keyExtractor(data.item);
    const height = this.state.rowHeightAnims[key].interpolate({
      // Keep a small buffer near 0 to avoid animation glitches
      // where the height doesn't finish animating and has some
      // small height left over at the end. Chosen empirically.
      inputRange: [0, 0.02, 1],
      outputRange: [0, 0, 72]
    });
    return (
      <Animated.View style={{height}}>
        {this.props.renderItem(data, rowMap)}
      </Animated.View>
    );
  }

  renderHiddenItem = (data, _) => {
    const key = this.props.keyExtractor(data.item);
    return (
      <ActionRowBack
        leftView={this.props.leftHiddenItem}
        rightView={this.props.rightHiddenItem}
        opacityAnim={this.state.opacityAnims[key]}
        rowHeightAnim={this.state.rowHeightAnim}
      />
    );
  }

  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    this.state.opacityAnims[key].setValue(value < 0 ? -1 : 1);
  }

  onRowOpen = (key, rowMap, toValue) => {
    if (toValue < 0) {
      Animated.sequence([
        Animated.timing(this.state.colorAnims[key], {toValue: -1, duration: Defaults.ANIM_COLOR_DURATION}),
        Animated.timing(this.state.rowHeightAnims[key], {toValue: 0, duration: Defaults.ANIM_HEIGHT_DURATION})
      ]).start(() => {
        if (this.props.onSwipeLeft) {
          this.props.onSwipeLeft(key);
        }
      });
    } else {
      Animated.sequence([
        Animated.timing(this.state.colorAnims[key], {toValue: 1, duration: Defaults.ANIM_COLOR_DURATION}),
        Animated.timing(this.state.rowHeightAnims[key], {toValue: 0, duration: Defaults.ANIM_HEIGHT_DURATION})
      ]).start(() => {
        if (this.props.onSwipeRight) {
          this.props.onSwipeRight(key);
        }
      });
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <SwipeListView
        {...this.props}
        renderHiddenItem={this.renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onRowOpen={this.onRowOpen}
        onSwipeValueChange={this.onSwipeValueChange}
        renderItem={this.renderItem}
        // Make sure to not trigger a row close on scroll since it has racing
        // issues with onSwipe(Left|Right).
        closeOnScroll={false}
        // -- WORKAROUND ------------------------------------------------------
        // https://github.com/jemise111/react-native-swipe-list-view/issues/312
        // useNativeDriver causes a bug on Android when releasing a row swipe
        useNativeDriver={false}
        // -- /WORKAROUND -----------------------------------------------------
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});

