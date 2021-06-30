const express = require ("express");
const fileUpload = require ("express-fileupload");
const cors = require ("cors");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const bodyParser = require ("body-parser");
const paperRoute = require ('../Back/Routes/paperRoute');
const userRoute = require ('../Back/Routes/userRoute');
const interestRoute = require ('../Back/Routes/interestRoute');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT  = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {   // connect database
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}, (error) => {
    if (error) {
        console.log('Error in Database:',error.message);
    }
});

mongoose.connection.once('open', () => {  // Message once the connection is established
console.log('Database Connected');
});

app.route('/').get((req,res)=> {
    res.send('Hi from the API');
});

app.use('/paper', paperRoute());
app.use('/user',userRoute());
app.use('/field',interestRoute());

app.use(fileUpload());

//Upload Endpoint
app.post ('/upload', (req,res)=> {
    if(req.files === null){
        return res.status(400).json({ msg: 'No file uploaded'});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/Front/uploads/${file.name}`, err => {
        if(err){
console.error(err);
return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath:`/uploads/${file.name}`});
    });
});



// Starting the app

app.listen(PORT,() => {      
    console.log(`Server running on PORT ${PORT}`);
});
