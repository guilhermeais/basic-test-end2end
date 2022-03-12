import {  createServer  } from 'http'

async function handler(request, response){
  response.end('Hello World')
}

export default createServer(handler)