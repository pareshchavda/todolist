import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  toggleTaskCompletion: (id: string) => void;
  removeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTask = async (id: string, title: string) => {
    const updatedTasks = tasks.map(t => (t.id === id ? {...t, title} : t));
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = async (id: string) => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t,
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const removeTask = async (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider
      value={{tasks, addTask, updateTask, toggleTaskCompletion, removeTask}}>
      {children}
    </TaskContext.Provider>
  );
};
