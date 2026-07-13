import asyncHandler from "../utils/asyncHandler.js";
import Place from "../models/Place.js";

// @desc    Get all places (with optional search & category filters)
// @route   GET /api/places
// @access  Public
export const getPlaces = asyncHandler(async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.name = { $regex: search, $options: "i" };

  const places = await Place.find(filter).sort({ createdAt: -1 });
  res.json(places);
});

// @desc    Get nearby places using geospatial query
// @route   GET /api/places/nearby?lng=..&lat=..&radius=..
// @access  Public
export const getNearbyPlaces = asyncHandler(async (req, res) => {
  const { lng, lat, radius = 5000 } = req.query;

  if (!lng || !lat) {
    res.status(400);
    throw new Error("lng and lat query params are required");
  }

  const places = await Place.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [Number(lng), Number(lat)] },
        $maxDistance: Number(radius),
      },
    },
  });

  res.json(places);
});

// @desc    Get single place by id
// @route   GET /api/places/:id
// @access  Public
export const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }
  res.json(place);
});

// @desc    Create a place
// @route   POST /api/places
// @access  Private
export const createPlace = asyncHandler(async (req, res) => {
  const place = await Place.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(place);
});

// @desc    Update a place
// @route   PUT /api/places/:id
// @access  Private
export const updatePlace = asyncHandler(async (req, res) => {
  const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }
  res.json(place);
});

// @desc    Delete a place
// @route   DELETE /api/places/:id
// @access  Private
export const deletePlace = asyncHandler(async (req, res) => {
  const place = await Place.findByIdAndDelete(req.params.id);
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }
  res.json({ message: "Place removed" });
});
