import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import ApplicationCard from '../../components/ApplicationCard';
import useStyles from './styles';
import { fetchCandidates } from '../../actions';

const Candidates = ({ candidates, fetchCandidates }) => {
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

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.heading}>
        Candidates
      </Typography>
      <div>
        <Grid container spacing={2} direction="column">
          {listCandidates()}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = ({ fetchCandidates, candidates }) => ({
  fetchCandidates,
  candidates,
});

export default connect(mapStateToProps, { fetchCandidates })(Candidates);
