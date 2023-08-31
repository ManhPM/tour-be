import Tour from '../models/Tour.js';
import Category from '../models/Category.js';
import Guide from '../models/Guide.js';
import Review from '../models/Review.js';

//Create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
    } catch (error) {
        res.status(500).json({ success: true, message: 'Failed to create. Try again' });
    }
};

export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({ success: true, message: 'Update Successful', data: updatedTour });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Getsingle Tour
export const getDetailTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('guide').populate('category');

        res.status(200).json({ success: true, message: 'Successfully', data: tour });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get All Tour
export const getAllTour = async (req, res) => {
    //For pagination
    const page = parseInt(req.query.page);
    try {
        let tours = await Tour.find({})
            .populate('guide')
            .populate('category')
            .skip(page * 8)
            .limit(8)
            .lean()
            .exec();
        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        res.status(200).json({ success: true, message: 'Successfully', data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTourBySearch = async (req, res) => {
    const city = req.query.city;
    const maxSeats = parseInt(req.query.maxSeats);
    const category = req.query.category;

    try {
        const tours = await Tour.find({ city, maxSeats, category }).populate('guide').populate('category');

        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        res.status(200).json({ success: true, message: 'Successfully', data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({}).populate('guide').populate('category').limit(8);
        const updatedTours = await Promise.all(
            tours.map(async (tour) => {
                const result = await Review.aggregate([
                    { $match: { tourInfo: tour._id } }, // Lọc theo id tour
                    { $group: { _id: '$tourId', averageRating: { $avg: '$rating' } } }, // Tính rating trung bình
                ]);
                if (result.length > 0) {
                    tour.averageRating = Math.round(result[0].averageRating);
                } else {
                    tour.averageRating = 0; // Nếu không có đánh giá, mặc định là 0
                }
                return tour;
            }),
        );
        res.status(200).json({ success: true, message: 'Successfully', data: updatedTours });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
