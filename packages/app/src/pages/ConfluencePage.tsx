import { Button, Grid, Typography, makeStyles } from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import { CustomTable } from '../components/Table/Table';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi, discoveryApiRef } from '@backstage/core-plugin-api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
  },
}));

export const ConfluencePage = () => {
  const classes = useStyles();
  const discoveryApi = useApi(discoveryApiRef);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchConfluenceProjects = async () => {
      try {
        // Configuración de Confluence con API Token (Basic Auth)
        const email = process.env.REACT_APP_CONFLUENCE_EMAIL;
        const apiToken = process.env.REACT_APP_CONFLUENCE_API_TOKEN;

        if (!apiToken) {
          // eslint-disable-next-line no-console
          console.error('❌ API Token no configurado');
          // eslint-disable-next-line no-console
          console.log('📝 Instrucciones:');
          // eslint-disable-next-line no-console
          console.log('1. Crea un API Token en: https://id.atlassian.com/manage-profile/security/api-tokens');
          // eslint-disable-next-line no-console
          console.log('2. Agrega en tu archivo .env (raíz del proyecto):');
          // eslint-disable-next-line no-console
          console.log('   REACT_APP_CONFLUENCE_EMAIL=carlos.orta@trend-it.com.mx');
          // eslint-disable-next-line no-console
          console.log('   REACT_APP_CONFLUENCE_API_TOKEN=tu_token_aqui');
          // eslint-disable-next-line no-console
          console.log('3. Reinicia el servidor: yarn dev');
          return;
        }

        // eslint-disable-next-line no-console
        console.log('🔑 Usando autenticación Basic Auth');
        // eslint-disable-next-line no-console
        console.log('📧 Email:', email);

        // Crear el token de autenticación Basic (igual que tu script anterior)
        const auth = btoa(`${email}:${apiToken}`);

        // Obtener la URL base del proxy del backend
        const proxyUrl = await discoveryApi.getBaseUrl('proxy');
        
        // eslint-disable-next-line no-console
        console.log('🌐 URL del proxy:', proxyUrl);

        // Configurar axios para usar Basic Auth (igual que tu script con Turndown)
        const api = axios.create({
          baseURL: `${proxyUrl}/confluence-basic/rest/api`,
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: 'application/json',
          },
        });

        // eslint-disable-next-line no-console
        console.log('📡 Obteniendo espacios de Confluence...');

        // Obtener espacios (igual que en tu script)
        const spacesResponse = await api.get('/space?limit=25&expand=description.plain,homepage');
        
        // eslint-disable-next-line no-console
        console.log('✅ ¡Conexión exitosa!');
        // eslint-disable-next-line no-console
        console.log('📦 Espacios de Confluence:', spacesResponse.data);

        if (spacesResponse.data.results && spacesResponse.data.results.length > 0) {
          // eslint-disable-next-line no-console
          console.log('📋 Espacios encontrados:');
          spacesResponse.data.results.forEach((space: any) => {
            // eslint-disable-next-line no-console
            console.log(`  - ${space.name} (${space.key})`);
          });
        }

        // Obtener contenido reciente con body.storage (XHTML para Turndown)
        // eslint-disable-next-line no-console
        console.log('📄 Obteniendo contenido...');
        
        const contentResponse = await api.get('/content?limit=10&expand=body.storage,version,space,ancestors');
        
        // eslint-disable-next-line no-console
        console.log('📄 Contenido de Confluence:', contentResponse.data);

        // eslint-disable-next-line no-console
        console.log('contentResponse.data.results', contentResponse);

        setData(contentResponse.data.results || []);

        // if (contentResponse.data.results && contentResponse.data.results.length > 0) {
        //   // eslint-disable-next-line no-console
        //   console.log('📑 Páginas encontradas:');
        //   contentResponse.data.results.forEach((page: any) => {
        //     // eslint-disable-next-line no-console
        //     console.log(`  - ${page.title} (ID: ${page.id})`);
        //     // El XHTML está en page.body.storage.value - listo para Turndown
        //     if (page.body?.storage?.value) {
        //       // eslint-disable-next-line no-console
        //       console.log(`    HTML disponible: ${page.body.storage.value.substring(0, 100)}...`);
        //     }
        //   });
        // }

      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Error al obtener datos de Confluence:', error);
        if (axios.isAxiosError(error)) {
          // eslint-disable-next-line no-console
          console.error('📋 Detalles del error:', {
            url: error.config?.url,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
          });
        }
      }
    };

    fetchConfluenceProjects();
  }, [discoveryApi]);

  const navigate = useNavigate();


  const handleViewProject = (document: any) => {
    navigate('/documentation', { state: { document } });
  };

  const headers = [
    {
      key: 'id',
      title: 'ID',
      alignContent: 'center' as const,
      alignHeader: 'center' as const,
    },
    {
      key: 'title',
      title: 'TÍTULO',
      alignContent: 'left' as const,
      alignHeader: 'left' as const,
    },
    {
      key: 'space',
      title: 'ESPACIO',
      alignContent: 'center' as const,
      alignHeader: 'center' as const,
      render: (row: any) => <span>{row.space?.name || '-'}</span>,
    },
    {
      key: 'action',
      title: '',
      alignContent: 'center' as const,
      alignHeader: 'center' as const,
      maxWidth: 200,
      render: (row: any) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleViewProject(row)}
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InfoCard title="Confluence - Documentación Colaborativa">
            <Typography variant="body1" paragraph>
              Bienvenido a la integración de Confluence con Backstage.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Aquí podrás acceder a tus espacios, páginas y documentación de
              Confluence.
            </Typography>
          </InfoCard>
        </Grid>

        <Grid item xs={12}>
          <CustomTable
            data={data}
            headers={headers}
            showPagination
            currentPage={0}
            totalItems={0}
            itemsPerPage={10}
            onPageChange={() => {}}
            onItemsPerPageChange={() => {}}
          />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Espacios Recientes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Próximamente: Lista de espacios de Confluence
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Páginas Destacadas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Próximamente: Páginas más visitadas
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </div>
  );
};
