import User from "./user.model.js";

export const getProfile = async (userId) => {

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};


export const updateProfile = async (userId, updateData) => {

    const allowedFields = [
        "fullName",
        "phone",
        "bio",
        "profileImage"
    ];

    const filteredData = {};

    allowedFields.forEach((field) => {

        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }

    });

    const updatedUser = await User.findByIdAndUpdate(

        userId,

        filteredData,

        {
            new: true,
            runValidators: true
        }

    ).select("-password");

    if (!updatedUser) {
        throw new Error("User not found.");
    }

    return updatedUser;
};


export const getUserProfileById = async (userId) => {

    const user = await User.findById(userId)
        .select(
            "fullName department year profileImage bio averageRating totalRatings"
        );

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};