import asyncHandler from "../utils/asyncHandler.js";
import Trip from "../models/Trip.js";

// @desc    Get trips for the logged-in user
// @route   GET /api/trips
// @access  Private
export const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({
    $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
  })
    .populate("stops.place")
    .sort({ createdAt: -1 });

  res.json(trips);
});

// @desc    Get single trip by id
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate("stops.place");
  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }
  res.json(trip);
});

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private
export const createTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.create({ ...req.body, owner: req.user._id });
  res.status(201).json(trip);
});

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
export const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!trip) {
    res.status(404);
    throw new Error("Trip not found or not authorized");
  }
  res.json(trip);
});

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!trip) {
    res.status(404);
    throw new Error("Trip not found or not authorized");
  }
  res.json({ message: "Trip removed" });
});
