import { registerRootComponent } from 'expo';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import SwipeActionList from 'react-native-swipe-action-list';

import EmailListItem from './components/EmailListItem';

const keyExtractor = (item, _) => item.id;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const data = [
        { sender: 'Rockbell Automail', subject: 'Your order is ready!', body: "Hi Preetam, the item you ordered is now available for pickup!"},
        { sender: 'Amestris Kebab', subject: 'Your Receipt', body: "Thank you for dining with us last night!"},
        { sender: 'Alphonse Elric', subject: 'Recommendations?', body: "Was wondering if you had any recs for Chinese food in the area?"},
        { sender: 'Edward Elric', subject: 'I figured it out!', body: "Had an insight that we can apply alkahestry to to solve an alchemical paradox!"},
        { sender: 'SpammyCo', subject: 'WEEEKEND SALE!', body: "Don't miss out on our latest weekend sale!"},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out on our family dinner last night."},
        { sender: 'SpammyCo2', subject: 'Last chance for 20% OFF!', body: "Going once, going twice!"},
        { sender: 'Roy Mustang', subject: 'Surprise Party', body: "You'd better be at my party next weekend."},
        { sender: 'Alex Louis Armstrong', subject: 'Gym Meet!', body: "I'm hosting a training event at my gym next month!"},
        { sender: 'Riza Hawkeye', subject: 'Can you do me a favor?', body: "Have to ask you for a quick favor."},
        { sender: 'Lin Yao', subject: 'Amestris Trip', body: "I'll be in town this week - wanna grab some food?"},
    ];
    data.forEach((x, i) => x.id = `${i}`); // add unique keys
    this.state = { data };
  }

  renderItem = (data, rowMap) => {
    const item = data.item;
    return (
      <EmailListItem
        subject={item.subject}
        sender={item.sender}
        body={item.body}
      />
    );
  }

  deleteItem = (key) => {
    const data = this.state.data.filter(item => keyExtractor(item) != key);
    this.setState({ data });
  }

  onSwipeLeft = (key) => {
    this.deleteItem(key);
  }

  onSwipeRight = (key) => {
    this.deleteItem(key);
  }

  renderLeftHiddenItem = () => {
    return (
      <View style={styles.leftHiddenContainer}>
        <IconButton icon="archive" color={'white'} style={{marginLeft: 22}}/>
      </View>
    );
  }
  
  renderRightHiddenItem = () => {
    return (
      <View style={styles.rightHiddenContainer}>
        <IconButton icon="delete" color={'white'} style={{marginRight: 22}}/>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action icon="menu" />
          <Appbar.Content title="Inbox" />
          <Appbar.Action icon="search" />
          <Appbar.Action icon="more-vert" />
        </Appbar.Header>
        <View style={styles.container}>
          <SwipeActionList
            keyExtractor={keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}
            renderLeftHiddenItem={this.renderLeftHiddenItem}
            renderRightHiddenItem={this.renderRightHiddenItem}
            onSwipeLeft={this.onSwipeLeft}
            onSwipeRight={this.onSwipeRight}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  leftHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  rightHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red'
  }
});

registerRootComponent(App);
