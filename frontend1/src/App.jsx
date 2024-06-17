import { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { ContactGrid } from './components/ContactGrid.jsx';
import { Stack, Container } from '@chakra-ui/react';



export const BASE_URL = 'http://127.0.0.1:5000/api';

function App() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await fetch(`${BASE_URL}/contacts`);
            const data = await res.json()

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }
            setUsers(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Stack minH={'100vh'} maxW={'1200px'} m={'auto'}>
            <Navbar setUsers={setUsers} getUsers={getUsers}/>
            <Container maxW={{base: '375px', sm: '500px', md: '900px', lg: '1200px'}}>
                <ContactGrid users={users} setUsers={setUsers} getUsers={getUsers}/>
            </Container>
        </Stack>
    )
}

export default App