import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import ApplicationCard from '../../components/ApplicationCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  heading: {
    fontSize: spacing(8),
  },
  container: {
    backgroundColor: '#F3F4F7',
    padding: '10px',
    height: '100vh',
  },
}));

const candidateList = [
  {
    fullName: 'Ruby Banks',
    email: 'ruby.banks@example.com',
    password: '123123',
    phone: '+491231122890',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    applied_on: '01.04.2020',
    state: 'submitted',
  },
  {
    fullName: 'Lester Morrison',
    email: 'lester.morrison@example.com',
    password: '',
    phone: '+491231122890',
    avatar: '',
    applied_on: '05.03.2020',
    state: 'in review',
  },
  {
    fullName: 'Darren Reid',
    email: 'darren.reid@example.com',
    password: '0w39rj',
    avatar: 'https://randomuser.me/ap/portraits/men/45.jp',
    applied_on: '20.04.2020',
    state: 'submitted',
  },
  {
    fullName: 'Sara Griffin',
    email: 'sara.griffin@example.com',
    phone: '+34633383774',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
    applied_on: '04.04.2019',
    state: 'not a fit',
  },
];

const Candidates = () => {
  const listCandidates = () =>
    candidateList.map(({ fullName, email, avatar, state, applied_on }) => (
      <Grid item xs={12}>
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

  const classes = useStyles();

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

export default Candidates;
