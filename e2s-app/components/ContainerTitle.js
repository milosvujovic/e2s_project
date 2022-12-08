import { createStyles } from '@mantine/core';
import Link from 'next/link';
import Image from "next/Image";

const useStyles = createStyles((theme, _params) => ({
    pageTitleParent:{
        display:"flex",
        alignItems:"center",
        gap:"0 12px",
        marginBottom:"10px"
    },
    pageTitleIcon:{
        width:"23px",
        height:"23px",
        filter: "invert(23%) sepia(7%) saturate(22%) hue-rotate(45deg) brightness(102%) contrast(94%)"
    },
    pageTitleText:{
        color:"#404040",
        fontSize:"20px",
        fontWeight:"normal",
        marginBottom:"4px",
        marginRight:"50px"
    }

}))

export function ContainerTitle({title,icon}) {
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