import React from 'react';
import {
  Typography,
  InputBase,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TelephoneNumberInput from './components/TelephoneNumberInput';
import useStyles, { InputStyle } from './styles';

const StyledInput = withStyles(InputStyle)(InputBase);

const Application = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography variant="h1" className={classes.heading}>
          Interested in this job?
        </Typography>
        <form noValidate>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="email">
              Your E-mail
            </InputLabel>
            <StyledInput id="email" placeholder="john.doe@join.com" />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="password">
              Set a Password
            </InputLabel>
            <StyledInput
              id="password"
              placeholder="Choose a password"
              type="password"
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink htmlFor="firstName">
                  First Name
                </InputLabel>
                <StyledInput id="firstName" placeholder="John" />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink htmlFor="lastName">
                  Last Name
                </InputLabel>
                <StyledInput id="lastName" placeholder="Doe" />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="telephone">
              Telephone Number
            </InputLabel>
            <StyledInput
              id="telephone"
              name="telephoneNumber"
              placeholder="0123 1122 890"
              inputComponent={TelephoneNumberInput}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="avatar">
              Upload an avatar for your profile
            </InputLabel>
            <StyledInput id="avatar" type="file" />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <FormControlLabel
              control={<Checkbox name="terms" />}
              label="I agrees to JOIN's terms and conditions as well as privacy policy."
              className={classes.terms}
            />
          </FormControl>
          <Button variant="contained" color="primary" size="large">
            Apply now for this job
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Application;
