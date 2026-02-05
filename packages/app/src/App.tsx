import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
  Page,
  Header,
  Content,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { NotificationsPage } from '@backstage/plugin-notifications';
import { SignalsDisplay } from '@backstage/plugin-signals';

import {
  githubAuthApiRef,
  atlassianAuthApiRef,
} from '@backstage/core-plugin-api';
import { Jira } from './pages/Jira';
import { ConfluencePage } from './pages/ConfluencePage';
import { LoaderProvider } from './components/Loader/LoaderProvider';
import { DocumentationPage } from './pages/DocumentationPage';
import { UnifiedThemeProvider } from '@backstage/theme';
import { customDarkTheme, customLightTheme } from './config/theme';

const app = createApp({
  apis,
  themes: [
    {
      id: 'light',
      title: 'Tema Claro',
      variant: 'light',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={customLightTheme} children={children} />
      ),
    },
    {
      id: 'dark',
      title: 'Tema Oscuro',
      variant: 'dark',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={customDarkTheme} children={children} />
      ),
    },
  ],
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        // auto
        providers={[
          'guest',
          {
            id: 'github',
            title: 'GitHub',
            message: 'Sign in using GitHub',
            apiRef: githubAuthApiRef,
          },
          {
            id: 'atlassian',
            title: 'Atlassian',
            message: 'Sign in with Atlassian',
            apiRef: atlassianAuthApiRef,
          },
        ]}
      />
    ),
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    {/* Atlassian Pages */}
    {/* <Route
      path="/jira"
      element={
        <Page themeId="tool">
          <Header
            title="Jira"
            subtitle="Gestión de proyectos y seguimiento de issues"
          />
          <Content>
            <Jira />
          </Content>
        </Page>
      }
    />
    <Route
      path="/confluence"
      element={
        <Page themeId="tool">
          <Header
            title="Confluence"
            subtitle="Documentación y colaboración en equipo"
          />
          <Content>
            <ConfluencePage />
          </Content>
        </Page>
      }
    /> */}
    <Route
      path="/documentation"
      element={
        <Page themeId="tool">
          <Header
            title="Documentation"
            subtitle="Documentación y colaboración en equipo"
          />
          <Content>
            <DocumentationPage />
          </Content>
        </Page>
      }
    />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <SignalsDisplay />

    <AppRouter>
      <LoaderProvider>
        <Root>{routes}</Root>
      </LoaderProvider>
    </AppRouter>
  </>,
);
