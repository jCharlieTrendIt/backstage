import { useEffect, useMemo } from 'react';
import { useLoader } from '../components/Loader/hooks/useLoader';
import { useLocation, useNavigate } from 'react-router';
import {
  Box,
  Divider,
  Paper,
  Typography,
  Button,
  Chip,
  makeStyles,
} from '@material-ui/core';
import DOMPurify from 'dompurify';

const useStyles = makeStyles(theme => ({
  contentContainer: {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& table': {
      borderCollapse: 'collapse',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    '& table td, & table th': {
      border: '1px solid #ddd',
      padding: theme.spacing(1),
    },
    '& table th': {
      backgroundColor: theme.palette.grey[200],
      fontWeight: 'bold',
    },
    '& pre': {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
    },
    '& code': {
      backgroundColor: theme.palette.grey[100],
      padding: '2px 6px',
      borderRadius: 3,
      fontFamily: 'monospace',
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    '& p': {
      marginBottom: theme.spacing(2),
    },
    '& ul, & ol': {
      marginBottom: theme.spacing(2),
    },
  },
  headerSection: {
    marginBottom: theme.spacing(3),
  },
  metadataChip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const DocumentationPage = () => {
  const { handleShowLoader } = useLoader();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  // Obtener el documento del state de navegación
  const document = (location.state as any)?.document;

  useEffect(() => {
    handleShowLoader(true);
    setTimeout(() => {
      handleShowLoader(false);
    }, 1000);
  }, [handleShowLoader]);

  // Sanitizar el HTML de Confluence
  const sanitizedHTML = useMemo(() => {
    if (!document?.body?.storage?.value) {
      return '';
    }
    return DOMPurify.sanitize(document.body.storage.value, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    });
  }, [document]);


  if (!document) {
    return (
      <Box padding={4}>
        <Typography color="textSecondary">
          No hay contenido disponible para mostrar.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/confluence')}
          style={{ marginBottom: 16 }}
        >
          Regresar a Confluence
        </Button>
      </Box>
    );
  }

  // Renderizar documento de Confluence
  return (
    <Box padding={4}>
      <Box className={classes.headerSection}>
        <Button
          variant="outlined"
          onClick={() => navigate('/confluence')}
          style={{ marginBottom: 16 }}
        >
          Regresar a Confluence
        </Button>

        <Typography variant="h3" gutterBottom>
          {document.title}
        </Typography>

        <Box display="flex" flexWrap="wrap" alignItems="center" marginBottom={2}>
          {document.space && (
            <Chip
              label={`Espacio: ${document.space.name}`}
              className={classes.metadataChip}
              color="primary"
              variant="outlined"
            />
          )}
          {document.version && (
            <Chip
              label={`Versión: ${document.version.number}`}
              className={classes.metadataChip}
              variant="outlined"
            />
          )}
          {document.type && (
            <Chip
              label={`Tipo: ${document.type}`}
              className={classes.metadataChip}
              variant="outlined"
            />
          )}
        </Box>

        {document.ancestors && document.ancestors.length > 0 && (
          <Box marginBottom={2}>
            <Typography variant="caption" color="textSecondary">
              Ruta: {document.ancestors.map((a: any) => a.title).join(' / ')} / {document.title}
            </Typography>
          </Box>
        )}

        <Divider />
      </Box>

      <Paper elevation={2} style={{ padding: 24 }}>
        {sanitizedHTML ? (
          <div
            className={classes.contentContainer}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
        ) : (
          <Typography color="textSecondary">
            No hay contenido disponible para mostrar.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
