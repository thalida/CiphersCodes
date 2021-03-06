'use strict'

import { assert } from 'chai'
import * as atbash from './atbash'

describe('cipher:atbash', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    encoded: 'ZyxwvutsrqponmlkjihgfedcbA - 0123456789',
    notLetters: '!@#$ 01234'
  }

  let testCases = [
    {
      label: 'should encode',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.encoded,
        errorStr: null
      }
    },
    {
      label: 'should decode',
      args: {
        isEncoding: false,
        inputStr: testStrings.encoded
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should error on encode with all special chars and numbers',
      args: {
        isEncoding: true,
        inputStr: testStrings.notLetters
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Atbash requires an input with at least one letter.`
      }
    },
    {
      label: 'should error on decode with all special chars and numbers',
      args: {
        isEncoding: false,
        inputStr: testStrings.notLetters
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Atbash requires an input with at least one letter.`
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = atbash.run(testCase.args)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = atbash.run()
    let defaultArgsResults = atbash.run(atbash.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    let encodeResults = atbash.run({
      isEncoding: true,
      inputStr: testStrings.normal
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = atbash.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.normal,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})
