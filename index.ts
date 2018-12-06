import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import * as fs from 'fs';

const app = express();
const configPath = './config.json'
const parsedConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

const PORT: number = 3000 || parsedConfig.development.port;

const mlabUser: string = parsedConfig.development.mlabUserName;
const mlabPass: string = parsedConfig.development.mlabPass;

// console.log(mlabUser + '-' + mlabPass);

// string
const database: string = `mongodb://${mlabUser}:${mlabPass}@ds137370.mlab.com:37370/linkedin_apis`;

// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);