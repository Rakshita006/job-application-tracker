import express from 'express'
import auth from '../middleware/auth.js'
import Application from '../models/application.model.js'
import mongoose from 'mongoose'

 const router=express.Router()

router.get("/stats", auth, async (req, res) => {
  try {

    const stats = await Application.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId)
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // default values
    const result = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Total: 0
    };

    stats.forEach(item => {
      result[item._id] = item.count;
      result.Total += item.count;
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router