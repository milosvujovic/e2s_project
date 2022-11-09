import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        height:"45px",
        width:"100%",
        backgroundColor:"white"
    }
}))

export function Header() {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.headerParent}/>
        </>
    );
}