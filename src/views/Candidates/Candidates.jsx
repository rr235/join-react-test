import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import ApplicationCard from '../../components/ApplicationCard';
import useStyles from './styles';
import { fetchCandidates } from '../../actions';

const Candidates = ({ isLoading, candidates, fetchCandidates }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const listCandidates = () =>
    candidates.map(({ fullName, email, avatar, state, applied_on }, index) => (
      <Grid item xs={12} key={index}>
        <ApplicationCard
          name={fullName}
          email={email}
          avatar={avatar}
          status={state}
          date={applied_on}
          progress={75}
        />
      </Grid>
    ));

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

const mapStateToProps = ({ fetchCandidates, candidates, isLoading }) => ({
  fetchCandidates,
  candidates,
  isLoading,
});

export default connect(mapStateToProps, { fetchCandidates })(Candidates);
