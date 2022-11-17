import React, { useState } from 'react';
import { createStyles, Group, Text, Table, Anchor, Modal, Accordion, Loader, Image } from '@mantine/core';
import useSWR from 'swr';
import { FileDownload } from 'tabler-icons-react';


const useStyles = createStyles((theme, _params) => ({
	tmpContainer:{
		margin: "10px 10px 0 10px",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0px 0px 10px rgb(0 0 0 / 4%)",
		background:"white",
		width:"600px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},

	title: {
		padding: "5px 0 0 0"
	},

	subtitle: {
		padding: "0 0 10px 0"
	}
}))

function ContractorDirectory(){
	const { classes } = useStyles();
	let [contractorModalOpened, setContractorModalOpened] = useState(false);
	let [selectedContactor, setSelectedContractor] = useState();

	function openContractorModal(contractor) {
		setContractorModalOpened(true);
		setSelectedContractor(contractor);
	}

	const { data, error } = useSWR(`/api/contractor_data`)
	if (!data) { return }

	const rows = data.map((contractor) => (
    <tr>
      <td>{contractor.name}</td>
      <td>{contractor.role}</td>
      <td>{contractor.email}</td>
      <td><Anchor onClick={() => openContractorModal(contractor)}>More Details</Anchor></td>
    </tr>
  ));
	

	return(
		<Group>
			<Modal
	        opened={contractorModalOpened}
	        onClose={() => setContractorModalOpened(false)}
	        exitTransitionDuration="125"
	        size="600px"
	        withCloseButton={false}
	      >
	        {
	        	!selectedContactor ? <Text>No contractor selected</Text> :

	        	<Group>
	        		<Image src={"data:image/"+selectedContactor.logoB64} width="100px"/>
	        		<Text size="sm">Description: {selectedContactor.description}<br />
	        		Email Address: <Anchor href={"mailto:" + selectedContactor.email}>{selectedContactor.email}</Anchor><br />
	        		Phone Number: {selectedContactor.phone}</Text>
	        		{
	        			!selectedContactor.manuals ?
								<Accordion chevronPosition="right" chevron={<i></i>} variant="contained" defaultValue="customization" style={{ width: '100%' }}>
						      <Accordion.Item value="downloads">
						        <Accordion.Control icon={<FileDownload size={20} color="#666"/>} disabled>No downloads available</Accordion.Control>
						      </Accordion.Item>
					      </Accordion>
	        			:
		        		<Accordion chevronPosition="right" defaultValue="customization"  variant="contained" style={{ width: '100%' }}>
						      <Accordion.Item value="downloads">
						        <Accordion.Control icon={<FileDownload size={20} color="#666"/>}>{selectedContactor.manuals.length} download{(!selectedContactor.manuals.length == 1)?"":"s"} available</Accordion.Control>
						        <Accordion.Panel>
						        	<Group style={{ width: '100%', paddingTop: '16px' }}>
						        		<Loader style={{ width: '100%' }}/>
						        	</Group>
						        </Accordion.Panel>
						      </Accordion.Item>
					      </Accordion>
				      }
						</Group>
	        }
      </Modal>

			{/* This container will change when Will pushes his standard components */}
			<div className={classes.tmpContainer}>
				<Text className={classes.title}><b>Contractor Directory</b></Text>
				<Text className={classes.subtitle} size="14px">Find contact details, specifications and manuals</Text>	

				<Table>
		      <thead>
		        <tr>
		          <th>Contractor</th>
		          <th>Role</th>
		          <th>Email Address</th>
		          <th></th>
		        </tr>
		      </thead>
		      <tbody>{rows}</tbody>
		    </Table>

			</div>

    </Group>

	)

}

export default ContractorDirectory;

