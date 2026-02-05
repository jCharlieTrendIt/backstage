import '@backstage/cli/asset-types';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@backstage/ui/css/styles.css';
import '@fontsource-variable/roboto-flex';

// Forzar tema light por defecto si no hay preferencia guardada
// const THEME_STORAGE_KEY = '@backstage/core:SignInPage.provider';
if (!localStorage.getItem('theme')) {
  // Si no existe la clave 'theme', establecer el tema light
  localStorage.setItem('theme', 'light');
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
