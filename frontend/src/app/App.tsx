import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from "./components/Navbar.tsx";
import {Container, Stack} from '@chakra-ui/react';
import {ContactTable} from "./components/ContactTable.tsx";

function App() {
  return (
    <Stack minH={'100vh'} maxW={'1200px'} m={'auto'}>
      <Navbar />

      <Container my={'4'}>
          <ContactTable />
      </Container>
    </Stack>
  )
}

export default App
