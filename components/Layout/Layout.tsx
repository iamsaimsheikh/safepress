import type { NextPage } from "next";
import { Box } from "./Box";
import { Navbar } from "@nextui-org/react";
import Image from 'next/image'
import Logo from './logo.png'
import  useRouter  from 'next/router'

export const Layout = ({ children }: any) => {
  const router = useRouter()
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar variant="static" css={{justifyContent:'center'}} >
        <Navbar.Brand>
        <Image src={Logo} onClick= {() => router.push('/')} style={{transform:'scale(0.5,0.5)', cursor:'pointer'}} />
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" css={{marginLeft:'3vw'}}>
          <Navbar.Link  onClick={() => router.push('audit/new')} href="#">New Audit</Navbar.Link>
          <Navbar.Link isActive onClick={() => router.push('/')} href="#">Audits</Navbar.Link>
        </Navbar.Content>
      </Navbar>
      {children}
    </Box>
  );
};
