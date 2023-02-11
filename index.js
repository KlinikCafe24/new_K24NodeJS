const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require('./queries');
const path = require('path')
const crypto = require('crypto');
const cors = require('cors')
const Shipper_apiRouter = require('./routes/shipper_api')
const Midtrans_apiRouter = require('./routes/midtrans_api')
const Sendtalk_apiRouter = require('./routes/sendtalk_api')
    // import pool from "../K24/queries";

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const { Pool } = require("pg");
const { log } = require("console");
const { json } = require("body-parser");
const { response } = require("express");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'directus_k24',
    password: '123456',
    port: 5432
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Postgre Connected...');
});


app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.post('/signup', db.signup)
app.post('/signin', db.signin)

app.use('/shipper_api', Shipper_apiRouter);
app.use('/midtrans_api', Midtrans_apiRouter);
app.use('/sendtalk_api', Sendtalk_apiRouter);

// app.post('/auth', express.urlencoded({ extended: false }), (req, res) => {
//     const username = req.body.username;
//     // const password = crypto.createHmac("sha256", req.body.password).digest("hex");
//     const password = req.body.password;

//     let User = {
//         username: username,
//         password: password
//     }

//     pool.query("SELECT password FROM directus_users WHERE username = $1", [User.username], (err, results) => {

//         // User.username = results.rows[0].username;
//         User.password = results.rows[0].password;

//         if (password == User.password) {
//             req.session.username = username;
//             console.log("Login Successfull, Welcome" + username + { data: User });
//             return res
//                 .status(200)
//                 .send({ data: User });
//         } else {
//             console.log("Username or Password its Wrong");
//             return res
//                 .status(401)
//                 .send({ data: User });
//         }
//     });
//     return res.send({ data: User })
// });

// app.get('/home', db.checkAuth, function(req, res) {
//     res.send('if you are viewing this page it means you are logged in');
// });


// app.get('/logout', function(req, res) {
//     delete req.session.id;
//     res.redirect('/login');
// });


// app.get("/User", db.getUser);
// app.get("/User/:id", db.getUserById);
// // app.put("/User/:id", db.updateUser);
// app.post("/User", db.addUser);
// app.delete("/User/:id", db.deleteUser);