import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from 'next/image'
import HomeIcon from '../public/home.svg'
import BulbIcon from '../public/bulbIcon.svg'
import LeafIcon from '../public/leafIcon.svg'
import PylonIcon from '../public/pylonIcon.svg'
import ReportIcon from '../public/reportIcon.svg'
import SettingsIcon from '../public/settingsIcon.svg'

import {useRouter} from "next/router";
import {NavigationElement} from "../components/NavigationElement";


const useStyles = createStyles((theme, _params, getRef) => ({
    navigationParent:{
        height:"100vh",
        width:"330px",
        backgroundColor:"#363740",
        position: "fixed",
        top: 0,
        left: 0
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

                <NavigationElement tabName={"Dashboard"} url={"/dashboard"} image={HomeIcon}/>
                <NavigationElement tabName={"Usage"} url={"/usage"} image={BulbIcon}/>
                <NavigationElement tabName={"CO₂"} url={"/emissions"} image={LeafIcon}/>
                <NavigationElement tabName={"Infrastructure"} url={"/infrastructure"} image={PylonIcon}/>
                <NavigationElement tabName={"Reporting"} url={"/reporting"} image={ReportIcon}/>
                <br/>
                <br/>
                <br/>
                <NavigationElement tabName={"Settings"} url={"/settings"} image={SettingsIcon}/>

            </div>
        </>
    );
}
