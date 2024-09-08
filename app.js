import 'dotenv/config'
import express from "express";
import mongoose from "mongoose"
import userRouter from './routes/user.js';
import articleRouter from './routes/article.js';
import { fileURLToPath } from 'url';
import path from "path"
import cors from "cors"

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/user', userRouter)
app.use('/article', articleRouter)

async function main() {
	await mongoose.connect(process.env.MONGO_DB)
}

main()
	.then(() => console.log("MongoDB connected!"))
	.catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log("Server was runned on port: " + process.env.PORT))
