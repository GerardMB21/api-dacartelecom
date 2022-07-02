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
const { Status } = require('./models/SQL/status');
const { Storage } = require('./models/SQL/storage');
const { Turns } = require('./models/SQL/turns');
const { Users } = require('./models/SQL/users');

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
    Status.hasMany(Users,{ foreignKey:'statusId' });
    //advisers relations
    Users.hasMany(Advisers,{ foreignKey:'userId' });
    Campaigns.hasMany(Advisers,{ foreignKey:'campaignId' });
    Sections.hasMany(Advisers,{ foreignKey:'sectionId' });
    Turns.hasMany(Advisers,{ foreignKey:'turnId' });
    Status.hasMany(Advisers,{ foreignKey:'statusId' });
    //campaigns realtions
    Status.hasMany(Campaigns,{ foreignKey:'statusId' });
    //imvestments relations
    Campaigns.hasMany(Investments,{ foreignKey:'campaignId' });
    Sections.hasMany(Investments,{ foreignKey:'sectionId' });
    Status.hasMany(Investments,{ foreignKey:'statusId' });
    //products relations
    Campaigns.hasMany(Products,{ foreignKey:'campaignId' });
    Sections.hasMany(Products,{ foreignKey:'sectionId' });
    Status.hasMany(Products,{ foreignKey:'statusId' });
    //roles relations
    Status.hasMany(Roles,{ foreignKey:'statusId' });
    //sections relations
    Campaigns.hasMany(Sections,{ foreignKey:'campaignId' });
    Status.hasMany(Sections,{ foreignKey:'statusId' });
    //solds relations
    Advisers.hasMany(Solds,{ foreignKey:'adviserId' });
    Users.hasMany(Solds,{ foreignKey:'userId' });
    Campaigns.hasMany(Solds,{ foreignKey:'campaignId' });
    Sections.hasMany(Solds,{ foreignKey:'sectionId' });
    Products.hasMany(Solds,{ foreignKey:'productId' });
    Status.hasMany(Solds,{ foreignKey:'statusId' });
    //storage relations
    Users.hasMany(Storage,{ foreignKey:'userId' });
    Status.hasMany(Storage,{ foreignKey:'statusId' });
    //turn relations
    Status.hasMany(Turns,{ foreignKey:'statusId' });


    //user relations
    Users.belongsTo(Roles);
    Users.belongsTo(Campaigns);
    Users.belongsTo(Sections);
    Users.belongsTo(Turns);
    Users.belongsTo(Status);
    //advisers relations
    Advisers.belongsTo(Users);
    Advisers.belongsTo(Campaigns);
    Advisers.belongsTo(Sections);
    Advisers.belongsTo(Turns);
    Advisers.belongsTo(Status);
    //campaign relations
    Campaigns.belongsTo(Status);
    //invesments realtions
    Investments.belongsTo(Campaigns);
    Investments.belongsTo(Sections);
    Investments.belongsTo(Status);
    //products relations
    Products.belongsTo(Campaigns);
    Products.belongsTo(Sections);
    Products.belongsTo(Status);
    //roles relations
    Roles.belongsTo(Status);
    //section relations
    Sections.belongsTo(Campaigns);
    Sections.belongsTo(Status);
    //solds relations
    Solds.belongsTo(Advisers);
    Solds.belongsTo(Users);
    Solds.belongsTo(Campaigns);
    Solds.belongsTo(Sections);
    Solds.belongsTo(Products);
    Solds.belongsTo(Status);
    //storage relations
    Storage.belongsTo(Users);
    Storage.belongsTo(Status);
    //turn relations
    Turns.belongsTo(Status);

dbConnect.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(port,()=>{
    console.log(`Server on Port http://localhost:${port}/api/v1/`);
});