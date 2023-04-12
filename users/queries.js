const express = require('express');
const app = express();
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const key = ""
const axios = require('axios')
const otpGenerator = require('otp-generator')
const environment = process.env.NODE_ENV || 'production';
const configuration = require('../knex')[environment];
const database = require('knex')(configuration);
const bodyparser = require("body-parser");
const { MailtrapClient } = require("mailtrap");
require('dotenv').config();
const {
    MAILTRAP_TOKEN,
    MAILTRAP_SENDER,
    URL_WA,
    API_KEY
} = process.env;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true,
}));

// Users Flow Start
const get_user = (request, response) => {
    const getparams = request.params
    findUser(getparams)
        .then(foundUser => {
            console.log(foundUser)
            response.status(200).json(foundUser)
        })
}

const signup = (request, response) => {
    const userREG = request.body
    let user
    if (userREG.email && userREG.phone_number) {
        (findEmail(userREG) && findPhone(userREG))
            .then(foundUser => {
                user = foundUser
                if (user == undefined) {
                    const otp = createOTP();
                    if (userREG.email && userREG.phone_number) {
                        hashPassword(userREG.password)
                            .then((hashedPassword) => {
                                delete userREG.password
                                userREG.password_digest = hashedPassword
                            })
                            .then(() => createToken())
                            .then(token => userREG.token = token)
                            .then(() => authenticate_email(userREG, response))
                            .then(() => createUser(userREG))
                            .then(userREG => {
                                delete userREG.password_digest
                                response.status(201).json({ userREG })
                                console.log(userREG)
                                if (userREG) {
                                    Confirmation_email(userREG)
                                    sendOTP_email(userREG, otp)
                                    sendOTP_phone(userREG, otp)
                                }
                            })
                            .catch((err) => console.error(err))
                            .catch((err) => response.status(500).json({ error: err.message }))
                    }
                } else if (user) {
                    if (userREG.email == user.email) {
                        console.log(`Email ${userREG.email} already being register, Please Signin or input different Email or Phone Number to register!`)
                        response.status(500).json({ error: `Email ${userREG.email} already being register, Please Signin or input different Email Phone Number to register!` })
                    } else if (userREG.phone_number == user.phone) {
                        console.log(`Phone Number ${userREG.phone_number} already being register, Please Signin or input different Phone Number to register!`)
                        response.status(500).json({ error: `Phone Number ${userREG.phone_number} already being register, Please Signin or input different Phone Number to register!` })
                    } else if (userREG.email && userREG.phone_number == user.email && user.phone) {
                        console.log(`Email ${userREG.email} and Phone Number ${userREG.phone_number} already being register, Please Signin or input different Email or Phone Number to register!`)
                        response.status(500).json({ error: `Email ${userREG.email} and Phone Number ${userREG.phone_number} already being register, Please Signin or input different Email Phone Number to register!` })
                    }
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    }
}

const signin = (request, response) => {
    const userREG = request.body
    let user
    if (userREG.email) {
        findEmail(userREG)
            .then(foundUser => {
                user = foundUser
                if (user) {
                    if (user.email_status == true) {
                        checkPassword(userREG.password, foundUser)
                            .then((res) => createToken())
                            .then(token => updateUserToken(token, user))
                            .then(() => {
                                delete user.password_digest
                                console.log(user)
                                console.log("Sign in has been Success!")
                                response.status(200).json(user)
                            })
                    } else {
                        sendOTP_email(userREG)
                        console.log(`Email ${userREG.email} is not Verify, Please Verify first before Login! Email verification has been deliver to ${userREG.email}`)
                        return response.send({
                            message: `Email ${userREG.email} is not Verify, Please Verify first before Login! Email verification has been deliver to ${userREG.email}`
                        }).status(500);
                    }
                } else {
                    console.log(`Email ${userREG.email} is not Register, Please Register first before Login!`)
                    return response.send({
                        message: `Email ${userREG.email} is not Register, Please Register first before Login!`
                    }).status(500);
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    } else if (userREG.phone_number) {
        findPhone(userREG)
            .then(foundUser => {
                user = foundUser
                if (user) {
                    if (user.phone_status == true) {
                        checkPassword(userREG.password, foundUser)
                            .then((res) => createToken())
                            .then(token => updateUserToken(token, user))
                            .then(() => {
                                delete user.password_digest
                                response.status(200).json(user)
                            })
                    } else {
                        sendOTP_phone(userREG, createOTP())
                        console.log(`Phone Number ${userREG.phone_number} is not Verify, Please Verify first before Login! Phone Number verification has been deliver to ${userREG.phone_number}`)
                        return response.send({
                            message: `Phone Number ${userREG.phone_number} is not Verify, Please Verify first before Login! Phone Number verification has been deliver to ${userREG.phone_number}`
                        }).status(500);
                    }
                } else {
                    console.log(`Phone Number ${userREG.phone_number} is not Register, Please Register first before Login!`)
                    return response.send({
                        message: `Phone Number ${userREG.phone_number} is not Register, Please Register first before Login!`
                    }).status(500);
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    }
}

const forgetPassword = (request, response) => {
    const userREG = request.body
    let user_email, user_phone
    if (userREG.email) {
        findEmail(userREG)
            .then(foundUser => {
                user_email = foundUser
                if (user_email) {
                    if (userREG.email == user_email.email && user_email.email_status == false) {
                        sendOTP_email(userREG)
                        console.log(`Email ${userREG.email} is not Verify, Please Verify first!`)
                        response.status(500).json({ error: `Email ${userREG.email} is not Verify, Please Verify first!` })
                    } else {
                        console.log(`Recovery Password will be sent to your Email: ${userREG.email}`)
                        response.status(200).json({ success: `Recovery Password will be sent to ${userREG.email}` })
                        return forgetPassword_email(userREG, foundUser)
                    }
                } else {
                    console.log(`Email ${userREG.email} is not Found, Please Register First`);
                    response.status(500).json({ error: `Email ${userREG.email} is not Found, Please Register First` })
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    } else if (userREG.phone_number) {
        findPhone(userREG)
            .then(foundUser => {
                user_phone = foundUser
                if (user_phone) {
                    if (userREG.phone_number == user_phone.phone && user_phone.phone_status == false) {
                        sendOTP_phone(userREG)
                        console.log(`Phone Number ${userREG.phone_number} is not Verify, Please Verify first!`)
                        response.status(500).json({ error: `Phone Number ${userREG.phone_number} is not Verify, Please Verify first!` })
                    } else {
                        console.log(`Recovery Password will be sent to ${userREG.phone_number} in Whatsapp`)
                        response.status(200).json({ success: `Recovery Password will be sent to ${userREG.phone_number} in Whatsapp` })
                        return forgetPassword_phone(userREG, foundUser)
                    }
                } else {
                    console.log(`Phone Number ${userREG.phone_number} is not Found, Please Register First!`)
                    response.status(500).json({ error: `Phone Number ${userREG.phone_number} is not Found, Please Register First` })
                }
            })
            .catch((err) => console.error(err))
            .catch((err) => response.status(500).json({ error: err.message }))
    }
}

const reset_password = (request, response) => {
    const userREG = request.params
    const reset = request.body
    let user_reset
    findUser(userREG)
        .then(foundUser => {
            user_reset = foundUser
            if (reset.password) {
                hashPassword(reset.password)
                    .then((hashedPassword) => {
                        delete reset.password
                        reset.password_digest = hashedPassword
                        updateUserPassword(user_reset, hashedPassword)
                        if (user_reset) {
                            console.log(user_reset)
                            delete user_reset.password_digest
                            delete user_reset.hash_otp
                            response.status(200).json({ user_reset })
                        }
                    })
                    .catch(err => console.log(err.message))
                    .catch(err => response.status(500).json({ error: err.message }))
            } else {
                console.log("Please input the new password to continue the process");
            }
        })
        .catch(err => console.log(err.message))
        .catch(err => response.status(500).json({ error: err.message }))
}

const editUser = (request, response) => {
    const userREG = request.params
    let edit_user
    findUser(userREG)
        .then(foundUser => {
            edit_user = foundUser
            if (edit_user) {
                updateUser(request, edit_user)
                    .then(edit_user => {
                        console.log(edit_user);
                        response.status(200).json({ edit_user })
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => response.status(500).json({ error: err.message }))
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => response.status(500).json({ error: err.message }))
}

const forgetPassword_phone = (userREG, response) => {
    const link = "klinikcafe24.com"
    const send = {
        method: 'POST',
        url: URL_WA,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'API-Key': API_KEY
        },
        data: {
            phone: userREG.phone_number,
            messageType: 'otp',
            body: "Hi, This is your link for recovery & reset password: " + link
        }
    };

    axios
        .request(send)
        .then(function (feedback) {
            console.log(feedback.data)
            if (feedback.data.data.success == true) {
                console.log(`OTP has been send to ${userREG.phone_number}`)
                // foundUser.status(200).json(feedback.data)
            } else {
                console.log('Failed send OTP')
                // foundUser.status(500).json({ error: err.message })
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

const forgetPassword_email = (userREG, response) => {
    const link = "klinikcafe24.com"
    const RECIPIENT_EMAIL = userREG.email;

    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

    const sender = { name: "PT Visi Penta Bersama", email: MAILTRAP_SENDER };

    client
        .send({
            from: sender,
            to: [{ email: RECIPIENT_EMAIL }],
            subject: "Forget Password Recovery",
            text: "Hi, This is your link for recovery & reset password: " + link,
        })
        .then(console.log, console.error)

}

const sendOTP_email = (userREG, otp) => {
    const RECIPIENT_EMAIL = userREG.email;
    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

    const sender = { name: "PT Visi Penta Bersama", email: MAILTRAP_SENDER };

    client
        .send({
            from: sender,
            to: [{ email: RECIPIENT_EMAIL }],
            subject: "Validate Your Email",
            text: "Hi, Thanks for your validation. Your OTP is " + otp,
        })
        .then(console.log, console.error)
        .then(() => findEmail(userREG))
        .then(foundUser => {
            user = foundUser
            console.log(user);
        })
        .then(() => hashingOTP(otp))
        .then(hash => hashOTP(user, hash))
        .then(() => console.log("OTP Hashing has been success!"))
        .catch((err) => console.error(err))
        .catch((err) => response.status(500).json({ error: err.message }))
}

const sendOTP_phone = (userREG, otp) => {
    const send = {
        method: 'POST',
        url: URL_WA,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'API-Key': API_KEY
        },
        data: {
            phone: `${userREG.phone_number}`,
            messageType: 'otp',
            body: `Hi, Thanks for your validation. Your OTP is ${otp}`
        }
    };

    axios
        .request(send)
        .then(function (feedback) {
            console.log(feedback.data);
            if (feedback.data.data.success == true) {
                console.log(`OTP has been send to ${userREG.phone_number}`);
            } else {
                console.log('Failed send OTP')
            }
        })
        .then(feedback => {
            if (feedback == undefined) {
                console.log('Hashing OTP has been cancel')
            } else if (feedback.data.data.success == true) {
                findPhone(userREG)
                    .then(foundUser => {
                        user = foundUser
                        console.log(user);
                    }).then(() => hashingOTP(otp))
                    .then(hash => hashOTP(user, hash))
                    .then(() => console.log("OTP Hashing has been success!"))
                    .catch((err) => console.error(err))
                    .catch((err) => response.status(500).json({ error: err.message }))
            }
        })

}

const Confirmation_email = (userREG) => {
    const RECIPIENT_EMAIL = userREG.email;

    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

    const sender = { name: "PT Visi Penta Bersama", email: MAILTRAP_SENDER };

    client
        .send({
            from: sender,
            to: [{ email: RECIPIENT_EMAIL }],
            subject: "Confirmation of your Registration",
            text: "Hi, Thanks for your Registration in Klinikcafe24. Hope you will Enjoy your time in this App!"
        })
        .then(console.log, console.error)
}

const validateOTP_email = (request, response) => {
    const userREG = request.body
    const getParamsEmail = request.params
    findEmail(getParamsEmail)
        .then(foundUser => {
            user = foundUser
            console.log(user);
        })
        .then(() => findHashByEmail(getParamsEmail))
        .then(hash => {
            user_hash = hash
            console.log(user_hash.hash_otp)
            console.log(userREG.otp);
            if (user_hash) {
                bcrypt.compare(userREG.otp, user_hash.hash_otp)
                    .then(result => {
                        console.log(result);
                        if (result) {
                            console.log("OTP Matched");
                            return response.json({
                                "message": "OTP Matched"
                            }).status(200);
                        } else {
                            console.log("OTP is no Valid/Match");
                            return response.json({
                                "message": "OTP is no Valid/Match"
                            }).status(404);
                        }
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => response.status(500).json({ error: err.message }))
            } else {
                console.log("OTP is not Provided");
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => response.status(500).json({ error: err.message }))
}
const verifyOTP_email = (request, response) => {
    const userREG = request.body
    const getParamsEmail = request.params
    findEmail(getParamsEmail)
        .then(foundUser => {
            user = foundUser
            console.log(user);
        })
        .then(() => findHashByEmail(getParamsEmail))
        .then(hash => {
            user_hash = hash
            console.log(user_hash.hash_otp)
            console.log(userREG.otp);
            if (user_hash) {
                bcrypt.compare(userREG.otp, user_hash.hash_otp)
                    .then(result => {
                        console.log(result);
                        if (result) {
                            console.log("OTP Matched");
                            const status = true;
                            if (getParamsEmail.email) {
                                database.raw("UPDATE directus_users SET email_status = ? WHERE email = ? RETURNING email_status", [status, getParamsEmail.email])
                                    .then((data) => data.rows[0])
                                    .then(user_hash => delete user_hash.hash_otp)
                                console.log(`OTP is Valid, Your Email ${getParamsEmail.email} Activation Success! You Can Login Now!`);
                                response.json({
                                    "message": `OTP is Valid, Your Email ${getParamsEmail.email} Activation Success! You Can Login Now!`
                                }).status(200);
                            }
                        } else {
                            console.log("Valid OTP Failed");
                            return response.json({
                                "message": "Valid OTP Failed"
                            }).status(404);
                        }
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => response.status(500).json({ error: err.message }))
            } else {
                console.log("OTP is not Provided");
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => response.status(500).json({ error: err.message }))
}

const verifyOTP_phone = (request, response) => {
    const userREG = request.body
    const getParamsPhone = request.params
    findEmail(getParamsPhone)
        .then(foundUser => {
            user = foundUser
            console.log(user);
        })
        .then(() => findHashByPhone(getParamsPhone))
        .then(hash => {
            user_hash = hash
            console.log(user_hash.hash_otp)
            console.log(userREG.otp);
            if (user_hash) {
                bcrypt.compare(userREG.otp, user_hash.hash_otp)
                    .then(result => {
                        console.log(result);
                        if (result) {
                            console.log("OTP Matched");
                            const status = true;
                            if (getParamsEmail.email) {
                                database.raw("UPDATE directus_users SET email_status = ? WHERE email = ? RETURNING email_status", [status, getParamsEmail.email])
                                    .then((data) => data.rows[0])
                                    .then(user_hash => delete user_hash.hash_otp)
                                console.log(`OTP is Valid, Your Email ${getParamsEmail.email} Activation Success! You Can Login Now!`);
                                response.json({
                                    "message": `OTP is Valid, Your Email ${getParamsEmail.email} Activation Success! You Can Login Now!`
                                }).status(200);
                            }
                        } else {
                            console.log(err.message);
                            return response.json({
                                "message": "Valid OTP Failed"
                            }).status(404);
                        }
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => response.status(500).json({ error: err.message }))
            } else {
                console.log("OTP is not Provided");
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => response.status(500).json({ error: err.message }))

}

// Users Flow End

// Hashing Fuction Start
const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}

const hashingOTP = (otp) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(otp, salt, (err, data) => {
                err ? reject(err) : resolve(data.toString())
                console.log(data);
            })
        })
    })
}

const new_hashingOTP = (userREG) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(userREG.otp, salt, (err, data) => {
                err ? reject(err) : resolve(data.toString())
                console.log(data);
            })
        })
    })
}

// Hashsing Function End

// Create Function Start
const createUser = (user) => {
    const id = crypto.randomUUID();
    console.log(id);
    return database.raw(
        "INSERT INTO directus_users(id,name,email,phone ,password_digest, token) VALUES (?, ?, ?, ?, ?, ?) RETURNING id,name,email,phone,password_digest, token", [id, user.name, user.email, user.phone_number, user.password_digest, user.token]
    )
        .then((data) => data.rows[0])
}

const createOTP = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    console.log(otp)
    return otp
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}

// Create Function End

// Update Function Start
const updateUser = (request) => {
    const getparams = request.params
    const user = request.body
    return database.raw(
        "UPDATE directus_users SET name = ?,gender = ?,born_date = ?,address = ?,kelurahan = ?,kecamatan = ?,kota = ?,provinsi = ? WHERE id = ? RETURNING id,name,email,phone,gender,born_date,address,kelurahan,kecamatan,kota,provinsi,token", [user.name, user.gender, user.born_date, user.address, user.kelurahan, user.kecamatan, user.kota, user.provinsi, getparams.id]
    )
        .then((data) => data.rows[0])
}

const updateUserPassword = (user_reset, hashedPassword) => {
    return database.raw("UPDATE directus_users SET password_digest = ? WHERE id = ? RETURNING id, name, password_digest", [hashedPassword, user_reset.id])
        .then((data) => data.rows[0])
}

const updateUserToken = (token, edit_user) => {
    return database.raw("UPDATE directus_users SET token = ? WHERE id = ? RETURNING id, name, token", [token, edit_user.id])
        .then((data) => data.rows[0])
}

const hashOTP = (user, hash) => {
    return database.raw(
        "UPDATE directus_users SET hash_otp = ? where id = ? RETURNING hash_otp", [hash, user.id]
    )
        .then((data) => data.rows[0])
}

// Update Function End


// Find Function Start
const findUser = (getparams) => {
    return database.raw("SELECT * FROM directus_users WHERE id = ?", [getparams.id])
        .then((data) => data.rows[0])
}

const findEmail = (userREG) => {
    return database.raw("SELECT * FROM directus_users WHERE email = ?", [userREG.email])
        .then((data) => data.rows[0])
}

const findPhone = (userREG) => {
    return database.raw("SELECT * FROM directus_users WHERE phone = ?", [userREG.phone_number])
        .then((data) => data.rows[0])
}

const findByToken = (token) => {
    return database.raw("SELECT * FROM directus_users WHERE token = ?", [token])
        .then((data) => data.rows[0])
}

const findByEmail = (email) => {
    return database.raw("SELECT * FROM directus_users WHERE email = ?", [email])
        .then((data) => data.rows[0])
}

const findHashByEmail = (getParamsEmail) => {
    return database.raw("SELECT hash_otp FROM directus_users WHERE email = ?", [getParamsEmail.email])
        .then((data) => data.rows[0])
}

const findHashByPhone = (getParamsPhone) => {
    return database.raw("SELECT hash_otp FROM directus_users WHERE phone = ?", [getParamsPhone.phone_number])
        .then((data) => data.rows[0])
}

// Find Function End

// Check Function Start
const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
            if (err) {
                reject(err)
            } else if (response) {
                resolve(response)
            } else {
                console.log({ message: "Username or Password its Wrong" })
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
                console.log({ message: "Phone Number is not Register" })
            }
        })
    )
}

// Check Function End

// Authenticate Function Start
const authenticate = (userREG) => {
    findByToken(userREG.token)
        .then((user) => {
            if (user.name == userREG.name || user.email == userREG.email) {
                return true
            } else {
                return false
            }
        })
}

const authenticate_email = (userREG, response) => {
    findByEmail(userREG.email)
        .then(user => {
            if (user == undefined) {
                console.log(`Email ${userREG.email} in not register and can be use to create new account`)
                return true
            } else {
                console.log(`Email ${userREG.email} already being register, Please Signin or input different Email or Phone Number to register!`)
                response.status(500).json({ error: `Email ${userREG.email} already being register, Please Signin or input different Email Phone Number to register!` })
                return false
            }
        })
}

// Authenticate Function End


const userPhotos = (request, response) => {
    const userREG = request.body
    if (authenticate(userREG)) {
        // handler logic goes here
    } else {
        response.status(404)
    }
}

module.exports = {
    get_user,
    signup,
    signin,
    editUser,
    forgetPassword,
    reset_password,
    findPhone,
    checkPhone,
    createOTP,
    hashingOTP,
    verifyOTP_email,
    verifyOTP_phone,
    validateOTP_email
}