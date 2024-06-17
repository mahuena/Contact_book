import { Container, Text, Flex, Box, Spacer } from '@chakra-ui/react';
import { CreateContactModal } from './CreateContactModal';

const Navbar = ({setUsers, getUsers}) => {
    return (
        <>
            <Container maxW={'12000px'}>
                <Box py={'4'} my={'4'}>
                    <Flex h={'16'}>
                        <Box>
                            <Text fontSize='4xl' color={'#318CE7'}>Contacts</Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <CreateContactModal setUsers={setUsers} getUsers={getUsers} />
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </>
    );
};

export default Navbar;