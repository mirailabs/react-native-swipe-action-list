import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function EmailListItem({subject, sender, body}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}></View>
      <View style={styles.rightContainer}>
        <Text style={styles.subject}>{subject}</Text>
        <Text>{sender}<Text style={styles.body}> — {body}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 72,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'rgba(0, 0, 0, 0.6)'
  },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  subject: {
    fontSize: 16,
    marginBottom: 4
  },
  body: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)'
  }
});
