// auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (e) {
    console.error('Failed to store token:', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
