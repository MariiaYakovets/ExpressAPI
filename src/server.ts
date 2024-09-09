import express, { Express } from "express";
import cors from "cors"
import userRouter from "./User/UserRoutes";
import postRouter from "./Post/PostRoutes";
import commentRouter from "./Comment/CommentRoutes";
// import commentRouter from "./Comment/CommentRoutes";
// import postRouter from "./Post/PostRoutes";

const app: Express = express();
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:8000', 'http://localhost:8001'] // Whitelist the domains you want to allow
};
app.use(express.json())
app.use(cors(corsOptions))
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

// app.use('/comment', commentRouter)
// app.use('/post', postRouter)

app.listen(8000, "localhost", () => {
	console.log("server is running on http://localhost:8000");
});
