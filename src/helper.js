import { v4 as uuidv4 } from 'uuid';

export const getCandidateScore = (candidate) => {
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

export const createCandidateId = () => uuidv4();

export const setCandidateScoreAndId = (candidatesList) =>
  candidatesList.map((candidate) => {
    const score = getCandidateScore(candidate);
    const id = createCandidateId();
    return { ...candidate, score, id };
  });
