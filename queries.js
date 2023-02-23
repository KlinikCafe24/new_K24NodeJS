const crypto = require('crypto')
const bcrypt = require('bcrypt')
const key = ""
const axios = require('axios')
const otpGenerator = require('otp-generator')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knex')[environment];
const database = require('knex')(configuration);
// const email_node = require('./nodemailer')
const nodemailer = require('nodemailer');


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
    let user_email, user_phone
    if (request.body.email) {
        findEmail(userReq)
            .then(foundUser => {
                user_email = foundUser
                if (request.body.email == user_email.email) {
                    console.log(`Recovery Password will be sent to your Email: ${request.body.email}`);
                    return forgetPassword_email(userReq, foundUser)
                } else {
                    console.log("Email not Found");
                    return request.body.email;
                }
            })
            // .then(email => updateUserPassword(email, user))
            .catch((err) => console.error(err))
    } else if (request.body.phone_number) {
        findPhone(userReq)
            .then(foundUser => {
                user_phone = foundUser
                console.log(request.body.phone_number);
                console.log(user_phone);
                if (user_phone) {
                    if (request.body.phone_number == user_phone.phone) {
                        console.log(`Recovery Password will be sent to ${request.body.phone_number} in Whatsapp`);
                        return forgetPassword_phone(userReq, foundUser)
                    }
                } else {
                    console.log("Phone Number not Found");
                    return request.body.phone_number;
                }
            })
            // .then(password_digest => updateUserPassword(password_digest, user))
            .catch((err) => console.error(err))
    }
}

const editUser = (request, response) => {
    const userReq = request.body
    let edit_user
    findUser(userReq)
        .then(foundUser => {
            edit_user = foundUser
            console.log(edit_user);
        })
        .then(() => updateUser(edit_user))
        .then(token => updateUserToken(token, edit_user))
        .then(password_digest => updateUserPassword(password_digest, edit_user))
        .then(edit_user => {
            response.status(200).json({ edit_user })
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
            "UPDATE directus_users(name,email,phone,gender,born_date,address,kelurahan,kecamatan,kota,provinsi,password_digest) SET (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE id = ? RETURNING id,name,email,phone,token", [user.name, user.email, user.phone_number, user.gender, user.born_date, user.address, user.kelurahan, user.kecamatan, user.kota, user.provinsi, user.password_digest, user.token, user.id]
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
        Buffer.compare(reqPhone, foundUser, (err, response) => {
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
    const link = "klinikcafe24.com"
    const send = {
        method: 'POST',
        url: 'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'API-Key': '977e9273aa133d2550255c0a14ebff7084e3a5cda4b77d1be1e109d7909051d2'
        },
        data: {
            phone: userReq.phone_number,
            messageType: 'otp',
            body: `Hi, This is your link for recovery & reset password: ` + link
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

const forgetPassword_email = (userReq, foundUser) => {
    const link = "klinikcafe24.com"
    const transport = nodemailer.createTransport({
        host: "mail.klinikcafe24.com",
        port: 465,
        auth: {
            user: "visipentabersama@klinikcafe24.com",
            pass: "ProjectWebsite100%"
        },
        secure: true
    });

    transport.sendMail({
            from: "visipentabersama@klinikcafe24.com",
            to: userReq.email,
            subject: "Recovery Password",
            text: "Hi, This is your link for recovery & reset password: " + link,
        })
        .then(console.log, console.error);
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