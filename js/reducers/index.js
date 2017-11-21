import { combineReducers } from 'redux'
import { StackNavigator } from 'react-navigation';


import CounterReducer from './reducer-counter'
import InsuranceReducer from './insurance-list-reducer'
import Home from '../components/home/Home';
import AddInsurance from '../components/add_insurance/AddInsurance';


export const AppNavigator = StackNavigator({

  Home: { screen: Home },	
  AddInsurance: { screen: AddInsurance },

});

const navReducer = (state, action) => {

    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

const allReducers = combineReducers({

	nav: navReducer,
  counterReducer: CounterReducer,
  insuranceReducer: InsuranceReducer
})

export default allReducers