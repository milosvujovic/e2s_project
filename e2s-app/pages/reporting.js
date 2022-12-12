import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	h3:{
		margin:"0px 0px 10px 0px"
	},
	ul:{
		style:"list-style-type:disc;"
	},
	tmpContainer:{
		margin: "10px 10px 0 10px",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
		background:"white",
		display: "flex",
		flexDirection: "column",
		justifyContent:"center"
	}

}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Reporting({user}) {
	const { classes } = useStyles();

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Reporting"} user={user}>
		  <div className={classes.tmpContainer} style ={{width:300}}>
			  <h3 className={classes.h3}>Tips when visiting a site</h3>
			  <ul className={classes.ul}>
				  <li>Bring personal protective equipment</li>
				  <li>Bring tools</li>
				  <li>Bring identification</li>
			  </ul>
		  </div>
	  </AppShellConsole>

  );
}

