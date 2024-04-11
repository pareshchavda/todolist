import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useTaskContext} from '../context/taskContext';

const AddTask: React.FC<{navigation: any}> = ({navigation}) => {
  const [task, setTask] = useState<string>('');
  const {addTask} = useTaskContext();

  const saveTask = () => {
    if (task.trim() === '') {
      return;
    }
    addTask(task);
    setTask('');
    navigation.navigate('TaskList');
  };

  return (
    <View>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={styles.addTaskText}
        placeholderTextColor={'gray'}
      />
      <Button title="Add Task" onPress={saveTask} />
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  addTaskText: {
    fontSize: 14,
    color: 'black',
  },
});
