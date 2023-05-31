import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import SharpResize from "utils/resize";
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.static("public/uploads"));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("img"), (req, res) => {
  const image = req.file;
  if (!image) {
    res.status(400).send("No file uploaded.");
    return;
  }

  // Resize the uploaded image using Sharp
  const imageToResize = new SharpResize(image, "public/uploads");
  imageToResize.save("paintings", 800);
  imageToResize.save("thumbnails", 20);

  return res.send(
    `Image uploaded and resized successfully.<br><img src="${imageToResize.fullFilePath()}">`
  );
});

const port = process.env.SERVER_PORT;
app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
