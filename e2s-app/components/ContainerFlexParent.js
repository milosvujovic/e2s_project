import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
    containerFlexParent:{
        display:"flex",
        flexWrap:"wrap",
        gap:"25px 25px",
        alignItems:"flex-start"
    }


}))

export function ContainerFlexParent({children}) {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.containerFlexParent}>
                {children}
            </div>
        </>

    );
}