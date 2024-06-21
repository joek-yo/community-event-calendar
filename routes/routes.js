const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth');
const router = express.Router();

// Mock events data
let events = [
  {
    id: 1,
    name: 'Community Picnic',
    date: '2024-07-15',
    time: '12:00 PM - 4:00 PM',
    location: 'Central Park',
    description: 'Join us for a fun-filled day of games, food, and community bonding at Central Park. Don\'t forget to bring your picnic blanket!'
  },
  {
    id: 2,
    name: 'Charity Run',
    date: '2024-08-05',
    time: '7:00 AM - 10:00 AM',
    location: 'Downtown Square',
    description: 'Lace up your running shoes and join us for a charity run to support local nonprofits. All ages and fitness levels welcome!'
  },
  {
    id: 3,
    name: 'Summer Concert Series',
    date: '2024-10-02',
    time: '6:00 PM - 9:00 PM',
    location: 'City Amphitheater',
    description: 'Enjoy live music performances every Friday evening in July at the City Amphitheater. Food trucks will be on-site.'
  },
  {
    id: 4,
    name: 'Community Clean-Up Day',
    date: '2024-09-01',
    time: '9:00 AM - 12:00 PM',
    location: 'Meet at City Hall',
    description: 'Help keep our community clean and green! Join us for a morning of litter clean-up followed by a volunteer appreciation lunch.'
  },
  {
    id: 5,
    name: 'Youth Soccer Tournament',
    date: '2024-07-28',
    time: '10:00 AM - 3:00 PM',
    location: 'City Sports Complex',
    description: 'Watch local youth soccer teams compete in a friendly tournament at the City Sports Complex. Fun for the whole family!'
  },
  {
    id: 6,
    name: 'Outdoor Movie Night',
    date: '2024-08-10',
    time: '7:30 PM - 10:00 PM',
    location: 'Community Park',
    description: 'Bring your lawn chairs and blankets for a movie under the stars at Community Park. Popcorn and drinks will be provided.'
  },
  {
    id: 7,
    name: 'Farmers\' Market',
    date: '2024-08-10',
    time: '9:00 AM - 1:00 PM',
    location: 'Town Square',
    description: 'Shop for fresh produce, local crafts, and artisanal goods at the weekly farmers\' market in Town Square.'
  },
  {
    id: 8,
    name: 'Community Book Club Meeting',
    date: '2024-08-20',
    time: '6:30 PM - 8:00 PM',
    location: 'Public Library',
    description: 'Join fellow book lovers for a lively discussion of this month\'s book selection at the Public Library.'
  },
  {
    id: 9,
    name: 'Neighborhood Block Party',
    date: '2024-09-08',
    time: '3:00 PM - 7:00 PM',
    location: 'Oak Street',
    description: 'Get to know your neighbors at the annual neighborhood block party on Oak Street. Games, food, and fun for all ages!'
  },
  {
    id: 10,
    name: 'Community Gardening Workshop',
    date: '2024-08-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Community Garden',
    description: 'Learn the basics of gardening and sustainable practices at the Community Garden. All skill levels welcome.'
  }
];


// GET / route
router.get('/', async (req, res) => {
  res.render('index', { title: 'Home', events, user: req.user });
});

// GET /register route
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// GET /login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});


// GET /submit route
router.get('/submit', async (req, res) => {
  res.render('submit', { title: 'Submit Event' });
});

// POST /submit route
router.post('/submit', isLoggedIn, async (req, res) => {
  const { name, date, time, location, description } = req.body;

  // Validate the form data (e.g., check if required fields are not empty)

  // Create a new event object
  const newEvent = {
    id: events.length + 1,
    name,
    date,
    time,
    location,
    description
  };

  // Add the new event to the events array
  events.push(newEvent);

  // Redirect to the events page or any other appropriate page
  res.redirect('/events');
});

// GET /events route
router.get('/events', (req, res) => {
  res.render('events', { title: 'Events', events });
});

// GET /events/:id route
router.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id == eventId);

  if (!event) {
    return res.status(404).send('Event not found');
  }

  res.render('event-details', { title: event.name, event });
});

// GET /events/:id/edit route
router.get('/events/:id/edit', isLoggedIn, (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id == eventId);

  if (!event) {
    return res.status(404).send('Event not found');
  }

  res.render('edit-event', { title: 'Edit Event', event });
});

// POST /events/:id/edit route
router.post('/events/:id/edit', isLoggedIn, (req, res) => {
  const eventId = req.params.id;
  const eventIndex = events.findIndex(event => event.id == eventId);

  if (eventIndex === -1) {
    return res.status(404).send('Event not found');
  }

  // Update the event
  events[eventIndex] = {
    id: eventId,
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description
  };

  res.redirect(`/events/${eventId}`);
});

// POST /events/:id/delete route
router.post('/events/:id/delete', isLoggedIn, (req, res) => {
  const eventId = req.params.id;
  events = events.filter(event => event.id != eventId);
  res.redirect('/events');
});

// POST /register route
router.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Log the registration details
  console.log(`User registered: Username - ${username}, Password - ${password}`);

  // Continue with registration process
  // You can add your registration logic here

  res.redirect('/login');
});

module.exports = router;
