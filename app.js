const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const checkWorkingHours = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); 
  const hour = currentDate.getHours();

  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWeekday && isWorkingHour) {
    next();
  } else {
    res.status(503).render('closed');
  }
};

app.use(checkWorkingHours);

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});