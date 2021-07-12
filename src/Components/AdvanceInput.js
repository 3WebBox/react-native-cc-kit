/*
 *
 * Teya customized input form with main features specified for the app
 * Last update: 05/15/2021
 * By: Rafet Khallaf
 * 
 * Props:
 * 
 * 
 */ 

import React, { Component } from 'react';

import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
  ScrollView
} from 'react-native';
import { config } from '../../config';

export default class AdvanceInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secureTextEntry: props.secureTextEntry || false,
      placeholder: props.placeholder || null,
      defaultValue: props.defaultValue || null,
      multiline: props.multiline || false,
      minRequiredLength: props.minRequiredLength || 0,
      maxLength: props.maxLength || null,
      enableCounter: props.enableCounter || false,
      counterColor: props.counterColor || '#ddd',
      counterHighlightColor: props.counterHighlightColor || 'red',
      containerStyle: props.containerStyle || ScreenStyle.container,
      inputStyle: props.inputStyle || ScreenStyle.input,
      label: props.label || null,
      labelStyle: props.labelStyle || ScreenStyle.label,
      description: props.description || null,
      descriptionStyle: props.descriptionStyle || ScreenStyle.description,
      inputFont: props.inputFont || null,
      labelFont: props.labelFont || null,
      descriptionFont: props.descriptionFont || null,
      backgroundColor: props.backgroundColor || null,
      errorColor: props.errorColor || 'red',
      highlightColor: props.highlightColor || 'red',

      showSwitch: props.showSwitch || null,
      switchEnabled: props.switchEnabled || false,
    }
  }

  // show / hide counter
  counter = () => {
    if(!this.state.enableCounter)  return null;

    if(!this.state.maxLength) {
      console.error('maxLength must be set for counter');
      return null;
    }

    if(!this.state.minRequiredLength) {
      console.error('minRequiredLength must be set for counter');
      return null;
    }

    var text = this.props.value || '';
    var highLight = false;
    var counterColor = this.state.counterColor;
    var counterHighlightColor = this.state.counterHighlightColor;
    
    if(text.length < this.state.minRequiredLength) {
      highLight = true;
    }

    return <View style={ScreenStyle.counterContainer}>
      <Text style={[
        ScreenStyle.counterTextStyle,
        {color: highLight ? counterHighlightColor : counterColor}
      ]}>
        {text.length}
      </Text>
      <Text style={[
        ScreenStyle.counterTextStyle,
        {color: counterColor, paddingHorizontal: 5}
      ]}>
        /
      </Text>
      <Text style={[
        ScreenStyle.counterTextStyle,
        {color: counterColor, paddingHorizontal: 5}
      ]}>
        {this.props.maxLength}
      </Text>
    </View>
  }

  // if errorMessage prop is set then show error
  includeError = () => {
    if(!this.props.error) return null;

    var errorColor = null;
    var font = null;

    if(this.state.errorColor) {
      errorColor = { color: this.state.errorColor }
    }

    if(this.state.descriptionFont)
      font = { fontFamily: this.state.descriptionFont }

    if(this.props.errorMessage) { 
      return <Text style={[
        ScreenStyle.errorMessage,
        errorColor,
        font
      ]}>
        {this.props.errorMessage}
      </Text>
    }

    else return null;
  }

  label = () => {
    if(!this.state.label) return null;

    var font = null;

    if(this.state.labelFont)
      font = { fontFamily: this.state.labelFont }

    return <Text style={[
      this.state.labelStyle,
      font
    ]}>
      {this.state.label}
    </Text>
  }

  description = () => {
    if(!this.state.description) return null;

    var font = null;

    if(this.state.descriptionFont)
      font = { fontFamily: this.state.descriptionFont }

    return <Text style={[

      this.state.descriptionStyle,
      font
    ]}>
      {this.state.description}
    </Text>
  }

  switch = () => {
    if(!this.state.showSwitch) return null;

    return (
      <View>
        <Switch
          trackColor={{ false: '#ddd', true: config.primaryColor }}
          thumbColor={"#efefef"}
          ios_backgroundColor="#ddd"
          onValueChange={(value) => this.onSwitch(value)}
          value={this.props.switchEnabled}
        />
      </View>
    )
  }

  onSwitch = (status) => {
    if(this.props.onSwitch)
      this.props.onSwitch(status);

    else return null;
  }

  input = () => {
    var backgroundColor = null;
    var font = null;

    if(this.state.backgroundColor) 
      backgroundColor = { backgroundColor: this.state.backgroundColor }

    if(this.state.inputFont)
      font = { fontFamily: this.state.inputFont }

    if(this.props.children) return (
      <View
        style={[
          this.props.inputStyle ? this.props.inputStyle : this.state.inputStyle,
          font,
          backgroundColor
        ]}
      >
        {this.props.children}
      </View>
    );

    if(this.state.showSwitch) return null;
    
    return (
      <TextInput
        keyboardType={this.props.keyboardType || 'default'}
        onChangeText={(text) => this.props.onChangeText(text)}
        value={this.props.value}
        placeholder={this.state.placeholder}
        multiline={this.state.multiline}
        scrollEnabled={false}
        secureTextEntry={this.state.secureTextEntry}
        maxLength={this.state.maxLength}
        editable={!this.props.disabled}
        style={[
          this.state.inputStyle,
          font,
          backgroundColor
        ]}
      />
    )
    
  }

  render() {
    return (
      <View style={this.state.containerStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            {this.label()}
            {this.description()}
          </View>
          {this.switch()}
        </View>
        {this.includeError()}
        {this.input()}
        {this.counter()}
      </View>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  input: {
    padding: 10,
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 10,
      }
    }),
    marginVertical: 10,
    borderRadius: 10,
  },

  label: {
    paddingVertical: 5,
  },
  
  description: {
    color: '#999',
    fontSize: 11
  },

  counterContainer: {
    flexDirection: 'row'
  },

  counterTextStyle: {
    fontSize: 11
  },

  errorMessage: {
    fontSize: 11,
  }
})