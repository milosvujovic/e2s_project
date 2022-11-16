import { createStyles } from '@mantine/core';
import Link from 'next/Link';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        height:"6%",
        width:"100%",
        backgroundColor:"white"
    }
}))

export function Header() {
    const { classes } = useStyles();

    return (
        <>

            <div className={classes.headerParent}>
                <nav className="topnavbar">
                Connected
                <button className="nav-button">+ Add Manual reading</button>
                Hello, id. Not you?
                    <Link className="logout" href="/">
                        Logout
                    </Link>
                </nav>
            </div>

        </>
    );
}