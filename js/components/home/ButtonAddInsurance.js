import React, { Component } from 'react'
import {
   View,
   TouchableHighlight,
   Text,
   StyleSheet
} from 'react-native'

export default ButtonAddInsurance = (props) => {
   return (
      <View style = {styles.container}>
         <TouchableHighlight onPress = {props.buttonPressed} >
            <Text style = {styles.button}>
              + ADD INSURANCE
            </Text>
         </TouchableHighlight>
      </View>
   )
}

const styles = StyleSheet.create ({
   container: {
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginBottom: 40,
    color: '#FFF',
    backgroundColor: '#FF2F57',
    fontWeight: "bold"
  }
})