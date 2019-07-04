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

export const BGContainer = Styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

export const Container = Styled.View`
  background-color: #fff;
  justify-content: space-between;
  border-radius: 15px;
  padding: 30px 40px;
`;

export const ContentContainer = Styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const Image = Styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = Styled.Text`
  font-size: 20px;
  color: #3d3d3d;
  margin: 20px;
`;
