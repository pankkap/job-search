const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// ➤ CREATE JOB
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET ALL JOBS
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET SINGLE JOB
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ UPDATE JOB
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE JOB
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ FAVORITE JOB
router.put("/favorite/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { isFavorite: !job.isFavorite },
      { new: true },
    );

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
