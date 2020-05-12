import React from 'react';
import { Card, CardContent, Grid, Avatar, Paper } from '@material-ui/core';

const ApplicationCard = ({ name, email, avatar, status, date }) => (
  <Card>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Avatar src={avatar} alt={name} />
            </Grid>
            <Grid item xs={8}>
              <p>{name}</p>
              <p>{email}</p>
            </Grid>
            <Grid item xs={3}>
              Progress
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper>{status}</Paper>
          Application info: {date}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default ApplicationCard;
