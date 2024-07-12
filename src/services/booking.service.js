const Booking = require("../models/booking.model");
const apiResponse = require("../utils/response.util");
const ObjectId = require("mongoose").Types.ObjectId;

exports.findAll = async (req, res, next) => {
  try {
    const result = Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          pickupLocation: 1,
          dropoffLocation: 1,
          vanType: 1,
          deliveryTime: 1,
          user: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    next(error);
  }
};

exports.find = async (filterObject, next) => {
  try {
    const { id } = filterObject;

    const result = Booking.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          pickupLocation: 1,
          dropoffLocation: 1,
          vanType: 1,
          deliveryTime: 1,
          user: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  const userId = req.user.id;
  const _booking = Booking.create({
    ...req.body,
    userId,
  });
  return _booking;
};

exports.edit = async (req, res) => {
  const updateBooking = Booking.findOne({ _id: req.params.id });
  const result = updateBooking.updateOne({ ...req.body });
  return result;
};

exports.remove = async (req, res) => {
  const removeBooking = Booking.findOne({ _id: req.params.id });
  const data = removeBooking.deleteOne();
  return data;
};
