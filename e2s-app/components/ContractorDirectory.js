import React, { useState, useEffect } from 'react';
import { createStyles, Group, Text, Table, Anchor, Modal, Accordion, Loader, Image, Center, Title } from '@mantine/core';
import useSWR from 'swr';
import { FileDownload, Download, FileText, FileX } from 'tabler-icons-react';
import Link from 'next/link'
import { showNotification } from '@mantine/notifications';


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

	function downloadFile(url) {
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = url.split('/').pop();
	  a.target = '_blank';
	  document.body.appendChild(a);
	  a.click();
	  document.body.removeChild(a);
	}

	async function getSignedContractorFileUrl(s3guid) {
    const response = await fetch(`api/presign_contractor_file?key=${s3guid}`, {}); 
    const json = await response.json();
    return json;
	}

	function signAndDownloadContractorFile(s3guid) {
		showNotification({
      title: 'Your download will start shortly.',
      color: 'blue',
			autoClose: 5000,
    })
		getSignedContractorFileUrl(s3guid)
		.then(resp => {
			if ('url' in resp) {
	    	downloadFile(resp.url)
			}
		})
		.catch( err => {
					showNotification({
            title: 'Download Error',
            message: `${err}`,
            color: 'red',
  					autoClose: 5000,
          })
	  })
	}

	const { data, error } = useSWR(`/api/contractor_data`);
	
	return(
		<Group height="100px">
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
		        	<Group style={{width: "100%"}}>
		        		<img alt={`${selectedContactor.name} logo`} src={"data:image/"+selectedContactor.logoB64} style={{height: "40px"}}/>
	        		</Group>

	        		<Group style={{width: "100%"}}>
		        		<Text size="sm">{selectedContactor.description}</Text>
	        		</Group>

	        		{
	        			!selectedContactor.downloads ?
								<Accordion chevronPosition="right" chevron={<i></i>} variant="contained" defaultValue="customization" style={{width: "100%"}}>
						      <Accordion.Item value="downloads">
						        <Accordion.Control style={{height: "50px"}} icon={<FileDownload size="34px" color="#666"/>} disabled>No downloads available</Accordion.Control>
						      </Accordion.Item>
				      	</Accordion>
	        			:
		        		<Accordion chevronPosition="right" defaultValue="customization"  variant="contained" style={{width: "100%"}}>
						      <Accordion.Item value="downloads">
						        <Accordion.Control style={{height: "50px"}} icon={<FileDownload size="34px" color="#666"/>}>{selectedContactor.downloads.length} download{(!selectedContactor.downloads.length == 1)?"":"s"} available</Accordion.Control>
						        <Accordion.Panel>
						        	<Group>
							        	<Table>
										      <tbody>
										      	{selectedContactor.downloads.map((download, i) => (
													<tr key={i}>
														<td style={{width: "40px"}}>
															<Center style={{ width: "100%", height: "100%" }}>
																{(download.format=="pdf")?<FileText size="30px" color="#666"/>:<FileX size="30px" color="#666"/>}
															</Center>
														</td>

											      		<td>
											      			<Text style={{float: 'left'}}>{download.name}</Text>
											      		</td>

											      		<td>
											      			<Text size="xs" color="#666">{download.language}</Text>
											      		</td>

											      		<td>
											      			<Text size="xs" color="#666">{download.format}</Text>
											      		</td>

											      		<td>
												      		<Link href="#" onClick={() => {signAndDownloadContractorFile(download.s3guid + "." + download.format)}}>
												      			<Download size="30px" color="#666" style={{float: 'right'}}/>
											      			</Link>
											      		</td>
											      	</tr>
									      		))}
										      </tbody>
										    </Table>
						        	</Group>
						        </Accordion.Panel>
						      </Accordion.Item>
					      </Accordion>
				      }

			        <Group style={{width: "100%", marginTop: "2px"}} position="apart">
		        		<Text size="xs"><Anchor href={"mailto:" + selectedContactor.email}>{selectedContactor.email}</Anchor></Text>
		        		<Text size="xs">{selectedContactor.phone}</Text>
		      		</Group>
						</Group>
	        }
      </Modal>

			<Text className={classes.subtitle} size="14px">Find contact details, specifications and manuals</Text>

			{
				!data?
				<Loader />:
			<Table>
		  <thead>
			<tr>
			  <th>Contractor</th>
			  <th>Role</th>
			  <th>Email Address</th>
			  <th></th>
			</tr>
		  </thead>
		  <tbody>
			  {data.map((contractor, i) => (
					<tr key={i}>
					  <td>{contractor.name}</td>
					  <td>{contractor.role}</td>
					  <td>{contractor.email}</td>
					  <td><Anchor onClick={() => openContractorModal(contractor)}>More Details</Anchor></td>
					</tr>
				  ))}
		  </tbody>
		</Table>
	  }



    </Group>

	)

}

export default ContractorDirectory;

