import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle} from '@fortawesome/free-solid-svg-icons';

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
    }

}))

export function Header() {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.headerParent}>

                <div className={classes.headerLeft}>
                    <FontAwesomeIcon icon={faCircle} className="connected"/>
                    <p className={classes.systemStatusText}><a href="#">Connected</a></p>
                    <p><a href="#">+ Add manual reading</a></p>
                </div>

                <div className={classes.headerRight}>
                    <p><a href="#">Hello, [username]. Not you?</a></p>
                    <a className={classes.logoutButton} href="#">Logout</a>
                    <img className={classes.profilePicture}/>
                </div>

            </div>

        </>
    );
}