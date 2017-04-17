/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import formatTime from 'minutes-seconds-milliseconds'

export default class Stopwatch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timeElapsed: null,
      running: false
    }

    // this.handleStartPress = this.handleStartPress.bind(this)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.header, this.border('yellow')]}>
          <View style={[styles.timerWrapper, this.border('red')]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper, this.border('green')]}>
            { this.startStopButton() }
            { this.lapButton() }
          </View>
        </View>

        <View style={[styles.footer, this.border('blue')]}>
          <Text>
            I am list of laps
          </Text>
        </View>

      </View>
    )
  }

  startStopButton () {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleStartPress}
        style={[styles.button, styles.startButton]}>
        <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    )
  }

  handleStartPress = () => {

    if (this.state.running) {
      clearInterval(this.interval)
      this.setState({running: false})
      return
    }

    const startTime = new Date()
    const running = !this.state.running
    console.log('running', running)

    this.interval = setInterval(() => this.setState({
      timeElapsed: new Date() - startTime,
      running: true
    }), 30)
  }

  lapButton () {
    return (
      <View style={styles.button}>
        <Text >Lap</Text>
      </View>
    )
  }

  border (color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  }
})

AppRegistry.registerComponent('stopwatch', () => Stopwatch)
