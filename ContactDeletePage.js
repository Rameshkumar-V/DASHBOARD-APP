import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from './auth';

const ContactDeletePage = ({ navigation }) => {
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.118.246:3000/getcontact');
        setContactData(response.data.contact);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteContact = async (name) => {
    try {
      setLoading(true);
      const token=await getToken();
      const response = await axios.post('http://192.168.118.246:3000/deletecon', { name:name }, {
        headers: {
          'authorization': `Bearer ${token}` // Include the token in the request headers
        }});
      if (response.data.status === 'success') {
        setContactData(contactData.filter(contact => contact.name !== name));
      } else {
        Alert.alert('Error', 'Failed to delete contact');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while deleting contact');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <TouchableOpacity onPress={() => deleteContact(item.name)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={contactData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 28,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  deleteButtonText: {
    color: 'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ContactDeletePage;
