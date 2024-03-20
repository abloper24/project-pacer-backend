// const express = require('express');
// const router = express.Router(); 
// const fs = require('fs');
// const uniqid = require('uniqid');

// function readData() {
//     const videosData = fs.readFileSync("./data/videos.json");
//     const parsedData = JSON.parse(videosData);
//     return parsedData;
// }

// router.get("/", (_req, res) => {
//     res.json(readData());
// });

// router.get("/:videoId", (req, res) => {
//     const videos = readData();
//     const singleVideo = videos.find((video) => video.id === req.params.videoId);
//     res.json(singleVideo);
// });

// router.post("/", (req, res) => {
//     const { title, description, image } = req.body;
//     const newVideo = {
//         id: uniqid(),
//         title,
//         description,
//         channel: 'Rockstar Video Uploader',
//         image,
//         views: 1,
//         likes: 0,
//         duration: '7:31',
//         timestamp:1709749132063,
//         video: 'https://unit-3-project-api-0a5620414506.herokuapp.com/stream',
//         comments: []
//     };

//     const videos = readData();
//     videos.push(newVideo);
//     fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
//     res.status(201).json(newVideo);
// });

// module.exports = router;

