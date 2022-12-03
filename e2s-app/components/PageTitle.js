import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from "next/image";

const useStyles = createStyles((theme, _params) => ({
    pageTitleParent:{
        display:"flex",
        alignItems:"center",
        gap:"0 15px",
        marginBottom:"35px"
    },
    pageTitleIcon:{
        width:"30px",
        height:"30px",
        filter: "invert(23%) sepia(7%) saturate(22%) hue-rotate(45deg) brightness(102%) contrast(94%)"
    },
    pageTitleText:{
        color:"#404040",
        fontSize:"27px",
        marginBottom:"4px",
        fontWeight:"normal"
    }

}))

export function PageTitle({title,icon}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.pageTitleParent}>
                <Image src={icon} className={classes.pageTitleIcon}/>
                <h1 className={classes.pageTitleText}>{title}</h1>
            </div>

        </>
    );
}