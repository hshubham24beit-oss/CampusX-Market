import {
    getProfile,
    updateProfile,
    getUserProfileById
} from "./user.service.js";


export const getMyProfile = async (req, res) => {

    try {

        const user = await getProfile(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};


export const updateMyProfile = async (req, res) => {

    try {

        const user = await updateProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


export const getUserById = async (req, res) => {

    try {

        const user = await getUserProfileById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};