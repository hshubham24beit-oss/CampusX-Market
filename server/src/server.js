import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/database.js";


const PORT = process.env.PORT || 5000;


// Connect Database
connectDB();


app.listen(PORT, () => {

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});