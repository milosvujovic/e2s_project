import { createStyles } from '@mantine/core';
import Link from 'next/Link';

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
                <h1 className="nav-logo">
                    Logo
                </h1>
                <div>
                    <div>
                        <div>
                            <h3 className="nav-element" >
                                <Link href="/dashboard">
                                Dashboard
                                </Link>
                            </h3>
                        </div>
                        <div>
                            <h3 className="nav-element">
                                <Link href="/usage">
                                    Usage
                                </Link>
                            </h3>
                        </div>
                        <div>
                            <h3 className="nav-element">
                                <Link href="/infrastructure">
                                    Infrastructure
                                </Link>
                            </h3>
                        </div>
                        <div>
                            <h3 className="nav-element">
                                <Link href="/reporting">
                                    Reporting
                                </Link>
                            </h3>
                        </div>
                    </div>

                    {/* setting  */}
                    <div>
                        <div>
                            <h3 className="nav-settings">
                                <Link href="/settings">
                                    Settings
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}