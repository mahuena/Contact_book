import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { Flex, Spacer, IconButton } from '@chakra-ui/react';
import { CiTrash } from "react-icons/ci";
import {EditModal} from "./EditModal";

export const ContactTable = () => {
    return (
        <TableContainer>
            <Table variant='simple' size='lg' maxW={'100%'}>
                <Thead>
                    <Tr>
                        <Th>Profile</Th>
                        <Th>Name</Th>
                        <Th>Phone</Th>
                        <Th>Email</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <Flex>
                                <EditModal />
                                <Spacer />
                                <IconButton
                                    variant='ghost'
                                    colorScheme='red'
                                    size={'sm'}
                                    aria-label='See menu'
                                    icon={<CiTrash size={20} />}
                                />

                            </Flex>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};