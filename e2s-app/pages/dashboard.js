import {createStyles, Loader} from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import {LowCarbonSuggestionContainer} from "../components/LowCarbonSuggestionContainer";
import useSWR from "swr";
import HomeIcon from "../public/home.svg";
import {PageTitle} from "../components/PageTitle";
import { StatsBox } from '../components/StatsBox'

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	lowCarbonTechSuggestionsParent:{
		width:"100%",
		display:"flex",
		justifyContent:"space-between",
		alignItems:"flex-start"
	},
	sectionTitle:{
		textAlign:"center",
		marginBottom:"26px",
		fontWeight:"normal"
	},
	statsContainer:{
		display:"flex",
    flexDirection:"row",
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

		  <div className={classes.statsContainer}>
			  <StatsBox
	        title="revenue"
	        value={13456}
	        prefix="£"
	        last_month_value={10042}
	      />
	      <StatsBox
	        title="Co2 usage"
	        value={450}
	        suffix="Kg"
	        last_month_value={650}
	        ml="lg"
	        mr="lg"
	        lowerIsBetter={true}
	      />
	      <StatsBox
	        title="Energy Payback"
	        value={12.50}
	        prefix="£"
	        last_month_value={40}
	      />
      </div>

		  <h3 className={classes.sectionTitle}>Discover new low-carbon technologies</h3>
		  <div className={classes.lowCarbonTechSuggestionsParent}>
			  {
				  !data?
					  <Loader />:
					  data.map((item, i) => (
						  <LowCarbonSuggestionContainer key={i} title={item.name} description={item.description} link={item.link}/>
					  ))
			  }
		  </div>
	  </AppShellConsole>
  );
}
