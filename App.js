import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';

export default class App extends React.Component {
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

  handleTodoClick = index => {
    const todo = this.state.todos[index];
    todo.completed = !todo.completed;
    this.setState( prevState => {
      const text = prevState.text;
      const todos = [...prevState.todos];
      todos[index] = todo;
      return {
        text, todos
      };
      console.log(this.state.todos[index].completed);
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
                onPress = {() => this.handleTodoClick(index)}
                style={ item.completed === false ? notCompleted : completed }>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

const { container, textFont, notCompleted, completed } = styles;
