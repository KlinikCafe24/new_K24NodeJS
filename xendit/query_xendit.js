const Xendit = require("xendit-node");
const crypto = require("crypto");
require('dotenv').config();
const {
    SECRET_KEY,
    AUTH,
    PUBLISH_KEY
} = process.env;
const xendit = new Xendit({
    secretKey: SECRET_KEY,
    Authorization: AUTH,
    publishKey: PUBLISH_KEY
        //   xenditURL: XENDIT_URL,
});

function get_Balance(request, response) {
    const getBalance = request
    const { Balance } = xendit;
    const balanceSpecificOptions = {};
    const b = new Balance(balanceSpecificOptions)
    b.getBalance({
        accountType: getBalance.account_type,
    }).then(({ balance }) => {
        console.log('Cash balance amount:', balance)
        response.status(200).json(balance);
    });
}

// Customer Start
function create_customer(req, res) {
    const customer = req.body;
    const { Customer } = xendit;
    const c = new Customer({});

    c.createCustomer({
        referenceID: "cust-" + crypto.randomUUID,
        givenNames: customer.name,
        email: customer.email,
        mobileNumber: customer.phone,
        type: "INDIVIDUAL"
    }).then((data_customer) => {
        console.log(data_customer)
        res.status(200).json(data_customer);
    }).then(() => {
        console.log('User/Customer Create has been Success');
    }).catch(e => {
        throw new Error(
            `Customer Create Failed with error: ${e.message}`,
        );
    });
}

