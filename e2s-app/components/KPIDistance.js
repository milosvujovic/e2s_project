import { 
  createStyles,
  Group,
  Box,
  Text,
  ThemeIcon,
  Progress 
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container:{
    backgroundColor:"white",
    borderRadius:"5px",
    flex:1,
    minWidth:"300px",
    maxWidth:"700px",
    flexBasis: "calc(20% - 5px)",
    marginBottom: "0!important"
  }
}));

export function KPIDistance({name, target, reachBy, unit, prefix}) {
	const { classes } = useStyles();

	const date = new Date(reachBy*1000).toLocaleDateString("en-UK");

	function randomInRange(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
	} 

	const val = randomInRange(20,100)

	return (
		<Box className={classes.container} p="md" px="lg" mb="lg">
			<Text
		    color="dimmed"
		    transform="uppercase"
		    weight={700}
		    size="xs"
		    className={classes.label}
		  >
		  	{name}
		  </Text>
		  <Text weight={700} size="xl">
        Target: {prefix?unit:""}{target}{!prefix?unit:""} by {date}
      </Text>
      <Progress value={val} mt="lg" color="teal"/>
      <Text color="dimmed" size="sm" mt="md" style={{textAlign:"right"}}>
				{val}%
      </Text>
	  </Box>
	)
}
