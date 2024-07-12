const ObjectId = require("mongoose").Types.ObjectId;
const apiResponse = require("../utils/response.util");
const BookingService = require("../services/booking.service");
const commonService = require("../services/common.service");
const Booking = require("../models/booking.model.js");

//index;
exports.index = async (req, res, next) => {
  try {
    const data = await BookingService.findAll(req, res, next);
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//show
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filterObject = {
      id,
    };
    const data = await BookingService.find(filterObject, next);
    if (!data) {
      return apiResponse.notFound(
        res,
        `The  record with this id '${id}' doesn't exists`
      );
    }
    return apiResponse.successData(res, "request processed successfully", data);
  } catch (error) {
    next(error);
  }
};

//create
exports.create = async (req, res, next) => {
  try {
    const data = await BookingService.store(req, res, next);
    return apiResponse.recordCreated(res, "record has been created", data);
  } catch (error) {
    next(error);
  }
};

//update
exports.update = async (req, res, next) => {
  try {
    const isUpdated = await BookingService.edit(req, res, next);
    return apiResponse.success(res, "record has been updated");
  } catch (error) {
    next(error);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const removeRole = await commonService.check(Booking, {
      _id: req.params.id,
    });
    if (!removeRole) {
      return apiResponse.notFound(
        res,
        `Booking with this id '${req.params.id}' doesn't exists`
      );
    }
    const isDeleted = await BookingService.remove(req, res);
    if (isDeleted) {
      return apiResponse.success(res, "record has been deleted");
    }
    return apiResponse.Error(res, "record has not been deleted");
  } catch (error) {
    next(error);
  }
};
