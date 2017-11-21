import React, { Component } from 'react'
import {
   View,
   Text,
   StyleSheet
} from 'react-native'

export default class Header extends Component<{}> {
  render() {

   return (
      <View style = {styles.header}>
        <Text style = {styles.h1}>Mysurance App</Text>
      </View>
   )
  }
}

const styles = StyleSheet.create ({
   header: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#FF2F57',
  },
  h1: {
    padding: 17,
    color: '#FFF',
    fontSize: 25,
    fontWeight: "bold",
  }
})