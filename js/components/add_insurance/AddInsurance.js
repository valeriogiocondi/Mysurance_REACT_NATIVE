import React, { Component } from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Select, Option} from "react-native-chooser";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
const request = require('superagent');

import allReducers from '../../reducers'
import {incrementCounter, addInsurance} from '../../actions'
import AddYourInsurance from './AddYourInsurance'


class AddInsurance extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      category : '',
      textTitle : 'Enter name',
      textYarlyPremium : 'Enter yearlyPremium',
    	insurancesListFromWikipedia: []
    };

  }
  static navigationOptions = { 

    title: 'CHOOSE YOUR INSURANCE', 
  };
  getRandomId() {

    var date = new Date();
    return "insurance-"+date.getTime();
  } 
  done() {
    
    var data = {
      "category": this.state.category, 
      "id": this.getRandomId(),
      "name": this.state.textTitle, 
      "yearlyPremium": this.state.textYarlyPremium
    };

    if (
      data.category &&
      data.id &&
      data.name.length > 0 &&
      data.yearlyPremium.length > 0 
    ) 
    {
      this.props.addInsurance(data);
      this.props.incrementCounter({yearlyPremium: data.yearlyPremium});

      this.props.navigation.navigate("Home")
    } 
    else
      Alert.alert("Please, fill every field");

  }
  componentDidMount() {
    var tempList = [];
    request
      .get("https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*")
      .end((err, res) => {

        this.setState({ insurancesListFromWikipedia : res.body.query.categorymembers });
      });
  }
  render() {
  	const { navigate } = this.props.navigation;

    var insurancesSelect = [];
    if (this.state != null) {

      this.state.insurancesListFromWikipedia.map(function(item) {

        insurancesSelect.push(<InsuranceOptionItem key={item.pageid} value={item.title.replace("Category:", "")} item={item} />);
      });
    }

    let buttonListener = this.done.bind(this);
    
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleH1}>
        CUSTOMIZE
        </Text>
        <Text style={[styles.titleH1, styles.titleH2]}>
        YOUR INSURANCE
        </Text>
      	<View style={styles.container_1}>
	        <Text style={styles.nameTitle}>
	        	TITLE
	        </Text>
	        <TextInput
	         	style={styles.inputTextTitle}
            onChangeText={(text) => this.setState({ textTitle: text })}
            value={this.state.textTitle} />
        </View>
        <View style={styles.container_1}>
          <Text style={styles.yearlyPremiumTitle}>
            YEARLY PREMIUM
          </Text>
          <TextInput
            style={styles.inputTextTitle}
	          onChangeText={(text) => this.setState({ textYarlyPremium: text })}
	          value={this.state.textYarlyPremium} />
      	</View>
      	<View style={styles.container_1}>
	        <Text style={styles.nameTitle}>
	        	CATEGORY
	        </Text>
		        <Select
                defaultText = {this.state.category}
		            onSelect = {(value) => this.setState({ category: value })}
		            defaultText  = {this.state.value}
		            style = {styles.select}
		            backdropStyle  = {{backgroundColor : "#D3D5D6"}}
		            optionListStyle = {{backgroundColor : "#F5FCFF"}}
		          >
		          {insurancesSelect}
		        </Select>
      		</View>

        <AddYourInsurance buttonPressed={ buttonListener } />
      </View>
    );
  }
}

class InsuranceOptionItem extends React.Component {
  
  render() {
    return (
			<Option id={this.props.item.pageid}>{this.props.item.title.replace("Category:", "")}</Option>
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
  titleH1: {
    color: '#FF2F57',
    fontSize: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  titleH2: {
    marginBottom: 50,
    fontSize: 20,
  },
  container_1: {
    height: 100,
    justifyContent: 'flex-start',
  },
  nameTitle: {
  	marginBottom: 10,
  },
  yearlyPremiumTitle: {
  	marginBottom: 10,
  },
  inputTextTitle: {
    width: 230, 
    height: 40, 
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#AAA', 
    borderWidth: 1,
  },
  select: {
    width: 230, 
    borderWidth : 1, 
  	borderColor: '#AAA', 
  },
});


function mapStateToProps(state) {

  return { 
    counterReducer: state.counterReducer,
    insuranceReducer: state.insuranceReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

      incrementCounter: incrementCounter,
      addInsurance: addInsurance

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInsurance);