import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    container:{
        borderRadius: "4px",
        backgroundColor:"white",
        padding:"15px",
        width:"auto"
    }
}))

export function Container({children}) {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.container}>
                <div>
                    {children}
                </div>
            </div>
        </>
    );
}