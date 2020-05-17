import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
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
import { STATUS_SUBMITTED } from '../../components/ApplicationCard';
import useStyles, { InputStyle } from './styles';
import { addCandidate } from '../../actions';

const StyledInput = withStyles(InputStyle)(InputBase);

const Application = ({ addCandidate }) => {
  const classes = useStyles();
  const avatarRef = useRef(null);
  const initialFormValue = {
    isValid: false,
    controls: {
      email: { value: '', isRequired: true },
      password: { value: '' },
      firstName: { value: '' },
      lastName: { value: '' },
      phone: { value: '' },
      avatar: { value: '' },
      terms: { value: false, isRequired: true },
    },
  };
  const [formData, setFromData] = useState(initialFormValue);
  const [notification, setNotification] = useState({
    message: '',
    success: true,
  });

  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    terms,
    avatar,
  } = formData.controls;

  const handleFormChange = (event) => {
    const { name, type, checked } = event.target;
    let { value } = event.target;

    if (type === 'checkbox') {
      value = checked;
    }

    const controls = {
      ...formData.controls,
      [name]: {
        ...formData.controls[name],
        error: formData.controls[name].isRequired && !value,
        value,
      },
    };

    const isValid = Object.keys(controls).reduce((accumulator, key) => {
      const field = controls[key];
      return field.isRequired ? accumulator && !field.error : accumulator;
    }, true);

    setFromData({
      controls,
      isValid,
    });
  };

  const clearFields = () => {
    avatarRef.current.value = null;
    setFromData(initialFormValue);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (formData.isValid) {
      const date = new Date();
      const candidate = {
        email: email.value,
        password: password.value,
        fullName: `${firstName.value} ${lastName.value}`,
        phone: phone.value,
        avatar: avatar.value,
        state: STATUS_SUBMITTED,
        applied_on: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
      };

      addCandidate(candidate).then(
        () => {
          setNotification({ message: 'Data Saved', success: true });
        },
        (error) => {
          setNotification({ message: error.message, success: false });
        }
      );
      clearFields();
    }
  };

  const onFileUpload = (event) => {
    const { name } = event.target;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleFormChange({ target: { name, value: e.target.result } });
    };
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
            error={email.error}
          >
            <InputLabel shrink htmlFor="email">
              Your E-mail
            </InputLabel>
            <StyledInput
              id="email"
              name="email"
              placeholder="john.doe@join.com"
              value={email.value}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="password">
              Set a Password
            </InputLabel>
            <StyledInput
              id="password"
              name="password"
              placeholder="Choose a password"
              type="password"
              value={password.value}
              onChange={handleFormChange}
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
                  name="firstName"
                  placeholder="John"
                  value={firstName.value}
                  onChange={handleFormChange}
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
                  name="lastName"
                  placeholder="Doe"
                  value={lastName.value}
                  onChange={handleFormChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="telephone">
              Telephone Number
            </InputLabel>
            <StyledInput
              id="phone"
              name="phone"
              placeholder="0123 1122 890"
              inputComponent={TelephoneNumberInput}
              value={phone.value}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel shrink htmlFor="avatar">
              Upload an avatar for your profile
            </InputLabel>
            <div className={classes.fileUpload}>
              <input
                id="avatar"
                name="avatar"
                type="file"
                onChange={onFileUpload}
                ref={avatarRef}
              />
            </div>
          </FormControl>
          <FormControl
            fullWidth
            className={classes.formControl}
            error={terms.error}
          >
            <FormControlLabel
              control={<Checkbox name="terms" id="terms" />}
              label="I agrees to JOIN's terms and conditions as well as privacy policy."
              className={classes.terms}
              checked={terms.value}
              onChange={handleFormChange}
            />
            {terms.error && (
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
          open={!!notification.message}
          onClose={() => setNotification({ message: '' })}
        >
          <Alert
            severity={notification.success ? 'success' : 'error'}
            variant="filled"
            onClose={() => setNotification({ message: '' })}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

Application.propTypes = {
  addCandidate: func.isRequired,
};

const mapStateToProps = ({ addCandidate }) => ({ addCandidate });

export default connect(mapStateToProps, { addCandidate })(Application);
