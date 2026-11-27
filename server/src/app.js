
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()

// Middleware to read JSON request bodies
app.use(express.json())

// Allow our React frontend to communicate with Express
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
)

// First API endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow API is running',
  })
})

app.get('/api/welcome', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to TaskFlow SaaS!',
    version: '1.0.0'
  })
})

export default app
