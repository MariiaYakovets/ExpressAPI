import express, { Express } from "express";
import cors from "cors"
import userRouter from "./User/UserRoutes";
import postRouter from "./Post/PostRoutes";
import commentRouter from "./Comment/CommentRoutes";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:8000', 'http://localhost:8001']
};
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)




app.listen(8000, "localhost", () => {
	console.log("server is running on http://localhost:8000");
});
