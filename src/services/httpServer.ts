import http from 'http'

export function runServer(){
    const server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({result: true}));
        const clientIp = req.socket.remoteAddress?.split(':').pop()
        console.log(clientIp)
        res.end();
    });
    server.listen(8080)
}

