import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utills/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = await Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });//this will add the room in the rooms array of hotel schema
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    let { id } = req.params; //hotel id
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        ); //it returns the previous hotel json data, so we need to send new : true
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const roomId = req.params.id;
    try {
        await Room.findByIdAndDelete(roomId);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });//this will add the room in the rooms array of hotel schema
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    let { id } = req.params; //hotel id
    try {
        const room = await Hotel.findById(id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Hotel.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

