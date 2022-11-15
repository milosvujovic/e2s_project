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

const useStyles = createStyles((theme, _params) => ({
    /* Page styling goes here */
    exampleText:{
        color:"black"
    }
}))

export default function Login() {
    const { classes } = useStyles();
    const router = useRouter()
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

        xhr.open("POST", "http://localhost:3000/api/login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    return (
        /* HTML page content goes between AppShellConsole tags */
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >Welcome back!</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
                Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="your@email.com" required value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                    <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                    Forgot password?
                    </Anchor>
                </Group>
                <p>{loginError}</p>
                <Button fullWidth mt="xl" onClick={login}>
                Log in
                </Button>
            </Paper>
        </Container>
    );
}