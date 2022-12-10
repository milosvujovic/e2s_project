import { createStyles } from '@mantine/core';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UnauthenticatedPageShell from "../components/UnauthenticatedPageShell";

const useStyles = createStyles((theme, _params) => ({
    /* Page styling goes here */
    loginForm:{
        width:"512px",
        "& .mantine-TextInput-label":{
            fontWeight:"normal"
        },
        "& .mantine-PasswordInput-label":{
            fontWeight:"normal"
        }
    },
    titleBlack:{
        color:"black",
        fontSize:"28px",
        marginBottom:"7px",
        marginTop:"8px"
    },
    textBlack:{
        color:"black",
        fontSize:"17px",
        lineHeight:"1.2em",
        marginBottom:"10px"
    },
    loginError:{
        color:"red",
        marginBottom:"10px"
    },
    submitBtn:{
        background: "linear-gradient(250deg, rgba(0,62,96,1) 0%, rgba(4,129,196,1) 100%)"
        //024263    0481C4
    },
    buttonGroup:{
        gap:"0px 0px",
        marginBottom:"10px"
    },
    forgotPassword:{
        marginTop:"15px"
    }
}))

export default function Login() {
    const { classes } = useStyles();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const login = function (){
        var data = JSON.stringify({
            "email": email,
            "password": password
        });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if (xhr.status === 200) {
                    router.push('/dashboard')
                } else {
                    setLoginError(xhr.responseText)
                }
                console.log(this.responseText);
            }
        });

        console.log(process.env.HOST)
        xhr.open("POST", "api/login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    return (
        /* HTML page content goes between AppShellConsole tags */
        <UnauthenticatedPageShell>
            <Paper className={classes.loginForm} withoutBorder size={512} px={40} py={15} pb={40} radius={"0px"}>
                <p className={classes.titleBlack}>Login to E²S Console</p>
                <p className={classes.textBlack}>Please login using the credentials provided when creating your account.</p>
                <p className={classes.loginError}>{loginError}</p>
                <TextInput label="Email Address" placeholder="your@email.com" required value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
                <PasswordInput label="Password" placeholder="Password" required mt="md" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                <Group mt="sm" className={classes.buttonGroup}>
                    {/*<Checkbox label="Remember me" sx={{ lineHeight: 1 }} />*/}
                    <Button className={classes.submitBtn} fullWidth mt="sm" onClick={login}>Login</Button>
                    <Anchor onClick={(event) => event.preventDefault()} href="#" size="17px" className={classes.forgotPassword}>
                        Forgot password? Click to reset
                    </Anchor>
                    <Anchor onClick={(event) => event.preventDefault()} href="#" size="17px">
                        Dont have an account? Register here
                    </Anchor>
                </Group>
            </Paper>
        </UnauthenticatedPageShell>
    );
}