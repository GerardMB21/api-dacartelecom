//models
const { Campaigns } = require("../models/campaigns");
const { Chats } = require("../models/chats");
const { Files } = require("../models/files");
const { Goals } = require("../models/goal");
const { Investments } = require("../models/investments");
const { Messages } = require("../models/messages");
const { Products } = require("../models/products");
const { Roles } = require("../models/roles");
const { Sections } = require("../models/sections");
const { Solds } = require("../models/solds");
const { Users } = require("../models/users");
const { UsersInChat } = require("../models/usersInChat");

const relations = ()=>{

    //hasMany
        //roles
        Roles.hasMany(Users,{ foreignKey:'roleId' });
        //campaigns
        Campaigns.hasMany(Users,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Products,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Solds,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Sections,{ foreignKey:'campaignId' });
        Campaigns.hasMany(Goals,{ foreignKey:'campaignId' });
        //sections
        Sections.hasMany(Users,{ foreignKey:'sectionId' });
        Sections.hasMany(Products,{ foreignKey:'sectionId' });
        Sections.hasMany(Solds,{ foreignKey:'sectionId' });
        Sections.hasMany(Goals,{ foreignKey:'sectionId' });
        //users
        Users.hasMany(Solds,{ foreignKey:'userId' });
        Users.hasMany(Files,{ foreignKey:'userId' });
        Users.hasMany(Investments,{ foreignKey:'userId' });
        Users.hasMany(Goals,{ foreignKey:'userId' });
        Users.hasMany(Chats,{ foreignKey:'userId' });
        Users.hasMany(Messages,{ foreignKey:'userId' });
        //products
        Products.hasMany(Solds,{ foreignKey:'productId' });
        //chats
        Chats.hasMany(UsersInChat,{ foreignKey:'chatId' });
        Chats.hasMany(Messages,{ foreignKey:'chatId' });


    //belongsTo
        //users
        Users.belongsTo(Roles);
        Users.belongsTo(Campaigns);
        Users.belongsTo(Sections);
        //products
        Products.belongsTo(Campaigns);
        Products.belongsTo(Sections);
        //solds
        Solds.belongsTo(Campaigns);
        Solds.belongsTo(Sections);
        Solds.belongsTo(Users);
        Solds.belongsTo(Products);
        //sections
        Sections.belongsTo(Campaigns);
        //files
        Files.belongsTo(Users);
        //investments
        Investments.belongsTo(Users);
        //goals
        Goals.belongsTo(Users);
        Goals.belongsTo(Campaigns);
        Goals.belongsTo(Sections);
        //chats
        Chats.belongsTo(Users);
        //usersInChat
        UsersInChat.belongsTo(Chats);
        //messages
        Messages.belongsTo(Users);
        Messages.belongsTo(Chats);

    //belongsToMany
        //users
        Users.belongsToMany(Chats,{ 
            through:'usersInChat',
            foreignKey:'userId'
         });

};

module.exports = { relations };