import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  avatar: {
    width: spacing(5.5),
    height: spacing(5.5),
  },
  name: {
    margin: 0,
    paddingBottom: spacing(1),
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  email: {
    margin: 0,
    paddingBottom: spacing(3),
    fontSize: '0.75rem',
  },
  progressBackground: {
    backgroundColor: '#E7E9ED',
    height: '45px',
    width: '45px',
    position: 'absolute',
    borderRadius: '45px',
  },
  progressCircle: {
    color: 'orange',
  },
  progress: {
    display: 'flex',
    borderRadius: '40px',
    backgroundColor: '#fff',
    position: 'absolute',
    height: '37px',
    width: '37px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    left: '4px',
    top: '4px',
  },
  status: {
    display: 'inline-block',
    backgroundColor: '#F3F4F7',
    padding: '8px',
    borderRadius: '6px',
    marginBottom: spacing(1),
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  info: {
    fontSize: '0.75rem',
  },
}));

const ApplicationCard = ({ name, email, avatar, status, date, progress }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Avatar src={avatar} alt={name} className={classes.avatar} />
              </Grid>
              <Grid item xs={8}>
                <p className={classes.name}>{name}</p>
                <p className={classes.email}>{email}</p>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.progressBackground}>
                  <span className={classes.progress}>{progress}%</span>
                </div>
                <CircularProgress
                  variant="static"
                  value={progress}
                  className={classes.progressCircle}
                  size={45}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <span className={classes.status}>{status}</span>
            <div className={classes.info}> Application info: {date}</div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
