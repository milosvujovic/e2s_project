import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    navigationParent:{
        height:"100vh",
        width:"240px",
        backgroundColor:"#363740"
    }
}))

export function Navigation() {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.navigationParent}/>
        </>
    );
}