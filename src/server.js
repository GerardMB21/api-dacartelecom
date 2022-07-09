const { app } = require('./app');

const port = process.env.PORT || 4001;

// Models
const { Advisers } = require('./models/SQL/advisers');
const { Campaigns } = require('./models/SQL/campaigns');
const { Investments } = require('./models/SQL/investments');
const { Products } = require('./models/SQL/products');
const { Roles } = require('./models/SQL/roles');
const { Sections } = require('./models/SQL/sections');
const { Solds } = require('./models/SQL/solds');
const { Storage } = require('./models/SQL/storage');
const { Turns } = require('./models/SQL/turns');
const { Users } = require('./models/SQL/users');
const { Data } = require('./models/SQL/data');

//conecction database
const { dbConnect } = require('./config/database');

dbConnect.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

//models relations ships

    //user relations
    Roles.hasMany(Users,{ foreignKey:'roleId' });
    Campaigns.hasMany(Users,{ foreignKey:'campaignId' });
    Sections.hasMany(Users,{ foreignKey:'sectionId' });
    Turns.hasMany(Users,{ foreignKey:'turnId' });
    //advisers relations
    Users.hasMany(Advisers,{ foreignKey:'userId' });
    Campaigns.hasMany(Advisers,{ foreignKey:'campaignId' });
    Sections.hasMany(Advisers,{ foreignKey:'sectionId' });
    Turns.hasMany(Advisers,{ foreignKey:'turnId' });
    //imvestments relations
    Campaigns.hasMany(Investments,{ foreignKey:'campaignId' });
    Sections.hasMany(Investments,{ foreignKey:'sectionId' });
    Users.hasMany(Investments,{ foreignKey:'userId' });
    //products relations
    Campaigns.hasMany(Products,{ foreignKey:'campaignId' });
    Sections.hasMany(Products,{ foreignKey:'sectionId' });
    //data relations
    Roles.hasMany(Data,{ foreignKey:'roleId' });
    //sections relations
    Campaigns.hasMany(Sections,{ foreignKey:'campaignId' });
    //solds relations
    Advisers.hasMany(Solds,{ foreignKey:'adviserId' });
    Users.hasMany(Solds,{ foreignKey:'userId' });
    Campaigns.hasMany(Solds,{ foreignKey:'campaignId' });
    Sections.hasMany(Solds,{ foreignKey:'sectionId' });
    Products.hasMany(Solds,{ foreignKey:'productId' });
    //data relations
    Users.hasMany(Data,{ foreignKey:'userId' });
    //storage relations
    Data.hasMany(Storage,{ foreignKey:'dataId' })


    //user relations
    Users.belongsTo(Roles);
    Users.belongsTo(Campaigns);
    Users.belongsTo(Sections);
    Users.belongsTo(Turns);
    //advisers relations
    Advisers.belongsTo(Users);
    Advisers.belongsTo(Campaigns);
    Advisers.belongsTo(Sections);
    Advisers.belongsTo(Turns);
    //invesments realtions
    Investments.belongsTo(Campaigns);
    Investments.belongsTo(Sections);
    Investments.belongsTo(Users);
    //products relations
    Products.belongsTo(Campaigns);
    Products.belongsTo(Sections);
    //data relations
    Data.belongsTo(Roles);
    //section relations
    Sections.belongsTo(Campaigns);
    //solds relations
    Solds.belongsTo(Advisers);
    Solds.belongsTo(Users);
    Solds.belongsTo(Campaigns);
    Solds.belongsTo(Sections);
    Solds.belongsTo(Products);
    //storage relations
    Storage.belongsTo(Data);

dbConnect.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(port,()=>{
    console.log(`Server on Port http://localhost:${port}/api/v1/`);
});