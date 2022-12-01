import { Image } from "@mantine/core"
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params) => ({
    tmpContainer:{
        margin: "10px 10px 0 10px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
        background:"white",
        width:"600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}))


function DisplayEnergyCertificate() {
    const { classes } = useStyles();
    return (
        <div className={classes.tmpContainer}>
            <Image src = "displayEnergyCertificate.svg"
            width={259}
            height={301}
            alt="Display Energy Certificate band B index 42"/>
        </div>)
}

export default DisplayEnergyCertificate