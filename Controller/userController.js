const user = require('../Model/userModel');
const bcrypt = require('bcrypt');

exports.addUser = (req, res) => {

    const userDetail = new user({
        name: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
    })

    userDetail.save((err, userData) => {
        if (err) {
            res.status(500).json({ message: err.message })
        }
        else {
            res.status(200).json({ message: "user added successfully" })
        }
    })
}


function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}


exports.findUser = (req, res) => {
    user.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (!user) {
            return res.status(400).json({message:'User not found'})
            }
            if (!isValidPassword(user, req.body.password)) {
                return res.status(401).json({message:'Invalid password'})
            }
            
            res.status(200)
                .json({
                   
                    _id: user._id
                   
                })
    })
}


