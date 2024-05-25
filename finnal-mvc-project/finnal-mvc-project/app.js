const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tripController = require('./controllers/tripController');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', tripController.getTriptsPage);
app.get('/add', tripController.getAddTripPage);
app.post('/trip', tripController.addTrip);
app.get('/trip/:id/edit', tripController.getEditTripPage);
app.post('/trip/:id/update', tripController.updateTrip);
app.delete('/trip/:id', tripController.deleteTrip);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
