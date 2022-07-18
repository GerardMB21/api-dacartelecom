const { Advisers } = require("../models/advisers");
const { Campaigns } = require("../models/campaigns");
const { Files } = require("../models/files");
const { Investments } = require("../models/investments");
const { Products } = require("../models/products");
const { Roles } = require("../models/roles");
const { Sections } = require("../models/sections");
const { Solds } = require("../models/solds");
const { Users } = require("../models/users");

const relations = ()=>{

    //hasMany
        //roles
        Roles.hasMany(Users,{ foreignKey:'roleId' });
        //campaigns
        Campaigns.hasMany(Users,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Advisers,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Products,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Solds,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Sections,{ foreignKey:'campaignId' })
        //sections
        Sections.hasMany(Users,{ foreignKey:'sectionId' });
        Sections.hasMany(Advisers,{ foreignKey:'sectionId' });
        Sections.hasMany(Products,{ foreignKey:'sectionId' });
        Sections.hasMany(Solds,{ foreignKey:'sectionId' });
        //users
        Users.hasMany(Advisers,{ foreignKey:'userId' });
        Users.hasMany(Solds,{ foreignKey:'userId' });
        Users.hasMany(Files,{ foreignKey:'userId' });
        Users.hasMany(Investments,{ foreignKey:'userId' });
        //advisers
        Advisers.hasMany(Solds,{ foreignKey:'adviserId' });
        //products
        Products.hasMany(Solds,{ foreignKey:'productId' });

    //belongsTo
        //users
        Users.belongsTo(Roles);
        Users.belongsTo(Campaigns);
        Users.belongsTo(Sections);
        //adviser
        Advisers.belongsTo(Campaigns);
        Advisers.belongsTo(Sections);
        Advisers.belongsTo(Users);
        //products
        Products.belongsTo(Campaigns);
        Products.belongsTo(Sections);
        //solds
        Solds.belongsTo(Campaigns);
        Solds.belongsTo(Sections);
        Solds.belongsTo(Users);
        Solds.belongsTo(Advisers);
        Solds.belongsTo(Products);
        //sections
        Sections.belongsTo(Campaigns);
        //files
        Files.belongsTo(Users);
        //investments
        Investments.belongsTo(Users);

};

module.exports = { relations };