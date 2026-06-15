import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";

const PORT = config.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server: ", error.message);
  }
};

startServer();
