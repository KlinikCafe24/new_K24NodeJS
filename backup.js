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