import { Button } from '@mantine/core';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
	button:{
		border:"1px solid blue"
	}
}))


export default function Test() {
	const { classes } = useStyles();

  return (
      <Button className={classes.button}>Next link button</Button>
  );
}

