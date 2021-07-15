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
  View,
  Text,
  Dimensions
} from 'react-native';

import { WebView } from 'react-native-webview';
import { config } from '../../config';

class ActionButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label || null,
      icon: props.icon || null,
      labelColor: props.labelColor || '#666'
    }
  }

  render() {
    var onPress = this.props.onPress || null;

    return (
      <Pressable 
        style={ScreenStyle.actionSheetButton}
        onPress={onPress}
      >
        <Text 
          style={[
            ScreenStyle.actionSheetLabel,
            this.state.icon ? ScreenStyle.actionSheetLabelSpacing : null,
            { color: this.state.labelColor }
          ]}
        >
          {this.state.label}
        </Text>
        {this.state.icon || null}
      </Pressable>
    )
  }
}

class Overlay extends Component {
  render() {
    var props = this.props;
    var type  = props.type || null;

    var render = null;

    // type is required to run
    if(!type) return null;

    if(type == 'actionButtons') {
      if(!props.buttons) {
        console.error('No buttons provided');
        return null;
      }
      
      render = <View style={{paddingBottom: 20}}>
        {props.buttons.map( (btn, key) => {
          return <ActionButton
            key={key}
            label={btn.label}
            icon={btn.icon}
            labelColor={btn.labelColor}
            onPress={btn.onPress}
          />
        })}
      </View>
    }

    if(type == 'component') {
      if(!props.component) return null;

      render = props.component;
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

    if(props.defaultContainer)
      render = <View style={[
        ScreenStyle.defaultContainer,
        props.height ? { height: props.height } : null
      ]}>
        {render}
      </View>
    
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
        {render}
      </Modal>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  closeArea: {
    flex: 1,
  },

  defaultContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation:5,
  },
  
  webView: {
    backgroundColor: 'white',
  },

  actionSheetButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    ...Platform.select({
      ios: { marginHorizontal: 15 }
    })
  },

  actionSheetLabel: {
    flex: 1,
  },

  actionSheetLabelSpacing: {
    paddingRight: 15, 
  }
});

export default Overlay;