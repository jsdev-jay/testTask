import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/user.routes.js";
import projectRoutes from "./router/project.routes.js";
import taskRoutes from "./router/task.routes.js";
import commentRoutes from "./router/comments.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
