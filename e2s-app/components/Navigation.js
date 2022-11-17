import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from 'next/image'
import Logo from '../public/Logo_v1_EES.jpg'
import {useRouter} from "next/router";
// import the library
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
    },
    logoPlaceholder:{
        height: "120px",
        width: "100%"
    }
}))

export function Navigation() {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <>
            <div  className={classes.navigationParent}>

                <div className={classes.logoPlaceholder}>

                </div>

                <div className="nav-element">
                <ul>
                    <li className={router.pathname == "/dashboard" ? "activeTab" : ""}>
                        <Link href={"/dashboard"} className="element">
                            <h3>
                            <FontAwesomeIcon icon={faHome} className="icon"/>
                            Dashboard
                            </h3>
                        </Link>
                    </li>
                    <li className={router.pathname == "/usage" ? "activeTab" : ""}>
                        <Link href="/usage" className="element">
                            <h3>
                                <FontAwesomeIcon icon={faLightbulb} className="icon"/>
                                Usage
                            </h3>
                        </Link>
                    </li>
                    <li className={router.pathname == "/emissions" ? "activeTab" : ""}>
                        <Link href="/emissions" className="element">
                            <h3>
                            <FontAwesomeIcon icon={faLeaf} className="icon"/>
                            CO₂
                        </h3>
                        </Link>
                    </li>
                    <li className={router.pathname == "/infrastructure" ? "activeTab" : ""}>
                        <Link href="/infrastructure" className="element">
                            <h3>
                            <FontAwesomeIcon icon={faTreeCity} className="icon"/>
                            Infrastructure
                            </h3>
                        </Link>
                    </li>
                    <li className={router.pathname == "/reporting" ? "activeTab" : ""}>
                        <Link href="/reporting" className="element">
                            <h3>
                            <FontAwesomeIcon icon={faBook} className="icon"/>
                            Reporting
                            </h3>
                        </Link>
                    </li>

                {/* setting  */}
                    <div className={router.pathname == "/settings" ? "activeTab" : ""}>
                    <li className="nav-settings">
                        <div className="nav-element">
                        <Link href="/settings" className="element">
                            <h3>
                            <FontAwesomeIcon icon={faSliders} className="icon"/>
                            Settings
                            </h3>
                        </Link>
                        </div>
                    </li>
                    </div>
                </ul>
                </div>
            </div>
        </>
    );
}