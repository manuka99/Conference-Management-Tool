const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_SECRET, AUTH_EXPIRE } = require("../config");

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "First name must not be empty"],
      minlength: [3, "First name must have at least 3 characters."],
      maxlength: [12, "First name must not have more than 12 characters."],
    },

    lname: {
      type: String,
      required: [true, "Last name must not be empty."],
      minlength: [3, "Last name must have at least 3 characters."],
      maxlength: [12, "Last name must not have more than 12 characters."],
    },

    date_Of_birth: {
      type: String,
      required: [true, "Date of birth must not be empty."],
      minlength: [6, "Date of birth must have at least 6 characters."],
      maxlength: [15, "Date of birth must not have more than 15 characters."],
    },

    address: {
      type: String,
      required: [true, "address must not be empty."],
      minlength: [8, "address must have at least 8 characters."],
      maxlength: [65, "address must not have more than 60 characters."],
    },

    phone: {
      type: String,
      required: [true, "Contact number must not be empty."],
      validate: {
        validator: function (v) {
          return /\d{3}-\d{4}-\d{3}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number!. Ex: 077-1234-567`,
      },
    },

    email: {
      type: String,
      required: [true, "Email must not be empty."],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email type.",
      ],
    },

    password: {
      type: String,
      required: [true, "Password must not be empty."],
      minlength: [8, "Password must have at least 8 characters."],
      select: false, // password will not be retrived unless specified
    },

    is_two_factor_enabled: {
      type: Boolean,
      required: false,
    },

    two_factor_secret: {
      type: String,
      required: false,
    },

    two_factor_recovery_codes: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "editor", "reviewer"],
    },

    sub_role: {
      type: String,
      required: false,
      enum: ["researcher", "presenter", "attendee", "inovator"],
    },

    email_verify_token: String,
    email_verified_at: Date,
    password_recovery_token: String,
    password_recovery_expire: Date,
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  // encrypt password if updated
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id,
      username: this.fname + this.lname,
      role: this.role,
      sub_role: this.sub_role,
      is_two_factor_enabled: this.is_two_factor_enabled,
    },
    AUTH_SECRET,
    {
      expiresIn: AUTH_EXPIRE,
    }
  );
};

UserSchema.methods.getPasswordRecoveryToken = function () {
  const recovery_token = crypto.randomBytes(32).toString("hex");
  this.password_recovery_token = bcrypt.hashSync(recovery_token, 10);
  this.password_recovery_expire = Date.now() + 10 * (60 * 1000);
  return recovery_token;
};

module.exports = model("user", UserSchema);
