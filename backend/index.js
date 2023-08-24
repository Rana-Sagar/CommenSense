//index.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors=require('cors');
const mongoose=require('mongoose');
const checkAuth=require('./middleware/check-auth');
const authRouters=require('./routes/auth');
const Image=require('./models/Image')
const path = require('path');
const app = express();
app.use(cors(
  {
    origin:["https://commen-sense.vercel.app"],
    methods:["POST","GET"],
    credentials:true
    
  }
));
app.use(express.json());
app.use('/auth',authRouters);
// After your /upload endpoint
app.use('/images', express.static('Images'));

//connect to mongodb
mongoose.connect("mongodb+srv://sagar:xe4fuHFSID3Y2o3s@cluster0.yyhgt1n.mongodb.net/upload", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));
// Set up multer for image upload

  const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images/');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    }
  })
  const upload=multer({storage:storage});

  app.post('/upload',upload.single('image'),async(req,res)=>{
    // res.send('Image uploaded successfully');
    try {
        const imageUrl = req.file.path; // Assuming multer stores the image in the "path" property
    
        // Create a new Image document and save it
        const image = new Image({ imageUrl });
        await image.save();
    
        res.send('Image uploaded successfully');
      } catch (err) {
        res.status(500).json({ error: 'Error uploading image' });
      }
  })

  app.get('/images', async (req, res) => {
  
    try {
      const images = await Image.find({  });
      res.status(200).json(images);
      console.log(images);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching images' });
    }
  });
  
//server code
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port ${port}`));
