import express from 'express'
import routes from './routers'

const app = express()

app.use('/api/v1', routes)

export default app