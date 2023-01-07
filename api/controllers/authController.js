import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utills/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username }) //as we have only one user with this username
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"));

        //We will create the token here
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWTSECRET);
        //now what we will do, we will set this token into cookies
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true, //it does not allow to any client script to reach this cookie
            }).
            status(200).
            json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
}