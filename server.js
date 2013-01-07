
var
express     = require('express'),
resourceful = require('resourceful'),
app         = express();


var Vehicle = resourceful.define('vehicle', function (id) {
  this.use('couchdb', {
    uri: 'http://127.0.0.1:5984/vehicles'
  });

  this.string('_id');
  this.string('make');
  this.string('model');
  this.string('owner_name');
  this.string('owner_mobile_number');
  this.string('owner_national_id_no');
  this.string('driver_name');
  this.string('driver_national_id_no');
  this.string('driver_mobile_number');
  this.string('licence_plate_no');
  this.string('category');
  this.object('home_location'); // address
  this.object('current_location');
  this.array('routes'); // array of objects that list from and too
  this.array('cargo_types'); // array of strings that list cargo types
  this.array('status'); // an array of objects that contains their current status. This will be queried for matching purposes.

  this.timestamps();
});
// -- Configuration --
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.favicon());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
  res.end('hello world');
});

app.post('/save', function (req, res) {

  var vehicleData = {
    _id                     : req.param('licence_plate_no'),
    licence_plate_no        : req.param('licence_plate_no'),
    make                    : req.param('make'),
    model                   : req.param('model'),
    owner_name              : req.param('owner_name'),
    owner_mobile_number     : req.param('owner_mobile_number'),
    owner_national_id_no    : req.param('owner_national_id_no'),
    driver_name             : req.param('driver_name'),
    driver_mobile_number    : req.param('driver_mobile_number'),
    driver_national_id_no   : req.param('driver_national_id_no'),
    category                : req.param('category'),
    home_location           : req.param('home_location'), 
    routes                  : [],
    current_location        : getLocationInfo(req.param('home_location')),
    home_location           : getLocationInfo(req.param('current_location')),
    status                  : [],
    cargo_types             : [],
  };

  Vehicle.create(vehicleData, function(err, obj) {
    if (err){
      console.log(JSON.stringify(err));
      return 
    }
    console.log(JSON.stringify(obj));
  });
  //console.log(vehicleData);
  res.json(vehicleData);
});

getLocationInfo = function (locString){
  return {};
}


app.listen(4001);
