import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Image} from 'react-native';

import SwipeActionList from 'react-native-swipe-action-list';

import Header from './components/Header';
import EmailListItem from './components/EmailListItem';

import emails from './data';

const ArchiveRowBack = () => (
  <View style={styles.leftHiddenContainer}>
    <Image
      style={styles.leftHiddenImage}
      source={require('./assets/baseline_archive_white_18dp.png')}
    />
  </View>
);

const TrashRowBack = () => (
  <View style={styles.rightHiddenContainer}>
    <Image
      style={styles.rightHiddenImage}
      source={require('./assets/baseline_delete_white_18dp.png')}
    />
  </View>
);

const App = () => {
  const [data, setData] = useState(emails);

  const emailToId = useCallback(item => item.id, []);

  const renderItem = useCallback(data => {
    const item = data.item;
    return (
      <EmailListItem
        subject={item.subject}
        sender={item.sender}
        body={item.body}
      />
    );
  }, []);

  const deleteItem = useCallback(
    key => {
      setData(prevData => prevData.filter(x => emailToId(x) !== key));
    },
    [emailToId],
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Header />
        <SwipeActionList
          keyExtractor={emailToId}
          data={data}
          renderItem={renderItem}
          renderLeftHiddenItem={ArchiveRowBack}
          renderRightHiddenItem={TrashRowBack}
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
  leftHiddenImage: {
    width: 24,
    height: 24,
    marginLeft: 22,
  },
  rightHiddenContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
  },
  rightHiddenImage: {
    width: 24,
    height: 24,
    marginRight: 22,
  },
});

export default App;
