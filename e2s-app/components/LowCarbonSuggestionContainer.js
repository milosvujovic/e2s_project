import { createStyles } from '@mantine/core';
import useSWR from "swr";
import InfoIcon from '../public/info.svg'
import Image from "next/image";

const useStyles = createStyles((theme, _params) => ({
    lowCarbonSuggestionParent:{
        backgroundColor:"white",
        borderRadius:"4px;",
        paddingTop:"15px",
        paddingBottom:"15px",
        paddingLeft:"20px",
        paddingRight:"20px",
        width: "24%",
        color:"#404040"
    },
    lowCarbonSuggestionFlex:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    lowCarbonSuggestionTitle:{
        color:"#4081FF",
        fontWeight:"normal",
        fontSize:"15px",
        marginBottom:"5px"
    },
    lowCarbonSuggestionDescription:{
        fontSize:"13px",
        width:"75%"
    },
    infoIcon:{
        filter: "invert(64%) sepia(57%) saturate(7499%) hue-rotate(207deg) brightness(103%) contrast(102%)",
        width:"30px;",
        height:"30px",
        cursor:"pointer",
        marginBottom:"18px"
    }

}))

export function LowCarbonSuggestionContainer({title, description, link}) {
    const { classes } = useStyles();
    const redirect = () => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );
    };

    return (
        <>
            <div className={classes.lowCarbonSuggestionParent}>
                <div>
                    <h3 className={classes.lowCarbonSuggestionTitle}>{title}</h3>
                    <div className={classes.lowCarbonSuggestionFlex}>
                        <p className={classes.lowCarbonSuggestionDescription}>{description}</p>
                        <Image src={InfoIcon} className={classes.infoIcon} onClick={redirect}/>
                    </div>
                </div>
            </div>

        </>
    );
}