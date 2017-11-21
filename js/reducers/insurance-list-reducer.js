export default function (state = [], action) {

  switch (action.type) {

    case 'ADD_INSURANCE': {

      state = state.concat(JSON.stringify(action.payload));
      state = state.toString().replace("}{", "},{");

      return state;
      break;
    }

    case 'REMOVE_INSURANCE': {

      var result = state.toString().replace(JSON.stringify(action.payload), '');
      var n = result.length;

      if (result[0] === ',') {
        
        result = result.substr(1, n-1);
        n = result.length;
      }

      if (result[n-1] === ',')
        result = result.substr(0, n-1);
      
      result = result.replace(',,', ',');

      Alert.alert(result);
      return result;
      break;
    }

    default:
      return state
  }
}