import { createStyles } from '@mantine/core';
import Link from 'next/Link';
import Image from 'next/image'
import homeIcon from '../public/home.svg'
import { clsx } from 'clsx';
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
        width:"280px",
        backgroundColor:"#363740"
    },
    logoPlaceholder:{
        height: "120px",
        width: "100%"
    },
    navigationElement:{
        height:"60px",
        width:"100%",
        display:"flex",
        alignItems:"center",
        padding:"15px",

        '&:hover': {
            backgroundColor: "white",
            opacity: "0.07"
        },

        '&:hover>.navigationIcon':{
            color:"white"
        }
    },

    navigationIcon:{
        color:"grey"
    }


}))

export function Navigation() {
    const { classes } = useStyles();

    const navigationIconStyle = clsx({
        [classes.navigationIcon] : true,
        ['fa-sharp fa-solid fa-house fa-sm'] : true
    })

    const router = useRouter();

    return (
        <>
            <div  className={classes.navigationParent}>

                <div className={classes.logoPlaceholder}>

                </div>

                <div className={classes.navigationElement}>
                    <i class="fa-sharp fa-solid fa-house"></i>
                </div>

            </div>
        </>
    );
}