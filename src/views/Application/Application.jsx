import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  InputBase,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
  Grid,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import TelephoneNumberInput from './components/TelephoneNumberInput';
import useStyles, { InputStyle } from './styles';
import { addCandidate } from '../../actions';

const StyledInput = withStyles(InputStyle)(InputBase);

const Application = ({ addCandidate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const avatarRef = useRef(null);

  const classes = useStyles();

  const clearFields = () => {
    avatarRef.current.value = null;
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setAvatarUrl('');
    setTermsAccepted(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let hasError = false;

    if (!email) {
      hasError = true;
      setEmailError(true);
    }

    if (!termsAccepted) {
      hasError = true;
      setTermsError(true);
    }

    if (!hasError) {
      const date = new Date();
      const candidate = {
        email,
        password,
        fullName: `${firstName} ${lastName}`,
        phone,
        state: 'submitted',
        applied_on: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
        avatar: avatarUrl,
      };

      addCandidate(candidate);
      setShowNotification(true);
      clearFields();
    }
  };

  const onFileUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => setAvatarUrl(e.target.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography variant="h1" className={classes.heading}>
          Interested in this job?
        </Typography>
        <form onSubmit={onSubmitHandler} noValidate>
          <FormControl
            fullWidth
            className={classes.formControl}
            error={emailError}
          >
            <InputLabel shrink htmlFor="email">
              Your E-mail
            </InputLabel>
            <StyledInput
              id="email"
              placeholder="john.doe@join.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="password">
              Set a Password
            </InputLabel>
            <StyledInput
              id="password"
              placeholder="Choose a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink htmlFor="firstName">
                  First Name
                </InputLabel>
                <StyledInput
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel shrink htmlFor="lastName">
                  Last Name
                </InputLabel>
                <StyledInput
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="avatar">
              Upload an avatar for your profile
            </InputLabel>
            <div className={classes.fileUpload}>
              <input
                id="avatar"
                type="file"
                onChange={onFileUpload}
                ref={avatarRef}
              />
            </div>
          </FormControl>
          <FormControl
            fullWidth
            className={classes.formControl}
            error={termsError}
          >
            <FormControlLabel
              control={<Checkbox name="terms" />}
              label="I agrees to JOIN's terms and conditions as well as privacy policy."
              className={classes.terms}
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setTermsError(false);
              }}
            />
            {termsError && (
              <FormHelperText>
                Please accept terms and conditions.
              </FormHelperText>
            )}
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Apply now for this job
          </Button>
        </form>
        <Snackbar
          autoHideDuration={6000}
          open={showNotification}
          onClose={() => setShowNotification(false)}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setShowNotification(false)}
          >
            Data Saved!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapStateToProps = ({ addCandidate }) => ({ addCandidate });

export default connect(mapStateToProps, { addCandidate })(Application);
