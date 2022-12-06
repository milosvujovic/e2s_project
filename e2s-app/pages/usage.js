import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import EnergyBySourceArea from '../components/EnergyBySourceArea';
import EnergyBySourceGraph from '../components/EnergyBySourceGraph';
import EnergyCostGraph from '../components/EnergyCostGraph';
import { getUser } from '../hooks/useAuth';
import {RoundedContainer} from "../components/RoundedContainer";
import {ContainerTitle} from "../components/ContainerTitle";
import dialIcon from '../public/dial.svg'
import moneyIcon from '../public/money.svg'
import {PageTitle} from "../components/PageTitle";
import BulbIcon from '../public/bulbIcon.svg'


const useStyles = createStyles((theme, _params) => ({

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
			<PageTitle title={"Usage"} icon={bulbIcon}/>

			<div style={{width:"100%", display:"flex", flexWrap:"wrap", gap:"22px 22px"}}>

				<RoundedContainer alt="Area graph showing the monthly energy consumption by energy source for the past year">
					<ContainerTitle title={"Energy Consumption"} icon={BulbIcon}/>
					<EnergyBySourceArea />
				</RoundedContainer>

				<RoundedContainer alt="Line graph showing the total monthly cost of energy for the past year">
					<ContainerTitle title={"Monthly Costing"} icon={moneyIcon}/>
					<EnergyCostGraph />
				</RoundedContainer>

				<RoundedContainer alt="Pie chart showing the share of energy usage by energy source for the past month">
					<ContainerTitle title={"Usage by Source"} icon={dialIcon}/>
					<EnergyBySourceGraph />
				</RoundedContainer>

			</div>
		</AppShellConsole>
	);
}

