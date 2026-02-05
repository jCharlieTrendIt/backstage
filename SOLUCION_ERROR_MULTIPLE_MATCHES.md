# 🔴 Solución: "User lookup resulted in multiple matches"

## 📋 Problema

Al intentar iniciar sesión con Atlassian desde el sidebar de Backstage (después de implementar la nueva funcionalidad), aparece el error:

```
User lookup resulted in multiple matches
```

## 🔍 Causa del Error

Este error ocurre cuando el **resolver de autenticación** encuentra **múltiples usuarios** en el catálogo de Backstage que coinciden con los criterios de búsqueda.

En este caso específico, había **dos usuarios** con el mismo email:

### Archivo: `catalog/users/carlos.yaml`

```yaml
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: carlos
spec:
  profile:
    displayName: Juan Carlos Orta
    email: carlos.orta@trend-it.com.mx # ❌ Email duplicado
  memberOf: []
```

### Archivo: `catalog/users/jCharlieTrendIt.yaml`

```yaml
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: jCharlieTrendIt
spec:
  profile:
    displayName: Juan Carlos Orta
    email: carlos.orta@trend-it.com.mx # ❌ Email duplicado
  memberOf: []
```

Cuando el resolver `emailMatchingUserEntityProfileEmail` intenta hacer match del email de Atlassian con los usuarios del catálogo, encuentra **ambos usuarios** y no sabe cuál elegir, resultando en el error.

## ✅ Solución Implementada

### 1. Eliminar Usuario Duplicado

Se eliminó el archivo `catalog/users/jCharlieTrendIt.yaml` para dejar solo un usuario con ese email.

Ahora solo existe:

- ✅ `catalog/users/carlos.yaml` con email `carlos.orta@trend-it.com.mx`

### 2. Mejorar Configuración de Resolvers

Se actualizó `app-config.yaml` para usar múltiples resolvers en cascada:

```yaml
auth:
  providers:
    atlassian:
      development:
        clientId: ${ATLASSIAN_CLIENT_ID}
        clientSecret: ${ATLASSIAN_CLIENT_SECRET}
        callbackUrl: http://localhost:7007/api/auth/atlassian/handler/frame
        additionalScopes:
          - write:confluence-props
          - read:confluence-content.all
          - read:confluence-content.summary
          - read:confluence-user
          - read:jira-user
          - read:jira-work
        signIn:
          resolvers:
            # Intenta primero con el email completo
            - resolver: emailMatchingUserEntityProfileEmail
            # Si falla, intenta con la parte local del email
            - resolver: emailLocalPartMatchingUserEntityName
```

#### Cómo Funcionan los Resolvers:

1. **`emailMatchingUserEntityProfileEmail`**:

   - Busca un usuario cuyo `spec.profile.email` coincida con el email de Atlassian
   - Ejemplo: `carlos.orta@trend-it.com.mx` → Usuario con ese email

2. **`emailLocalPartMatchingUserEntityName`** (fallback):
   - Extrae la parte local del email (antes del @) y busca un usuario con ese nombre
   - Ejemplo: `carlos.orta@trend-it.com.mx` → Busca usuario con `metadata.name: carlos`

## 🚀 Pasos para Aplicar la Solución

### 1. Reiniciar el Servidor de Backstage

```bash
# En la terminal donde corre Backstage:
# 1. Presiona Ctrl+C para detener el servidor

# 2. Reinicia el servidor
yarn dev
```

### 2. Verificar que el Catálogo se Haya Actualizado

1. Abre http://localhost:3000
2. Inicia sesión con GitHub
3. Ve a "Home" en el sidebar
4. Verifica que solo aparezca **un usuario** con el email `carlos.orta@trend-it.com.mx`

### 3. Probar la Autenticación de Atlassian

1. En el sidebar, haz clic en **"Atlassian"**
2. Se abrirá el modal de autenticación
3. Haz clic en **"SIGN IN"**
4. Se abrirá el popup de OAuth de Atlassian
5. Inicia sesión con tu cuenta de Atlassian
6. **Asegúrate de usar el email**: `carlos.orta@trend-it.com.mx`
7. Autoriza la aplicación
8. El popup se cerrará automáticamente
9. ✅ **Ahora deberías estar autenticado sin errores**

## 🔍 Diferencia con la Configuración Anterior

### Antes (Login Inicial de Backstage)

En el flujo anterior, cuando iniciabas sesión en la **página de login inicial** de Backstage:

