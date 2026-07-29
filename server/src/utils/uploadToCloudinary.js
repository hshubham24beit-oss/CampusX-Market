import cloudinary from "../config/cloudinary.js";


const uploadToCloudinary = async (fileBuffer) => {

    return new Promise((resolve, reject) => {


        const uploadStream = cloudinary.uploader.upload_stream(

            {
                folder: "campusx-market"
            },


            (error, result) => {

                if(error){

                    reject(error);

                }
                else{

                    resolve(result.secure_url);

                }

            }

        );


        uploadStream.end(fileBuffer);


    });

};


export default uploadToCloudinary;