export const getCandidateScore = (candidate) => {
  let score = 0;
  if (candidate.fullName) {
    score += 10;
  }
  if (candidate.email) {
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

export const getCandidatesListWithScore = (candidatesList) =>
  candidatesList.map((candidate) => {
    const score = getCandidateScore(candidate);
    return { ...candidate, score };
  });
