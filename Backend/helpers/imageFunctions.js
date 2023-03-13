const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const serviceKey = path.join(
  __dirname,
  "../key/krazycooking-8d882e0bba86.json"
);
const storage = new Storage({
  projectId: "krazycooking",
  keyFilename: serviceKey,
});

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const bucket = storage.bucket("krazy_cooking");
    const blob = bucket.file(uuidv4() + originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (err) => {
        console.log(err);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

const deleteImage = async (url) => {
  const [_, __, bucketName, ...filenameParts] = url.split("/");
  const filename = filenameParts[filenameParts.length - 1];
  console.log(filename);

  // Deletes the file from the bucket
  await storage.bucket("krazy_cooking").file(filename).delete();

  console.log(`${url} deleted.`);
};
module.exports = {
  deleteImage,
  uploadImage,
};
