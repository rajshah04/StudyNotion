const cloudinary = require("cloudinary").v2 ;

exports.cloudinaryConnect = async(req, res) => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        }) ;

        console.log("Cloudinary connection Successful") ;
    }catch(err){
        console.log(err) ;
    }
}