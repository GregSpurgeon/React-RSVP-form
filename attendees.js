const mongoose= require("mongoose") ;

const Response = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    attending: {
      type:Boolean,
    },
    guests: {
      type: Number,
    },
  });

  export const Response = mongoose.model("Guests", Response);