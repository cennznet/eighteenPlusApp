/**
 * Copyright 2019 Centrality Investments Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
import React from 'react';
import { StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import {
  HeaderBackButtonProps,
  NavigationActions,
  NavigationStackScreenOptions
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const defaultTintColor = Platform.select({
  ios: '#333',
  android: '#333'
});

const closeButton = (options: HeaderBackButtonProps, dispatch) =>
  Platform.select({
    ios: (
      <Icon
        name="close"
        size={30}
        style={{ padding: 6 }}
        color={options.tintColor || defaultTintColor}
        onPress={() => dispatch(NavigationActions.back())}
      />
    ),
    android: (
      <Icon
        name="close"
        size={30}
        style={{ padding: 6, marginLeft: 12 }}
        color={options.tintColor || defaultTintColor}
        onPress={() => dispatch(NavigationActions.back())}
      />
    )
  });

const backImage = tintColor => (
  <Icon
    name="keyboard-backspace"
    size={30}
    style={{ padding: 6 }}
    color={tintColor || defaultTintColor}
  />
);

export const modalNavigationOptions = (
  { navigation: { dispatch } },
  header: NavigationStackScreenOptions = {},
  headerStyle: StyleProp<ViewStyle> = {}
) => ({
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
    elevation: 0,
    ...headerStyle
  },
  headerLeft: options => closeButton(options, dispatch),
  headerBackTitle: null,
  ...header
});

export const defaultNavigationOptions = (
  options: NavigationStackScreenOptions = {}
) => ({
  headerTintColor: '#333',
  ...options,
  headerBackImage: ({ tintColor }) => backImage(tintColor),
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    elevation: 0,
    ...options.headerStyle
  }
});
