// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TaskList from './src/screens/taskList';
import AddTask from './src/screens/addTask';
import EditTask from './src/screens/editTask';
import {TaskProvider} from './src/context/taskContext';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TaskList" component={TaskList} />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
