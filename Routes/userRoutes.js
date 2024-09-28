const express = require("express");
const router = express.Router();
const {
  userModel,
  purchaseModel,
  courseModel,
} = require("../Database/app_database");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserAuth } = require("../Authentication/Authentication");

router.post("/signup", async function (req, res) {
  const requiredSchema = z.object({
    email: z
      .string()
      .min(1, "Email field Should not be empty!")
      .email("Should be a valid email!"),
    password: z
      .string()
      .min(8, "Password Must be of minimum 8 characters!")
      .max(24, "Password can have a maximum of 24 characters!")
      .regex(/[A-Z]/, "Password Must contain one uppercase letter!")
      .regex(/[^A-Za-z0-9]/, "Password Must contain one special character!"),
    firstName: z
      .string()
      .min(1, "First Name should not be empty!")
      .max(100, "First Name can have a maximum of 100 characters!")
      .regex(/^[A-Za-z]+$/, "First name Must contain only letters"),
    lastName: z
      .string()
      .min(1, "Last Name should not be empty!")
      .max(100, "Last Name can have a maximum of 100 characters!")
      .regex(/^[A-Za-z]+$/, "Last name Must contain only letters"),
  });

  const parsedWithSuccess = requiredSchema.safeParse(req.body);

  if (!parsedWithSuccess.success) {
    const errorMessages = parsedWithSuccess.error.issues.map(
      (issue) => issue.message
    );
    res.json({
      error: errorMessages,
    });
    return;
  }

  const { email, password, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({
      message: "You are Successfully Signed Up!",
    });
  } catch (e) {
    res.json({
      error: "Email already present. Please Choose another email!",
    });
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      error: "Please provide your complete credientials for login!",
    });
    return;
  }

  const foundUser = await userModel.findOne({
    email,
  });

  if (!foundUser) {
    res.json({
      error: "User Not Found!",
    });
    return;
  }

  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (foundUser && matchPassword) {
    const token = jwt.sign(
      {
        userId: foundUser._id,
      },
      process.env.USER_JWT_SECRET
    );

    res.json({
      message: "You are successfully logged in!",
      userName: foundUser.firstName + " " + foundUser.lastName,
      token: token,
    });
  } else {
    res.json({
      error: "Incorrect Credientials!",
    });
  }
});

router.post("/purchase-course", UserAuth, async function (req, res) {
  const requiredSchema = z.object({
    courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID!"),
  });

  const parsedWithSuccess = requiredSchema.safeParse(req.body);

  if (!parsedWithSuccess.success) {
    const errorMessages = parsedWithSuccess.error.issues.map(
      (issue) => issue.message
    );
    res.json({
      error: errorMessages,
    });
    return;
  }
  const { courseId } = req.body;

  if (!courseId) {
    res.json({
      error: "Please provide the course id of the course you want to purchase!",
    });
    return;
  }

  const foundCourse = await courseModel.findOne({
    _id: courseId,
  });

  if (foundCourse) {
    await purchaseModel.create({
      userId: req.userId,
      courseId: req.body.courseId,
    });

    res.json({
      message: "You have successfully purchased this course!",
    });
  } else {
    res.json({
      error: "Course with provided course id doesn't exist!",
    });
  }
});

router.get("/my-purchased-courses", UserAuth, async function (req, res) {
  const all_purchases = await purchaseModel.find({
    userId: req.userId,
  });

  if (all_purchases.length == 0) {
    res.json({
      empty_message: "You haven't purchased any course yet!",
    });
    return;
  } else {
    const courseIds = all_purchases.map(
      (all_purchase) => all_purchase.courseId
    );

    const Courses = await courseModel.find({ _id: { $in: courseIds } });
    res.json({
      message: Courses,
    });
  }
});

module.exports = router;
