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

import _ from 'lodash';

// eslint-disable-next-line
const prefix = (name: string): string => {
  const formatted = name
    .split(' ')
    .map(i => _.capitalize(i))
    .join(' ');
  return `(${formatted})`;
};

const apiActionTypes = (
  name: string
): {
  requested: string,
  completed: string,
  failed: string,
  cancelled: string
} => {
  const p = prefix(name);
  return {
    requested: `${p} Requested`,
    completed: `${p} Completed`,
    failed: `${p} Failed`,
    cancelled: `${p} Cancelled`
  };
};

const changedActionTypes = (name: string): { changed: string } => ({
  changed: `${prefix(name)} Changed`
});

const toggledActionTypes = (name: string): { toggled: string } => ({
  toggled: `${prefix(name)} Toggled`
});

const navigateActionTypes = (name: string): string =>
  `Navigate ${prefix(name)}`;

export {
  apiActionTypes,
  changedActionTypes,
  toggledActionTypes,
  navigateActionTypes
};
