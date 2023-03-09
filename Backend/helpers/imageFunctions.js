const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");
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
    const blob = bucket.file(originalname.replace(/ /g, "_"));
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

module.exports = {
  uploadImage,
};
