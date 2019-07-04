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

export const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  margin-left: 20px;
`;

export const ContentContainer = Styled.View`
`;

export const ButtonContainer = Styled.View`
  margin: 50px 20px;
  margin-left: 0px;
`;

export const QRContainer = Styled.View`
  margin-top: 40px;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
`;

export const Text = Styled.Text`
  font-size: 20px;
  color: #5d5d5d;
  margin-right: 10px;
`;