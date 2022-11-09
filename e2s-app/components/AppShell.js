import { AppShell } from '@mantine/core';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

function AppShellConsole({children, title}) {
    return (
        <>
            <Head>
                <title>
                    {title}
                </title>
            </Head>
            <AppShell
                padding="md"
                navbar={<Navigation/>}
                header={<Header/>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                {children}
            </AppShell>
        </>
    );
}

export default AppShellConsole;