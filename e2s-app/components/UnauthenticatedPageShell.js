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
        minWidth:"100vw",
        minHeight:"100vh",
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        backgroundColor:"#03527d",
        justifyContent:"space-around",
        background: "linear-gradient(250deg, rgba(0,62,96,1) 60%, rgba(4,129,196,1) 100%)",
        position:"relative"
    },
    line:{
        position:"absolute",
        width:"150%",
        height:"100px",
        transform:"rotate(-25deg)",
        background:"red",
        zIndex:0
    },
    leftText:{
        marginTop:"125px",
        width:"589px",
        marginLeft:"-100px",
        zIndex:2
    },
    rightSection:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:2
    },
    textBlack:{
        color:"black",
        fontSize:17
    },
    textWhite:{
        color:"white",
        fontSize:22,
        lineHeight:"25px"
    },
    titleBlack:{
        color:"black",
        fontSize:28
    },
    titleWhite:{
        color:"white",
        fontSize:37
    },
    motto:{
        color:"white",
        fontSize:50,
        margin:0,
        lineHeight:"55px"
    }
}))

function UnauthenticatedPageShell({children}){
    const { classes } = useStyles();

    return (
        /* HTML page content goes between AppShellConsole tags */

        <Container className={classes.background}>
            <div>
                <div className={classes.leftText}>
                    <p className={classes.titleWhite}
                    >E²S Console</p>

                    <p className={classes.motto}
                    >Energy management, reimagined.
                    </p>

                    <p className={classes.textWhite}
                    >Monitor your organisations energy usage, climate impact and expenses from anywhere.
                    </p>

                    <p className={classes.textWhite}
                    >This is the future of energy management.
                    </p>
                </div>
            </div>

            <div className={classes.rightSection}>
                {children}
            </div>
        </Container>
    );
}

export default UnauthenticatedPageShell;