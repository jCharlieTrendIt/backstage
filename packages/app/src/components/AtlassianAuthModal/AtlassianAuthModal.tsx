import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import { Progress } from '@backstage/core-components';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 400,
  },
  content: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  message: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  atlassianIcon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(2),
  },
}));

export interface AtlassianAuthModalProps {
  open: boolean;
  onClose: () => void;
  onSignIn: () => Promise<void>;
  isLoading?: boolean;
}

export const AtlassianAuthModal: React.FC<AtlassianAuthModalProps> = ({
  open,
  onClose,
  onSignIn,
  isLoading = false,
}) => {
  const classes = useStyles();

  const handleSignIn = async () => {
    try {
      await onSignIn();
      onClose();
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
      maxWidth="sm"
    >
      <DialogTitle className={classes.title}>
        Autenticación Requerida
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <svg
            className={classes.atlassianIcon}
            viewBox="0 0 24 24"
            fill="#0052CC"
          >
            <path d="M11.5 0c-.5 0-.8.3-1 .7L.4 22.5c-.1.4 0 .8.3 1 .2.2.5.3.8.3h8.8c.4 0 .7-.2.9-.5 2.9-5.1 2.9-11.4 0-16.5-.4-.6-.9-.8-1.3-.8zm1.6 5.5c.4.6 3.7 6.4 4.6 8.3l3.9 6.8c.2.4.2.8 0 1.1-.2.3-.5.5-.9.5H12c.8-1.4 1.2-3 1.2-4.6 0-3.8-1.9-7.4-4.5-9.8 1.3-1.5 3.2-2.9 4.4-2.3z" />
          </svg>
          <Typography variant="h6" className={classes.message}>
            Debes iniciar sesión en Atlassian
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Para acceder a Jira y Confluence, necesitas autenticarte con tu
            cuenta de Atlassian.
          </Typography>
        </Box>
        {isLoading && (
          <Box mt={2}>
            <Progress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancelar
        </Button>
        <Button
          onClick={handleSignIn}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          SIGN IN
        </Button>
      </DialogActions>
    </Dialog>
  );
};
