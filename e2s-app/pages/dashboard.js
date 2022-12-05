import {createStyles, Loader} from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import {LowCarbonSuggestionContainer} from "../components/LowCarbonSuggestionContainer";
import useSWR from "swr";
import HomeIcon from "../public/home.svg";
import {PageTitle} from "../components/PageTitle";

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	lowCarbonTechSuggestionsParent:{
		width:"100%",
		display:"flex",
		justifyContent:"space-between",
		alignItems:"flex-start"
	},
	lowCarbonSectionTitle:{
		textAlign:"center",
		marginBottom:"26px",
		fontWeight:"normal"
	}
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)
  return { props: { user } }
}

export default function Dashboard({user}) {
	const { classes } = useStyles();
	const { data, error } = useSWR(`/api/low_carbon_technologies`)
  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Dashboard"} user={user}>
		  <PageTitle title={"Dashboard"} icon={HomeIcon}/>


		  <h3 className={classes.lowCarbonSectionTitle}>Discover new low-carbon technologies</h3>
		  <div className={classes.lowCarbonTechSuggestionsParent}>
			  {
				  !data?
					  <Loader />:
					  data.map((item) => (
						  <LowCarbonSuggestionContainer title={item.name} description={item.description} link={item.link}/>
					  ))
			  }
		  </div>
	  </AppShellConsole>
  );
}
