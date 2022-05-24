const {connect, connection} = require('mongoose');

connect('mongodb://localhost/socialnetworkDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;