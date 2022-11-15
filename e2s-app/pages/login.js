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
import AppShellConsole from "../components/AppShell";
import useSWR from 'swr';

const useStyles = createStyles((theme, _params) => ({
    /* Page styling goes here */
    exampleText:{
        color:"black"
    }
}))

export default function Login() {
    const { classes } = useStyles();
    const { data, error } = useSWR('/api/Apple/test')

    return (
        /* HTML page content goes between AppShellConsole tags */
        <AppShellConsole title={"Login"}>
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
                    <TextInput label="Email" placeholder="your@email.com" required />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                        <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
                        Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl">
                    Sign in
                    </Button>
                </Paper>
            </Container>
        </AppShellConsole>
    );
}