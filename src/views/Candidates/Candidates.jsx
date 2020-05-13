import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { shape, string, number, bool, func } from 'prop-types';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ApplicationCard from '../../components/ApplicationCard';
import useStyles from './styles';
import { fetchCandidates, removeCandidate, changeStatus } from '../../actions';

const Candidates = ({
  isLoading,
  candidates,
  fetchCandidates,
  removeCandidate,
  changeStatus,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const onDeleteHandler = (email) => {
    removeCandidate(email);
  };

  const onStatusChangeHandler = (email, status) => {
    changeStatus({ email, status });
  };

  const listCandidates = () =>
    candidates.map(
      (
        { fullName, email, avatar, state, applied_on: appliedOn, score },
        index
      ) => (
        <Grid item xs={12} key={index}>
          <ApplicationCard
            name={fullName}
            email={email}
            avatar={avatar}
            status={state.toLowerCase()}
            date={appliedOn}
            score={score}
            onDelete={onDeleteHandler}
            onStatusChange={onStatusChangeHandler}
          />
        </Grid>
      )
    );

  const showLoading = () =>
    isLoading ? (
      <div className={classes.loading}>
        <CircularProgress size={20} />
        <span className={classes.loadingText}>Getting list of candidates</span>
      </div>
    ) : null;

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.heading}>
        Candidates
      </Typography>
      <div>
        {showLoading()}
        <Grid container spacing={2} direction="column">
          {listCandidates()}
        </Grid>
      </div>
    </div>
  );
};

Candidates.propTypes = {
  candidates: shape({
    fullName: string,
    email: string,
    avatar: string,
    state: string,
    applied_on: string,
    score: number,
  }),
  isLoading: bool,
  fetchCandidates: func.isRequired,
  removeCandidate: func.isRequired,
  changeStatus: func.isRequired,
};

Candidates.defaultProps = {
  candidates: {},
  isLoading: false,
};

const mapStateToProps = ({
  candidates,
  isLoading,
  fetchCandidates,
  removeCandidate,
  changeStatus,
}) => ({
  candidates,
  isLoading,
  fetchCandidates,
  removeCandidate,
  changeStatus,
});

export default connect(mapStateToProps, {
  fetchCandidates,
  removeCandidate,
  changeStatus,
})(Candidates);
