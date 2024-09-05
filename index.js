import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import noteRoutes from './routes/noteRoutes.js'
import authRoutes from './routes/authRotes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB: ', err))

app.use('/api/auth/', authRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})
