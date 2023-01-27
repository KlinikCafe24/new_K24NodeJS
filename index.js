const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.json());
auth.authentication.unless = unless;
app.use(
    auth.authentication.unless({
        path: [
            { url: "/users/createOTP", methods: ["POST"] },
            { url: "/users/verifyOTP", methods: ["POST"] },
        ]
    })
);

server.listen(8087, () => console.log('Berhasil Masuk Server'));