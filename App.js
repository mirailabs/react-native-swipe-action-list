import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Appbar } from 'react-native-paper';
import Constants from 'expo-constants';

import EmailListItem from './components/EmailListItem';
import SwipeActionList from './components/SwipeActionList';

const keyExtractor = (item, _) => item.id;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const data = [
        { sender: 'Ali Connors', subject: 'Brunch this weekend?', body: "I'll be in your neighborhood..."},
        { sender: 'Sandra Adams', subject: 'Oui Oui', body: "Do you have Paris reco..."},
        { sender: 'Trevor Hansen', subject: 'Birthday Gift', body: "Have any ideas about..."},
        { sender: 'Edward Elric', subject: 'I figured it out!', body: "Had an insight that we could..."},
        { sender: 'SpammyCo', subject: 'WEEEKEND SALE!', body: "Don't miss out on our latest sale..."},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out..."},
        { sender: 'SpammyCo2', subject: 'Last chance for 20% OFF!', body: "Don't miss out on our latest sale..."},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out..."},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out..."},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out..."},
        { sender: 'Winry Rockbell', subject: 'Where the hell is Ed??', body: "Guess what? Ed skipped out..."},
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
    backgroundColor: '#ecf0f1',
  },
});

