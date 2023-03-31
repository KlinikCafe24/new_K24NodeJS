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

// router.post('/charge_cc', (req, res) => {
//     const cc = req.body
//     axios.post('/v2/charge', {
//             payment_type: cc.payment_type,
//             transaction_details: { gross_amount: cc.gross_amount, order_id: cc.order_id },
//             credit_card: { token_id: cc.token_id, authentication: true }
//         })
//         .then(response => res.json(response.data))
//         .catch(err => res.send(err))
// })


// router.post('/charge_dd', (req, res) => {
//     const cc = req.body
//     axios.post('/v2/charge', {
//             payment_type: cc.payment_type,
//             transaction_details: { gross_amount: cc.gross_amount, order_id: cc.order_id },
//             item_details: { id: cc.id, price: cc.price, quantity: cc.quantity, name: cc.name },
//             customer_details: { first_name: cc.first_name, last_name: cc.last_name, email: cc.email, phone: cc.phone },
//             bca_klikpay: { description: cc.description }
//         })
//         .then(response => res.json(response.data))
//         .catch(err => res.send(err))
// })

// let getCurrentTimestamp = () => {
//     return "" + Math.round(new Date().getTime() / 1000);
//   };

//     const amount = req.body
//     const transaction = {
//         method: 'POST',
//         url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
//         headers: {
//             accept: 'application/json',
//             'content-type': 'application/json',
//             authorization: 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
//         },
//         data: {
//             transaction_details: { order_id: uuidv4(), gross_amount: amount.gross_amount },
//             credit_card: {
//                 "secure": true,
//                 "bank": "bca",
//                 "installment": {
//                     "required": false,
//                     "terms": {
//                         "bni": [3, 6, 12],
//                         "mandiri": [3, 6, 12],
//                         "cimb": [3],
//                         "bca": [3, 6, 12],
//                         "offline": [6, 12]
//                     }
//                 },
//                 "whitelist_bins": [
//                     "48111111",
//                     "41111111"
//                 ]
//             },
//             enabled_payments: [
//                 "credit_card",
//                 "mandiri_clickpay",
//                 "cimb_clicks",
//                 "bca_klikbca",
//                 "bca_klikpay",
//                 "bri_epay",
//                 "echannel",
//                 "indosat_dompetku",
//                 "mandiri_ecash",
//                 "permata_va",
//                 "bca_va",
//                 "bni_va",
//                 "other_va",
//                 "gopay",
//                 "kioson",
//                 "indomaret",
//                 "gci",
//                 "danamon_online"
//             ],
//             callbacks: {
//                 "finish": "https://klinikcafe24.com"
//             },
//         }
//     };
//     axios
//         .request(transaction)
//         .then(function(response) {
//             console.log(response.data);
//             res.json(response.data)
//         })
//         .catch(function(error) {
//             console.error(error);
//             res.send(error)
//         });

// const transport = nodemailer.createTransport({
//     host: "mail.klinikcafe24.com",
//     port: 465,
//     auth: {
//         user: "_mainaccount@klinikcafe24.com",
//         pass: "ProjectWebsite100%"
//     },
//     secure: true
// });

// transport.sendMail({
//         from: "klinikcafe24@klinikcafe24.com",
//         to: userREG.email,
//         subject: "Recovery Password",
//         text: "Hi, This is your link for recovery & reset password: " + link,
//     })
//     .then(console.log, console.error);

// const transport = nodemailer.createTransport({
//     host: "mail.klinikcafe24.com",
//     port: 465,
//     auth: {
//         user: "_mainaccount@klinikcafe24.com",
//         pass: "ProjectWebsite100%"
//     },
//     secure: true
// });

// transport.sendMail({
//         from: "klinikcafe24@klinikcafe24.com",
//         to: userREG.email,
//         subject: "Confirmation of your Registration",
//         text: "Hi, Thanks for your Registration in Klinikcafe24. Hope you will Enjoy your time in this App!",
//     })
//     .then(console.log, console.error)

// const transport = nodemailer.createTransport({
//     host: "mail.klinikcafe24.com",
//     port: 465,
//     auth: {
//         user: "_mainaccount@klinikcafe24.com",
//         pass: "ProjectWebsite100%"
//     },
//     secure: true
// });

