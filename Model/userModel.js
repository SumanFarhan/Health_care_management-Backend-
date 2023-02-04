const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            unique: [true, "Email already exist"],
            lowercase: true,
            trim: true,
            required: [true, 'Email not provided'],
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
                },
                message: '{VALUE} is not a valid email address'
            }
        },
        password: {
            type: String,
            // required: [true, 'Please provide a password']
        },
        googleId:{
        type: String
        }
    }
);



module.exports = mongoose.model('User', userSchema);