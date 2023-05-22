import express from 'express';
import morgan from 'morgan';
import indexRoutes from "./routes/index.js"

const app = express();

//config
const port = 3000

app.set('port', process.env.PORT || port)

app.use(morgan('combined'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes

app.use(indexRoutes)



app.listen(app.get('port'), () => {
    console.log(`Server on port ${port}`)
})

export default app