const app = require('express')()
const cors = require('cors')
app.use(cors())

const parser = require('body-parser')
app.use(parser.json())

const httpServer = require('http').createServer(app)

const options = { cors: { origin: "*" } }
const io = require('socket.io')(httpServer, options)
const pty = require('node-pty')

const util = require('util')
const child = require('child_process')
const exec = util.promisify(child.exec)

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

app.get('/ls', async (req, res) => {
    console.log(`doing an ls...`)
    const { stdout, stderr } = await exec('ls')
    res.send({stdout: stdout, stderr: stderr})
})


app.post('/exec', async (req, res) => {
    console.log(`doing a ${req.body.command}`)
    const { stdout, stderr } = await exec(`${req.body.command}`)
    res.send({stdout: stdout, stderr: stderr})
})

app.get('/hostname', async (req, res) => {
    const { stdout, stderr } = await exec('hostname')
    console.log(stdout)
    if (!stderr) {
        res.send(stdout)
    }
})

app.get('/hostState', async (req, res) => {
    const { stdout, stderr } = await exec('./scripts/hosts/hostState.sh')
    console.log(stdout)
    if (!stderr) {
        res.send(stdout)
    }
})




httpServer.listen(3000)