- La autenticación de Atlassian estaba en la **SignInPage**
- Se configuraba en `App.tsx` como parte de los `providers` de `SignInPage`
- El resolver funcionaba porque solo había un usuario configurado

### Ahora (Desde el Sidebar)

Con la nueva implementación:

- La opción de Atlassian está en el **sidebar** (después de iniciar sesión)
- El usuario ya está autenticado en Backstage (con GitHub o Guest)
- Al hacer clic en "Atlassian", se **re-autentica** con Atlassian
- El resolver debe hacer match del email de Atlassian con un usuario existente en el catálogo
- Por eso el error de "multiple matches" solo apareció en esta nueva configuración

## 🎯 Prevenir Errores Futuros

### Regla 1: Un Email por Usuario

**NUNCA** crear dos usuarios con el mismo email en el catálogo:

❌ **Incorrecto:**

```
catalog/users/
  ├── carlos.yaml      (email: carlos.orta@trend-it.com.mx)
  └── charlie.yaml     (email: carlos.orta@trend-it.com.mx)  ❌
```

✅ **Correcto:**

```
catalog/users/
  ├── carlos.yaml      (email: carlos.orta@trend-it.com.mx)
  └── charlie.yaml     (email: charlie@trend-it.com.mx)      ✅
```

### Regla 2: Verificar Usuarios Antes de Agregar

Antes de crear un nuevo archivo de usuario:

```bash
# Buscar si el email ya existe
grep -r "carlos.orta@trend-it.com.mx" catalog/users/
```

### Regla 3: Usar Resolvers en Cascada

Mantén siempre múltiples resolvers para tener fallbacks:

```yaml
signIn:
  resolvers:
    - resolver: emailMatchingUserEntityProfileEmail # Intento principal
    - resolver: emailLocalPartMatchingUserEntityName # Fallback
```

## 🐛 Otros Resolvers Disponibles

Si necesitas otros métodos de resolución:

### `usernameMatchingUserEntityName`

Hace match del username de Atlassian con el `metadata.name` del usuario:

```yaml
- resolver: usernameMatchingUserEntityName
```

### Resolver Personalizado

Puedes crear tu propio resolver en el backend si necesitas lógica especial.

## 📊 Resumen del Flujo de Autenticación

```
┌─────────────────────────────────────────────┐
│ 1. Usuario hace clic en "Atlassian"        │
│    en el sidebar                            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 2. Modal pregunta: ¿Iniciar sesión?        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 3. Usuario hace clic en "SIGN IN"          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 4. Se abre popup de OAuth de Atlassian     │
│    Usuario inicia sesión en Atlassian      │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 5. Atlassian devuelve:                     │
│    - Token de acceso                        │
│    - Email del usuario                      │
│    - Perfil del usuario                     │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 6. Backend de Backstage ejecuta resolver:  │
│                                             │
│    A) emailMatchingUserEntityProfileEmail   │
│       Busca: spec.profile.email             │
│       ¿Encuentra 1 usuario? → ✅ SUCCESS    │
│       ¿Encuentra 0 o >1? → Intenta B        │
│                                             │
│    B) emailLocalPartMatchingUserEntityName  │
│       Extrae: "carlos" de "carlos@..."     │
│       Busca: metadata.name = "carlos"       │
│       ¿Encuentra 1 usuario? → ✅ SUCCESS    │
│       ¿Encuentra 0 o >1? → ❌ ERROR         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 7. ✅ Usuario autenticado en Atlassian     │
│    - Token guardado                         │
│    - Sub-menús disponibles (Jira/Conf.)    │
└─────────────────────────────────────────────┘
```

## ✅ Resultado Esperado

Después de aplicar esta solución:

1. ✅ Solo hay un usuario con el email `carlos.orta@trend-it.com.mx`
2. ✅ El resolver encuentra exactamente **un usuario** (no múltiples)
3. ✅ La autenticación de Atlassian funciona correctamente
4. ✅ Los sub-menús de Jira y Confluence aparecen después de autenticarse
5. ✅ No más error de "multiple matches"

## 🎉 ¡Listo!

Ahora puedes usar la integración de Atlassian sin problemas. Si el error persiste después de reiniciar:

1. Verifica que solo haya un archivo en `catalog/users/` con tu email
2. Revisa los logs del backend para ver qué resolver está fallando
3. Asegúrate de que el email en Atlassian coincida con el del catálogo

---

**Documentado el:** 12 de enero de 2026  
**Autor:** Sistema de integración de Atlassian en Backstage
