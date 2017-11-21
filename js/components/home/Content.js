import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import allReducers from '../../reducers'
import {decrementCounter, removeInsurance} from '../../actions'


class Content extends Component<{}> {

  deleteInsurance(obj) {
  
    Alert.alert(
      'Do you want remove this insurance?', '',
      [ 
        {text: 'Cancel'}, 
        {text: 'OK', onPress: () => {

          this.props.removeInsurance(obj)
          this.props.decrementCounter({yearlyPremium: obj.yearlyPremium})
        }}, 
      ], 
      { cancelable: false } 
    )
  }
  render() {
    if (this.props.data.length > 0) {
      return (
        <View style={styles.mainContent}>
          <FlatList style={styles.Table}
            data={this.props.data}
            keyExtractor={item => item.id} 
            renderItem={
          
              ({item}) => 

              <View style={styles.rowContainer}>
                <View>
                  <View style={styles.rowTable}>
                    <Text>Category: </Text>
                    <Text style={styles.colValue}>{item.category}</Text>
                  </View>
                  <View style={styles.rowTable}>
                    <Text>Name: </Text>
                    <Text style={styles.colValue}>{item.name}</Text>
                  </View>
                  <View style={styles.rowTable}>
                    <Text>Yearly Premium: </Text>
                    <Text style={styles.colValue}>{item.yearlyPremium}</Text>
                  </View>
                </View>
                 <TouchableHighlight onPress = {() => this.deleteInsurance(item)} >
                  <Image 
                  style={styles.button} 
                  source={require('../../../assets/icons/if_ic_close_48px_352270.png')
                } />
                </TouchableHighlight>
              </View>
          } />
        </View>
      );

    } else {
      return (
        <View style={styles.mainContent}>
          <Text style={[styles.title, styles.pressTheButtonText]}>PRESS THE BUTTON</Text>
          <Text style={[styles.title, styles.pressTheButtonText]}>TO ADD YOU INSURANCE</Text>
        </View>
      );
    }

  }
}


const styles = StyleSheet.create({
  mainContent: {
    alignSelf: 'stretch',
    alignItems:'center',
    justifyContent:'center',
    flex: 4,
  },
  Table: {
    alignSelf: 'stretch',
  },
  rowContainer: {
    alignSelf: 'stretch',
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: '#FFF7F7',
    borderColor: '#FF2F57',
    borderWidth: 1,
  },
  rowTable: {
    flexDirection:'row',
  },
  colValue: {
    color: '#FF2F57',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 15,
  },
  pressTheButtonText: {
    marginBottom: 5,
    color: '#FF2F57',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


function mapStateToProps(state) {

  return { 
    insurancesList: state.insuranceReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

    decrementCounter: decrementCounter,
    removeInsurance: removeInsurance

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);