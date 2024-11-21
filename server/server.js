import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import travelsRouter from "./routes/travelsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import uploadrouter from "./controllers/uploadFile.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
   res.send("API is running");
});

app.use("/api/users", userRouter);
app.use("/api/travels", travelsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", uploadrouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});
