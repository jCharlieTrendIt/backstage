import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
  },
}));

export const Jira = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InfoCard title="Jira - Gestión de Proyectos">
            <Typography variant="body1" paragraph>
              Bienvenido a la integración de Jira con Backstage.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Aquí podrás ver tus proyectos, issues y dashboards de Jira.
            </Typography>
          </InfoCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mis Issues
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Próximamente: Lista de issues asignados a ti
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Proyectos Activos
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Próximamente: Lista de tus proyectos en Jira
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
