const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../errors/UnathorizedError');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    minlength: [2, 'Минимальная длинна поля - 2'],
    maxlength: [30, 'Максимальная длинна поля - 30'],
  },
  email: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильная почта или пароль');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
