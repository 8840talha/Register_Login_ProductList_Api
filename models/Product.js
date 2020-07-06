const mongoose = require('mongoose')



const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a Price']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});


module.exports = mongoose.model('Product', ProductSchema)