import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';

export default class Message extends Component {

  render() {
    var props = this.props;
    var containerStyle = props.containerStyle;
    var titleStyle = props.titleStyle;
    var descriptionStyle = props.descriptionStyle;
    var color = props.color;
    var icon = props.icon;
    var type = props.type || 'normal';
    var styleColor = ScreenStyle.normal;

    if(!icon) {
      console.error('Message requires an icon prop');
      return null;
    }

    switch(type) {
      case 'alert':
        styleColor = ScreenStyle.alert;
        break;

      case 'error':
        styleColor = ScreenStyle.error;
        break;
    }

    return (
      <Pressable
        style={[ ScreenStyle.container, styleColor, containerStyle ]}
        onPress={props.onPress || null}
      >
        <View style={ScreenStyle.iconContainer}>
          {props.icon}
        </View>
        <View style={ScreenStyle.contentContainer}>
          <Text style={[ ScreenStyle.title, titleStyle ]}>
            {props.title}
          </Text>
          {props.description ?
          <Text style={[ ScreenStyle.description, descriptionStyle ]}>
            {props.description}
          </Text> : null }
        </View>
      </Pressable>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  normal: {
    backgroundColor: '#777'
  },

  alert: {
    backgroundColor: '#EAC90E'
  },

  error: {
    backgroundColor: '#CB1414'
  },

  iconContainer: {
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    color: '#fff',
  },
  description: {
    fontSize: 10,
    color: '#fff'
  }
});