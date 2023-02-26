import sharp from "sharp"
import fs from "fs"
import path from "path"
import readline from 'readline-sync'

// source from https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object

const base =  readline.question("Directory path of images ")?.replaceAll("'", "") || "./images"

// get relative path of the absolute path (dirname) from this directory)
const dirname = base === "./images" ? "./images" : path.relative('/Users/ruucm/Desktop/_personals/node-image-optimization', base)


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

const imageSize = Number(readline.question("New image width (for resize) ")) || 1080
function resizeImage(filepath, name) {

  const outDir = `${dirname}/resized`

  // check if the directory exists & create the directory if it doesn't exist
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  sharp(filepath)
    .resize(imageSize)
    .toFile(`${outDir}/${name}.webp`, (err, info) => {
      console.log("err", err)
      console.log("info", info)
    })

  sharp(filepath)
    .resize(imageSize)
    .toFile(`${outDir}/${name}.png`, (err, info) => {
      console.log("err", err)
      console.log("info", info)
    })
}
