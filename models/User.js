const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    }, email: {
        type: String,
        unique: true,
        required: [true, ' Please add an email'],
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'Please add a Valid email'
        ]
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


UserSchema.methods.getJwtToken = function () {
    const token = jwt.sign({

        email: this.email,
        userId: this._id,

    }, process.env.SECRET
        , {
            expiresIn: "1h"
        }
    )
    return token;
}


module.exports = mongoose.model('User', UserSchema);