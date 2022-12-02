import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    lowCarbonSuggestionParent:{
        backgroundColor:"white",
        borderRadius:"4px;",
        paddingTop:"10px",
        paddingBottom:"10px",
        paddingLeft:"15px",
        paddingRight:"15px",
        width: "270px",
        color:"#404040"
    },
    lowCarbonSuggestionFlex:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    lowCarbonSuggestionTitle:{
        color:"#4081FF"
    }

}))

export function LowCarbonSuggestionContainer({title, description}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.lowCarbonSuggestionParent}>
                <div className={classes.lowCarbonSuggestionFlex}>
                    <div>
                        <h3 className={classes.lowCarbonSuggestionTitle}>Title</h3>
                        <p>Description</p>
                    </div>
                    <div>
                        <h5>Icon</h5>
                    </div>
                </div>
            </div>

        </>
    );
}