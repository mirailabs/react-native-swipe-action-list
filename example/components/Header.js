import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 24, height: 24, marginRight: 32}}
        source={require('../assets/baseline_menu_white_18dp.png')}
      />
      <Text style={{fontSize: 20, color: 'white'}}>Inbox</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 24, height: 24}}
        source={require('../assets/baseline_search_white_18dp.png')}
      />
      <Image
        style={{width: 24, height: 24, marginLeft: 24}}
        source={require('../assets/baseline_more_vert_white_18dp.png')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#5900f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default Header;
