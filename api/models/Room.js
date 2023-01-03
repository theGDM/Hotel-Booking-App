import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        default: false
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
}, { timestamps: true }); //it gonna give created and updated at times

// [
//     { number: 101, unavailableDates: [01.05.2022, 02.05.2022] },
//     { number: 102, unavailableDates: [] },
//     { number: 103, unavailableDates: [] },
//     { number: 104, unavailableDates: [] },
//     { number: 105, unavailableDates: [] },
//     { number: 106, unavailableDates: [] },
// ]

export default mongoose.model("Room", RoomSchema);