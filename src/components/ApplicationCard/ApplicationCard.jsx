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

const STATUS_NOT_FIT = 'STATUS_NOT_FIT';
const STATUS_IN_REVIEW = 'STATUS_IN_REVIEW';

const ApplicationCard = ({
  name,
  email,
  avatar,
  status,
  date,
  progress,
  onStatusChange,
  onDelete,
}) => {
  const classes = useStyles();
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
    onStatusChange(status);
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
              <MenuItem onClick={() => handleStatusChange(STATUS_IN_REVIEW)}>
                In Review
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange(STATUS_NOT_FIT)}>
                Not a Fit
              </MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
export { STATUS_IN_REVIEW, STATUS_NOT_FIT };
