import { useEffect, useState } from 'react';

export const Confluence = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfluence = async () => {
      // NOTA: Para pruebas locales. En producción usa el Proxy de Backstage.
      const apiToken = 'TU_API_TOKEN_AQUI';
      const email = 'tu-correo@ejemplo.com';
      const auth = btoa(`${email}:${apiToken}`);

      try {
        const response = await fetch(
          'https://trend-it-team-gmnh5g7v.atlassian.net/wiki/rest/api/content/131280?expand=body.storage',
          {
            headers: {
              Authorization: `Basic ${auth}`,
              Accept: 'application/json',
            },
          },
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const json = await response.json();
        setData(json);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchConfluence();
  }, []);

  return <div>Confluence</div>;
};
