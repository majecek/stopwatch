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
      running: false,
      startTime: null,
      laps: []
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
          {this.laps()}
        </View>

      </View>
    )
  }

  laps = () => {
    return this.state.laps.map((lap, index) => {
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(lap)}
        </Text>
      </View>
    })
  }

  startStopButton () {
    const style = this.state.running ? styles.stopButton : styles.startButton
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleStartPress}
        style={[styles.button, style]}>
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

    this.setState({startTime: new Date()})

    this.interval = setInterval(() => {
      return this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      })
    }, 30)
  }

  lapButton () {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleLapPress}
        style={[styles.button]}>
        <Text >Lap</Text>
      </TouchableHighlight>
    )
  }

  handleLapPress = () => {
    const lap = this.state.timeElapsed
    this.setState({
      startTime: new Date(),
      laps: [...this.state.laps, lap]
    })
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
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }

})

AppRegistry.registerComponent('stopwatch', () => Stopwatch)
