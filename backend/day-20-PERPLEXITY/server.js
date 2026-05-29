import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/database.js";
import { testAI } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 3000;

testAI();

connectToDB().catch((err) => {
  console.error("MongoDB connection failed: ", err);
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
