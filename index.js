const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'directus_k24',
    password: '123456',
    port: 5432
});

// app.get("/Product", db.getProduct);
// app.get("/Product/:id", db.getProductById);
// app.put("/Product/:id", db.updateProduct);
// app.post("/Product", db.createProduct);
// app.delete("/Product/:id", db.deleteProduct);
app.listen(port, () => {
    console.log("Server is running on " + port);
});

app.get("/", (request, response) => {
    response.json({
        info: 'Hello world!'
    });
})

app.get('/api/products', (req, res) => {
    let post = "SELECT * FROM Product";
    let query = pool.query(post, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});