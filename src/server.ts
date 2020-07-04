import app from './app'
import 'dotenv/config'
// import express from 'express'

// app.use(express.json())
app.listen(process.env.PORT)
console.log('🚀🚀🚀 Sevrer started on port', process.env.PORT)
