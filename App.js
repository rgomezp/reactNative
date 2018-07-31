import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, ListView, Button} from 'react-native';
var _ = require('underscore');
import {createStackNavigator} from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = (props) => ({
    title: 'Home',
    headerRight: <TouchableOpacity><Text style={{marginRight:20, color: 'blue'}} onPress={() => props.navigation.navigate('Second')}>Second Page</Text></TouchableOpacity>
  });

  constructor(props){
    super(props)
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1!==r2)
    });
    this.state = {
      display: true,
      numbers: _.range(10)
    }
  }

  remove(){
    this.setState({
      display: !this.state.display
    })
  }

  press(elem){
    this.setState({
      numbers: this.state.numbers.filter((curItem) => (elem !== curItem))
    })
  }

  modify(direction){
      if(direction==='up'){
        var arr = this.state.numbers;
        var nArr = this.state.numbers.concat([this.state.numbers[this.state.numbers.length-1]+1])
        this.setState({numbers: nArr})
      }else{
        if(this.state.numbers.length == 1){
          this.props.navigation.navigate('Second');
        }else{
          var nArr = this.state.numbers.splice(0,this.state.numbers.length-1);
          this.setState({numbers: nArr})
        }
      }
  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    return (
      <View style={styles.container0}>
        <View style={styles.button}>
          <Button color='white' title="Up" onPress={this.modify.bind(this, 'up')}/>
        </View>
        <View style={styles.button}>
          <Button color='white' title="Down" onPress={this.modify.bind(this, 'down')}/>
        </View>
        <ListView renderRow={(item)=>
        <View styles={styles.listStyle}>
          <TouchableOpacity onPress={this.press.bind(this, item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        </View>}
      dataSource={dataSource.cloneWithRows(this.state.numbers)}
      />
      </View>
    );

  }
}

class SecondScreen extends React.Component{
  static navigationOptions = (props) => ({
    title: 'Second',
    headerRight: <TouchableOpacity><Text style={{marginRight:20, color: 'blue'}} onPress={() => props.navigation.navigate('Third')}>Third Page</Text></TouchableOpacity>
  });

  render(){
    return(
      <View style={styles.container0}>
        <Text style={{fontSize: 80, color: 'orange'}}>This is a second page</Text>
      </View>
    )
  }
}

class ThirdScreen extends React.Component{
  static navigationOptions = {
    title: 'Third'
  }

  render(){
    return(
      <View style={styles.container0}>
        <Text style={{fontSize: 80, color: 'orange'}}>This is a third page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container0:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  button:{
    backgroundColor: 'orange',
    borderRadius: 10,
    width: 200,
    marginTop: 10,
    marginBottom: 10
  },
  listStyle:{
    flex: 1
  }
});

export default createStackNavigator({
  Home:{
    screen: HomeScreen,
  },
  Second:{
    screen: SecondScreen
  },
  Third:{
    screen: ThirdScreen
  }
});
