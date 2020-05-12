import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Home = () => (
  <div>
    <Typography variant="h1">Home</Typography>
    <ul>
      <li>
        <Link to="/application">
          <Typography variant="body1">Application</Typography>
        </Link>
      </li>
      <li>
        <Link to="/candidates">
          <Typography variant="body1">Candidates</Typography>
        </Link>
      </li>
    </ul>
  </div>
);

export default Home;
