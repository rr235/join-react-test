import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import useStyles from './styles';

const STATUS_NOT_FIT = 'not a fit';
const STATUS_IN_REVIEW = 'in review';
const STATUS_SUBMITTED = 'submitted';
const STATUS_HIRED = 'hired';

const ApplicationCard = ({
  name,
  email,
  avatar,
  status,
  date,
  score,
  onStatusChange,
  onDelete,
}) => {
  const classes = useStyles({ status, score });
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = `menu-${Date.now()}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    onDelete(email);
  };

  const handleStatusChange = (status) => {
    handleClose();
    onStatusChange(email, status);
  };

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
                  <span className={classes.progress}>{score}%</span>
                </div>
                <CircularProgress
                  variant="static"
                  value={score}
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
          <Grid item className={classes.actions}>
            <IconButton
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.actionsButton}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id={menuId}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {status === STATUS_SUBMITTED && (
                <MenuItem onClick={() => handleStatusChange(STATUS_IN_REVIEW)}>
                  In Review
                </MenuItem>
              )}
              {status === STATUS_IN_REVIEW && (
                <MenuItem onClick={() => handleStatusChange(STATUS_NOT_FIT)}>
                  Not a Fit
                </MenuItem>
              )}
              {status === STATUS_IN_REVIEW && (
                <MenuItem onClick={() => handleStatusChange(STATUS_HIRED)}>
                  Hire
                </MenuItem>
              )}
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
export { STATUS_IN_REVIEW, STATUS_NOT_FIT, STATUS_SUBMITTED, STATUS_HIRED };
