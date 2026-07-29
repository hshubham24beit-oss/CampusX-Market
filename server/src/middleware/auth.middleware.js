import jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {

    try {

        // Get token from header
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            return res.status(401).json({
                success:false,
                message:"No token provided. Please login."
            });
        }


        // Token format:
        // Bearer token_here

        const token = authHeader.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Invalid token format."
            });
        }


        // Verify token

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Store user information

        req.user = decoded;


        next();


    } catch(error) {


        return res.status(401).json({

            success:false,

            message:"Invalid or expired token."

        });

    }

};