import User from "./models/User.js";
import Booking from "./models/Booking.js";
import Category from "./models/Category.js";
import Coupon from "./models/Coupon.js";
import Guide from "./models/Guide.js";
import Itinerary from "./models/Itinerary.js";
import Payment from "./models/Payment.js";
import Rating from "./models/Rating.js";
import Review from "./models/Review.js";
import Tour from "./models/Tour.js";
import mongoose from "mongoose";


async function deleteCollection(collectionName) {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb+srv://rinktvn2525:0905138221thinh@cluster0.dpawfmv.mongodb.net/tours_booking?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    const collection = db.collection(collectionName);
  
    try {
      await collection.drop();
      console.log(`Collection ${collectionName} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting collection ${collectionName}:`, error);
    }
  }

async function deleteCollections() {
    try {
      await Promise.all([
        deleteCollection('bookings'),
        deleteCollection('categories'),
        deleteCollection('coupons'),
        deleteCollection('guides'),
        deleteCollection('itineraries'),
        deleteCollection('payments'),
        deleteCollection('ratings'),
        deleteCollection('reviews'),
        deleteCollection('tours'),
        deleteCollection('users'),
        deleteCollection('wishlists'),
      ]);
      console.log('All collections deleted successfully.');
    } catch (error) {
      console.error('Error deleting collections:', error);
    } finally {
      mongoose.disconnect();
    }
  }

deleteCollections();
