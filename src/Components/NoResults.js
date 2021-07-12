/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// The purpose of this screen is to run app checks and initiations

import React, { Component } from 'react';

import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { config } from '../../config';

import * as RNLocalize from "react-native-localize";
import LocalizedStrings from 'localized-strings';
import { language } from '../local/index';

var lang = {
  fontFamily: {
    normal: Platform.OS === 'ios' ? 'OpenSans' : 'OpenSans-Regular',
    bold: 'OpenSans-Bold',
  },
};

AsyncStorage.getItem('language').then(
  data => {
    
    if(data) lang = new LocalizedStrings(language, {
      customLanguageInterface: () => data
    });

    else lang = new LocalizedStrings(language, {
      customLanguageInterface: () => RNLocalize.getLocales()[0].languageCode
    });
  }
);

class NoResults extends Component {
  render() {
    var props = this.props;
    var title  = props.title || lang.g.noResultsFound;
    var note = props.note || lang.g.pullToRefresh
    var topPadding = props.topPadding || 0
    var containerStyle = props.containerStyle || {};
    var color = props.color || '#aaa';

    var titleFontSize = props.titleFontSize || 22;
    var noteFontSize = props.noteFontSize || 11;
    var iconSize = props.iconSize || 40;

    var loading = props.loading || false;

    if(loading) {
      return <View style={ScreenStyle.loadingCotnaienr}>
        <ActivityIndicator size={80} color={config.primaryColor} />
        <Text style={ScreenStyle.loadingLargeTitle}>Loading please wait...</Text>
        <Text style={ScreenStyle.loadingLargeDescription}>
          We are preparing things for you, this shouldn't take long
        </Text>
      </View>
    }

    if(this.props.horizontal) return (
      <Pressable 
        onPress={this.props.onPress ? this.props.onPress : () => null}
        style={[{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center', 
          paddingTop: topPadding,
        }, containerStyle]}
      >
        <Icon name='alert-circle' size={iconSize} color={color} />
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text 
            style={{
              color: color,
              fontSize: titleFontSize,
              fontFamily: lang.fontFamily.bold,
              paddingBottom: 0,
            }}
          >
            {title}
          </Text>
          <Text 
            style={{
              color: color, 
              fontSize: noteFontSize,
              fontFamily: lang.fontFamily.normal,
              paddingTop: 0,
            }}
          >
            {note}
          </Text>
        </View>
      </Pressable>
    )
    
    return (
      <Pressable 
        onPress={this.props.onPress ? this.props.onPress : () => null}
        style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          paddingTop: topPadding
        }}
      >
        <Icon name='alert' size={40} color={color} />
        <Text 
          style={{
            color: color, 
            paddingVertical: 10,
            fontSize: config.largeFontSize,
            fontFamily: lang.fontFamily.bold,
          }}
        >
          {title}
        </Text>
        <Text 
          style={{
            color: color, 
            fontSize: config.smallFontSize,
            fontFamily: lang.fontFamily.normal,
            textAlign: 'center',
            paddingHorizontal: 40
          }}
        >
          {note}
        </Text>
      </Pressable>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  loadingCotnaienr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingLargeTitle: {
    fontFamily: lang.fontFamily.bold,
    fontSize: config.largeFontSize,
    marginTop: 30
  },
  loadingLargeDescription: {
    fontFamily: lang.fontFamily.normal,
    fontSize: config.smallFontSize,
    marginTop: 10,
    marginHorizontal: 30,
    textAlign: 'center'
  }
});

export default NoResults;