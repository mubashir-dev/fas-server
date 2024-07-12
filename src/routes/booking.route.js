const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const { bookingValidator } = require("../validations/booking.validation");
const { validate } = require("../middlewares/validation.middleware");

router.get("/", BookingController.index);
router.get("/:id", BookingController.find);
router.post("/", validate(bookingValidator.store), BookingController.create);
router.patch(
  "/:id",
  validate(bookingValidator.update),
  BookingController.update
);
router.delete("/:id", BookingController.delete);

module.exports = router;
