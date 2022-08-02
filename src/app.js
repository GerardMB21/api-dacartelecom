require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Routers
const { usersRouter } = require('./routes/users.routes');
const { rolesRouter } = require('./routes/roles.routes');
const { campaignsRouter } = require('./routes/campaigns.routes');
const { sectionsRouter } = require('./routes/sections.routes');
const { productsRouter } = require('./routes/products.routes');
const { soldsRouter } = require('./routes/solds.routes');
const { goalsRouter } = require('./routes/goal.routes');
const { investmentsRouter } = require('./routes/investments.routes');
const { filesRouter } = require('./routes/files.routes');

//utils
const { globalErrorHandler } = require('./utils/globarError');
const { AppError } = require('./utils/appError');

app.use(cors());
app.use(express.json());

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
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/campaigns", campaignsRouter);
app.use("/api/v1/sections", sectionsRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/solds", soldsRouter);
app.use("/api/v1/goals", goalsRouter);
app.use("/api/v1/investments", investmentsRouter);
app.use("/api/v1/files", filesRouter);

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

