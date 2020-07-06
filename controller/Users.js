const User = require('../models/User');
const Shopkeeper = require('../models/Shopkeeper')
const bcrypt = require('bcrypt')

// Register code for user
exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: 'false',
                message: 'Some error occurred'
            })
        } else {
            req.body.password = hash;
            const NewUser = new User(req.body)

            NewUser.save().then(newUser => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'User SuccessFully Created',
                        name: newUser.name,

                    })
            }).catch(err => res.status(500).json({ success: false, error: err }))
        }
    })
}
// Register code for registering Shopkeeper
exports.Shopkeeper_register = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: 'false',
                message: 'Some error occurred'
            })
        } else {
            req.body.password = hash;
            const NewShop = new Shopkeeper(req.body)

            NewShop.save().then(NewShop => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'Shopkeeper SuccessFully Created',
                        name: NewShop.name,

                    })
            }).catch(err => res.status(500).json({ success: false, error: err }))
        }
    })
}


// Login code for User
exports.login = (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ message: 'Please Enter Email ' })
    }
    if (!req.body.password) {
        return res.status(400).json({ message: 'Please Enter Password ' })
    }
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({ success: 'false', message: 'Invalid credentials' })
                return 1;
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({ success: 'false', message: 'Password wrong ' });
                }
                console.log(result)
                if (result) {
                    const token = user[0].getJwtToken();
                    res.status(200)
                        .json({
                            success: 'true',
                            message: 'Login Successful',
                            token: token
                        })
                    return 1;
                }
                res.status(401).json({ success: 'false', message: 'Invalid credentils' });
                return 1;
            })

        })
        .catch(err => {
            res.status(500).json({ error: err, success: 'false', message: 'Some error occurred' })
            return 1;
        })

}
// Login code for Shopkeeper
exports.Shopkeeper_login = (req, res) => {
    if (!req.body.number) {
        return res.status(400).json({ message: 'Please Enter Number' })
    }
    if (!req.body.password) {
        return res.status(400).json({ message: 'Please Enter Password ' })
    }
    Shopkeeper.find({ number: req.body.number })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({ success: 'false', message: 'Invalid credentials' })
                return 1;
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({ success: 'false', message: 'Password wrong ' });
                }
                if (result) {
                    const token = user[0].getJwtTokenShop();

                    res.status(200)
                        .json({
                            success: 'true',
                            message: 'Login as Shopkeeper Successful',
                            token: token
                        })
                    return 1;
                }
                res.status(401).json({ success: 'false', message: 'Invalid credentils' });
                return 1;
            })

        })
        .catch(err => {
            res.status(500).json({ error: err, success: 'false', message: 'Some error occurred' })
            return 1;
        })

}
