'use strict'

import { assert } from 'chai'
import * as keyedSubstitution from './keyedSubstitution'

describe('cipher:keyedSubstitution', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    keyedWithLorem: 'LoremabcdfghijknpqstuvwxyZ - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode with key "lorem"',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: 'lorem' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.keyedWithLorem,
        errorStr: null
      }
    },
    {
      label: 'should decode with key "lorem"',
      args: {
        isEncoding: false,
        inputStr: testStrings.keyedWithLorem,
        inputs: { key: 'lorem' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should encode with key ""',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should decode with key ""',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { key: null }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = keyedSubstitution.run(testCase.args)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = keyedSubstitution.run()
    let defaultArgsResults = keyedSubstitution.run(keyedSubstitution.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'hide' }
    let encodeResults = keyedSubstitution.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = keyedSubstitution.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.normal,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })

  it('should encode and decode with sample inputs', () => {
    const inputs = keyedSubstitution.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['key'])

    let encodeResults = keyedSubstitution.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = keyedSubstitution.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.normal,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})