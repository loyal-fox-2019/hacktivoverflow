const app = require('../app')
const http = require('http')
const port = process.env.PORT || 7000

const server = http.createServer(app)


server.listen(port, (err)=>{
    if(err)
      console.log('SERVER ERR \n===========\n', err)
    else
      console.log('Server Listening on Port', port);
       
})