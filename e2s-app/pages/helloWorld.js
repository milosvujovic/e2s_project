import { createStyles } from '@mantine/core';
import AppShellConsole from "../components/AppShell";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'helloWorld'])),
			// Will be passed to the page component as props
		},
	};
}

const useStyles = createStyles((theme, _params) => ({
	/* Page styling goes here */
	exampleText:{
		color:"blue",
		fontSize:"40px"
	}
}))

export default function HelloWorld() {
	const { classes } = useStyles();
	const { data, error } = useSWR('/api/testRecord1/test')
	const { t } = useTranslation('helloWorld');

  return (
	  /* HTML page content goes between AppShellConsole tags */
	  <AppShellConsole title={"HelloWorld"}>
		  <p className={classes.exampleText} aria-testlabel={'helloWorldTitle'}>{t('title')}</p>
		  <h1>
			  {
				  !data ?"Loading":data.message
			  }
		  </h1>
	  </AppShellConsole>
  );
}
