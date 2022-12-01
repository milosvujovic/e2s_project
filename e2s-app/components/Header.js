import { createStyles } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        position: "fixed",
        top: "0",
        left: "330px",
        width:"calc(100% - 330px)",
        backgroundColor:"white",
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        paddingLeft:"25px",
        paddingRight:"25px",
        paddingTop:"11px",
        paddingBottom:"11px",
        "z-index": 999
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

export function Header({user=null}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.headerParent}>

                <div className={classes.headerLeft}>
                    <div className={classes.systemStatusLight}></div>
                    <p className={classes.systemStatusText}><a href="#">Connected</a></p>
                    <p><Link href="#">+ Add manual reading</Link></p>
                </div>

                <div className={classes.headerRight}>
                    <p>Hello, {user==null?"[Username]":user.firstName}. Not you?</p>
                    <Link prefetch={false} className={classes.logoutButton} href="/api/logout">Logout</Link>
                    <Image alt="Profile Picture" className={classes.profilePicture}/>
                </div>

            </div>

        </>
    );
}