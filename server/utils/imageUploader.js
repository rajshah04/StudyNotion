// Require the Cloudinary library
const cloudinary = require('cloudinary').v2 ;

exports.uploadImageToCloudinary = async(file, folder, height, quality) => {
    const options = {folder} ;
    if(height){
        options.height = height ;
    }
    console.log("Inside Cloudinary function") ;
    if(quality){
        options.quality = quality ;
    }

    options.resource_type = "auto" ;

    return await cloudinary.uploader.upload(file.tempFilePath, options) ;
}