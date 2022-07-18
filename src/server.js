const { app } = require('./app');

const port = process.env.PORT || 4001;

//utils
const { relations } = require('./utils/relationsModels');

//conecction database
const { dbConnect } = require('./config/database');

dbConnect.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

//relations ships
relations();

dbConnect.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(port,()=>{
    console.log(`Server on Port http://localhost:${port}`);
});