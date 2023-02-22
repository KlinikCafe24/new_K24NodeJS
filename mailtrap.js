const fs = require("fs");
const path = require("path");
const { MailtrapClient } = require("mailtrap");
const axios = require("axios");
const request = require('request');


// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain
// const SENDER_EMAIL = "klinikcafe24.dr@gmail.com";
// const RECIPIENT_EMAIL = "backend.dewarangga@gmail.com";

// const client = new MailtrapClient({ headers: { 'Content-Type': 'application/json', 'Api-Token': '183fbe83812adf38f9d137d843d524cf' } });

// const sender = { name: "Mailtrap Send", email: SENDER_EMAIL };
// const reciever = { name: "Mailtrap Recieve", email: RECIPIENT_EMAIL };

// const welcomeImage = fs.readFileSync(path.join(__dirname, "welcome.png"));

const email = {
    method: 'POST',
    url: 'https://send.api.mailtrap.io/api/send',
    headers: { 'Content-Type': 'application/json', 'Api-Token': '183fbe83812adf38f9d137d843d524cf' },
    body: {
        to: [{ email: 'backend.dewarangga@gmail.com', name: 'Stephanus Janu' }],
        // cc: [{ email: 'jane_doe@example.com', name: 'Jane Doe' }],
        // bcc: [{ email: 'james_doe@example.com', name: 'Jim Doe' }],
        from: { email: 'klinikcafe24.dr@gmail.com', name: 'Rudy Setiawan' },
        attachments: [{
            content: 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==',
            filename: 'index.html',
            type: 'text/html',
            disposition: 'attachment',
            //     html: `
            //     <!doctype html>
            //     <html>
            //       <head>
            //         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            //       </head>
            //       <body style="font-family: sans-serif;">
            //         <div style="display: block; margin: auto; max-width: 600px;" class="main">
            //           <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
            //           <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
            //           <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
            //           <p>Now send your email using our fake SMTP server and integration of your choice!</p>
            //           <p>Good luck! Hope it works.</p>
            //         </div>
            //         <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
            //         <style>
            //           .main { background-color: white; }
            //           a:hover { border-left-width: 1em; min-height: 2em; }
            //         </style>
            //       </body>
            //     </html>
            //   `,
        }],
        custom_variables: { user_id: '45982', batch_id: 'PSJ-12' },
        headers: { 'X-Message-Source': 'dev.mydomain.com' },
        subject: 'Your Example Order Confirmation',
        text: 'Congratulations on your order no. 1234',
        category: 'API Test'
    },
    json: true
};

request(email, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
// client
//     .send({
//         category: "test",
//         custom_variables: {
//             hello: "world",
//             year: 2022,
//             anticipated: true,
//         },
//         from: sender,
//         to: [{ email: RECIPIENT_EMAIL }],
//         subject: "Hello from Mailtrap!",

//         // attachments: [{
//         //     filename: "welcome.png",
//         //     content_id: "welcome.png",
//         //     disposition: "inline",
//         //     content: welcomeImage,
//         // }, ],
//     })
//     .then(console.log, console.error);