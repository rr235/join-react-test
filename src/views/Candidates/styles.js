import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  heading: {
    fontSize: spacing(4),
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#F3F4F7',
    padding: '10px',
    height: '100vh',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    paddingLeft: 10,
  },
}));

export default useStyles;
