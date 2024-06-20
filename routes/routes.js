const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const events = [
  { id: 1, name: 'Event 1', date: '2024-06-30', time: '10:00 AM', location: 'Location 1', description: 'Description 1' },
  { id: 2, name: 'Event 2', date: '2024-07-01', time: '11:00 AM', location: 'Location 2', description: 'Description 2' },
  { id: 3, name: 'Event 3', date: '2024-07-02', time: '12:00 PM', location: 'Location 3', description: 'Description 3' }
];

// GET / route
router.get('/', async (req, res) => {
  res.render('index', { title: 'Home', events });
});

// GET /events route
router.get('/events', async (req, res) => {
  res.render('events', { title: 'Events', events });
});

// GET /events/:id route
router.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id == eventId);

  if (!event) {
    return res.status(404).send('Event not found');
  }

  res.render('event-details', { title: event.name, event });
});

// GET /events/:id/edit route
router.get('/events/:id/edit', ensureAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id == eventId);

  if (!event) {
    return res.status(404).send('Event not found');
  }

  res.render('edit-event', { title: 'Edit Event', event });
});

// POST /events/:id/edit route
router.post('/events/:id/edit', ensureAuthenticated, async (req, res) => {
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
router.post('/events/:id/delete', ensureAuthenticated, async (req, res) => {
  const eventId = req.params.id;
  events = events.filter(event => event.id != eventId);
  res.redirect('/events');
});

// GET /submit route
router.get('/submit', ensureAuthenticated, async (req, res) => {
  res.render('submit', { title: 'Submit Event' });
});

// POST /submit route
router.post('/submit', ensureAuthenticated, async (req, res) => {
  const newEvent = {
    id: events.length + 1,
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description
  };

  events.push(newEvent);
  res.redirect('/events');
});

module.exports = router;
