import { Container, Text, Flex, Box, Spacer } from '@chakra-ui/react';
import {CreateContactModal} from "./CreateContactModal.tsx";

export const Navbar = () => {
    return (
        <>
            <Container maxW={'500px'}>
                <Box py={'4'} my={'4'}>
                    <Flex h={'16'}>
                        <Box>
                            <Text fontSize='4xl' color={'#318CE7'}>Contacts</Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <CreateContactModal />
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </>
    );
};