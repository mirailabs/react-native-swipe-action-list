import * as React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {SwipeListView} from 'react-native-swipe-list-view';

function ActionRowBack({
  renderLeftHiddenItem,
  renderRightHiddenItem,
  opacityAnim,
}) {
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
}

export default class SwipeActionList extends React.Component {
  static Defaults = {
    // a small buffer for client-specific animation hooks to run
    ANIM_HOOK_DURATION: 200,
    // the animation to remove a row
    ANIM_HEIGHT_DURATION: 150,
  };

  constructor(props) {
    super(props);
    const opacityAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(0);
      return acc;
    }, {});
    const hookAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(0);
      return acc;
    }, {});
    const itemHeightAnims = this.props.data.reduce((acc, item) => {
      const key = this.props.keyExtractor(item);
      acc[key] = new Animated.Value(1);
      return acc;
    }, {});
    this.state = {
      itemHeight: -1,
      opacityAnims,
      hookAnims,
      itemHeightAnims,
    };
  }

  renderItem = (data, rowMap) => {
    const key = this.props.keyExtractor(data.item);

    // We need to know the height of the items to perform the row collapse
    // animation after a swipe. On the very first item render, specify an
    // onLayout callback to store the height.
    if (this.state.itemHeight < 0) {
      const onLayout = (evt) => {
        const {height} = evt.nativeEvent.layout;
        this.setState({itemHeight: height});
      };

      return (
        <Animated.View onLayout={onLayout}>
          {this.props.renderItem(data, rowMap)}
        </Animated.View>
      );
    } else {
      const height = this.state.itemHeightAnims[key].interpolate({
        // Keep a small buffer near 0 to avoid animation glitches where the
        // height doesn't finish animating and has some small height left over
        // at the end. Chosen empirically.
        inputRange: [0, 0.02, 1],
        outputRange: [0, 0, this.state.itemHeight],
      });

      return (
        <Animated.View style={{height}}>
          {this.props.renderItem(data, rowMap)}
        </Animated.View>
      );
    }
  };

  renderHiddenItem = (data, _) => {
    const key = this.props.keyExtractor(data.item);
    return (
      <ActionRowBack
        renderLeftHiddenItem={this.props.renderLeftHiddenItem}
        renderRightHiddenItem={this.props.renderRightHiddenItem}
        opacityAnim={this.state.opacityAnims[key]}
      />
    );
  };

  onSwipeValueChange = (swipeData) => {
    const {key, value} = swipeData;
    this.state.opacityAnims[key].setValue(value < 0 ? -1 : 1);
  };

  onRowOpen = (key, rowMap, toValue) => {
    if (toValue < 0) {
      Animated.sequence([
        Animated.timing(this.state.hookAnims[key], {
          toValue: -1,
          duration: SwipeActionList.Defaults.ANIM_HOOK_DURATION,
        }),
        Animated.timing(this.state.itemHeightAnims[key], {
          toValue: 0,
          duration: SwipeActionList.Defaults.ANIM_HEIGHT_DURATION,
        }),
      ]).start(() => {
        if (this.props.onSwipeLeft) {
          this.props.onSwipeLeft(key);
        }
      });
    } else {
      Animated.sequence([
        Animated.timing(this.state.hookAnims[key], {
          toValue: 1,
          duration: SwipeActionList.Defaults.ANIM_HOOK_DURATION,
        }),
        Animated.timing(this.state.itemHeightAnims[key], {
          toValue: 0,
          duration: SwipeActionList.Defaults.ANIM_HEIGHT_DURATION,
        }),
      ]).start(() => {
        if (this.props.onSwipeRight) {
          this.props.onSwipeRight(key);
        }
      });
    }
  };

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

SwipeActionList.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  renderLeftHiddenItem: PropTypes.func.isRequired,
  renderRightHiddenItem: PropTypes.func.isRequired,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
