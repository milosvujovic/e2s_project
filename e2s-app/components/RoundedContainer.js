import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    roundedContainer:{
        backgroundColor:"white",
        borderRadius:"4px;",
        paddingTop:"25px",
        paddingBottom:"30px",
        paddingLeft:"30px",
        paddingRight:"30px",
        color:"#404040"
    }

}))

export function RoundedContainer({children}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.roundedContainer}>
                <div>
                    {children}
                </div>
            </div>

        </>
    );
}