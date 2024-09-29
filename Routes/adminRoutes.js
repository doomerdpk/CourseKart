const express = require("express");
const { adminModel, courseModel } = require("../Database/app_database");
const router = express.Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminAuth } = require("../Authentication/Authentication");
const AdminRateLimiter = require("../middlewares/ratelimiters/AdminRateLimiter");

router.post("/signup", AdminRateLimiter, async function (req, res) {
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
    await adminModel.create({
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

router.post("/login", AdminRateLimiter, async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      error: "Please provide your complete credientials for login!",
    });
    return;
  }

  const foundUser = await adminModel.findOne({
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
      process.env.ADMIN_JWT_SECRET
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

router.post(
  "/create-course",
  adminAuth,
  AdminRateLimiter,
  async function (req, res) {
    const requiredSchema = z.object({
      title: z.string().min(1, "title of a course cannot be empty!"),
      description: z.string().min(1, "description cannnot be empty!"),
      price: z.number().min(1, "Price of a Course Cannot be empty!"),
      imageUrl: z.string().url().min(1, "Image of the course cannot be empty"),
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

    const { title, description, price, imageUrl } = req.body;

    const foundUser = await adminModel.findOne({
      _id: req.userId,
    });

    const creatorName = foundUser.firstName + " " + foundUser.lastName;
    try {
      await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorName,
        creatorId: req.userId,
      });

      res.json({
        message: `You have successfully created a course with title ${title}`,
      });
    } catch (e) {
      res.json({
        error: "Error Creating Course",
      });
    }
  }
);

router.put(
  "/update-course",
  adminAuth,
  AdminRateLimiter,
  async function (req, res) {
    const requiredSchema = z.object({
      courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID!"),
      updatedtitle: z
        .string()
        .min(1, "Please provided the updated title of the course!"),
      updateddescription: z
        .string()
        .min(1, "Please provided the updated description of the course!"),
      updatedprice: z
        .number()
        .min(1, "Please provided the updated price of the course!"),
      updatedimageUrl: z
        .string()
        .url()
        .min(1, "Please provided the updated Image of the course!"),
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

    const {
      courseId,
      updatedtitle,
      updateddescription,
      updatedprice,
      updatedimageUrl,
    } = req.body;

    const foundCourse = await courseModel.findOne({
      _id: courseId,
    });

    if (!foundCourse) {
      res.json({
        error: `Course with ${courseId} does not exist for you!`,
      });
      return;
    }

    if (foundCourse.creatorId == req.userId) {
      await courseModel.findByIdAndUpdate(courseId, {
        title: updatedtitle,
        description: updateddescription,
        price: updatedprice,
        imageUrl: updatedimageUrl,
      });

      res.json({
        message: "You have successfully updated the course!",
      });
    } else {
      res.json({
        error: "You are not authorized to update this course!",
      });
    }
  }
);

router.delete(
  "/delete-course",
  adminAuth,
  AdminRateLimiter,
  async function (req, res) {
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

    const foundCourse = await courseModel.findOne({
      _id: courseId,
    });

    if (!foundCourse) {
      res.json({
        error: `Course with ${courseId} does not exist for you!`,
      });
      return;
    }

    if (foundCourse.creatorId == req.userId) {
      await courseModel.findByIdAndDelete(courseId);
      res.json({
        message: `You have successfully deleted the course with title ${foundCourse.title}`,
      });
    } else {
      res.json({
        error: "You are not authorized to delete this course!",
      });
    }
  }
);

router.get(
  "/my-created-courses",
  adminAuth,
  AdminRateLimiter,
  async function (req, res) {
    const created_courses = await courseModel.find({
      creatorId: req.userId,
    });

    if (created_courses.length == 0) {
      res.json({
        empty_message: "You haven't created any course yet!",
      });
      return;
    } else {
      res.json({
        message: created_courses,
      });
    }
  }
);

module.exports = router;
