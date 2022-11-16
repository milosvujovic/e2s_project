import {AppShell, createStyles} from '@mantine/core';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

const useStyles = createStyles((theme, _params) => ({
    /* Page styling goes here */
    contentParent:{
        margin:"30px"
    }
}))

function AppShellConsole({children, title}) {

    const { classes } = useStyles();

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
                <div className={classes.contentParent}>
                    {children}
                </div>
            </AppShell>
        </>
    );
}

export default AppShellConsole;