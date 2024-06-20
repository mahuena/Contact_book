import { Container, Text, Flex, Box, Spacer, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { CreateContactModal } from './CreateContactModal';
import { SearchIcon } from '@chakra-ui/icons';
// import { useState, useEffect } from 'react';

const Navbar = ({
    setUsers,
    getUsers,
    handleChangeImg,
    handleDeleteImg,
    image,
    handleCreateContact,
    isLoading,
    inputs,
    setInputs,
    setFilteredUserInput
}) => {

    return (
        <>
            <Container maxW={'12000px'}>
                <Box py={'4'} my={'4'}>
                    <Flex h={'16'}>
                        <Box>
                            <Text fontSize='4xl' color={'#318CE7'}>Contacts</Text>
                        </Box>
                        <Spacer />
                        <Flex gap={4}>
                            <InputGroup>
                                <Input type='search-bar' placeholder='Search Contacts' w={'300px'} _focusVisible={{border: '1px solid #ddd'}}
                                       onChange={(e) => setFilteredUserInput(e.target.value)}
                                />
                                <InputRightElement>
                                    <Container bg={"transparent"} mr={"4"}><SearchIcon /></Container>
                                </InputRightElement>
                            </InputGroup>

                            <Spacer />
                            <Box>
                                <CreateContactModal
                                    setUsers={setUsers}
                                    getUsers={getUsers}
                                    handleChangeImg={handleChangeImg}
                                    handleDeleteImg={handleDeleteImg}
                                    image={image}
                                    handleCreateContact={handleCreateContact}
                                    isLoading={isLoading}
                                    inputs={inputs}
                                    setInputs={setInputs}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Container>
        </>
    );
};

export default Navbar;