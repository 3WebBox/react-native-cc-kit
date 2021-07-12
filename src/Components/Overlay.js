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
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View
} from 'react-native';

import { WebView } from 'react-native-webview';
import { config } from '../../config';

class Overlay extends Component {
  render() {
    var props = this.props;
    var type  = props.type || null;

    var render = null;

    // type is required to run
    if(!type) return null;

    if(type == 'component') {
      if(!props.component) return null;

      render = props.component;

      if(props.defaultContainer)
        render = <View style={[
          ScreenStyle.defaultContainer,
          props.height ? { height: props.height } : null
        ]}>
          {render}
        </View>
    }

    if(type == 'webview') {
      if(!props.source) return null

      render = <WebView
        style={ScreenStyle.webView}
        containerStyle={ScreenStyle.webViewContainer}
        source={props.source}
        onNavigationStateChange={props.onNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => <View style={{flex: 1}}>
          <ActivityIndicator size={30} color={config.primaryColor} />
        </View>}
        
      />
    }
    
    return (
      <Modal
        animationType="slide"
        transparent
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={props.containerStyle || { backgroundColor: 'red'}}
      >
        <Pressable
          onPress={props.close}
          style={ScreenStyle.closeArea}
        />
        <View style={ScreenStyle.clearArea} />
        {render}
      </Modal>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  closeArea: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },

  clearArea: {
    flex: 1,
    ...Platform.select({
      ios: { marginTop: 80 },
      android: { marginTop: 100 }
    })
  },

  defaultContainer: {
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 0,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation:5,
  },
  
  webView: {
    backgroundColor: 'white',
  },

  webViewContainer: {
    flex: 1,
    marginTop: 100,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'white',
    
    shadowColor: '#666',
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default Overlay;