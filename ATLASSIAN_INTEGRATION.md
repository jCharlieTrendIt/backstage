# 🔵 Integración de Atlassian en Backstage

## 📋 Descripción

Esta integración permite acceder a Jira y Confluence desde Backstage, con autenticación mediante OAuth2 de Atlassian.

## ✨ Características Implementadas

### 1. **Opción Atlassian en el Sidebar**

- Aparece en el menú lateral izquierdo con el icono de nube (Cloud)
- Al hacer clic, verifica si el usuario está autenticado
- Si no está autenticado, muestra un modal de inicio de sesión

### 2. **Modal de Autenticación**

- Diseño moderno con el logo de Atlassian
- Mensaje claro: "Debes iniciar sesión en Atlassian"
- Botón "SIGN IN" que abre el popup de OAuth
- Indicador de carga durante el proceso

### 3. **Sub-menús Desplegables**

Una vez autenticado, la opción "Atlassian" muestra dos sub-opciones:

- **Jira**: Acceso a proyectos y gestión de issues
- **Confluence**: Acceso a espacios y documentación

### 4. **Páginas Dedicadas**

- `/jira`: Página de integración con Jira
- `/confluence`: Página de integración con Confluence

## 🏗️ Estructura de Archivos Creados

```
packages/app/src/
├── components/
│   ├── AtlassianAuthModal/
│   │   ├── AtlassianAuthModal.tsx    # Modal de autenticación
│   │   └── index.ts
│   └── AtlassianSidebarItem/
│       ├── AtlassianSidebarItem.tsx   # Componente del sidebar
│       └── index.ts
├── hooks/
│   └── useAtlassianAuth.ts            # Hook para gestionar auth
└── pages/
    ├── Jira.tsx                       # Página de Jira
    └── ConfluencePage.tsx             # Página de Confluence
```

## 🔧 Archivos Modificados

### 1. `packages/app/src/components/Root/Root.tsx`

- Se agregó el import de `AtlassianSidebarItem`
- Se añadió el componente en el menú del sidebar

### 2. `packages/app/src/App.tsx`

- Se agregaron las rutas `/jira` y `/confluence`
- Se importaron los componentes de las páginas

### 3. `packages/backend/src/plugins/auth.ts`

- Configuración del router de autenticación

## 🔐 Configuración de Autenticación

La autenticación ya está configurada en `app-config.yaml`:

```yaml
auth:
  providers:
    atlassian:
      development:
        clientId: ${ATLASSIAN_CLIENT_ID}
        clientSecret: ${ATLASSIAN_CLIENT_SECRET}
        callbackUrl: http://localhost:7007/api/auth/atlassian/handler/frame
        additionalScopes:
          - offline_access
          - read:me
          - write:confluence-props
          - read:confluence-content.all
          - read:confluence-content.summary
          - read:confluence-user
          - read:jira-user
          - read:jira-work
```

## 🚀 Cómo Usar

### 1. Iniciar Backstage

```bash
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\backstage"
yarn dev
```

### 2. Acceder a la Aplicación

1. Abre http://localhost:3000
2. Inicia sesión con GitHub (o como Guest)
3. Una vez dentro, verás la opción "Atlassian" en el sidebar

### 3. Autenticarse en Atlassian

1. Haz clic en "Atlassian" en el sidebar
2. Se abrirá un modal
3. Haz clic en "SIGN IN"
4. Se abrirá un popup de OAuth de Atlassian
5. Autoriza la aplicación
6. El popup se cerrará automáticamente

### 4. Acceder a Jira y Confluence

Una vez autenticado:

1. Haz clic nuevamente en "Atlassian"
2. Verás las opciones desplegables:
   - **Jira**: Click para ir a `/jira`
   - **Confluence**: Click para ir a `/confluence`

## 🎨 Flujo de Usuario

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuario hace clic en "Atlassian" en el sidebar      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌───────────────────────┐
        │ ¿Está autenticado?    │
        └───────────┬───────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
        NO                    SÍ
         │                     │
         ▼                     ▼
┌────────────────────┐  ┌──────────────────┐
│ Mostrar Modal      │  │ Mostrar sub-menú │
│ "Debes iniciar     │  │ - Jira           │
│  sesión"           │  │ - Confluence     │
└────────┬───────────┘  └──────────────────┘
         │
         ▼
┌────────────────────┐
│ Click en SIGN IN   │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Popup OAuth        │
│ (Atlassian)        │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Autorización       │
│ exitosa            │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Modal se cierra    │
│ Sub-menú disponible│
└────────────────────┘
```

## 🛠️ Personalización

### Modificar Scopes de OAuth

Edita `packages/app/src/hooks/useAtlassianAuth.ts`:

```typescript
await atlassianAuthApi.getAccessToken([
  'offline_access',
  'read:me',
  // Agrega más scopes aquí
  'write:jira-work',
  'read:confluence-space.summary',
]);
```

### Agregar Más Sub-opciones

Edita `packages/app/src/components/AtlassianSidebarItem/AtlassianSidebarItem.tsx`:

```tsx
<SidebarSubmenuItem title="Bitbucket" to="/bitbucket" icon={CodeIcon} />
```

### Personalizar el Modal

Edita `packages/app/src/components/AtlassianAuthModal/AtlassianAuthModal.tsx`

## 🐛 Solución de Problemas

### El popup de OAuth no se abre

- Verifica que el navegador no esté bloqueando popups
- Revisa la consola del navegador para errores
- Asegúrate de que el backend esté corriendo en `http://localhost:7007`

### "No está autenticado" después de iniciar sesión

- Recarga la página
- Revisa los logs del backend
- Verifica que las credenciales en `app-config.yaml` sean correctas

### Los sub-menús no aparecen

- Abre la consola del navegador
- Verifica el estado de `useAtlassianAuth`
- Asegúrate de que la autenticación fue exitosa

## 📊 Estado de Desarrollo

✅ **Completado:**

- Modal de autenticación
- Hook de autenticación personalizado
- Componente del sidebar con sub-menús
- Páginas de Jira y Confluence (estructura base)
- Rutas configuradas
- Integración con OAuth de Atlassian

🚧 **Pendiente (Futuras Mejoras):**

- Integración real con la API de Jira (mostrar issues)
- Integración real con la API de Confluence (mostrar espacios)
- Persistencia del estado de autenticación
- Botón de Sign Out
- Indicador visual de usuario autenticado
- Manejo de expiración de tokens
- Tests unitarios

## 📚 Recursos Adicionales

- [Backstage Auth Documentation](https://backstage.io/docs/auth/)
- [Atlassian OAuth 2.0 (3LO)](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/)
- [Jira Cloud REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- [Confluence Cloud REST API](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/)

## 🎉 ¡Listo!

La integración está completa y funcional. Ahora puedes:

1. Hacer clic en "Atlassian" en el sidebar
2. Iniciar sesión con tu cuenta de Atlassian
3. Acceder a las páginas de Jira y Confluence

Para agregar funcionalidad real a estas páginas, necesitarás llamar a las APIs de Jira y Confluence usando el token de acceso obtenido.
