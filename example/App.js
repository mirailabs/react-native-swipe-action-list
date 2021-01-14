import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import SwipeActionList from 'react-native-swipe-action-list';
import EmailListItem from './EmailListItem';

let DATA = [
  {
    sender: 'Rockbell Automail',
    subject: 'Your order is ready!',
    body: 'Hi Preetam, the item you ordered is now available for pickup!',
  },
  {
    sender: 'Amestris Kebab',
    subject: 'Your Receipt',
    body: 'Thank you for dining with us last night!',
  },
  {
    sender: 'Alphonse Elric',
    subject: 'Recommendations?',
    body: 'Was wondering if you had any recs for Chinese food in the area?',
  },
  {
    sender: 'Edward Elric',
    subject: 'I figured it out!',
    body:
      'Had an insight that we can apply alkahestry to to solve an alchemical paradox!',
  },
  {
    sender: 'SpammyCo',
    subject: 'WEEEKEND SALE!',
    body: "Don't miss out on our latest weekend sale!",
  },
  {
    sender: 'Winry Rockbell',
    subject: 'Where the hell is Ed??',
    body: 'Guess what? Ed skipped out on our family dinner last night.',
  },
  {
    sender: 'SpammyCo2',
    subject: 'Last chance for 20% OFF!',
    body: 'Going once, going twice!',
  },
  {
    sender: 'Roy Mustang',
    subject: 'Surprise Party',
    body: "You'd better be at my party next weekend.",
  },
  {
    sender: 'Alex Louis Armstrong',
    subject: 'Gym Meet!',
    body: "I'm hosting a training event at my gym next month!",
  },
  {
    sender: 'Riza Hawkeye',
    subject: 'Can you do me a favor?',
    body: 'Have to ask you for a quick favor.',
  },
  {
    sender: 'Lin Yao',
    subject: 'Amestris Trip',
    body: "I'll be in town this week - wanna grab some food?",
  },
];

DATA.forEach((x, i) => (x.id = `${i}`)); // add unique keys

const App = () => {
  const [data, setData] = useState(DATA);

  function deleteItem(key) {
    setData(data.filter((x) => x.id !== key));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: 24, marginRight: 32}}
              source={require('./assets/baseline_menu_white_18dp.png')}
            />
            <Text style={{fontSize: 20, color: 'white'}}>Inbox</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 24, height: 24}}
              source={require('./assets/baseline_search_white_18dp.png')}
            />
            <Image
              style={{width: 24, height: 24, marginLeft: 24}}
              source={require('./assets/baseline_more_vert_white_18dp.png')}
            />
          </View>
        </View>
        <SwipeActionList
          keyExtractor={(item, _) => item.id}
          data={data}
          renderItem={(data, rowMap) => {
            const item = data.item;
            return (
              <EmailListItem
                subject={item.subject}
                sender={item.sender}
                body={item.body}
              />
            );
          }}
          renderLeftHiddenItem={() => {
            return (
              <View style={styles.leftHiddenContainer}>
                <Image
                  style={{width: 24, height: 24, marginLeft: 22}}
                  source={require('./assets/baseline_archive_white_18dp.png')}
                />
              </View>
            );
          }}
          renderRightHiddenItem={() => {
            return (
              <View style={styles.rightHiddenContainer}>
                <Image
                  style={{width: 24, height: 24, marginRight: 22}}
                  source={require('./assets/baseline_delete_white_18dp.png')}
                />
              </View>
            );
          }}
          onSwipeLeft={deleteItem}
          onSwipeRight={deleteItem}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  header: {
    height: 56,
    backgroundColor: '#5900f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  leftHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  rightHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
});

export default App;
