const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ShopKeeperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    }, number: {
        type: Number,
        unique: true,
        required: [true, ' Please add a Number'],
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: [true, 'Pleae add a passsword'],
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})




ShopKeeperSchema.methods.getJwtTokenShop = function () {
    const token = jwt.sign({

        number: this.number,
        userId: this._id,

    }, process.env.SECRET
        , {
            expiresIn: "1h"
        }
    )
    return token;
}


module.exports = mongoose.model('shopKeeper', ShopKeeperSchema);