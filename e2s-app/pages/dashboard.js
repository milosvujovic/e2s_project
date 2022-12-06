import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import { useState } from 'react';
import {Group, Button, Text, createStyles, Modal, useMantineTheme} from '@mantine/core';
import { openConfirmModal, closeAllModals } from '@mantine/modals';
import { TextInput, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Select, Textarea, Radio } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import kpi from "./api/kpi";

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
	const [data, setData] = useState([
		{ value: 'react', label: 'Budget' },
		{ value: 'c02_emission', label: 'C02 Emission' },
	]);
	const submitReading = async (event) =>{
		event.preventDefault()

		const data = JSON.stringify({
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
			body: data
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
			<h1>Hello</h1>

		  <>
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
						  data={data}
						  nothingFound="Nothing found"
						  searchable
						  creatable
						  getCreateLabel={(query) => `+ Create ${query}`}
						  onCreate={(query) => {
							  const item = { value: query, label: query };
							  setData((current) => [...current, item]);
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

			  <Group position="left">
				  <Button onClick={() => setOpened(true)}>+</Button>
			  </Group>
		  </>

	  </AppShellConsole>
  );
}
