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

import { StyleSheet } from 'react-native';
import Styled from 'styled-components';

export const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Wrapper = Styled.SafeAreaView`
  bottom: 100px;
`;

export const Header = Styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: #e3e4ea;
  padding: 10px 20px;
`;

export const Title = Styled.Text`
  font-size: 35px;
  font-weight: 600;
`;

// claim button
export const ClaimContainer = Styled.TouchableOpacity`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  justify-content: center;
  height: 100px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: #e3e4ea;
`;

export const ClaimTitle = Styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export const Content = Styled.Text`
  font-size: 20px;
  color: #8d8d8d;
  margin-top: 5px
`;

export const Image = Styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 100px;
`;

export const EmptyContainer = Styled.View`
  flex: 1;
  align-items: center;
  padding: 40px;
`;
