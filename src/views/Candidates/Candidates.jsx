import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { shape, string, number, bool, func, arrayOf } from 'prop-types';
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

  const onDeleteHandler = (id) => {
    removeCandidate(id);
  };

  const onStatusChangeHandler = (id, status) => {
    changeStatus({ id, status });
  };

  const listCandidates = () =>
    candidates.map(
      (
        { id, fullName, email, avatar, state, applied_on: appliedOn, score },
        index
      ) => (
        <Grid item xs={12} key={index}>
          <ApplicationCard
            id={id}
            name={fullName}
            email={email}
            avatar={avatar}
            status={state.toLowerCase()}
            date={appliedOn}
            score={score}
            onDelete={onDeleteHandler}
            onStatusChange={onStatusChangeHandler}
            className={classes.applicationCard}
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
      <div className={classes.content}>
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
    </div>
  );
};

Candidates.propTypes = {
  candidates: arrayOf(
    shape({
      id: string,
      fullName: string,
      email: string,
      avatar: string,
      state: string,
      applied_on: string,
      score: number,
    })
  ),
  isLoading: bool,
  fetchCandidates: func.isRequired,
  removeCandidate: func.isRequired,
  changeStatus: func.isRequired,
};

Candidates.defaultProps = {
  candidates: [],
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
