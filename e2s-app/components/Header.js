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

            <nav className= "nav-header">

                <div className="head">
                    Connected
                    <button className="nav-button">+ Add Manual reading</button>


                <ul className="second-half">
                    <li><Link className="logout" href="/">
                        Logout
                    </Link></li>
                    <li>Hello, id. Not you?</li>
                </ul>
                </div>
            </nav>

        </>
    );
}