// transport.sendMail({
//         from: "klinikcafe24@klinikcafe24.com",
//         to: userREG.email,
//         subject: "Validate Your Email",
//         text: "Hi, Thanks for your validation. Your OTP is " + otp,
//     })
//     .then(console.log, console.error)

// function hashingOTP(userREG, otp) {
//     const getOTP = otp
//     const ttl = 5 * 60 * 1000;
//     const expires = Date.now() + ttl;
//     const data = `${userREG.phone_number}.${getOTP}.${expires}`;
//     const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
//     const fullHash = `${hash}.${expires}`;
//     // const datafull = {
//     //     otp : getOTP,
//     //     expires : expires,
//     //     hash : hash,
//     //     fullhash : fullHash
//     // };
//     console.log(`OTP = ${getOTP}, Expires = ${expires}, Data = ${data}, Hash = ${hash}, FullHash = ${fullHash}`)
// }

// const validate = (userREG, response) => {
//     if (findEmail(userREG) != undefined) {
//         sendOTP_email(userREG.email)
//             .then(() => verifyOTP())
//             .then((verify_email) => {
//                 userREG.email = verify_email
//             })
//             .catch((err) => console.error(err))
//             .catch((err) => response.status(500).json({ error: err.message }))
//             // hashPassword(userREG.password)
//             //     .then((hashedPassword) => {
//             //         delete userREG.password
//             //         userREG.password_digest = hashedPassword
//             //     })
//             //     .then(() => createToken())
//             //     .then(token => userREG.token = token)
//             //     .then(() => createUser(userREG))
//             //     .then(userREG => {
//             //         delete userREG.password_digest
//             //         response.status(201).json({ userREG })
//             //         console.log(userREG);
//             //     })
//             //     .catch((err) => console.error(err))
//             //     .catch((err) => response.status(500).json({ error: err.message }))
//     } else if (findPhone(userREG) != undefined) {
//         createOTP(userREG.phone_number)
//             .then(() => verifyOTP())
//             .then((verify_phone) => {
//                 userREG.phone_number = verify_phone
//             })
//             .catch((err) => console.error(err))
//             .catch((err) => response.status(500).json({ error: err.message }))
//             // hashPassword(userREG.password)
//             //     .then((hashedPassword) => {
//             //         delete userREG.password
//             //         userREG.password_digest = hashedPassword
//             //     })
//             //     .then(() => createToken())
//             //     .then(token => userREG.token = token)
//             //     .then(() => createUser(userREG))
//             //     .then(userREG => {
//             //         delete userREG.password_digest
//             //         response.status(201).json({ userREG })
//             //         console.log(userREG);
//             //     })
//             //     .catch((err) => console.error(err))
//             //     .catch((err) => response.status(500).json({ error: err.message }))
//     }
// }

// else if (userREG.email) {
//                         sendOTP_email(userREG, otp)
//                         hashPassword(userREG.password)
//                             .then((hashedPassword) => {
//                                 delete userREG.password
//                                 userREG.password_digest = hashedPassword
//                             })
//                             .then(() => createToken())
//                             .then(token => userREG.token = token)
//                             .then(() => createUser(userREG))
//                             .then(userREG => {
//                                 delete userREG.password_digest
//                                 response.status(201).json({ userREG })
//                                 console.log(userREG)
//                                 if (userREG) {
//                                     Confirmation_email(userREG)
//                                 }
//                             })
//                             .catch((err) => console.error(err))
//                             .catch((err) => response.status(500).json({ error: err.message }))
//                     } else if (userREG.phone_number) {
//                         sendOTP_phone(userREG, otp)
//                         hashPassword(userREG.password)
//                             .then((hashedPassword) => {
//                                 delete userREG.password
//                                 userREG.password_digest = hashedPassword
//                             })
//                             .then(() => createToken())
//                             .then(token => userREG.token = token)
//                             .then(() => createUser(userREG))
//                             .then(userREG => {
//                                 delete userREG.password_digest
//                                 response.status(201).json({ userREG })
//                                 console.log(userREG)
//                                 if (userREG) {
//                                     Confirmation_email(userREG)
//                                 }
//                             })
//                             .catch((err) => console.error(err))
//                             .catch((err) => response.status(500).json({ error: err.message }))
//                     }