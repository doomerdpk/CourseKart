const express = require("express");
const { courseModel } = require("../Database/app_database");
const router = express.Router();

const CourseRateLimiter = require("../middlewares/ratelimiters/CourseRateLimiter");

router.get("/preview", CourseRateLimiter, async function (req, res) {
  try {
    const all_courses = await courseModel.find({});
    if (all_courses.length == 0) {
      res.status(200).json({
        empty_message: "No Courses Yet!",
      });
    } else {
      res.status(200).json({
        message: all_courses,
      });
    }
  } catch (e) {
    console.error(e);
    res.json({
      empty_message: "Error Fetching Courses",
    });
  }
});

module.exports = router;
