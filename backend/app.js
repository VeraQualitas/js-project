const express = require('express')
const cors = require('cors');
var body_parser = require('body-parser');

const port = 3000


/////////////////////////////////////////////////////
// imports
const accounts = require('./controllers/accounts.controller');
const sessions = require('./controllers/sessions.controller');
const stations = require('./controllers/stations.controller');
const station_account = require('./controllers/station_account.controller');
const people = require('./controllers/people.controller');
const vehicles = require('./controllers/vehicles.controller');
const db = require('./models/model');

/////////////////////////////////////////////////////
// app declaration
const app = express()
app.use(cors({origin: 'http://localhost:4200'}));
app.use(body_parser.json()); // for parsing application/json


// create only non-exist tables
// db.sequelize.sync();

// drop and create database
db.sequelize.sync({ force: true }).then(() => { console.log("Database was dropped and created."); });



/////////////////////////////////////////////////////
// routing
app.post('/sign-up', accounts.sign_up);

app.post('/sign-in', sessions.sign_in);
app.post('/is-authenticated', sessions.is_authenticated);
app.post('/sign-out', sessions.sign_out);

app.post('/create-station', stations.create_station);
app.post('/edit-station', stations.edit_station);
app.post('/remove-station', stations.remove_station);
app.post('/show-stations', stations.show_stations);

app.post('/add-to-station', station_account.add_to_station);
app.post('/edit-permissions', station_account.edit_permissions);
app.post('/remove-from-station', station_account.remove_from_station);
app.post('/station-info', station_account.station_info);

app.post('/add-person', people.add_person);
app.post('/edit-person', people.edit_person);
app.post('/remove-person', people.remove_person);
app.post('/people', people.people);

app.post('/add-vehicle', vehicles.add_vehicle);
app.post('/edit-vehicle', vehicles.edit_vehicle);
app.post('/remove-vehicle', vehicles.remove_vehicle);
app.post('/vehicles', vehicles.vehicles);


app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

/////////////////////////////////////////////////////
// app running
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
