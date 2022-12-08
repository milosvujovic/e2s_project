import { createStyles } from '@mantine/core';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = createStyles((theme, _params) => ({
    /* Page styling goes here */
    background:{
        width:"100%",
        height:"100vh",
        backgroundColor:"#03527d",
        background: "linear-gradient(250deg, rgba(0,62,96,1) 60%, rgba(4,129,196,1) 100%)"
    },
    loginParentFlex:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        height:"100vh"
    },
    loginLeft:{
        color:"white",
        fontWeight:"normal",
        width:"700px",
        marginLeft:"80px",
        marginBottom:"200px"
    },
    loginRight:{
      marginRight:"90px"
    },
    loginLeftTitle:{
        fontWeight:"normal",
        fontSize:"40px"
    },
    loginLeftSubtitle:{
        fontWeight:"normal",
        fontSize:"23px"
    }
}))

function UnauthenticatedPageShell({children}){
    const { classes } = useStyles();

    return (
        /* HTML page content goes between AppShellConsole tags */

        <div className={classes.background}>
            <div className={classes.loginParentFlex}>
                <div className={classes.loginLeft}>
                    <h1 className={classes.loginLeftTitle}>E²S Console</h1><br/>

                    <h2 className={classes.loginLeftSubtitle}>Energy management, reimagined.</h2>

                    <h2 className={classes.loginLeftSubtitle}>Monitor your organisations energy usage, climate impact and expenses from anywhere.</h2><br/>

                    <h2 className={classes.loginLeftSubtitle}>This is the future of energy management.</h2>
                </div>
                <div className={classes.loginRight}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UnauthenticatedPageShell;