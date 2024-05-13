import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { getToken } from './auth';

const ProjectAdd = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [github, setGithub] = useState('');
  const [img, setImg] = useState('');

  const addProject = async () => {
    try {

      const token=await getToken();
      const response = await axios.post('http://192.168.118.246:3000/addproject', { name:name, desc:description,github: github,img: img }, {
        headers: {
          'authorization': `Bearer ${token}` // Include the token in the request headers
        }});
      if (response.data.status === 'success') {
        Alert.alert('Success', 'Project added successfully');
        setName('');
        setDescription('');
        setGithub('');
        setImg('');
      } else {
        Alert.alert('Error', 'Failed to add project');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding project');
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
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Text style={styles.label}>GitHub</Text>
      <TextInput
        style={styles.input}
        value={github}
        onChangeText={setGithub}
        placeholder="Enter GitHub link"
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={img}
        onChangeText={setImg}
        placeholder="Enter image URL"
      />
      <TouchableOpacity style={styles.addButton} onPress={addProject}>
        <Text style={styles.addButtonText}>Add Project</Text>
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

export default ProjectAdd;
