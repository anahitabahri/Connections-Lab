import express from 'express'
import { Low } from 'lowdb'
import {JSONFile } from 'lowdb/node'

const app = express();

// DB 1 - connect to the db
const defaultData = { cybertruckData:[] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

// increase payload size limit for images
app.use(express.json({ limit: '50mb' }));


app.post('/newSighting', (request, response)=> {
    // console.log(request.body);
    let currentDate = Date();
    let obj = {
        photo: request.body.photo,
        location: request.body.location
    }

    // add to db
    db.data.cybertruckData.push(obj);
    db.write()
    .then(() => {
        response.json({task:"success"});
    })

})

app.use('/', express.static('public'));

app.get('/getSightings', (request,response)=> {
    // DB 3 - fetch from the DB
    db.read()
    .then(() => {
        let obj = {data: db.data.cybertruckData}
        response.json(obj);
    })


})

// updated port configuration for Glitch
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at', port);
});

// app.listen(3000, ()=> {
//     console.log('listening at localhost:3000');
// })

