import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    let { id } = req.params; //User id
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        ); //it returns the previous hotel json data, so we need to send new : true
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    let { id } = req.params; //hotel id
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User has been Deleted");
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    let { id } = req.params; //hotel id
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}