import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle} from '@fortawesome/free-solid-svg-icons';

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
                    <FontAwesomeIcon icon={faCircle} className="connected"/>
                    Connected
                    <button className="nav-button">+ Add manual reading</button>


                <ul className="second-half">
                    <li><Link className="logout" href="/logout">
                        Logout
                    </Link></li>
                    <li>Hello, id. Not you?</li>
                </ul>
                </div>
            </nav>

        </>
    );
}