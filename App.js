/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n: null,
      a: null,
      c: null,
      m: null,
      x: [],
      x0: [],
    }
    this.renderRow = this.renderRow.bind(this)
    this.hitung = this.hitung.bind(this)
  }

  onChangeTextN(text) {
    this.setState({ n: text })
  }

  onChangeTextA(text) {
    this.setState({ a: text })
  }

  onChangeTextC(text) {
    this.setState({ c: text })
  }

  onChangeTextM(text) {
    this.setState({ m: text })
  }

  onChangeTextX(text) {
    this.setState({ x0: text })
  }

  hitung() {
    let { n, a, c, m, x0} = this.state
    console.log(this.state);
    n = Number(n)
    a = Number(a)
    c = Number(c)
    m = Number(m)
    x0 = Number(x0)
    let s = [x0]
    let stop = false


    for (var i = 1; i <= n ; i++) {
      let z = (a * s[i-1] + c) % m
      s.map((d)=>{
        if (d == z) {
          stop = true
        }
      })
      s.push(z)
      if (stop) {
        break
      }
    }
    this.setState({ x: s })
  }

  renderRow(data) {
      let value = null
      if (data) {
        value = data.item
      }
      if (data.index != 0) {
        return (
          <View style={{borderBottomWidth:1, margin:3, marginLeft:10}}>
            <Text>
              {value}
            </Text>
          </View>
        )
      }
    }

  render() {
    let { n, x } = this.state
    let data = []
    let warningText = null
    if (x.length < n && x.length > 1) {
      warningText = (
        <Text style={{color:'red', margin:5}}>Berhenti pada iterasi ke {x.length-1}, karena angka {x[x.length-1]} sudah ada.</Text>
      )
    }

    return (
      <ScrollView style={{backgroundColor:'#F5FCFF'}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tugas SIMOD Mencari Nilai Random
        </Text>
        <View style={styles.containerContent}>
          <Text>Rumus:</Text>
          <Text style={styles.rumus}> X[n] = (a * X[n-1] + c) mod m</Text>
          <View style={styles.containerItem}>
            <Text style={{fontWeight:'bold', top:5}}>n     : </Text>
            <View style={styles.containerTextInput}>
              <TextInput
                underlineColorAndroid = "transparent"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeTextN.bind(this)}
                value={this.state.n}/>
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={{fontWeight:'bold', top:5}}>a     : </Text>
            <View style={styles.containerTextInput}>
              <TextInput
                underlineColorAndroid = "transparent"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeTextA.bind(this)}
                value={this.state.a}/>
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={{fontWeight:'bold', top:5}}>c     : </Text>
            <View style={styles.containerTextInput}>
              <TextInput
                underlineColorAndroid = "transparent"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeTextC.bind(this)}
                value={this.state.c}/>
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={{fontWeight:'bold', top:5}}>m    : </Text>
            <View style={styles.containerTextInput}>
              <TextInput
                underlineColorAndroid = "transparent"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeTextM.bind(this)}
                value={this.state.m}/>
            </View>
          </View>
          <View style={styles.containerItem}>
            <Text style={{fontWeight:'bold', top:5}}>x[0] : </Text>
            <View style={styles.containerTextInput}>
              <TextInput
                underlineColorAndroid = "transparent"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={this.onChangeTextX.bind(this)}
                value={this.state.x0}/>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{backgroundColor:'skyblue', padding:5, paddingLeft:10, paddingRight:10, borderWidth:1, borderRadius:10}}
          onPress={this.hitung.bind(this)}>
          <Text style={{fontWeight:'bold'}}>Hitung</Text>
        </TouchableOpacity>
        {warningText}
        <View style={[styles.containerContent,{top:5}]}>
          <Text style={{fontWeight:'bold', fontSize: 15}}>Nilai Iterasi:</Text>
            <FlatList
              data = {data.concat(this.state.x)}
              keyExtractor = {this.keyExtractor}
              renderItem = {this.renderRow} />
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom:50
  },
  containerContent: {
    alignSelf:'flex-start',
    marginLeft: 20,
  },
  containerItem: {
    flexDirection:'row',
    marginBottom:10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  containerTextInput: {
    borderWidth:0.8,
    borderRadius: 3,
    width:'85%',
    marginLeft:10
  },
  textInput: {
    backgroundColor:'#ffffff',
    width:'98%',
    padding:0,
    paddingLeft:10,
    marginLeft:2
  },
  rumus: {
    marginBottom:10,
    marginLeft:5,
    fontWeight:'bold',
  }
});
