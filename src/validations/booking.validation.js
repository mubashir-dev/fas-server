const yup = require("yup");

const bookingValidator = {
  store: yup.object().shape({
    pickupLocation: yup.string().required(),
    dropoffLocation: yup.string(),
    vanType: yup.string().required(), //need to change this into an enum
    deliveryTime: yup.date().required(),
  }),
  update: yup.object().shape({
    pickupLocation: yup.string().required(),
    dropoffLocation: yup.string(),
    vanType: yup.string().required(),
    deliveryTime: yup.date().required(),
  }),
};

module.exports = {
  bookingValidator,
};
