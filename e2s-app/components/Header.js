import { createStyles } from '@mantine/core';
import Link from 'next/Link';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        width:"100%",
        backgroundColor:"white",
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        paddingLeft:"25px",
        paddingRight:"25px",
        paddingTop:"11px",
        paddingBottom:"11px"
    },
    headerLeft:{
        display:"flex",
        alignItems:"center"
    },
    headerRight:{
        display:"flex",
        alignItems:"center",
        gap: "0 20px"
    },
    systemStatusText:{
        marginLeft:"4px",
        marginRight:"30px"
    },
    logoutButton:{
        color:"blue"
    },
    profilePicture:{
        backgroundColor:"lightGrey",
        borderRadius:"50%",
        width: "30px",
        height: "30px"
    },
    systemStatusLight:{
        backgroundColor:"lightGreen",
        borderRadius:"50%",
        width: "10px",
        height: "10px",
        marginRight:"10px",
        marginTop:"2px"
    }


}))

export function Header() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.headerParent}>

                <div className={classes.headerLeft}>
                    <div className={classes.systemStatusLight}></div>
                    <p className={classes.systemStatusText}><a href="#">Connected</a></p>
                    <p><a href="#">+ Add manual reading</a></p>
                </div>

                <div className={classes.headerRight}>
                    <p>Hello, [username]. Not you?</p>
                    <a className={classes.logoutButton} href="/api/logout">Logout</a>
                    <img className={classes.profilePicture}/>
                </div>

            </div>

        </>
    );
}