module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://postgres:123456@127.0.0.1:5432/directus_k24',
        migrations: {
            directory: './db/migrations'
        },
        useNullAsDefault: true
    },

    // production: {
    //     client: 'pg',
    //     connection: process.env.DATABASE_URL,
    //     migrations: {
    //         directory: './db/migrations'
    //     },
    //     seeds: {
    //         directory: './db/seeds/production'
    //     },
    //     useNullAsDefault: true
    // }
};