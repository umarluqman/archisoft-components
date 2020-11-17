import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core'
import { useFormik } from 'formik'
import { useStoreActions } from 'easy-peasy'
import cookies from 'nookies'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const Index = ({}) => {
  const { login } = useStoreActions((actions) => actions)

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: 'supplier@gmail.com',
      password: 'P@ssw0rd1234',
    },
    onSubmit: (values) => {
      login(values)
    },
  })

  console.log('process', process.env.NEXT_PUBLIC_HOST)

  return (
    <Box maxW={400} w="full">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="userId">User ID</FormLabel>
          <Input name="userId" value={values.userId} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const tokens = cookies.get(context)

  if (tokens?.token && tokens?.refreshToken) {
    const { exp } = jwtDecode(tokens.token)
    const { exp: expR } = jwtDecode(tokens.refreshToken)

    if (
      exp &&
      dayjs.unix(exp).subtract(30, 's').isAfter(dayjs()) &&
      expR &&
      dayjs.unix(expR).subtract(30, 's').isAfter(dayjs())
    ) {
      context.res.writeHead(302, { Location: '/dashboard' })
      context.res.end()
    }
  }

  // no need to call the login API here to get the modules, use persist state

  return {
    props: {},
  }
}

export default Index
