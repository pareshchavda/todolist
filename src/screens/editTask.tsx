import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {useTaskContext} from '../context/taskContext';

type EditTaskScreenRouteProp = RouteProp<
  Record<string, object | undefined>,
  'EditTask'
>;

const EditTask: React.FC<{route: EditTaskScreenRouteProp}> = ({route}) => {
  const {id} = route.params as {id: string};
  const navigation: any = useNavigation();
  const {tasks, updateTask} = useTaskContext();
  const [task, setTask] = useState<string>('');

  // Load task title on component mount
  useState(() => {
    const selectedTask = tasks.find(t => t.id === id);
    if (selectedTask) {
      setTask(selectedTask.title);
    }
  }, [tasks, id]);

  const handleUpdateTask = () => {
    if (task.trim() === '') {
      return;
    }
    updateTask(id, task);
    navigation.navigate('TaskList');
  };

  return (
    <View>
      <TextInput
        placeholder="Edit task"
        value={task}
        onChangeText={setTask}
        style={styles.editTaskText}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  editTaskText: {
    fontSize: 14,
    color: 'black',
  },
});
