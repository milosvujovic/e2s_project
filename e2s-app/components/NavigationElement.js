import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from 'next/image'
import {useRouter} from "next/router";
// import {NavLink} from 'react-router-dom'


const useStyles = createStyles((theme, _params, getRef) => ({
    navigationElement:{
        height:"60px",
        width:"100%",
        display:"flex",
        alignItems:"center",

        '&:hover': {
            backgroundColor: "rgba(255,255,255,0.07)"

        },

        [`&:hover .${getRef('navigationIcon')}`]: {
            filter: "invert(100%) sepia(91%) saturate(2%) hue-rotate(292deg) brightness(108%) contrast(101%)"
        },

        [`&:hover .${getRef('navigationText')}`]: {
            color:"white"
        },


    },

    navigationElementSelected:{
        height:"60px",
        width:"100%",
        display:"flex",
        alignItems:"center",
        backgroundColor: "rgba(255,255,255,0.07)",

        [`& .${getRef('navigationIcon')}`]: {
            filter: "invert(100%) sepia(91%) saturate(2%) hue-rotate(292deg) brightness(108%) contrast(101%)"
        },

        [`& .${getRef('navigationText')}`]: {
            color:"white"
        },

        [`& .${getRef('navigationSelectedIndicator')}`]: {
            display:"block"
        },

        [`& .${getRef('navigationContentParent')}`]: {
            marginLeft:"20px"
        },

    },

    navigationIcon:{
        ref: getRef('navigationIcon'),
        filter: "invert(74%) sepia(0%) saturate(947%) hue-rotate(135deg) brightness(90%) contrast(90%)",
        width:"28px",
        height:"28px"
    },

    navigationText:{
        ref: getRef('navigationText'),
        color:"#A6A6A6",
        marginLeft:"20px",
        fontSize:"20px",
        marginBottom:"1px"
    },

    navigationSelectedIndicator:{
        ref: getRef('navigationSelectedIndicator'),
        height:"100%",
        backgroundColor:"white",
        width:"3px",
        display:"none"
    },

    navigationContentParent:{
        ref: getRef('navigationContentParent'),
        paddingTop:"14px",
        paddingBottom:"14px",
        display:"flex",
        alignItems:"center",
        marginLeft:"23px"
    },

    navigationSelected:{
        backgroundColor:"green"
    }


}))

export function NavigationElement({tabName, url, image}) {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <>
                <div className={router.pathname == url ? classes.navigationElementSelected : classes.navigationElement}>
                    <div className={classes.navigationSelectedIndicator}/>
                    <div className={classes.navigationContentParent}>
                        <Image src={image} className={classes.navigationIcon}/>
                        <p className={classes.navigationText}><a href={url}>{tabName}</a></p>
                    </div>
                </div>
        </>

    );
}