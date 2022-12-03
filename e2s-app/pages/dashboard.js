// import {createStyles, Group} from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import { useState } from 'react';
import {Group, Button, Text, createStyles, Modal} from '@mantine/core';
import { openConfirmModal, closeAllModals } from '@mantine/modals';

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	button:{
		border:"1px solid blue"
	}
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)
  return { props: { user } }
}

export default function Dashboard({user}) {
	const { classes } = useStyles();
	const [opened, setOpened] = useState(false);

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"} user={user}>
			<h1>Hello</h1>

		  <>
			  <Modal
				  opened={opened}
				  onClose={() => setOpened(false)}
				  title="Add Goals!"
			  >
				  {/* Modal content */}
			  </Modal>

			  <Group position="center">
				  <Button onClick={() => setOpened(true)}>+</Button>
			  </Group>
		  </>

	  </AppShellConsole>
  );
}
