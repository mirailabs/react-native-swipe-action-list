import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Image} from 'react-native';

import SwipeActionList from 'react-native-swipe-action-list';

import Header from './components/Header';
import EmailListItem from './components/EmailListItem';

import emails from './data';

const App = () => {
  const [data, setData] = useState(emails);

  function deleteItem(key) {
    setData(data.filter((x) => x.id !== key));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Header />
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
          renderLeftHiddenItem={() => (
            <View style={styles.leftHiddenContainer}>
              <Image
                style={{width: 24, height: 24, marginLeft: 22}}
                source={require('./assets/baseline_archive_white_18dp.png')}
              />
            </View>
          )}
          renderRightHiddenItem={() => (
            <View style={styles.rightHiddenContainer}>
              <Image
                style={{width: 24, height: 24, marginRight: 22}}
                source={require('./assets/baseline_delete_white_18dp.png')}
              />
            </View>
          )}
          onSwipeLeft={deleteItem}
          onSwipeRight={deleteItem}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
