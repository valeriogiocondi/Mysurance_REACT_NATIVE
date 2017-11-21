import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import allReducers from '../../reducers'
import {decrementCounter, removeInsurance} from '../../actions'
import Header from './../Header'
import Content from './Content'
import ButtonAddInsurance from './ButtonAddInsurance'


class Home extends Component<{}> {

  static navigationOptions = { 

    title: 'Mysurance App', 
  };
  render() {

    var insurancesListJSON = JSON.parse('['+this.props.insurancesList+']');

    return (
      <View style={styles.mainContainer}>
        <Header />
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              YEARLY PREMIUM: 
            </Text>
            <Text style={[styles.title, styles.titleBold]}>
              {this.props.counterReducer} 
            </Text>
            <Text style={styles.title}>
              CHF
            </Text>
          </View>
          <Content data={insurancesListJSON} />
          <ButtonAddInsurance buttonPressed={() => this.props.navigation.navigate("AddInsurance")} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  body: {
    flex: 8,
    alignSelf: 'stretch',
  },
  titleContainer: {
    flexDirection:'row',
    height: 70,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FF2F57',
    fontSize: 18,
    textAlign: 'center',
  },
  titleBold: {
    marginLeft: 5,
    marginRight: 2,
    fontWeight: 'bold',
  },
});


function mapStateToProps(state) {

  return { 
    counterReducer: state.counterReducer,
    insurancesList: state.insuranceReducer
  }
}

export default connect(mapStateToProps)(Home);