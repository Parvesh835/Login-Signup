const UserModel = require("../Models/UsersModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // user already exist
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409)
            .json({message: `User is already exist, you can't login`, success: false})
        }
        // creating new user model
        const user = new UserModel({ name, email, password });
        // Hashing password 
        user.password = await bcrypt.hash(password, 10)
        // saving user in database
        await user.save();

        res.status(201)
            .json({
                message: `Signup successfully`,
                success: true
            });
    } catch (error) {
        res.status(500)
            .json({
                message: `Internal server error`,
                success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking if user exist
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(403)
            .json({message: `Auth failed email is wrong`, success: false})
        }
        
        // checking password 
        const isPassEqual = await bcrypt.compare(password, existingUser.password);

        //  if password is inncoret
        if (!isPassEqual) {
            return res.status(403)
            .json({message: `Password is inccorect`, success: false})
        }

        // creating jwt token
        const jwtToken = jwt.sign(
            {
                email: existingUser.email, _id: existingUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        ) 

        res.status(200)
            .json({
                message: `Login  successfully`,
                success: true,
                jwtToken,
                email,
                name: existingUser.name
            });
    } catch (error) {
        res.status(500)
            .json({
                message: `Internal server error`,
                success: false
        })
    }
}

module.exports = {signup, login}