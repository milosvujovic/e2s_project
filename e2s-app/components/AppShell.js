import {AppShell, createStyles} from '@mantine/core';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import Head from 'next/head';

const useStyles = createStyles((theme, _params) => ({
    headerNavigationFlex:{
        display:"flex"
    },
    pageLeftSide:{
        width:"100%"
    }
}))

function AppShellConsole({children, title}) {
    const { classes } = useStyles();
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.2.1/css/sharp-solid.css"></link>
                <title>
                    {title}
                </title>
            </Head>
            <AppShell
                padding="0"
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                <div className={classes.headerNavigationFlex}>
                    {<Navigation/>}
                    <div className={classes.pageLeftSide}>
                        {<Header/>}
                        {children}
                        <i className="fa-sharp fa-solid fa-house"></i>
                    </div>
                </div>
            </AppShell>
        </>
    );
}

export default AppShellConsole;