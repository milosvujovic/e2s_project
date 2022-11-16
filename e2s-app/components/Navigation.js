import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from 'next/image'
import Logo from '../public/Logo_v1_EES.jpg'
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import your icons
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb} from '@fortawesome/free-solid-svg-icons';
import { faLeaf} from '@fortawesome/free-solid-svg-icons';
import { faTreeCity} from '@fortawesome/free-solid-svg-icons';
import { faBook} from '@fortawesome/free-solid-svg-icons';
import { faSliders} from '@fortawesome/free-solid-svg-icons';

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
            {/*<h1>Logo</h1>*/}
            {/*<div className={classes.navigationParent}/>*/}

            <div  className={classes.navigationParent}>
                {/*<h1 className="nav-logo">*/}
                {/*    Logo*/}
                {/*</h1>*/}
                <Image className="nav-logo" src={Logo} alt={'/'}/>
                <div className="nav-element">
                <ul>
                    <li>
                        <Link href="/dashboard"><h3>
                            <FontAwesomeIcon icon={faHome} className="icon"/>
                            Dashboard</h3>
                        </Link>
                    </li>
                    <li>
                        <Link href="/usage"><h3>
                            <FontAwesomeIcon icon={faLightbulb} className="icon"/>
                             Usage</h3>
                        </Link>
                    </li>
                    <li>
                        <Link href="/emissions"><h3>
                            <FontAwesomeIcon icon={faLeaf} className="icon"/>
                            CO₂</h3>
                        </Link>
                    </li>
                    <li>
                        <Link href="/infrastructure"><h3>
                            <FontAwesomeIcon icon={faTreeCity} className="icon"/>
                            Infrastructure</h3>
                        </Link>
                    </li>
                    <li>
                        <Link href="/reporting"><h3>
                            <FontAwesomeIcon icon={faBook} className="icon"/>
                            Reporting</h3>
                        </Link>
                    </li>

                {/* setting  */}
                    <li className="nav-settings">
                        <div className="nav-element">
                        <Link href="/settings"><h3>
                        <FontAwesomeIcon icon={faSliders} className="icon"/>
                            Settings</h3>
                        </Link>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </>
    );
}