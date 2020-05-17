const { v4: uuidv4 } = require('uuid');

const createCandidateId = () => uuidv4();

const getCandidateScore = (candidate) => {
  let score = 0;
  if (candidate.fullName.trim()) {
    score += 10;
  }
  if (candidate.email.trim()) {
    score += 10;
  }
  if (candidate.password) {
    score += 10;
  }
  if (candidate.phone) {
    score += 20;
  }
  if (candidate.avatar) {
    score += 50;
  }

  return score;
};

const setCandidateScoreAndId = (candidatesList) =>
  candidatesList.map((candidate) => {
    const id = createCandidateId();
    const score = getCandidateScore(candidate);
    return { ...candidate, score, id };
  });

module.exports = {
  createCandidateId,
  getCandidateScore,
  setCandidateScoreAndId,
};
