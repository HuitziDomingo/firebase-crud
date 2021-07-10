import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserList, CreateUserScreen, UserDetailScreen } from './screens'

const Stack = createStackNavigator()
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="user-list" component={UserList} options={{title: "Lista de usuarios"}}/>
      <Stack.Screen name="create-user" component={CreateUserScreen} options={{title: "Crear usuario"}}/>
      <Stack.Screen name="details" component={UserDetailScreen} options={{title: "Detalles"}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


