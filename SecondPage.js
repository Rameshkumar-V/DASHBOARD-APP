import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SecondPage = ({ navigation }) => {
  const handleContinue = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Second Page!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Skill" onPress={() => handleContinue('SkillAdd')} />
        <Button title="Delete Skill" onPress={() => handleContinue('SkillDelPage')} />
        <Button title="Add Contact" onPress={() => handleContinue('ContactAddPage')} />
        <Button title="Delete Contact" onPress={() => handleContinue('ContactDelPage')} />
        <Button title="Add Project" onPress={() => handleContinue('ProjectAddPage')} />
        <Button title="Delete Project" onPress={() => handleContinue('ProjectDelPage')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    gap:10,
    borderRadius:6
  },
});

export default SecondPage;
