import type { NextPage } from 'next'
import { Container, Card, Row, Text } from "@nextui-org/react";



const Home: NextPage = () => {
  return (
    <Container display='flex' justify='center' alignItems='center' css={{height:"100vh"}}>
          <Row justify="center" align="center">
            <Text h6 size={15} color="grey" css={{ m: 0 }}>
              SafeSpace Start!
            </Text>
          </Row>
    </Container>
  )
}

export default Home
