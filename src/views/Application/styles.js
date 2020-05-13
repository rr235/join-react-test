import { makeStyles } from '@material-ui/core/styles';

/* TODO: get max width from Breakpoints */
const useStyles = makeStyles(({ spacing }) => ({
  heading: {
    fontSize: spacing(4),
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#F3F4F7',
    padding: 10,
    minHeight: '100vh',
  },
  content: {
    maxWidth: 768,
    margin: 'auto',
  },
  formControl: {
    marginBottom: 20,

    '& label': {
      fontSize: '1.25rem',
    },
    '& .Mui-error': {
      color: 'red',
    },
    '& .Mui-error input': {
      border: '1px solid red',
    },
  },
  fileUpload: {
    paddingTop: 25,
  },
}));

const InputStyle = ({ spacing, palette, transitions }) => ({
  root: {
    'label + &': {
      marginTop: spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: palette.primary.main,
    },
  },
});

export default useStyles;
export { InputStyle };
