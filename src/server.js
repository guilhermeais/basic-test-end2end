import {  createServer  } from 'http'
import { once } from 'events'
import { randomUUID } from 'crypto'


function responseJSON(response, data){
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify(data))
}

async function handler(request, response){
  const Database = new Map()
  const {method} = request
  const methods = {
    GET: async () => {
      return responseJSON(response, [...Database.values()])
    },
    POST: async () => {
      const body = await once(request, 'data')
      const bodyParsed = JSON.parse(body)
      if(!bodyParsed.id){
        bodyParsed.id = randomUUID()
      }

      console.log('data received: ',bodyParsed)
      Database.set(bodyParsed.id, bodyParsed)
      return responseJSON(response, {success: true})
    },
    DELETE: async () => {
      Database.clear()
      return responseJSON(response, {success: true})
    }
  }

  return methods[method]()
}
const server = createServer(handler)

export default server 