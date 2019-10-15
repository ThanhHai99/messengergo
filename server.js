var app = require("express")()

var hostname = 'localhost'
var port = 8017

app.get("helloworld",(req, res)=>res.send("<h1>Hello Thanh Hai !</h1>"))
app.listen(port, hostname, ()=> console.log(`App running at ${hostname}:${port}`))
