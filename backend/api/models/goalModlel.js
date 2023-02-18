const mongoose = require('mongoose')

const goalsShema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    text: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Goal', goalsShema)