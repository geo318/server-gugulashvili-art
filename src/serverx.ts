import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import sharp from "sharp";
import mongoose, { Document, Schema, Model } from "mongoose";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: function (_, __, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (_, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// // app.use(multer({ storage }).array("img[]"));

interface ImageModel extends Document {
  filename: string;
  originalPath: string;
  smallPath: string;
  largePath: string;
  originalSize: number;
  smallSize: number;
  largeSize: number;
}

// Connect to MongoDB using Mongoose
// mongoose.connect("mongodb://localhost/mydatabase", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Create a Mongoose schema and model for storing images
const imageSchema = new Schema<ImageModel>({
  filename: String,
  originalPath: String,
  smallPath: String,
  largePath: String,
  originalSize: Number,
  smallSize: Number,
  largeSize: Number,
});

// const Image: Model<ImageModel> = mongoose.model<ImageModel>(
//   "Image",
//   imageSchema
// );
// const uploads = multer({ dest: `${__dirname}/uploads` });
// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (_, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploads = multer({ storage }).array("img");
// app.get("/", async (_: Request, res: Response): Promise<void> => {
//   res.send(`<body>hihi</body>`);
// });
// Express.js route for uploading images
app.post("/upload", async (req: Request, res: Response) => {
  // const file = (req?.files as Express.Multer.File[])[0];

  // const originalFilePath: string = file?.path;
  // console.log(originalFilePath, "originalFilePath");
  // // Generate paths for small and large images
  // const smallFilePath: string = path.join("uploads/small", file?.filename);
  // const largeFilePath: string = path.join("uploads/large", file?.filename);

  // await sharp('../uploads/32.webp')
  //   .resize({ width: 300 })
  //   .jpeg({ quality: 80 })
  //   .toFile('../uploads/32-small.webp');
  res.status(200).send('originalFilePath');

  // // Resize and save the large image
  // await sharp(__dirname + "/" + originalFilePath)
  //   .resize({ width: 800 })
  //   .jpeg({ quality: 80 })
  //   .toBuffer();

  // Save the image details to MongoDB using Mongoose
  // const image: ImageModel = new Image({
  //   filename: req.file.filename,
  //   originalPath: originalFilePath,
  //   smallPath: smallFilePath,
  //   largePath: largeFilePath,
  //   originalSize: originalSize,
  //   smallSize: smallSize,
  //   largeSize: largeSize,
  // });
  // await image.save();

  res.json({ success: true });
});
// try {
//   const originalFilePath: string = req!.file!.path;

//   // Generate paths for small and large images
//   const smallFilePath: string = path.join(
//     "uploads/small",
//     req!.file!.filename
//   );
//   const largeFilePath: string = path.join(
//     "uploads/large",
//     req!.file!.filename
//   );

//   // Resize and save the small image
//   await sharp(originalFilePath)
//     .resize({ width: 300 })
//     .jpeg({ quality: 80 })
//     .toFile(smallFilePath);

//   // Resize and save the large image
//   await sharp(originalFilePath)
//     .resize({ width: 800 })
//     .jpeg({ quality: 80 })
//     .toFile(largeFilePath);

//   // Get file size for all versions
//   const originalSize: number = fs.statSync(originalFilePath).size;
//   const smallSize: number = fs.statSync(smallFilePath).size;
//   const largeSize: number = fs.statSync(largeFilePath).size;

//   // Save the image details to MongoDB using Mongoose
//   const image: ImageModel = new Image({
//     filename: req!.file!.filename,
//     originalPath: originalFilePath,
//     smallPath: smallFilePath,
//     largePath: largeFilePath,
//     originalSize: originalSize,
//     smallSize: smallSize,
//     largeSize: largeSize,
//   });
//   await image.save();

//   res.json({ success: true });
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "An error occurred" });
// }

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// import express, { Request, Response } from "express";

// const images = [
//   "https://c.tenor.com/rK3k9EgLkhEAAAAC/steins-gate.gif",
//   "https://c.tenor.com/wvZfA6FeOs0AAAAd/naruto-boruto.gif",
//   "https://media3.giphy.com/media/pGlDpwgWTLgBi/giphy.gif",
//   "https://c.tenor.com/stGMm1ODsGsAAAAC/anime-vinland-saga.gif",
//   "https://i.pinimg.com/originals/ee/8f/ed/ee8fed71f21624f59205460b23820873.gif",
//   "https://i.pinimg.com/originals/dd/9d/1b/dd9d1bef17c23fccf6f8224d7a70b766.gif",
// ];

// const server = express();

// server.get("/", async (_: Request, res: Response) => {
//   const randomImgIdx = Math.floor(Math.random() * 100) % images.length;

//   res.send(`
//     <html>
//         <head>
//             <title>Anime Images</title>
//         </head>
//         <body>
//         <style>
//             body {
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 background-color: #0c112d;
//             }

//             img {
//                 border-radius: 10px;
//             }
//         </style>
//         <a href="/" style="width: 50%">
//             <img src="${images[randomImgIdx]}" style="width: 100%" />
//         </a>
//         </body>
//     </html>
//     `);
// });

// server.listen(4444, () =>
//   console.log("Server is listening at http://localhost:4444")
// );
