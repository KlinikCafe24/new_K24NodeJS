const crypto = require('crypto')
const bcrypt = require('bcrypt')
const key = ""
const axios = require('axios')
const otpGenerator = require('otp-generator')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knex')[environment];
const database = require('knex')(configuration);


const signup = (request, response) => {
    const user = request.body
    hashPassword(user.password)
        .then((hashedPassword) => {
            delete user.password
            user.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(() => createUser(user))
        .then(user => {
            delete user.password_digest
            response.status(201).json({ user })
        })
        .catch((err) => console.error(err))
}

const signin = (request, response) => {
    const userReq = request.body
    let user
    if (request.body.email) {
        findEmail(userReq)
            .then(foundUser => {
                user = foundUser
                return checkPassword(userReq.password, foundUser)
            })
            .then((res) => createToken())
            .then(token => updateUserToken(token, user))
            .then(() => {
                delete user.password_digest
                response.status(200).json(user)
            })
            .catch((err) => console.error(err))
    } else if (request.body.phone_number) {
        findPhone(userReq)
            .then(foundUser => {
                user = foundUser
                return checkPassword(userReq.password, foundUser)
            })
            .then((res) => createToken())
            .then(token => updateUserToken(token, user))
            .then(() => {
                delete user.password_digest
                response.status(200).json(user)
            })
            .catch((err) => console.error(err))
    }
}

const forgetPassword = (request, response) => {
    const userReq = request.body
    let user
    if (request.body.email) {
        findEmail(userReq)
            .then(foundUser => {
                user = foundUser
                return forgetPassword_email(userReq, foundUser)
            })
            .then(email => updateUserPassword(email, user))
            .catch((err) => console.error(err))
    } else if (request.body.phone_number) {
        findPhone(userReq)
            .then(foundUser => {
                return checkPhone(userReq, foundUser)
            })
            .then(foundUser => {
                user = foundUser
                return forgetPassword_phone(userReq, foundUser)
            })
            .then(password_digest => updateUserPassword(password_digest, user))
            .catch((err) => console.error(err))
    }
}

const editUser = (request, response) => {
    const user_data = request.params
    const user = request.body
    findUser(user_data.name)
        .then(() => updateUser(user))
        .then(token => updateUserToken(token, user))
        .then(password_digest => updateUserPassword(password_digest, user))
        .then(user => {
            response.status(200).json({ user })
        })
        .catch((err) => console.error(err))
}

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}

const createUser = (user) => {
    const id = crypto.randomUUID();
    console.log(id);
    return database.raw(
            "INSERT INTO directus_users(id,name,email,phone ,password_digest, token) VALUES (?, ?, ?, ?, ?, ?) RETURNING id,name,email,phone,password_digest, token", [id, user.name, user.email, user.phone_number, user.password_digest, user.token]
        )
        .then((data) => data.rows[0])
}

const updateUser = (user) => {
    return database.raw(
            "UPDATE directus_users(name,email,phone,gender,born_date,address,kelurahan,kecamatan,kota,provinsi,password_digest) SET (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE token = " [user.name, user.email, user.phone_number, user.gender, user.born_date, user.address, user.kelurahan, user.kecamatan, user.kota, user.provinsi, user.password_digest, user.token]
        )
        .then((data) => data.rows[0])
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}


const findUser = (userReq) => {
    return database.raw("SELECT * FROM directus_users WHERE name = ?", [userReq.name])
        .then((data) => data.rows[0])
}

const findEmail = (userReq) => {
    return database.raw("SELECT * FROM directus_users WHERE email = ?", [userReq.email])
        .then((data) => data.rows[0])
}

const findPhone = (userReq) => {
    return database.raw("SELECT * FROM directus_users WHERE phone = ?", [userReq.phone_number])
        .then((data) => data.rows[0])
}

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
            if (err) {
                reject(err)
            } else if (response) {
                resolve(response)
            } else {
                console.log({ message: "Username or Password its Wrong" });
            }
        })
    )
}

const checkPhone = (reqPhone, foundUser) => {
    return new Promise((resolve, reject) =>
        database.compare(reqPhone, foundUser, (err, response) => {
            if (err) {
                reject(err)
            } else if (response) {
                resolve(response)
            } else {
                console.log({ message: "Phone Number is not Register" });
            }
        })
    )
}

const forgetPassword_phone = (userReq, foundUser) => {
    const send = {
        method: 'POST',
        url: 'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'API-Key': '977e9273aa133d2550255c0a14ebff7084e3a5cda4b77d1be1e109d7909051d2'
        },
        data: {
            phone: `${userReq.phone_number}`,
            messageType: 'otp',
            body: `Hi, This is your link for recovery & reset password: `
        }
    };
    console.log(userReq.phone_number)

    axios
        .request(send)
        .then(function(feedback) {
            console.log(feedback.data);
            if (feedback.data.data.success == true) {
                console.log(`OTP has been send to ${userReq.phone_number}`);
            } else {
                console.log('Failed send OTP')
            }
        })
        .catch(function(error) {
            console.error(error);
        });
}

const forgetPassword_email = (req) => {
    const restore = req.body
}

const updateUserPassword = (password_digest, user) => {
    return database.raw("UPDATE directus_users SET password_digest = ? WHERE id = ? RETURNING id, name, password_digest", [password_digest, user.id])
        .then((data) => data.rows[0])
}

const updateUserToken = (token, user) => {
    return database.raw("UPDATE directus_users SET token = ? WHERE id = ? RETURNING id, name, token", [token, user.id])
        .then((data) => data.rows[0])
}

const authenticate = (userReq) => {
    findByToken(userReq.token)
        .then((user) => {
            if (user.name == userReq.name || user.email == userReq.email) {
                return true
            } else {
                return false
            }
        })
}

