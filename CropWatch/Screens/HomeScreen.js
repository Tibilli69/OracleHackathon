import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Notification } from '../Component/notification';

export function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const notifications = [
    { id: '1', title: 'Notification 1', description: 'Description of Notification 1' },
    { id: '2', title: 'Notification 2', description: 'Description of Notification 2' },
  ];

  const renderNotificationItem = ({ item }) => (
    <Notification title={item.title} description={item.description} />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <Text style={styles.notificationsHeader}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.navbar}>
        <Icon style={styles.icon} name="home" size={30} color="#fff" onPress={() => alert('Home pressed')} />
        <Icon style={styles.icon} name="user" size={30} color="#fff" onPress={() => alert('Exterminator pressed')} />
        <Icon style={styles.icon} name="shopping-cart" size={30} color="#fff" onPress={() => navigation.navigate("Cart")} />
        <Icon style={styles.icon} name="camera" size={30} color="#fff" onPress={() => alert('AI pressed')} />
        <Icon style={styles.icon} name="user" size={30} color="#fff" onPress={() => alert('Profile pressed')} />
      </View>

      <Button
        title="Chart"
        onPress={() => {
          navigation.navigate("Chart");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Adjust as needed for status bar height
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
  },
  notificationsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderTopWidth: 1,
  },
  icon: {
    color: 'white',
  },
});
