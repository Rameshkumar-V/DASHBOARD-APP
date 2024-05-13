import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { storeToken, getToken } from './auth'; // Adjust the path according to your project structure

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = async () => {
    const token = await getToken();
    if (token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      setLoading(false);
      // navigation.navigate('SkillAdd');
      navigation.navigate('SecondPage')
    } else {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.118.246:3000/login', {
        username: username,
        password: password
      });
      const { token } = response.data;
      await storeToken(token); // Store the token locally
      console.log('JWT Token:', token);
      // Set token in request headers for subsequent requests
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      
      // Show success alert
      Alert.alert('Success', 'Login successful');
      setLoading(false);
      navigation.navigate('SecondPage');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Invalid username or password');
      console.error('Login error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default LoginPage;
