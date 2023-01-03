import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: { //hotel, cabin, apartment etc
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String], //as it gonna contains rooms id, so array of string type
    },
    cheapestPrice: { //i am doing this because lets say, there are 100's of rooms, and checking there price, for the cheapest one can be tough 
        type: Number, //sipmle way is admin can update this price
        required: true
    },
    featured: { //in our application we gonna show some featured hotels, that is why we are using it
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Hotel", HotelSchema);