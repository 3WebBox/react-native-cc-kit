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
  Dimensions,
  ScrollView,
  StyleSheet,
  Pressable
} from 'react-native';

class TopTabs extends Component {
  render() {
    var props = this.props;
    var items = props.items || [];

    if(items.length < 1) return null;
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          ScreenStyle.scrollView,
          props.scrollViewStyle || null
        ]}
        contentContainerStyle={[
          ScreenStyle.contentContainerStyle,
          props.contentContainerStyle || null
        ]}
      >
        {items.map( (item, key) => {
          if(item.show) return <Pressable
            key={key}
            style={item.style || ScreenStyle.itemContainer}
            onPress={item.onPress || null}
            onLongPress={item.onLongPress || null}
            onPressIn={item.onPressIn || null}
            onPressOut={item.onPressOut || null}
          >
            {item.component}
          </Pressable>
        })}
      </ScrollView>
    )
  }
}

const ScreenStyle = StyleSheet.create({
  scrollView: {
    width: Dimensions.get('window').width,
  },
  contentContainerStyle: {
    flexDirection: 'row',
  },
  itemContainer: {
    paddingHorizontal: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
  }
})

export default TopTabs;