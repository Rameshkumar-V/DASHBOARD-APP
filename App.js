import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import SecondPage from './SecondPage';
import SkillAdd from './SkillAdd';
import LoginPage from './LoginPage';
import SkillDeletePage from './SkillsDeletePage';
import ContactDeletePage from './ContactDeletePage';
import AddContactPage from './AddContactPage';
import DeleteProject from './ProjectDel';
import ProjectAdd from './ProjectAdd';

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ title: 'Welcome' }} />
        <Stack.Screen name="SkillAdd" component={SkillAdd} />
        <Stack.Screen name="SecondPage" component={SecondPage} options={{ title: 'Second Page' }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name="SkillDelPage" component={SkillDeletePage} options={{ title: 'Delete Page' }} />
        <Stack.Screen name="ContactDelPage" component={ContactDeletePage} options={{ title: 'Contact Delete Page' }} />
        <Stack.Screen name="ContactAddPage" component={AddContactPage} options={{ title: 'Contact Add Page' }} />
        <Stack.Screen name="ProjectDelPage" component={DeleteProject} options={{ title: 'Project Delete Page' }} />
        <Stack.Screen name="ProjectAddPage" component={ProjectAdd} options={{ title: 'Project Add Page' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
