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
    ,
    childParent:{
        padding:"10px"
    }
}))

function AppShellConsole({children, title, user=null}) {
    const { classes } = useStyles();
    return (
        <>
            <Head>

                <title>
                    {title}
                </title>
            </Head>
            <AppShell
                padding="0"
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], padding: "52px 0 0 330px"},
                })}
            >
                <div className={classes.headerNavigationFlex}>
                    {<Navigation/>}
                    <div className={classes.pageLeftSide}>
                        {<Header user={user}/>}
                        <div className={classes.childParent}>
                            {children}
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}

export default AppShellConsole;