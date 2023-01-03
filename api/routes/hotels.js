import express from 'express';
import { verifyAdmin } from '../utills/verifyToken.js';
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel, getHotelRooms } from '../controllers/hotelController.js';

const router = express.Router();

//CREATE'
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);

//count by city
router.get("/countByCity", countByCity);

//count by type
router.get("/countByType", countByType);

//count by type
router.get("/room/:id", getHotelRooms);


export default router;