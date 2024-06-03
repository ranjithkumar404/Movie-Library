const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cast: {
    type: [String], 
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  runtime: {
    type: Number, 
    required: true,
  },
  genre: {
    type: [String], 
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    movies: [MovieSchema],
    shareableLink: {
    type:String
    },
    isPublic:{
      type:Boolean
    }
  },
  { timestamps: true } // To show the time at which created and updated
);

module.exports = mongoose.model("User", UserSchema);
