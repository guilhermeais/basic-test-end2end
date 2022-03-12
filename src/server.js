import {  createServer  } from 'http'
import { once } from 'events'

const Database = new Map()

function responseJSON(response, data){
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(data))
}

async function handler(request, response){
  const {method} = request
  const methods = {
    GET: async () => {
      return responseJSON(response, [...Database.values()])
    },
    POST: async () => {
      const body = await once(request, 'data')
      const bodyParsed = JSON.parse(body)
      console.log('data received: ',bodyParsed)

      return responseJSON(response, {success: true})
    },
    DELETE: async () => {
      return responseJSON(response, {success: true})
    }
  }

  return methods[method]()
}

export default createServer(handler)