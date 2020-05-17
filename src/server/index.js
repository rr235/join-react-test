const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const {
  setCandidateScoreAndId,
  getCandidateScore,
  createCandidateId,
} = require('./utils');

let dataCache = [];

const { PORT } = process.env;
const port = PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PATCH, DELETE',
};
app.use(cors(corsOptions));

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

app.get('/candidates', async (req, res) => {
  if (!dataCache.length) {
    const { data } = await axios.get(
      'https://candidates.free.beeceptor.com/api/candidate'
    );
    dataCache = setCandidateScoreAndId(data);
  }
  res.send(dataCache);
});

app.post('/addCandidate', (req, res) => {
  try {
    const candidate = req.body;
    candidate.id = createCandidateId();
    candidate.score = getCandidateScore(candidate);

    dataCache.push(candidate);
    res.status(200).send(candidate);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch('/updateCandidateStatus', (req, res) => {
  try {
    const { id, status } = req.body;

    const candidate = dataCache.find(
      ({ id: candidateId }) => id === candidateId
    );
    candidate.state = status;

    res.status(200).send(candidate);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/removeCandidate', (req, res) => {
  try {
    const { id } = req.body;

    const candidate = dataCache.find(
      ({ id: candidateId }) => id === candidateId
    );
    const index = dataCache.indexOf(candidate);
    dataCache.splice(index, 1);

    res.status(200).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
});
