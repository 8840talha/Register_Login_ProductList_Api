const Product = require('../models/Product')
const mongoose = require('mongoose');

// Code For Adding a Product List Array
exports.add_Product = (req, res) => {
    Product.insertMany(req.body).
        then(product => {
            res.status(200).json({ success: true, message: 'Products Added Sucessfully', products: product })
        }).catch(err => res.status(500).json({ error: err, message: 'Some Error Occured' }))
}

// Code For Adding a getting Product List Array
exports.get_Product_List = (req, res) => {
    Product.find()
        .exec()
        .then(product => {
            if (product.length < 1) {
                return res.status(404).json({ count: product.length, success: false, message: 'No Products Found', product: product })
            }
            res.status(200).json({ count: product.length, success: false, message: 'Products FoundSuccessFully ', product: product })
        })
        .catch(err => {
            return res.status(404).json({ error: err, success: false, message: 'Some Error Occured', })
        })
}



