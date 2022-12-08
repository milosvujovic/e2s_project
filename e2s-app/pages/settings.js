import { createStyles, Text, Select, Divider, Button } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { getUser } from '../hooks/useAuth';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import {useTranslation}  from 'next-i18next';

const useStyles = createStyles((theme, _params) => ({
	settingsContainer:{
		display:"flex",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between"
	}
}))

export async function getServerSideProps(context) {
  const user = await getUser(context.req)

  return { props: { user } }
}

export default function Settings({user}) {
	const { classes } = useStyles();
	const { i18n } = useTranslation('settings');
	const [value, setValue] = useState(i18n.language);
	const router = useRouter()
	const didMountRef = useRef(false);

	// useEffect(()=>{
	// 	if ( didMountRef.current ) { 
 //    	console.log("HERE")
	// 		onChangeLanguage()
	//   } else {
	// 	  didMountRef.current = true;
	//   }    
	// }, [value])

	const onChangeLanguage = (e) => {
    router.push(router.asPath, undefined, { locale: e })
	}

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"Settings"} user={user}>
	  	<div className={classes.settingsContainer}>
		  	<div>
			  	<Text size="lg" weight={500}>
		        Language
		      </Text>
		      <Text color="dimmed" size="md">
		        Change app locale
		      </Text>
		    </div>

	      <Select
		      placeholder="Pick one"
		      data={[
		        { value: 'en', label: 'English' },
		        { value: 'cy', label: 'Welsh' },
		      ]}
		      value={value} onChange={(e)=>{setValue(e);onChangeLanguage(e)}}
		    />
		  </div>

		  <Divider my="xl" />

		  <div className={classes.settingsContainer}>
		  	<div>
			  	<Text size="lg" weight={500}>
		        Users
		      </Text>
		      <Text color="dimmed" size="md">
		        Create user accounts and manage permissions
		      </Text>
		    </div>

	      <Button>Edit</Button>
		  </div>

		  <Divider my="xl" />

	  </AppShellConsole>
  );
}

