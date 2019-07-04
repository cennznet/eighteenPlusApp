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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const GAP_WIDTH = 100;
const GAP_DELTA = 30;
const cameraWindowWidth = SCREEN_WIDTH - GAP_WIDTH;
const gapViewHeight = (SCREEN_HEIGHT - cameraWindowWidth) / 2;
const maskBGColor = 'rgba(0, 0, 0, 0.4)';

export const UpGapView = Styled.View`
  background-color: ${maskBGColor};
  height: ${gapViewHeight - GAP_DELTA};
`;

export const DownGapView = Styled.View`
  background-color: ${maskBGColor};
  height: ${gapViewHeight + GAP_DELTA};
`;

export const SubContainer = Styled.View`
  flex-direction: row;
  height: ${cameraWindowWidth};
`;

export const SubGapView = Styled.View`
  background-color: ${maskBGColor};
  width: ${GAP_WIDTH / 2};
`;

export const WindowContainer = Styled.View`
  border-width: 1;
  border-color: green;
  width: ${cameraWindowWidth};
  background-color: transparent;
`;