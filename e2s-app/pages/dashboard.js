import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import {LowCarbonSuggestionContainer} from "../components/LowCarbonSuggestionContainer";
import useSWR from "swr";
import HomeIcon from "../public/home.svg";
import {PageTitle} from "../components/PageTitle";
import { StatsBox } from '../components/StatsBox'
import { KPIDistance } from '../components/KPIDistance'
import { useState } from 'react';
import {Group, Button, Text, createStyles, Modal, useMantineTheme, Loader} from '@mantine/core';
import { openConfirmModal, closeAllModals } from '@mantine/modals';
import { TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Select, Textarea, Radio } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import kpi from "./api/kpi";

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
    flexWrap: "wrap",
    justifyContent:"space-between",
    gap:"20px",
    marginBottom:"40px",
	},
	loaderContainer:{
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
		height:"100%",
		width:"100%"
	}
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)
  return { props: { user } }
}

function KpiSection({setOpened}){
	const { classes } = useStyles();
	const { data, error } = useSWR(`/api/kpis?company=testcompany`)

	return (
		<>
			<h3 className={classes.sectionTitle}>Your KPIs</h3>
	    <div className={classes.statsContainer}>
	    	{
	    		!data?
	    		<div className={classes.loaderContainer}><Loader /></div>:
	    		data.map((r, i) => {
	      		return (
	      			<KPIDistance 
	      				key={i}
	      				name={r.kpiName}
	      				target={r.targetValue}
	      				reachBy={r.reachBy}
	      				unit={r.unit}
	      				prefix={r.unitIsPrefix}
	      			/>
	      		) 
	    		})
	    	}
	    	<Button onClick={() => setOpened(true)}>Create New KPI</Button>
	    </div>
    </>
	)
}

export default function Dashboard({user}) {
	const { classes } = useStyles();
	const { data, error } = useSWR(`/api/low_carbon_technologies`)

	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const form = useForm( {
		initialValues: {
			name: '',
			type: '',
			description: '',
			date: '',
			target: '',
			unit: '',
			unitIsPrefix: '',
		},
		validate: {
			name: (value) => (value.length < 2 ? 'Invalid' : null),
			type: (value) => (value.length < 2 ? 'Invalid' : null),
			date: (value) => (value.length < 2 ? 'Invalid' : null),
			unit: (value) => (value.length < 2 ? 'Invalid' : null),

		},
	});
	const [dataform, setDataForm] = useState([
		{ value: 'react', label: 'Budget' },
		{ value: 'c02_emission', label: 'C02 Emission' },
	]);
	const submitReading = async (event) =>{
		event.preventDefault()

		const dataform = JSON.stringify({
			name: event.target[0].value,
			type: event.target[2].value,
			description: event.target[3].value,
			date: event.target[4].value,
			target: event.target[6].value,
			unit: event.target[7].value,
			unitIsPrefix: checked
		})

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: dataform
		}

		const response = await fetch('/api/kpi', options)

		event.target.reset(kpi());
		alert("Goal added ");

	}
	// const [value, setValue] = useState('');
	const [checked, setChecked] = useState(false);
	
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
	        lowerIsBetter={true}
	      />
	      <StatsBox
	        title="Energy Payback"
	        value={12.50}
	        prefix="£"
	        last_month_value={40}
	      />
      </div>

      <KpiSection setOpened={setOpened}/>

		  <h3 className={classes.sectionTitle}>Discover new low-carbon technologies</h3>
		  <div className={classes.lowCarbonTechSuggestionsParent}>
			  {
				  !data?
				  <div className={classes.loaderContainer}><Loader /></div>:
				  data.map((item, i) => (
					  <LowCarbonSuggestionContainer key={i} title={item.name} description={item.description} link={item.link}/>
				  ))
			  }
		  </div>
	

		  <Modal
				  opened={opened}
				  onClose={() => setOpened(false)}
				  title="Create Goal!"
				  overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
				  overlayOpacity={0.55}
				  overlayBlur={3}
			  >
				  <form className="kpi" action="/api/kpi" method="post" onSubmit={submitReading} onReset={form.onReset}>
				  <TextInput
					  withAsterisk
					  label="KPI name"
					  placeholder="Goal Name"
					  {...form.getInputProps('name')}
				  />
				  <Select
					  withAsterisk
					  label="KPI type"
					  placeholder="Goal Type"
					  {...form.getInputProps('type')}
					  data={dataform}
					  nothingFound="Nothing found"
					  searchable
					  creatable
					  getCreateLabel={(query) => `+ Create ${query}`}
					  onCreate={(query) => {
						  const item = { value: query, label: query };
						  setDataForm((current) => [...current, item]);
						  return item;
					  }}
				  />
				  <Textarea
					  placeholder="Goal Description"
					  label="KPI description"
					  autosize
					  minRows={2}
					  {...form.getInputProps('description')}
				  />
				  <DatePicker
					  placeholder="date"
					  label="Reach By"
					  withAsterisk
					  {...form.getInputProps('date')}
				  />
				  <TextInput
					  // withAsterisk
					  label="Target Value "
					  placeholder="target value"
					  {...form.getInputProps('target')}
				  />
				  <TextInput
					  withAsterisk
					  label="Unit "
					  placeholder="Unit"
					  {...form.getInputProps('unit')}
				  />
				  {/*<Radio.Group*/}
					{/*  value={value}*/}
					{/*  onChange={setValue}*/}
					{/*  {...form.getInputProps('unitIsPrefix')}*/}
					{/*  name="favoriteFramework">*/}

					{/*  <Radio value="true" label="prefix"/>*/}
					{/*  <Radio value="false" label="suffix"/>*/}
				  {/*</Radio.Group>*/}
					  <br></br>
				  <Checkbox
					  label="Is Prefix"
					  checked={checked}
					  onChange={(event) => setChecked(event.currentTarget.checked)}
				  />

				  <Group position="right" mt="md">
					  <Button type="submit">Submit</Button>
				  </Group>
			  </form>
		  </Modal>


	  </AppShellConsole>
  );
}
