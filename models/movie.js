const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },

    director: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },

    duration: {
      type: Number,
      required: [true, 'Это поле должно быть заполнено'],
    },

    year: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },

    description: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },

    image: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильная ссылка',
      },
    },

    trailerLink: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильная ссылка',
      },
    },

    thumbnail: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
      validate: {
        validator: (v) => isURL(v),
        message: 'Неправильная ссылка',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Это поле должно быть заполнено'],
    },

    movieId: {
      type: Number,
      required: [true, 'Это поле должно быть заполнено'],
    },

    nameRU: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },

    nameEN: {
      type: String,
      required: [true, 'Это поле должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
