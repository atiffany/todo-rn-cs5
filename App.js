import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Todos from './Todos';

const Home = props => {
  const { navigate } = props.navigation;
  return (
    <View style={container}>
      <Text style={textFont}>Home</Text>
      <Button style={textFont} onPress={() => navigate('todos')} title='Todos' />
    </View>
  );
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

});

const { container, textFont } = styles;

const Routes = StackNavigator({
  home: { screen: Home },
  todos: { screen: Todos }
})

export default Routes;