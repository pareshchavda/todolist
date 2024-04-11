/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../context/taskContext';

const TaskList: React.FC = () => {
  const navigation: any = useNavigation();
  const {tasks, toggleTaskCompletion, removeTask} = useTaskContext();

  const editTask = useCallback(
    (id: string) => {
      navigation.navigate('EditTask', {id});
    },
    [navigation],
  );
  const keyExtractor = useCallback((item: {id: any}) => item.id, []);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <View style={styles.titleView}>
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
            <Image
              source={
                item.completed
                  ? require('../assets/images/radio-button-fill.png')
                  : require('../assets/images/radio-button.png')
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>

          <Text style={styles.titleText}>{item.title}</Text>
        </View>

        <View style={styles.btnCoverView}>
          <TouchableOpacity onPress={() => removeTask(item.id)}>
            <Text style={styles.titleText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => editTask(item.id)}>
            <Text style={styles.titleText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [editTask, removeTask, toggleTaskCompletion],
  );

  return (
    <View>
      <View style={styles.headerView}>
        <Text style={styles.addTaskText}>To DO List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addTaskText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    fontSize: 14,
    color: 'black',
  },
  addTaskText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  btnCoverView: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 25,
    height: 25,
    marginEnd: 10,
  },
});
