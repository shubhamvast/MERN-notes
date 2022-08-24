const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
    },
    genreId: {
      type: String,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 50,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 50,
      required: true,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  });
  