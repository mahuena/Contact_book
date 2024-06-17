import { Table, Thead, Tr, Th, TableContainer } from '@chakra-ui/react';
import { Text} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {ContactTable} from "./ContactTable.jsx";

// @ts-ignore
export const ContactGrid = ({users, setUsers, getUsers}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <>
            <TableContainer style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',

            }}>
                <Table size={'md'} variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Profile</Th>
                            <Th>Name</Th>
                            <Th>Phone</Th>
                            <Th>Email</Th>
                            <Th>Gender</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    {users.map((user) => (
                        <ContactTable  key={user.id} user={user} setUsers={setUsers} getUsers={getUsers}/>
                    ))}
                </Table>
            </TableContainer>

            {isLoading &&users.length === 0 && (
                <Text fontSize={'xl'} textAlign={'center'} mt={4}> No contacts</Text>
            )}
        </>
    );
};