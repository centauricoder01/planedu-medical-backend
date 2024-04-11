import connectDB from "./db/db";
import app from "./app";

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is Running on port ${PORT}`);
  });
});

