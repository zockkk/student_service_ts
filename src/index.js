import express from 'express'
import bodyParser from 'body-parser';

import { educationRouter } from './routes/education.router';

const app = express()

const port = 3000

app.use(bodyParser.json())

app.use('/students', educationRouter)

// Not Found request
app.use((req, res) => {
    res.status(404).send('Страница не обнаружена!');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})