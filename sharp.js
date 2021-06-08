import sharp from "sharp"
import fs from "fs"
import path from "path"

// source from https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object

const dirname = "./images"

fs.readdir(dirname, function (err, filenames) {
  if (err) {
    // onError(err);
    return
  }
  filenames.forEach(function (filename) {
    // get current file extension
    const ext = path.parse(filename).ext

    if ([".jpeg", ".jpg", ".png"].includes(ext)) {
      // get current file name
      const name = path.parse(filename).name
      // get current file path
      const filepath = path.resolve(dirname, filename)
      resizeImage(filepath, name)
    }
  })
})

const imageSize = 1080
function resizeImage(filepath, name) {
  sharp(filepath)
    .resize(imageSize)
    .toFile(`${dirname}/resized/${name}.webp`, (err, info) => {
      console.log("err", err)
      console.log("info", info)
    })

  sharp(filepath)
    .resize(imageSize)
    .toFile(`${dirname}/resized/${name}.png`, (err, info) => {
      console.log("err", err)
      console.log("info", info)
    })
}
