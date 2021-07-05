
const app = require('express')()
const httpServer = require('http').createServer(app)
const options = { cors: { origin: "*" } }
const io = require('socket.io')(httpServer, options)
const pty = require('node-pty')

io.on('connection', socket => {
    console.log('user connected')

    const term = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 35,
        cwd: process.env.HOME,
        env: process.env
    })
    term.on('data', data => {
        socket.emit('message', data)
    })
    socket.on('message', data => {
        term.write(data)
        console.log('message sent')
    })
})
app.get('/test', (req, res) => {
    console.log('it works')
    res.send('gameserver api test endpoint')
})
httpServer.listen(3000)
