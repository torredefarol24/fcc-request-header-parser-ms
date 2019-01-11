var express = require('express')
var app = express()
var appPort = process.env.PORT || 3000
var cors = require('cors')

//Enable Cors
// app.use(cors())

//Serve all static files
app.use(express.static("assets"))

// Serve Index.html
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

app.get("/api/whoami", (req, res) => {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var language = req.headers["accept-language"]
    var software = req.headers["user-agent"]

    var context = {
        ipaddress: ip,
        language: language,
        software: software
    }

    res.status(200).json(context)
})


var listenCallback = () => console.log(`Listening on ${appPort}`)

//start listening on port
app.listen(appPort, listenCallback)