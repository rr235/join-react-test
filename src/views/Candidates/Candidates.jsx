import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import ApplicationCard from '../../components/ApplicationCard';

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
      <Grid item>
        <ApplicationCard
          name={fullName}
          email={email}
          avatar={avatar}
          status={state}
          date={applied_on}
        />
      </Grid>
    ));

  return (
    <div>
      <Typography variant="h1">Candidates</Typography>
      <Grid container spacing={2} direction="column">
        {listCandidates()}
      </Grid>
    </div>
  );
};

export default Candidates;
