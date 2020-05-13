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
    height: 45,
    width: 45,
    position: 'absolute',
    borderRadius: 45,
  },
  progressCircle: {
    color: ({ score }) => {
      if (score < 20) {
        return '#f94f53';
      }
      if (score < 50) {
        return '#fd9833';
      }
      if (score < 100) {
        return '#1a86ff';
      }
      return 'green';
    },
  },
  progress: {
    display: 'flex',
    borderRadius: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    height: 37,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    left: 4,
    top: 4,
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
    padding: 8,
    borderRadius: 6,
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
