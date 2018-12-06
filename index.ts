import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import * as fs from 'fs';

import messenger from './src/controllers/createMessage';
import { clearScreenDown } from 'readline';

const app = express();
const configPath = './config.json'
const parsedConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

const PORT: number = 3000 || parsedConfig.development.port;

const mlabUser: string = parsedConfig.development.mlabUserName;
const mlabPass: string = parsedConfig.development.mlabPass;

// const messages = new messenger(PORT);

const dataConnection = (user: string, pass: string): string => {
    return `mongodb://${user}:${pass}@ds137370.mlab.com:37370/linkedin_apis`;
};

// string
let database: string = dataConnection(mlabUser, mlabPass);

// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

function nameCreator<T>(name: T): T {
    return name;
}

let myName = nameCreator<string>('Coz, ');
// let myName = nameCreator<number>(5);

 // clearScreenDown
// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send('some message')
);

app.listen(PORT, () =>
    console.log(nameCreator(myName), `your server is running on port ${PORT}`)
);