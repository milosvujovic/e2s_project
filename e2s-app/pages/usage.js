import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import EnergybySourceArea from '../components/EnergyBySourceArea';
import EnergyBySourceGraph from '../components/EnergyBySourceGraph';
import EnergyCostGraph from '../components/EnergyCostGraph';
import { getUser } from '../hooks/useAuth';

const useStyles = createStyles((theme, _params) => ({
	tmpContainer:{
        margin: "10px 10px 0 10px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
        background:"white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
		justifyContent:"center"
    }
}))


export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Usage({user}) {
	const { classes } = useStyles();


	return (
		/* HTML page content goes between AppShellConsole tags */
		<AppShellConsole title={"Usage"} user={user}>
			<div style={{width:"100%", display:"flex", flexWrap:"wrap"}}>
				<div className={classes.tmpContainer} style ={{width:394, height:334}} alt="Area graph showing the monthly energy consumption by energy source for the past year">
					<EnergybySourceArea />
				</div>

				<div className={classes.tmpContainer} style ={{width:394, height:334}} alt="Line graph showing the total monthly cost of energy for the past year">
					<EnergyCostGraph />
				</div>

				<div className={classes.tmpContainer} style ={{width:394, height:454}} alt="Pie chart showing the share of energy usage by energy source for the past month">
					<EnergyBySourceGraph />
				</div>
			</div>
		</AppShellConsole>
	);
}

