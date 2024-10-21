const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const indexRouter = require('../routes/index');
const dotenv = require('dotenv');
dotenv.config();
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }
    middlewares(){
       this.app.use(cors());
       this.app.use( express.json() );
       this.app.use(express.static('public')); 
    }
    routes(){
        this.app.use('/', indexRouter);
        this.app.use('/login', require('../routes/login.routing'));
        this.app.use('/dashboard', require('../routes/dashboard.routing'));
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Iniciando servicios puerto', this.port);
        });
    }
}
module.exports = Server;