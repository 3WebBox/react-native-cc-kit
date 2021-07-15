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
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

export default class SelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: props.direction || 'vertical',
      
      options: props.options || null,
      label: props.label || null,
      labelStyle: props.labelStyle || ScreenStyle.label,
      labelFont: props.labelFont || null,
      description: props.description || null,
      descriptionStyle: props.descriptionStyle || ScreenStyle.description,
      descriptionFont: props.descriptionFont || null,

      containerStyle: props.containerStyle || ScreenStyle.container,
      optionContainerStyle: props.optionContainerStyle || ScreenStyle.optionContainer,
      optionItemStyle: props.optionItemStyle || ScreenStyle.optionItem,
      optionItemSelectedStyle: props.optionItemSelectedStyle || ScreenStyle.optionItemSelected,
      errorMessageContainerStyle: props.errorMessageContainerStyle || ScreenStyle.errorMessage,

      error: props.error || false,
      errorColor: props.errorColor || 'red',
    }
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
        this.state.errorMessageContainerStyle,
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

  options = () => {
    if(this.props.children) return (
      <View
        style={this.state.inputStyle}
      >
        {this.props.children}
      </View>
    );

    var render = [];

    this.state.options.forEach( (option, key) => {
      render.push(
        <Pressable
          key={key}
          onPress={option.onPress}
          style={[
            this.state.optionItemStyle,
            (this.state.direction == 'horizontal') ? { marginRight:  10 } : null,
            (option.key === this.props.selectedOption) 
              ? this.state.optionItemSelectedStyle 
              : null,
          ]}
        >
          {
            (option.key === this.props.selectedOption) 
            ? option.selectedComponent 
            : option.component 
          }
        </Pressable>
      );
    })

    if(this.state.direction == 'horizontal') return render = <>
      <ScrollView
        style={[
          this.state.optionContainerStyle,
          {}
        ]}
        horizontal
      >
        {render}
      </ScrollView>
    </>;

    return (
      <View
        style={[
          this.state.optionContainerStyle,
          {}
        ]}
      >
        {render}
      </View>
    );
  }

  render() {
    return (
      <View style={this.state.containerStyle}>
        {this.label()}
        {this.description()}
        {this.includeError()}
        {this.options()}
      </View>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  label: {
    paddingVertical: 5,
  },

  description: {
    color: '#999',
    fontSize: 11
  },

  errorMessage: {
    fontSize: 11,
  },

  optionContainer: {
    padding: 15,
    paddingLeft: 0,
  },

  optionItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  optionItemSelected: {
    backgroundColor: 'red'
  },

})