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

import Styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Container = Styled.SafeAreaView`
  flex: 1;
  justify-content: space-around;
  margin: 0px 30px;
`;

export const Header = Styled.Text`
  color: #3d3d3d;
  font-size: 35px;
  font-weight: 400;
  text-align: center;
`;

export const Image = Styled.Image`
  width: ${ Dimensions.get('window').width - 60};
  height: 200px;
`;
