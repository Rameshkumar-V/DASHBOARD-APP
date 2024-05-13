import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from './auth';

const AddContactPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [img, setImg] = useState('');

  const addContact = async () => {
    try {
      const token=await getToken();
      const response = await axios.post('http://192.168.118.246:3000/addcon', { name:name, link:link, img:img }, {
        headers: {
          'authorization': `Bearer ${token}` // Include the token in the request headers
        }});
      if (response.data.status === 'success') {
        Alert.alert('Success', 'Contact added successfully');
        setName('');
        setLink('');
        setImg('');
      } else {
        Alert.alert('Error', 'Failed to add contact');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding contact');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Link</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Enter link"
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={img}
        onChangeText={setImg}
        placeholder="Enter image URL"
      />
      <TouchableOpacity style={styles.addButton} onPress={addContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});

export default AddContactPage;
