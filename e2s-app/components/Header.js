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
        width:"100%",
        backgroundColor:"white",
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        paddingLeft:"25px",
        paddingRight:"25px",
        paddingTop:"11px",
        paddingBottom:"11px"
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

export function Header() {
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
        <>
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

                <div className={classes.headerRight}>
                    <p><a href="#">Hello, [username]. Not you?</a></p>
                    <a className={classes.logoutButton} href="#">Logout</a>
                    <img className={classes.profilePicture}/>
                </div>

            </div>

        </>
    );
}