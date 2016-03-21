/**
 * Created by matknu on 2016-03-21.
 */
'use strict';
const Hapi = require('hapi'),
    mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    category: String,
    genre: [String],
    rating: String
})
let movies = [];
const eventModel = mongoose.model('event', eventSchema);

mongoose.connect('mongodb://taco:tacos123@ds019498.mlab.com:19498/sthlm-event')
const db = mongoose.connection;
db.on('error', function(err){
    console.log(err);
});
db.once('open', function () {
    console.log('DB UP!');
    eventModel.find(
        function (err, data) {
            if (err) return console.error(err);
            movies = data;
        }
    );
});



const server = new Hapi.Server();

server.connection({ port: (process.env.PORT || 5000) });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply(movies);
    }
});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
