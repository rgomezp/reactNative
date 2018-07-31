import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, ListView, Button} from 'react-native';
var _ = require('underscore');

class App extends React.Component {
  constructor(){
    super()
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
        var nArr = this.state.numbers.splice(0,this.state.numbers.length-1);
        this.setState({numbers: nArr})
      }
  }

  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    if(this.state.display){
      return (
        <View style={styles.container0}>
          <View style={{height: 40}}></View>
          <View style={styles.button}>
            <Button color='white' title="Up" onPress={this.modify.bind(this, 'up')}/>
          </View>
          <View style={styles.button}>
            <Button color='white' title="Down" onPress={this.modify.bind(this, 'down')}/>
          </View>
          <ListView dataSource={this.state.dataSource} renderRow={(item)=>
          <View>
            <TouchableOpacity onPress={this.press.bind(this, item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          </View>}
        dataSource={dataSource.cloneWithRows(this.state.numbers)}
        />
        </View>
      );
    }else{
      return(
      <View style={styles.container0}>
        <View style={{height: 40}}></View>
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>this.remove()}>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    )
    }
  }
}

const styles = StyleSheet.create({
  container0:{
    flex: 1,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    /*justifyContent: 'center',*/
  },
  container2:{
    flex: 2,
    backgroundColor: 'blue'
  },
  button:{
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 100,
    marginBottom: 20
  }
});

export default App;
