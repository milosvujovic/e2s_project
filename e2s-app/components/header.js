import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        height:"45px",
        width:"300px",
        backgroundColor:"blue"
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