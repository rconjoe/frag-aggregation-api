import express from 'express'

const app = express()


import cors from 'cors'
app.use(cors())


import parser from 'body-parser'
app.use(parser.json())


import { createServer } from 'http'
import { Server } from 'socket.io'
const httpServer = createServer(app)
const options = { cors: { origin: "*" } }
const io = new Server(httpServer, options)

import pty from 'node-pty'

import Team from './classes/Team.js'
const Splyce = new Team('123', 'splyce', 'Splyce', 'SPL', 'USA', 'butts.svg', [], false)
Splyce.create()

import { promisify } from 'util'
import * as child from 'child_process'
const exec = promisify(child.exec)


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





const srv = httpServer.listen(3000)
if (!srv.listening) {
    console.log('shit died')
}
else {
    console.log('listening on port 3k')
}