import Server from './server.js'

const server = Server.listen(3000)
.on('listening', () => console.log(`Listening on port ${server.address().port}`))