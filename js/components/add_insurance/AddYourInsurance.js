import React, { Component } from 'react'
import {
   View,
   TouchableHighlight,
   Text,
   StyleSheet
} from 'react-native'

export default AddYourInsurance = (props) => {
   return (
      <View style = {styles.container}>
         <TouchableHighlight onPress = {props.buttonPressed} >
            <Text style = {styles.button}>
              DONE
            </Text>
         </TouchableHighlight>
      </View>
   )
}

const styles = StyleSheet.create ({
   container: {
    marginTop: 20
  },
  button: {
    width: 230,
    padding: 10,
    color: '#FFF',
    backgroundColor: '#FF2F57',
    textAlign: 'center',
    fontWeight: "bold"
  }
})