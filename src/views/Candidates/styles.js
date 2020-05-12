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

export default useStyles;
