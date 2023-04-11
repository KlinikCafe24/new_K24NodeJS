require('dotenv').config();
module.exports = {
    // development: {
    //     client: 'pg',
    //     connection: 'postgres://klinikcafe24:ProjectWebsite100%@151.106.120.34:5434/k24_visipenta',
    //     migrations: {
    //         directory: './db/migrations'
    //     },
    //     useNullAsDefault: true
    // },

    production: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            directory: './db/migrations'
        },
        useNullAsDefault: true
    }
};