import {
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';
import { liverpoolTypography } from './typography';

const colores = {
  color_principal: "#e10098",
  color_secundario: "#464646",
  color_secundario_light: "#555555",
  color_contrast_secundario: "#fff",
  color_footer_main: "#EEEEEE",
};

// Tema claro personalizado
export const customLightTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    primary: {
      main: colores.color_principal,
    },
    secondary: {
      main: colores.color_secundario,
      light: colores.color_secundario_light,
      contrastText: colores.color_contrast_secundario,
    },
    error: {
      main: '#FF0000',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    banner: {
      info: '#2196f3',
      error: '#FF0000',
      text: '#ffffff',
      link: '#ffffff',
    },
    errorBackground: '#FF0000',
    warningBackground: '#ff9800',
    infoBackground: '#2196f3',
    navigation: {
      background: '#ffffff',
      indicator: colores.color_principal,
      color: '#5a5a5a',
      selectedColor: colores.color_principal,
      navItem: {
        hoverBackground: '#f5f5f5',
      },
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(225, 0, 152, 0.08)',
    },
    text: {
      primary: '#333333',
      secondary: '#9e9e9e',
    },
  },
  fontFamily: liverpoolTypography,
  defaultPageTheme: 'home',
  pageTheme: {
    home: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    documentation: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    tool: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    service: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    website: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    library: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    other: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    app: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    apis: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
  },
  components: {
    BackstageHeader: {
      styleOverrides: {
        header: {
          backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
          boxShadow: 'none',
          color: '#ffffff',
        },
        title: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          textTransform: 'none',
          '&:disabled': {
            color: 'white',
          },
        },
        outlined: {
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
          '&:focus': {
            backgroundColor: 'white',
          },
          '&:active': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '0 !important',
          '& .MuiInputLabel-asterisk': { color: '#FF0000' },
          '& .MuiOutlinedInput-root': {
            fontWeight: 300,
            '& .MuiInputBase-input': {
              padding: '8px 8px 8px 12px',
            },
            '&.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF0000',
              },
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bdbdbd',
              },
              '& .MuiInputBase-input.Mui-disabled': {
                color: '#9e9e9e',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#333',
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: '20.8px',
            '&.Mui-error': {
              color: '#FF0000',
            },
            '&.Mui-disabled': {
              color: '#9e9e9e',
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: 300,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 300,
          '&.Mui-disabled': {
            '& .MuiFormLabel-asterisk': {
              color: '#A1A1A1',
            },
          },
          '&.Mui-error': {
            '& .MuiFormLabel-asterisk': {
              color: '#FF0000',
            },
          },
          '& .MuiFormLabel-asterisk': {
            color: '#FF0000',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px',
          marginRight: '0px',
          color: '#FF0000',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#333',
          padding: '8px 8px 8px 12px',
          '&.Mui-error': {
            color: '#FF0000',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF0000',
            },
          },
          '&.Mui-disabled': {
            color: '#9e9e9e',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF0000',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#333',
          '& .MuiInputLabel-asterisk': {
            color: '#FF0000',
          },
          '&.Mui-error': {
            color: '#FF0000',
          },
          '&.Mui-disabled': {
            color: '#9e9e9e',
            '& .MuiInputLabel-asterisk': {
              color: '#A1A1A1',
            },
          },
        },
      },
    },
  },
});

// Tema oscuro personalizado
export const customDarkTheme = createUnifiedTheme({
  palette: {
    ...palettes.dark,
    primary: {
      main: colores.color_principal,
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#fff',
    },
    secondary: {
      main: colores.color_secundario,
      light: colores.color_secundario_light,
      dark: '#ec407a',
      contrastText: colores.color_contrast_secundario,
    },
    error: {
      main: '#FF0000',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    banner: {
      info: '#2196f3',
      error: '#FF0000',
      text: '#ffffff',
      link: '#ffffff',
    },
    errorBackground: '#FF0000',
    warningBackground: '#ff9800',
    infoBackground: '#2196f3',
    navigation: {
      background: '#171717',
      indicator: '#9e9e9e',
      color: '#b5b5b5',
      selectedColor: '#FFF',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b5b5b5',
    },
  },
  fontFamily: liverpoolTypography,
  defaultPageTheme: 'home',
  pageTheme: {
    home: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    documentation: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    tool: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    service: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    website: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    library: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    other: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    app: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
    apis: {
      colors: [colores.color_principal, colores.color_principal],
      shape: 'wave',
      backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
      fontColor: '#ffffff',
    },
  },
  components: {
    BackstageHeader: {
      styleOverrides: {
        header: {
          backgroundImage: `linear-gradient(90deg, ${colores.color_principal}, ${colores.color_principal})`,
          boxShadow: 'none',
          color: '#ffffff',
        },
        title: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          textTransform: 'none',
          '&:disabled': {
            color: 'white',
          },
        },
        outlined: {
          backgroundColor: '#424242',
          '&:hover': {
            backgroundColor: 'rgba(66, 66, 66, 0.9)',
          },
          '&:focus': {
            backgroundColor: '#424242',
          },
          '&:active': {
            backgroundColor: 'rgba(66, 66, 66, 0.8)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '0 !important',
          '& .MuiInputLabel-asterisk': { color: '#FF0000' },
          '& .MuiOutlinedInput-root': {
            fontWeight: 300,
            '& .MuiInputBase-input': {
              padding: '8px 8px 8px 12px',
            },
            '&.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF0000',
              },
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#616161',
              },
              '& .MuiInputBase-input.Mui-disabled': {
                color: '#757575',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b5b5b5',
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: '20.8px',
            '&.Mui-error': {
              color: '#FF0000',
            },
            '&.Mui-disabled': {
              color: '#757575',
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: 300,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 300,
          '&.Mui-disabled': {
            '& .MuiFormLabel-asterisk': {
              color: '#757575',
            },
          },
          '&.Mui-error': {
            '& .MuiFormLabel-asterisk': {
              color: '#FF0000',
            },
          },
          '& .MuiFormLabel-asterisk': {
            color: '#FF0000',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px',
          marginRight: '0px',
          color: '#FF0000',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#ffffff',
          padding: '8px 8px 8px 12px',
          '&.Mui-error': {
            color: '#FF0000',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF0000',
            },
          },
          '&.Mui-disabled': {
            color: '#757575',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#616161',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF0000',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#b5b5b5',
          '& .MuiInputLabel-asterisk': {
            color: '#FF0000',
          },
          '&.Mui-error': {
            color: '#FF0000',
          },
          '&.Mui-disabled': {
            color: '#757575',
            '& .MuiInputLabel-asterisk': {
              color: '#757575',
            },
          },
        },
      },
    },
  },
});
