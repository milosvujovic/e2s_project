import '../styles/globals.css'
import '../styles/datePicker.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import useSWR, { SWRConfig } from 'swr';
import { appWithTranslation } from 'next-i18next';
import { NotificationsProvider } from '@mantine/notifications';

function App({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig 
          value={{
            refreshInterval: 3000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light'
                }}
            >
                <NotificationsProvider>
                    <Component {...pageProps} />
                </NotificationsProvider>
            </MantineProvider>
        </SWRConfig>
    )
}


export default appWithTranslation(App);
