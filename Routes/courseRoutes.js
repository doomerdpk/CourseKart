const express = require("express");
const { courseModel } = require("../Database/app_database");
const router = express.Router();

router.get("/preview", async function (req, res) {
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
});

module.exports = router;
