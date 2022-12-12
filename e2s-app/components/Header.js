import { createStyles } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image'
import {createStyles, Select} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import Link from 'next/Link';
import {useState} from "react";
import Modal from '../components/Modal'
import info from '../public/info.svg'
import HomeIcon from "../public/home.svg";
import { useForm } from 'react-hook-form'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import your icons
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles((theme, _params) => ({
    headerParent:{
        width:"calc(100% - 310px)",
        backgroundColor:"white",
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        paddingLeft:"25px",
        paddingRight:"25px",
        paddingTop:"11px",
        paddingBottom:"11px",
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 3
    },
    headerLeft:{
        display:"flex",
        alignItems:"center"
    },
    headerRight:{
        display:"flex",
        alignItems:"center",
        gap: "0 20px"
    },
    systemStatusText:{
        marginLeft:"4px",
        marginRight:"30px"
    },
    logoutButton:{
        color:"blue"
    },
    profilePicture:{
        backgroundColor:"lightGrey",
        borderRadius:"50%",
        width: "30px",
        height: "30px"
    },
    systemStatusLight:{
        backgroundColor:"lightGreen",
        borderRadius:"50%",
        width: "10px",
        height: "10px",
        marginRight:"10px",
        marginTop:"2px"
    }


}))

export function Header({user=null}) {
    const { classes } = useStyles()
    console.log(user)
    const { classes } = useStyles();
    const [showModal, setShowModal] = useState(false);
    const {register, handleSubmit, formState:{errors}}= useForm();
    const submitReading = async (event) =>{
        event.preventDefault()

        const data = JSON.stringify({
            // type: event.target[0].value,
            type: event.target[0].value,
            value: event.target[2].value
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }

        const response = await fetch('/api/readings', options)

        alert("meter reading submitted");
        event.target.reset();
    }

    return (
        <div className={classes.headerParent}>

                <div className={classes.headerLeft}>
                    <div className={classes.systemStatusLight}></div>
                    <p className={classes.systemStatusText}><a href="#">Connected</a></p>
                    <p onClick={() => setShowModal(true)}>
                        <a href="#">+ Add manual reading</a>
                    </p>

                    <Modal
                        onClose={() => setShowModal(false)}
                        show={showModal}
                    >
                        <form action="/api/readings" method="post" onSubmit={submitReading}>
                            <div className="reading-type">
                                <div className="label">Select reading type</div>
                                Search for the reading type using the search bar<br></br>
                                {/*<input type="text" id="type" name="type" {...register('type', {required:true, minLength:3})}/>*/}
                                <Select
                                    icon={<IconSearch color="grey" size={30} />}
                                    data={['Grid Power Usage', 'CHP 01 Generation', 'CHP 02 Generation', 'Gas Usage', 'Solar Output']}
                                    searchable
                                    nothingFound="No options"
                                />
                            </div>

                            <div className="reading-type">
                                <div className="label">Enter reading</div> <div className="lines2"></div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br></br>
                                <input className="input" type="number" id="fig" name="fig" {...register('reading', {required:true})} /><br></br>
                                {errors.reading && errors.reading.type === "required" && <p className="btn-danger">PLease enter your reading.</p>}
                            </div>
                            <div className="btn-wrap">
                                <button href="/" className="modal-btn">Confirm</button><br></br>
                            </div>
                            <div className="reading-type" >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                This is a prototype. The reading will not show in your account.
                            </div>
                        </form>

                    </Modal>

                </div>
            <div className={classes.headerLeft}>
                <div className={classes.systemStatusLight}></div>
                <p className={classes.systemStatusText}><a href="#">Connected</a></p>
                <p><Link href="#">+ Add manual reading</Link></p>
            </div>

            <div className={classes.headerRight}>
                <p>Hello, {user==null?"[Username]":user.firstName}. Not you?</p>
                <Link prefetch={false} className={classes.logoutButton} href="/api/logout">Logout</Link>

                <Image alt="Profile Picture" className={classes.profilePicture} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC' width={30} height={30}/>

                </div>

        </div>
    );
}
