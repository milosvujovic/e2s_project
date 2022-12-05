import { 
  createStyles,
  Group,
  Box,
  Text,
  ThemeIcon
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const useStyles = createStyles((theme) => ({
  container:{
    backgroundColor:"white",
    border:"1px solid #e9ecef",
    borderRadius:"5px",
    flex:1
  }
}));

export function StatsBox({title, value, prefix, last_month_value, mr, ml, suffix, lowerIsBetter}) {
  const { classes } = useStyles();

  let diffPerc;
  if (last_month_value != 0){
    diffPerc = ((value / last_month_value) * 100) - 100
  }else{
    diffPerc = Infinity
  }

  let better = diffPerc >= 0;

  if (lowerIsBetter){
    better = !better
  }


  return (
    <Box className={classes.container} p="md" px="lg" mb="lg" mr={mr} ml={ml}>
      <Group position="apart" mb="md">
        <Box>
          <Text
            color="dimmed"
            transform="uppercase"
            weight={700}
            size="xs"
            className={classes.label}
          >
            {title}
          </Text>
          <Text weight={700} size="xl">
            {prefix}{(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{suffix}
          </Text>
        </Box>
        <ThemeIcon
          color="gray"
          variant="light"
          sx={(theme) => ({ color: better ? theme.colors.teal[6] : theme.colors.red[6] })}
          size={38}
          radius="md"
        >
          <FontAwesomeIcon icon={faArrowRight} style={{transform:better ?"rotate(-45deg)":"rotate(45deg)"}}/>
        </ThemeIcon>
      </Group>
      <Text color="dimmed" size="sm" mt="md">
        <Text component="span" color={better ? 'teal' : 'red'} weight={700}>
          {diffPerc.toFixed(2)}%
        </Text>{' '}
        {better ? 'increase' : 'decrease'} compared to last month
      </Text>
    </Box>
  )
}