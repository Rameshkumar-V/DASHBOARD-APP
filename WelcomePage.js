import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getToken, removeToken } from './auth';

const WelcomePage = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      console.log(token)
      setIsLoggedIn(token);
    };
    checkToken();
  }, []);

  const handleContinue = () => {
    navigation.navigate('SecondPage');
  };

  const handleLogout = async () => {
    await removeToken();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.welcomeText}>Welcome to My App!</Text>
      {isLoggedIn ? (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default WelcomePage;
