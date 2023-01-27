//@ts-check
const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Types.String,
      required: true,
    },
    email: {
      type: Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Types.String,
      required: true,
    },
    role: {
      type: Types.String,
      default: "user",
    },
  },
  {
    methods: {
      toRespDTO: function () {
        return {
          name: this.name,
          email: this.email,
          role: this.role,
          id: this.id,
        };
      },
      comparePassword: function (password) {
        return bcryptjs.compare(password, this.password);
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

User.find;
module.exports = User;
