import { createStyles } from '@mantine/core';
import { Header } from '../components/header';
import { Navigation } from '../components/navigation';

const useStyles = createStyles((theme, _params) => ({
	button:{
		border:"1px solid blue"
	}
}))

export default function Home() {
	const { classes } = useStyles();

  return (
	  <>
		  <Navigation/>
		  <Header/>

		  <h1>HelloWorld</h1>

	  </>
  );
}

