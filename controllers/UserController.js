const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    static GetAllUser = async (req, res) => {
        const users = await userModel.find()
        console.log(users);
        res.status(200).json({
            success: true,
            message: 'display successfully',
            users,
        })
    }


    static RegisterUser = async (req, res) => {
        console.log(req.body);
        const { name, email, password, confirmpassword } = req.body
        console.log(req.body);
        const user = await userModel.findOne({ email: email })
        if (user) {
            res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
        } else {
            if (name && email && password && confirmpassword) {
                if (password === confirmpassword) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashpassword = await bcrypt.hash(password, salt)
                        const result = new userModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                        })
                        await result.save()
                        res
                            .status(201)
                            .send({ status: "success", message: "Registration Successfully 😃🍻" });

                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    res .status(200).send({ status: "success", message: "Password and Confirm password does not match" });
                }

            } else {
                res.send({ status: "success", message: "All the mentioned fields are required" });
            }
        }
    }

    
    static verifylogin = async (req, res) => {
        // console.log(req.body);
        try {
            const { email, password } = req.body
            // console.log(req.body);
            const User = await userModel.findOne({ email: email })
            console.log(User)
            if (User != null) {
                const isMatch = await bcrypt.compare(password, User.password)
                if ((User.email == email) && isMatch) {
                    // generate token
                    const token = jwt.sign({ userid: User._id }, process.env.JWT_SECRET_KEY);
                    // console.log(token);
                    res.cookie('token', token)
                    res.status(200).send({ status: "success", message: "LOGIN SUCCESSFULLY WITH WEB TOKEN 😃🍻", "Token": token });
                } else {
                    res.send({ status: "failed", message: "email and password does not match 🙁🙁😥" });
                }
            } else {
                res.send({ status: "failed", message: "you are not registered user 😫😫😫" });
            }

        } catch (err) {
            console.log(err);
        }
    }

    static logout = async (req, res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "Logged Out",
            });

        } catch (err) {
            console.log(error)
        }
    }

    static GetUserDetail = async (req, res) => {
        const user = await userModel.findById(req.user.id)
        res.status(200).json({
            success: true,
            user,
        });

    }

    // user password update
    static updatePassword = async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body
        // console.log(req.body);

        if (oldPassword && newPassword && confirmPassword) {
            // console.log(req.params.id);
            const user = await userModel.findById(req.user.id).select("+password");
            // console.log(user);
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            // console.log(isMatch);
            //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
            if (!isMatch) {
                res.send({ "status": 400, "message": "Old password is incorrect" })
            } else {
                if (newPassword !== confirmPassword) {
                    res.send({ "status": "failed", "message": "password does not match" })
                } else {
                    //const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(newPassword, 10)
                    //console.log(req.user)
                    await userModel.findByIdAndUpdate(req.user.id, { $set: { password: newHashPassword } })
                    res.send({ "status": "success", "message": "Password changed succesfully" })
                }

            }
        }else{
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }


    }

    static DeleteUser = async(req,res)=>{
         // console.log(req.params.id)
        // console.log(req.body)
        try{
            const result = await userModel.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.send({ status: "success", message: "Delete Successfully" });
        }catch(err) 
        {
         console.log(err)
        }
    }
}



module.exports = UserController