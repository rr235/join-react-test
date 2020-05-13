import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

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
    color: ({ score }) => {
      if (score < 20) {
        return '#f94f53';
      } else if (score < 50) {
        return '#fd9833';
      } else if (score < 100) {
        return '#1a86ff';
      }
      return 'green';
    },
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
    backgroundColor: ({ status }) => {
      switch (status) {
        case 'in review':
          return '#e6f3ff';
        case 'hired':
          return '#e6ffe7';
        case 'not a fit':
          return '#feeced';
        case 'submitted':
        default:
          return '#f3f4f7';
      }
    },
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionsButton: {
    padding: '0 5px',
  },
}));

export default useStyles;