function getCustomerbyID(req, res) {
    const customer = req.params
    const { Customer } = xendit;
    const c = new Customer({});

    c.getCustomer({
            id: customer.id
        })
        .then((data_customer) => {
            console.log(data_customer)
            res.status(200).json(data_customer);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function getCustomerbyRef(req, res) {
    const customer = req.params
    const { Customer } = xendit;
    const c = new Customer({});

    c.getCustomer({
            referenceID: customer.reference_id
        })
        .then((data_customer) => {
            console.log(data_customer)
            res.status(200).json(data_customer);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}
// Customer End

// Membuat token untuk data Credit Card
function tokenization(req, res) {
    const getCard = req.body
    const getParam = req.params
    const { Card } = xendit;
    const cardSpecificOptions = {};
    const card = new Card(cardSpecificOptions);
    const tokenData = {
        data: {
            amount: getCard.amount,
            card_data: {
                account_number: getParam.account_number,
                exp_month: getParam.exp_month,
                exp_year: getParam.exp_year
            },
            card_cvn: getCard.cardCVN,
            is_multiple_use: getCard.is_multiple_use,
            should_authenticate: getCard.should_authenticate,
            billing_details: {
                given_names: getCard.given_names,
                surname: getCard.surname,
                email: getCard.email,
                mobile_number: getCard.phone,
                address: {
                    country: "ID",
                    street_line1: getCard.street1,
                    street_line2: getCard.street2,
                    city: getCard.city,
                    province_state: getCard.province,
                    postal_code: getCard.postal
                }
            }
        }
    }
    card.createToken(tokenData)
        .then(function(err, data) {
            console.log(data)
            if (err) {
                console.log(err)
                res.status(500).json(err);
            }
            if (data.status == 'VERIFIED') {
                console.log(data)
                res.status(200).json(data);
            } else if (data.status == 'IN_REVIEW') {
                console.log(data)
                res.status(200).json(data);
            } else if (data.status == 'FAILED') {
                console.log(data)
                res.status(200).json(data);
            }
        })
}


// Membuat Charge Credit Card
function card_service(req, res) {
    const getCard = req.body
    const getParam = req.params
    const { Card } = xendit;
    const cardSpecificOptions = {};
    const card = new Card(cardSpecificOptions);

    const respon = card.createCharge({
        data: {
            tokenID: getParam.token_ID,
            externalID: getParam.external_ID,
            amount: getCard.amount,
            authID: getParam.authID,
            cardCVN: getCard.cardCVN,
            descriptor: getCard.descriptor,
            currency: getCard.currency,
            midLabel: getCard.midLabel,
            billingDetails: {
                given_names: getCard.given_names,
                surname: getCard.surname,
                email: getCard.email,
                phone: getCard.phone,
                address: {
                    street_line1: getCard.street1,
                    street_line2: getCard.street2,
                    city: getCard.city,
                    province_state: getCard.province,
                    postal_code: getCard.postal,
                    country: "ID"
                }
            },
            // "promotion": {
            //     "referenceID": getCard.referenceID,
            //     "originalAmount": getCard.originalAmount
            // },
            installment: {
                count: 30,
                interval: "minutes"
            },
            // "forUserID": getParam.forUserID,
            // "metadata": getCard.metadata,
            // "isRecurring": getCard.isRecurring
        }
    });
    console.log(respon)
    res.status(200).json(respon);
}

// E-wallet charge start
function create_ovo_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                mobileNumber: getCard.mobile_number, //OVO - one time payment required fields
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function create_dana_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                successRedirectURL: "https://klinikcafe24.com",
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function create_linkaja_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                successRedirectURL: "https://klinikcafe24.com",
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function create_shoppepay_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                successRedirectURL: "https://klinikcafe24.com",
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function create_astrapay_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                successRedirectURL: "https://klinikcafe24.com",
                failureRedirectURL: "https://klinikcafe24.com"
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function create_sakuku_charge(req, res) {
    const getCard = req.body
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.createEWalletCharge({
            referenceID: new Date().toISOString(),
            currency: "IDR",
            amount: getCard.amount,
            checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
            channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
            channelProperties: {
                successRedirectURL: "https://klinikcafe24.com",
            },
            payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
            customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
            metadata: {
                branch_area: getCard.branch_area,
                branch_city: getCard.branch_city
            },
        }).then((data) => {
            console.log(data)
            res.status(200).json(data);
        })
        .then(() => {
            console.log('EWallet Payment has been Success')
        })
        .catch(e => {
            throw new Error(
                `Ewallet integration tests failed with error: ${e.message}`,
            );
        });
}

function ewallet_charge_status(req, res) {
    const getParam = req.params
    const { EWallet } = xendit;
    const ewalletSpecificOptions = {};
    const ewallet = new EWallet(ewalletSpecificOptions);

    ewallet.getEWalletChargeStatus({
        chargeID: getParam.charge_ID
    }).then(data => {
        console.log(data)
        res.status(200).json(data);
    })
}
// E-wallet Charge End

// Virtual Account Charge Start
function getBank(req, res) {
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.getVABanks()
        .then((data_bank) => {
            console.log(data_bank)
            res.status(200).json(data_bank);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function create_va_open(req, res) {
    const getVA = req.body
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.getVABanks()
        .then((data_bank) => {
            console.log(data_bank)
        })
    va.createFixedVA({
        externalID: new Date().toISOString(),
        bankCode: getVA.bank_code,
        name: getVA.name
    }).then((data_va) => {
        console.log(data_va)
        res.status(200).json(data_va);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function create_va_close(req, res) {
    const getVA = req.body
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.getVABanks()
        .then((data_bank) => {
            console.log(data_bank)
        })
    va.createFixedVA({
        externalID: new Date().toISOString(),
        bankCode: getVA.bank_code,
        name: getVA.name,
        isClosed: true,
        expectedAmt: getVA.expected_amount,
    }).then((data_va) => {
        console.log(data_va)
        res.status(200).json(data_va);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function getVA(req, res) {
    const getVA = req.params
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.getFixedVA({
            id: getVA.id
        })
        .then((data_va) => {
            console.log(data_va)
            res.status(200).json(data_va);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function updateVA(req, res) {
    const getVA = req.body
    const getParam = req.params
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.updateFixedVA({
            id: getParam.id,
            isSingleUse: getVA.is_single_use,
            expectedAmt: getVA.expected_amount,
            minAmount: getVA.min_amount,
            maxAmount: getVA.max_amount,
            suggestedAmt: getVA.suggested_amount,
            expirationDate: getVA.expiration_date,
            description: getVA.description,
            externalID: getVA.external_id
        })
        .then((data_va) => {
            console.log(data_va)
            res.status(200).json(data_va);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function getPaymentVAbyID(req, res) {
    const getVA = req.params
    const { VirtualAcc } = xendit;
    const va = new VirtualAcc({});

    va.getVAPayment({
            paymentID: getVA.payment_id
        })
        .then((data_retail) => {
            console.log(data_retail)
            res.status(200).json(data_retail);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}
// Virtual Account Charge End

// Retail Outlet Charge Start
function create_retail_charge(req, res) {
    const getRetail = req.body
    const Retail = xendit.RetailOutlet;
    const retail = new Retail({});

    retail.createFixedPaymentCode({
        externalID: new Date().toISOString(),
        retailOutletName: getRetail.retail_name,
        name: getRetail.name,
        expectedAmt: getRetail.expected_amount,
        isSingleUse: true,
        expirationDate: getRetail.expiration_date,
    }).then((data_retail) => {
        console.log(data_retail)
        res.status(200).json(data_retail);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function getRetail(req, res) {
    const getRetail = req.params
    const Retail = xendit.RetailOutlet;
    const retail = new Retail({});

    retail.getFixedPaymentCode({
            id: getRetail.id
        })
        .then((data_retail) => {
            console.log(data_retail)
            res.status(200).json(data_retail);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function updateRetail(req, res) {
    const getParam = req.params
    const getRetail = req.params
    const Retail = xendit.RetailOutlet;
    const retail = new Retail({});

    retail.updateFixedPaymentCode({
            id: getParam.id,
            name: getRetail.name,
            expectedAmt: getRetail.expected_amount,
            expirationDate: getRetail.expiration_date,
        })
        .then((data_retail) => {
            console.log(data_retail)
            res.status(200).json(data_retail);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function retailPayment(req, res) {
    const getParam = req.params
    const getRetail = req.body
    const Retail = xendit.RetailOutlet;
    const retail = new Retail({});

    retail.simulatePayment({
            id: getParam.id,
            retailOutletName: getRetail.retail_name,
            paymentCode: getRetail.payment_code,
            transferAmount: getRetail.transfer_amount,
        })
        .then((data_retail) => {
            console.log(data_retail)
            res.status(200).json(data_retail);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function getPaymentbyID(req, res) {
    const getRetail = req.params
    const Retail = xendit.RetailOutlet;
    const retail = new Retail({});

    retail.getPaymentsByFixedPaymentCodeId({
            id: getRetail.id
        })
        .then((data_retail) => {
            console.log(data_retail)
            res.status(200).json(data_retail);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}
// Retail Outlet Charge End

// Direct Debit Charge Start
function DD_Tokenizatin(req, res) {
    const getDD = req.body
    const getParam = req.params
    const { DirectDebit } = xendit;
    const Debit = new DirectDebit({});

    Debit.initializeTokenization({
        customerID: getParam.id_customer,
        channelCode: getDD.channel_code,
        properties: {
            accountMobileNumber: getDD.account_mobile_number,
            cardLastFour: getDD.card_last_four,
            cardExpiry: getDD.card_expiry,
            accountEmail: getDD.account_email,
        },
    }).then((data_DD) => {
        console.log(data_DD)
        res.status(200).json(data_DD);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}
// Direct Debit Charge End

// QRIS Charge Start
function QR_charge(req, res) {
    const getQR = req.body
    const { QrCode } = xendit;
    const qris = new QrCode({});

    qris.createCode({
        externalID: Date.now().toString(),
        type: getQR.type,
        channelCode: getQR.channel_code,
        callbackURL: 'https://klinikcafe24.com',
        amount: getQR.amount,
    }).then((data_QR) => {
        console.log(data_QR)
        res.status(200).json(data_QR);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function getQRbyID(req, res) {
    const getQR = req.params
    const { QrCode } = xendit;
    const qris = new QrCode({});

    qris.getCode({
            externalID: getQR.external_id
        })
        .then((data_QR) => {
            console.log(data_QR)
            res.status(200).json(data_QR);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}

function QRPayment(req, res) {
    const getQR = req.params
    const { QrCode } = xendit;
    const qris = new QrCode({});

    qris.simulate({
            externalID: getQR.external_id
        })
        .then((data_QR) => {
            console.log(data_QR)
            res.status(200).json(data_QR);
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}
// QRIS Charge End

// Paylater Charge Start
function paylaterPlan(req, res) {
    const pay = req.body
    const customer = req.params
    const PayLater = xendit;
    const plp = new PayLater();

    plp.initiatePayLaterPlans({
        customerID: customer.customer_id,
        channelCode: pay.channel_code,
        currency: 'IDR',
        amount: pay.amount,
        orderItems: {
            type: pay.type,
            referenceID: new Date().toISOString(),
            name: pay.name,
            netUnitAmount: pay.amount_net,
            quantity: pay.quantity,
            url: 'https://klinikcafe24.com',
            category: pay.category
        }
    }).then((data_paylater) => {
        console.log(data_paylater)
        res.status(200).json(data_paylater);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function paylaterCharge(req, res) {
    const pay = req.body
    const customer = req.params
    const PayLater = xendit;
    const plp = new PayLater();

    plp.createPayLaterCharge({
        planID: customer.plan_id,
        referenceID: pay.reference_id,
        checkoutMethod: 'ONE_TIME_PAYMENT',
        successRedirectURL: 'https://klinikcafe24.com',
        failureRedirectURL: 'https://klinikcafe24.com',
    }).then((data_paylater) => {
        console.log(data_paylater)
        res.status(200).json(data_paylater);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function getChargebyID(req, res) {
    const getParam = req.params
    const { PayLater } = xendit;
    const plp = new PayLater({});

    plp.getCharges({
        chargeID: getParam.charge_ID
    }).then((data_paylater) => {
        console.log(data_paylater)
        res.status(200).json(data_paylater);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}

function refundCharge(req, res) {
    const pay = req.body
    const { PayLater } = xendit;
    const plp = new PayLater();

    plp.voidPayLaterCharge({
        chargeID: pay.charge_ID
    }).then((data_paylater) => {
        console.log(data_paylater)
        res.status(200).json(data_paylater);
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err);
    })
}
// Paylater Charge End

module.exports = {
    get_Balance,
    tokenization,
    card_service,
    create_customer,
    getCustomerbyID,
    getCustomerbyRef,
    create_ovo_charge,
    create_dana_charge,
    create_linkaja_charge,
    create_shoppepay_charge,
    create_astrapay_charge,
    // create_jeniuspay_charge,
    create_sakuku_charge,
    ewallet_charge_status,
    getBank,
    create_va_open,
    create_va_close,
    getVA,
    updateVA,
    getPaymentVAbyID,
    create_retail_charge,
    getRetail,
    updateRetail,
    retailPayment,
    getPaymentbyID,
    DD_Tokenizatin,
    QR_charge,
    getQRbyID,
    QRPayment,
    paylaterPlan,
    paylaterCharge,
    getChargebyID,
    refundCharge
}

// card.validateCardNumber(getParam.account_number)
// card.validateExpiry(getParam.exp_month)
// card.validateCvn(getCard.cardCVN)

// function ewallet_charge_void(req, res) {
//     const getParam = req.params
//     const { EWallet } = xendit;
//     const ewalletSpecificOptions = {};
//     const ewallet = new EWallet(ewalletSpecificOptions);

//     ewallet.voidEWalletCharge({
//         chargeID: getParam.charge_ID
//     }).then(data => {
//         console.log(data)
//         res.status(200).json(data);
//     })
// }

// function create_jeniuspay_charge(req, res) {
//     const getCard = req.body
//     const { EWallet } = xendit;
//     const ewalletSpecificOptions = {};
//     const ewallet = new EWallet(ewalletSpecificOptions);

//     ewallet.createEWalletCharge({
//             referenceID: new Date().toISOString(),
//             currency: "IDR",
//             amount: getCard.amount,
//             checkoutMethod: getCard.checkoutMethod, //ONE_TIME_PAYMENT or TOKENIZED_PAYMENT
//             channelCode: getCard.channel_code, //ID_OVO, ID_DANA, ID_LINKAJA, ID_SHOPEEPAY, ID_ASTRAPAY, ID_JENIUSPAY, ID_SAKUKU, PH_PAYMAYA, PH_GCASH, PH_GRABPAY, PH_SHOPEEPAY
//             channelProperties: {
//                 cashtag: 
//             },
//             payment_method_id: getCard.payment_method_id, // required if checkout_method = TOKENIZED_PAYMENT, optional if checkout_method = ONE_TIME_PAYMENT
//             customer_id: getCard.customer_id, //ID of the customer object to which the payment method will be linked to. Use Create Customer API to create your customer
//             metadata: {
//                 branch_area: getCard.branch_area,
//                 branch_city: getCard.branch_city
//             },
//         }).then((data) => {
//             console.log(data)
//             res.status(200).json(data);
//         })
//         .then(() => {
//             console.log('EWallet Payment has been Success')
//         })
//         .catch(e => {
//             throw new Error(
//                 `Ewallet integration tests failed with error: ${e.message}`,
//             );
//         });
// }

// function VAPayment(req, res) {
//     const getParam = req.params
//     const getVA = req.body
//     const { VirtualAcc } = xendit;
//     const va = new VirtualAcc({});

//     va.simulatePayment({
//             externalID: getParam.external_id,
//             amount: getVA.amount
//         })
//         .then(() => {

//         })
//         .then((data_va) => {
//             console.log(data_va)
//             res.status(200).json(data_va);
//         }).catch((err) => {
//             console.log(err)
//             res.status(500).json(err);
//         })
// }

// id: "cust-" + crypto.randomUUID(),
// referenceID: new Date().toISOString(),
// givenNames: customer.first_name,
// middleName: customer.middle_name,
// surname: customer.last_name,
// nationality: customer.nationality,
// place_of_birth: customer.place_birth,
// date_of_birth: customer.date_birth,
// gender: customer.gender, // MALE,FEMALE,OTHER
// employment: {
//     employer_name: customer.employer,
//     nature_of_business: customer.nature_business,
//     role_description: customer.role_descript
// },
// email: customer.email,
// mobileNumber: customer.phone,
// addresses: [{
//     street_line1: customer.street1,
//     street_line2: customer.street2,
//     city: customer.city,
//     province_state: customer.province,
//     postal_code: customer.postal,
//     country: customer.country,
//     category: customer.category, //HOME,WORK, PROVINCIAL
//     is_primary: customer.primary //true
// }],
// identity_accounts: [{
//     type: customer.identity_type,
//     company: customer.identity_company,
//     description: customer.identity_descript,
//     country: customer.identity_country,
//     properties: {
//         tokenID: customer.token_id
//     }
// }],

// addresses: [{
//     street_line1: customer.street1,
//     street_line2: customer.street2,
//     city: customer.city,
//     province_state: customer.province,
//     postal_code: customer.postal,
//     country: "ID",
//     category: customer.category, //HOME,WORK, PROVINCIAL
//     is_primary: customer.primary //true
// }],

// const reqBody_business = JSON.stringify({
//     "id": "cust-" + uuidv4(),
//     "reference_id": "xen_" + uuidv4(),
//     "type": "BUSINESS",
//     "business_detail": {
//         "business_name": customer.business_name,
//         "business_type": customer.business_type,
//         "nature_of_business": customer.nature_of_business,
//         "business_domicile": customer.business_domicile,
//         "date_of_registration": customer.date_of_registration
//     },
//     "email": customer.email,
//     "mobile_number": customer.phone,
//     "addresses": [{
//         "street_line1": customer.street1,
//         "street_line2": customer.street2,
//         "city": customer.city,
//         "province_state": customer.province,
//         "postal_code": customer.postal,
//         "country": customer.country,
//         "category": customer.category, //HOME,WORK, PROVINCIAL
//         "is_primary": custorem.primary //true
//     }],
//     "identity_accounts": [{
//         "type": customer.identity_type,
//         "company": customer.identity_company,
//         "description": customer.identity_descript,
//         "country": customer.identity_country,
//         "properties": {
//             "token_id": "586f0ba2ab70de5d2b409e0d"
//         }
//     }],
// })