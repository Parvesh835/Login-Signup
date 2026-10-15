const express = require('express');
const app = express();
const dotenv = require('dotenv')
const ConnectDb = require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const Authrouter = require('./Routes/authRouter')
const ProductRouter = require('./Routes/ProductRouter')
dotenv.config();

ConnectDb();
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
})

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', Authrouter);
app.use('/products', ProductRouter)

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
