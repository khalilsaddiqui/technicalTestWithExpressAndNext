
const fs = require("fs-extra");
var path = require('path');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

/**
 * Function to upload multiple images
 * @param {Object[]} files Array of file objects
 * @param {String} folder Name of the folder where images to be stored
 * @returns {Object} Returns success and images array, images array contains names of uploaded images
 */
async function uploadImages(files, folder) {
    var images = [];
    try {
        //getting time & date
        var today = new Date();
        var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
        var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
        var dateTime = date + '_' + time;

        //checking for multi file upload
        if (typeof files.name == "undefined" && files.length > 0) {
            //for multi file upload
            //looping through files
            await asyncForEach(files, async (file, index) => {

                //getting file type
                let fileType = file.mimetype.split("/")[1];
                //if file type is octet-stream it means it is a jpg file
                fileType = fileType == "octet-stream" ? "jpg" : fileType;

                //generating new name for image
                let newName =
                    String.fromCharCode(index + 65) + //generating alphabets from 1 to n
                    "_" + dateTime + //adding date and time
                    Math.floor(Math.random() * 1000000000) + //adding random number
                    "." + fileType; //adding extension

                //creating path for uploaded image
                let imageFile = `./uploads/${folder}/` + newName;

                //writing image to disk
                fs.writeFileSync(imageFile, file.data);

                //pushing image name to images array
                images.push(newName);

            });

        } else if (typeof files.name != "undefined") {
            //for single file upload
            let fileType = files.mimetype.split("/")[1];
            fileType = fileType == "octet-stream" ? "jpg" : fileType;

            let newName =
                String.fromCharCode(0 + 65) + //starting from A
                "_" + dateTime +
                Math.floor(Math.random() * 1000000000) +
                "." + fileType;

            let imageFile = `./uploads/${folder}/` + newName;

            //writing image to disk
            fs.writeFileSync(imageFile, files.data);

            //pushing image name to images array
            images.push(newName);

        }

        return { success: true, images: images, message: "Successfully saved images!" };

    } catch (error) {
        console.log(error);
        return { success: false, images: images, message: error.message };
        // return res.status(200).json({ message: "error" });
    }
}
module.exports.uploadImages = uploadImages;


