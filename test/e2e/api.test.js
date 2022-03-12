import {jest, expect, test, describe, beforeEach, afterEach} from '@jest/globals'

import supertest from 'supertest'
import server from '../../src/server';

describe('API E2E Test Suite', () => {
  let request;
  beforeEach(async ()=> {
    request = ()=> supertest(server)
  })

    test('GET / - should return and array', async () => {
    const response = await request()
    .get('/')
    const data = JSON.parse(response.text)
    expect(response.status).toBe(200)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })

  test('POST / - should save and item and return success', async () => {
    const response = await request()
    .post('/')
    .send({
      nome: 'guilherme',
      age: 18
    })
    const expectedResponse = {success: true}
    const data = JSON.parse(response.text)

    expect(response.status).toBe(200)
    expect(data).toStrictEqual(expectedResponse)
  })

  test.todo('DELETE / - should delete an item and return success')
});