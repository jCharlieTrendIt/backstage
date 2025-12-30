# 🔧 Solución al problema de TechDocs - Linear Progress

## Problema Identificado

Tu documentación de Confluence se muestra con un "linear progress" infinito en Backstage porque:

1. ❌ TechDocs estaba configurado para usar Docker (`runIn: 'docker'`)
2. ❌ Python no está instalado (requerido para generar la documentación)
3. ❌ Falta instalar `mkdocs` y plugins necesarios

## ✅ Cambios Realizados

### 1. Configuración de TechDocs actualizada

He cambiado en `app-config.yaml`:

- ✓ `generator.runIn` de `'docker'` a `'local'`
- ✓ Agregado `'*.github.com'` a los hosts permitidos

### 2. Configuración de mkdocs mejorada

Actualicé `C:\Users\juan_\OneDrive\Documentos\Liverpool\Confluence\mkdocs.yml` para incluir:

- ✓ Theme Material (requerido por TechDocs)
- ✓ Plugin `techdocs-core`
- ✓ Configuración de búsqueda

## 📋 Pasos para Completar la Solución

### Paso 1: Instalar Python 3.11 o superior

1. Descarga Python desde: https://www.python.org/downloads/
2. **IMPORTANTE**: Durante la instalación, marca la casilla "Add Python to PATH"
3. Verifica la instalación:

```bash
python --version
```

### Paso 2: Instalar mkdocs y dependencias

Abre una terminal y ejecuta:

```bash
# Instalar mkdocs y el plugin de TechDocs
pip install mkdocs-techdocs-core

# O si tienes problemas, instala uno por uno:
pip install mkdocs
pip install mkdocs-material
pip install mkdocs-techdocs-core
```

### Paso 3: Verificar que tus archivos estén en GitHub

Asegúrate de que el repositorio `https://github.com/jCharlieTrendIt/confluence` tenga:

- ✓ `catalog-info.yml` en la raíz
- ✓ `mkdocs.yml` en la raíz (actualizado con los cambios)
- ✓ Carpeta `docs/` con todos los archivos `.md`

```bash
# Navega a tu proyecto de Confluence
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\Confluence"

# Haz commit y push de los cambios
git add .
git commit -m "Actualizar configuración de mkdocs para TechDocs"
git push origin main
```

### Paso 4: Probar localmente con TechDocs CLI (Opcional pero recomendado)

```bash
# Instalar TechDocs CLI globalmente
npm install -g @techdocs/cli

# Navegar a tu proyecto de Confluence
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\Confluence"

# Generar y servir la documentación localmente
techdocs-cli serve

# Esto abrirá un navegador en http://localhost:3000
# Si funciona aquí, funcionará en Backstage
```

### Paso 5: Reiniciar Backstage

```bash
# Navega a tu proyecto de Backstage
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\backstage"

# Detén el servidor si está corriendo (Ctrl+C)

# Limpia la caché (opcional pero recomendado)
yarn clean

# Inicia el servidor
yarn dev
```

### Paso 6: Verificar en Backstage

1. Abre Backstage en: http://localhost:3000
2. Ve a tu catálogo y busca "confluence-docs"
3. Haz clic en la pestaña "DOCS"
4. La documentación debería cargar correctamente

## 🔍 Diagnóstico de Problemas

### Si sigue mostrando "linear progress":

#### 1. Verifica los logs del backend

En la terminal donde corre Backstage, busca errores relacionados con TechDocs:

```
[techdocs] Error generating docs...
```

#### 2. Verifica que Python y mkdocs estén instalados

```bash
python --version
mkdocs --version
pip show mkdocs-techdocs-core
```

#### 3. Verifica la estructura de archivos en GitHub

La estructura debe ser:

```
confluence/
├── catalog-info.yml
├── mkdocs.yml
└── docs/
    ├── index.md
    ├── backstage.md
    ├── documentacion-tecnica.md
    └── ...otros archivos.md
```

#### 4. Verifica los permisos de GitHub

Asegúrate de que el token de GitHub en `app-config.yaml` tenga permisos para leer el repositorio.

#### 5. Limpia la caché de TechDocs

Si estás usando TechDocs local, puede haber caché corrupta:

```bash
# En Windows, elimina:
rmdir /s /q "%USERPROFILE%\.techdocs"

# O en Git Bash:
rm -rf ~/.techdocs
```

## 📚 Recursos Adicionales

- [Documentación oficial de TechDocs](https://backstage.io/docs/features/techdocs/)
- [Troubleshooting de TechDocs](https://backstage.io/docs/features/techdocs/troubleshooting)
- [MkDocs Material Theme](https://squidfunk.github.io/mkdocs-material/)

## 🎯 Resumen de Comandos Rápidos

```bash
# 1. Instalar Python desde python.org

# 2. Instalar mkdocs
pip install mkdocs-techdocs-core

# 3. Actualizar GitHub
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\Confluence"
git add .
git commit -m "Actualizar configuración mkdocs"
git push origin main

# 4. Probar localmente (opcional)
npx @techdocs/cli serve

# 5. Reiniciar Backstage
cd "C:\Users\juan_\OneDrive\Documentos\Liverpool\backstage"
yarn dev
```

## ⚠️ Notas Importantes

1. **Python es OBLIGATORIO**: TechDocs no funcionará sin Python y mkdocs instalados
2. **Sincronización con GitHub**: Los cambios deben estar en GitHub para que Backstage los vea
3. **Tiempo de generación**: La primera vez que TechDocs genera la documentación puede tardar 1-2 minutos
4. **Caché**: Si haces cambios y no se reflejan, limpia la caché de TechDocs

## ✉️ Tu Script de Sincronización

Tu script actual:

```bash
CONFLUENCE_EMAIL=carlos.orta@trend-it.com.mx \
CONFLUENCE_TOKEN=ATATT3xFfGF0OLr4Hev9cDRz45Dh7hiSZXVHlvshlLuib5aTBQZ3DjqxPsfoUPCawcI29TmdHDkVJzy0-YfG-azlQtD8LJ3GeOYJFo_aIIPFseP3YKKIbM1hQASZJiqFKf5UGCOBjaHiniepb6_jfDPX0bXquy2JNfh_U1DcXnhsGyEXwn9IHHk=645D35BF \
node sync-confluence.js
```

**Recomendación**: Después de ejecutar este script:

1. Verifica que los archivos `.md` se generaron correctamente
2. Haz commit y push a GitHub
3. Backstage detectará los cambios automáticamente

---

**¡Buena suerte!** Si después de seguir estos pasos sigues teniendo problemas, revisa los logs del backend de Backstage para ver mensajes de error específicos.
