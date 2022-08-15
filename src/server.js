const { server } = require('./app');
const { Server } = require('socket.io');

const io = new Server(server,{
	cors: {
		origin: '*'
	}
});

io.on("connection",(socket)=>{
    console.log('new connection');
    io.emit('welcome','hello this web sockets');
    // socket.on("addUser", userId=>{
    //     addUser(userId,socket.id);
    //     io.emit('getUsers', users);
    // });
    socket.on("createGoal", section=>{
        io.emit('newGoal', section);
    });

    socket.on("createSale",section=>{
        io.emit('newSale',section);
    });

    socket.on("createSaleUser",id=>{
        io.emit('newSaleUser',id);
    });

    socket.on("createSaleProduct",product=>{
        io.emit('newSaleProduct',product);
    });

    socket.on("sendFile",id=>{
        io.emit('reciveFile',id);
    });

    // socket.on("disconnect",()=>{
    //     console.log("user disconnected");
    //     removeUser(socket.id);
    //     io.emit('getUsers', users);
    // });
});

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

server.listen(port,()=>{
    console.log(`Server on Port http://localhost:${port}`);
});