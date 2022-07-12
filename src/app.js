require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

//Routers
const { advisersRouter } = require('./routes/advisers.routes');
const { campaignsRouter } = require('./routes/campaigns.routes');
const { investmentsRouter } = require('./routes/investments.routes');
const { productsRouter } = require('./routes/products.routes');
const { rolesRouter } = require('./routes/roles.routes');
const { sectionsRouter } = require('./routes/sections.routes');
const { soldsRouter } = require('./routes/solds.routes');
const { storageRouter } = require('./routes/storage.routes');
const { dataRouter } = require('./routes/data.routes');
const { turnsRouter } = require('./routes/turns.routes');
const { usersRouter } = require('./routes/users.routes');

//utils
const { globalErrorHandler } = require('./utils/globarError');
const { AppError } = require('./utils/appError');

app.use(cors());
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'storage')));

//limiter
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000, //1hr
    message: 'Number of requests have been exceded'
});

app.use(limiter);

//security headers
app.use(helmet());

//compress response
app.use(compression());

//log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

//invocate routes
app.use("/api/v1/advisers", advisersRouter);
app.use("/api/v1/campaigns", campaignsRouter);
app.use("/api/v1/investments", investmentsRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/sections", sectionsRouter);
app.use("/api/v1/solds", soldsRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/storage", storageRouter);
app.use("/api/v1/turns", turnsRouter);
app.use("/api/v1/users", usersRouter)

app.all('*',(req,res,next)=>{
    next(
        new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
        )
    );
});

app.use(globalErrorHandler);

module.exports = { app };