const findByToken = (token) => {
    return database.raw("SELECT * FROM directus_users WHERE token = ?", [token])
        .then((data) => data.rows[0])
}

const userPhotos = (request, response) => {
    const userReq = request.body
    if (authenticate(userReq)) {
        // handler logic goes here
    } else {
        response.status(404)
    }
}

const createOTP = (params, callback) => {
    const otp = otpGenerator.generate(6, {
        numeric: true,
        alphabets: true,
        upperCase: true,
        specialChars: true
    });
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${params.phone_number}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    const send = {
        method: 'POST',
        url: 'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'API-Key': '977e9273aa133d2550255c0a14ebff7084e3a5cda4b77d1be1e109d7909051d2'
        },
        data: {
            phone: `${params.phone_number}`,
            messageType: 'otp',
            body: `Hi, Thanks for your validation. Your OTP is ${otp}`
        }
    };

    console.log(`OTP = ${otp}, Expires = ${expires}, Data = ${data}, Hash = ${hash}, FullHash = ${fullHash}`);

    axios
        .request(send)
        .then(function(feedback) {
            console.log(feedback.data);
            if (feedback.data.data.success == true) {
                console.log(`OTP has been send to ${params.phone_number}`);
            } else {
                console.log('Failed send OTP')
            }
        })
        .catch(function(error) {
            console.error(error);
        });
    // return callback(null, fullHash);
}

const verifyOTP = (params, callback) => {
    let [hashValue, expires] = params.hash.split('.');
    let now = Date.now();
    if (now > parseInt(expires)) return callback("OTP Expired");
    let newCalculateHash = crypto.createHmac("sha256", key).update(data).digest("hex");

    if (newCalculateHash === hashValue) {
        return callback(null, "Success");
    } else {
        return callback("Invalid OTP")
    }
}
module.exports = {
    // getUser,
    // getUserById,
    // addUser,
    // authLogin,
    // checkAuth,
    signup,
    signin,
    editUser,
    forgetPassword,
    findPhone,
    checkPhone,
    createOTP,
    verifyOTP
    // updateProduct,
    // deleteProduct
}

// const config = { Authorization: "Bearer 6xi90t_us68NBlzdVRmjsWPaCqwCtBe1" }
// const getUser = (req, res) => {
//     axios.get('https://y1jeig5s.directus.app/items/user_data', { config }).then(function(response) {
//             res.status(200).json({
//                 status: 1,
//                 data: response.data
//             })
//         })
//         .catch(function(error) {
//             res.status(404).json({
//                 message: error.message
//             })
//         })
// };


// const getUserById = (req, res) => {
//     const id = parseInt(req.params.id);
//     axios.get('https://y1jeig5s.directus.app/items/user_data', $id = { id }, { config }).then(function(response) {
//             res.status(200).json({
//                 status: 1,
//                 data: response.data
//             })
//         })
//         .catch(function(error) {
//             res.status(404).json({
//                 message: error.message
//             })
//         })
// }

// const addUser = (req, res) => {
//     const user = req.body
//     axios.post('https://y1jeig5s.directus.app/items/user_data', {
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             password: user.password
//         }, { config }).then(function(response) {
//             res.status(200).json({
//                 status: 1,
//                 data: response.data
//             })
//             res.json(response.data)
//         })
//         .catch(function(error) {
//             res.status(404).json({
//                 message: error.message
//             })
//             res.send(error)
//         })
// };




// const createProduct = (request, response) => {
//     const { firstname, lastname, origin } = request.body;
//     pool.query('INSERT INTO Product (firstname, lastname, origin) VALUES ($1, $2, $3)', [firstname, lastname, origin], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send("Student added");
//     })
// }

// const updateProduct = (request, response) => {
//     const id = parseInt(request.params.id);
//     var responseReturn = new ResponseClass();
//     try {
//         const { firstname, lastname, origin } = request.body;
//         pool.query('UPDATE Product SET firstname = $1, lastname = $2, origin = $3 WHERE id = $4', [firstname, lastname, origin, id], (error, results) => {
//             if (error) {
//                 throw error
//             }

//             responseReturn.status = true;
//             responseReturn.code = 200;
//             responseReturn.message = "User modification successed";
//             responseReturn.data = null;
//             response.status(200).send(responseReturn);
//         })
//     } catch (error) {
//         responseReturn.status = false;
//         responseReturn.code = 500;
//         responseReturn.message = error.message;
//         responseReturn.data = null
//         response.status(500).json(responseReturn);
//     }
// }

// const deleteProduct = (request, response) => {
//     const id = parseInt(request.params.id)
//     pool.query('DELETE FROM Product WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send("Student deleted");
//     })
// }

// const query = `SELECT * FROM public.directus_users`;
// const authLogin = (req, res) => {
//     const username = req.body.username;
//     const password = crypto.createHmac("sha256", req.body.password).digest("hex");
//     if(username && password)
//     {
//         pool.connect((err) => {
//             if(err) throw err;
//             pool.query(query, (req, res) => {
//                 if(res)
//                 {
//                     res.rows.forEach((element, req) => {
//                         if (username === element.username && password === element.password) {
//                             req.session.id = element.id;
//                             req.session.username = element.username;
//                         } 

//                     });
//                 }
//                 else{
//                     console.log("No Response Data not Found");
//                 }
//             });
//         })
//     }
//     else{
//         return res
//             .status(401)
//             .send({message : "Username or Password Null"})
//     }
// }

// const checkAuth = (req, res, next) => {
//     if (!req.session.id) {
//         res.send('You are not authorized to view this page');
//     } else {
//         next();
//     }
// }