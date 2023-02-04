const axios = require('axios')

const getProduct = (request, response) => {
    const responseReturn = new ResponseClass();
    pool.query('SELECT * FROM Product', (error, results) => {
        if (error) {
            throw error
        }
        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;
        response.status(200).json(responseReturn);
    })
}
// const config = { Authorization: "Bearer 6xi90t_us68NBlzdVRmjsWPaCqwCtBe1" }
// const getProduct = (req, res) => {
//     axios.get('http://localhost:8055/items/Product', { config }).then(function(response) {
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

// const getProductById = (request, response) => {
//     var responseReturn = new ResponseClass();
//     const id = parseInt(request.params.id)
//     pool.query('SELECT * FROM Product WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         if (results.rowCount == 0) {
//             responseReturn.status = true;
//             responseReturn.code = 404;
//             responseReturn.message = "User not found";
//             responseReturn.data = null;
//         } else {
//             responseReturn.status = true;
//             responseReturn.code = 200;
//             responseReturn.message = "Success";
//             responseReturn.data = results.rows[0];
//         }
//         response.status(200).json(responseReturn);
//     })
// }

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


module.exports = {
    getProduct,
    // getProductById,
    // createProduct,
    // updateProduct,
    // deleteProduct
}