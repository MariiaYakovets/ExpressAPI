import express, { Express } from "express";
import userRouter from "./User/UserRoutes";
// import commentRouter from "./Comment/CommentRoutes";
// import postRouter from "./Post/PostRoutes";

const app: Express = express();

app.use(express.json())
app.use('/user', userRouter)

// app.use('/comment', commentRouter)
// app.use('/post', postRouter)

app.listen(8000, "localhost", () => {
	console.log("server is running on http://localhost:8000");
});
