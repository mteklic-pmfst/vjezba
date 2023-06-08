const app = require('./App')
const http = require('http')

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`Server je pokrenut na portu ${process.env.PORT}`)
})