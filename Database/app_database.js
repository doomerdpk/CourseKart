const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

const adminSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorName: String,
    creatorId: ObjectId,
  },
  { timestamps: true }
);

const purchaseSchema = new Schema(
  {
    userId: ObjectId,
    courseId: ObjectId,
  },
  { timestamps: true }
);

const logSchema = new Schema(
  {
    requestLog: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);
const logModel = mongoose.model("logs", logSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
  logModel,
};
