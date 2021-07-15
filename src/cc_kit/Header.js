import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Header extends Component {

  render() {

    var props = this.props;
    var containerStyle = props.containerStyle;
    var titleStyle = props.titleStyle;
    var descriptionStyle = props.descriptionStyle;

    return (
      <View style={[
        ScreenStyle.container,
        containerStyle
      ]}>
        <Text style={[
          ScreenStyle.title,
          titleStyle
        ]}>
          {props.title}
        </Text>
        {props.description ?
        <Text style={[
          ScreenStyle.description,
          descriptionStyle
        ]}>
          {props.description}
        </Text> : null }
      </View>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 12,
    color: '#999'
  }
});