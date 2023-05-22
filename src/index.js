import express from 'express';
import morgan from 'morgan';
import {router}from "./routes/index.js"

const app = express();

//config
const port = 3000

app.set('port', process.env.PORT || port)

app.use(morgan('combined'));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes

app.use(router)



app.listen(app.get('port'), () => {
    console.log(`Server on port ${port}`)
})

export default app