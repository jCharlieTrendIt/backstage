import { useEffect, useState, useCallback } from 'react';
import { useApi, atlassianAuthApiRef } from '@backstage/core-plugin-api';

export interface AtlassianAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    displayName?: string;
    email?: string;
  } | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAtlassianAuth = (): AtlassianAuthState => {
  const atlassianAuthApi = useApi(atlassianAuthApiRef);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{
    displayName?: string;
    email?: string;
  } | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      // Intentar obtener el token sin forzar el popup
      const session = await atlassianAuthApi.getAccessToken(
        ['offline_access', 'read:me'],
        { optional: true },
      );

      if (session) {
        // console.log('session', session);
        // Obtener información del usuario si está autenticado
        try {
          const profile = await atlassianAuthApi.getProfile();
          setIsAuthenticated(true);
          setUser({
            displayName: profile?.displayName,
            email: profile?.email,
          });
        } catch (profileError) {
          // Si falla obtener el perfil, aún consideramos que está autenticado
          setIsAuthenticated(true);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // Si hay error al verificar, asumimos que no está autenticado
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [atlassianAuthApi]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = async () => {
    try {
      setIsLoading(true);
      // Solicitar token con los scopes necesarios (esto abrirá el popup de OAuth)
      await atlassianAuthApi.getAccessToken([
        'offline_access',
        'read:me',
        'read:confluence-content.all',
        'read:confluence-content.summary',
        'read:confluence-user',
        'read:jira-user',
        'read:jira-work',
      ]);
      await checkAuth();
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Backstage no tiene un método signOut directo, pero podemos limpiar el estado
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      // console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signOut,
  };
};
