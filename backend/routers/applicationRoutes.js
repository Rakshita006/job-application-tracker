import express from 'express'
import Application from '../models/application.model.js'
import auth from '../middleware/auth.js'

const router=express.Router()

router.post('/',auth, async(req,res)=>{
  try {
    const application=await Application.create({
      ...req.body,
      userId:req.userId
    })

    res.json(application)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


router.put("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // 🔥 secure filter
      req.body,
      { new: true }
    );

    if (!application) {
      return res.json({ message: "Not allowed or not found" });
    }

    res.json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!application) {
      return res.json({ message: "Not allowed or not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/',auth,async(req,res)=>{
  try {
    const {status,search}=req.query
  
    const filter={
      userId:req.userId
    }
  
    if(status){
      filter.status=status
    }

    if(search){
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } }
      ];
    }
  
    const applications=await Application.find(filter).sort({createdAt:-1})

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

export default router;
