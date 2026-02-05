import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.white,
    backgroundColor: '#000000',
    opacity: '0.95 !important',
    zIndex: theme.zIndex.drawer + 2,
  },
}));

export { useStyles };
