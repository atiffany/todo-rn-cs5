import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  AsyncStorage
} from 'react-native';

export default class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      todos: []
    };
  }

  handleButtonPress = () => {
    this.setState(prevState => {
      let { text, todos } = prevState;
      return {
        text: '',
        todos: [...todos, { key: text + todos.length, text, completed: false }]
      };
    });
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  handleCompletedToggle = todoKey => {
    const todos = this.state.todos.slice();
    todos.map(todo => {
      if (todo.key === todoKey) {
        return (todo.completed = !todo.completed);
      }
    });
    this.setState({ todos });
  };

  removeCompleted = () => {
    const todos = this.state.todos.slice();
    const filteredTodos = todos.filter(todo => !todo.completed);
    this.setState({ todos: filteredTodos });
  };

  componentDidMount() {
    const todos = AsyncStorage.getItem('todos');
    if(todos !== null) {
      todos
        .then(res => {
          this.setState(prevState => {
            return {
              todos: JSON.parse(res)
            }
          });
        })
        .catch(error => {
          console.log('Your error while retrieving todos: ', error);
        });
    }
  };

  componentWillUnmount() {
    const todos = this.state.todos.slice();
    AsyncStorage.setItem('todos', JSON.stringify(todos), error => {
      if(error) {
        alert('Something is wrong');
      } else {
        console.log('Good job setting those todos');
      }
    });
  };

  render() {
    return (
      <View style={container}>
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>You're free</Text>
        ) : (
          <Text style={textFont}>You have things to do!</Text>
        )}
        <TextInput
        style={inputBox}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Todo"
        />
        <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
        <FlatList
          data={this.state.todos}
          renderItem={({ item, index }) => {
            return (
              <View key={item.key}>
                <Text
                  onPress={() => this.handleCompletedToggle(item.key)}
                  style={item.completed ? completed : notCompleted}
                >
                  {item.text}
                </Text>
              </View>
            );
          
          }}
        />
        <Button onPress={this.removeCompleted} title='Remove Completed Tasks' style={removeButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  },
  notCompleted: {
    margin: 10,
    fontSize: 20,
    color: 'red'
  },
  completed: {
    margin: 10,
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: 'blue'
  },
  inputBox: {
    width: 100,
  },
  removeButton: {
    marginBottom: 20,
  },
});

const { container, textFont, notCompleted, completed, inputBox, removeButton } = styles;
