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

process.browser = true;

if (typeof global.Buffer !== 'undefined') {
  // running on VSCode debugger
  global.Buffer = undefined;
}

require('crypto');
const RNCrypto = require('react-native-crypto');

// fix wasm-crypto-js, this polyfil should implement in `react-native-crypto` or `wasm-crypto-js`
// eslint-disable-next-line import/no-extraneous-dependencies
const safeBuffer = require('safe-buffer');

const { Buffer } = safeBuffer;
const kBufferMaxLength = safeBuffer.kMaxLength;
// eslint-disable-next-line no-restricted-properties
const kMaxUint32 = Math.pow(2, 32) - 1;

function assertOffset(offset, length) {
  // eslint-disable-next-line no-self-compare
  if (typeof offset !== 'number' || offset !== offset) {
    throw new TypeError('offset must be a number');
  }

  if (offset > kMaxUint32 || offset < 0) {
    throw new TypeError('offset must be a uint32');
  }

  if (offset > kBufferMaxLength || offset > length) {
    throw new RangeError('offset out of range');
  }
}

function assertSize(size, offset, length) {
  // eslint-disable-next-line no-self-compare
  if (typeof size !== 'number' || size !== size) {
    throw new TypeError('size must be a number');
  }

  if (size > kMaxUint32 || size < 0) {
    throw new TypeError('size must be a uint32');
  }

  if (size + offset > length || size > kBufferMaxLength) {
    throw new RangeError('buffer too small');
  }
}

function actualFill(buf, offset, size) {
  const ourBuf = buf.buffer;
  const uint = new Uint8Array(ourBuf, offset, size);
  crypto.getRandomValues(uint);
  return buf;
}

RNCrypto.randomFillSync = function randomFillSync(buf, offset, size) {
    if (typeof offset === 'undefined') {
      offset = 0; // eslint-disable-line no-param-reassign
    }
    if (!Buffer.isBuffer(buf) && !(buf instanceof global.Uint8Array)) {
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    }

    assertOffset(offset, buf.length);

    if (size === undefined) size = buf.length - offset; // eslint-disable-line no-param-reassign

    assertSize(size, offset, buf.length);

    return actualFill(buf, offset, size);
  };
