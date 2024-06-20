import { Table, Thead, Tr, Th, TableContainer } from '@chakra-ui/react';
import { Text} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {ContactTable} from "./ContactTable.jsx";

// @ts-ignore
export const ContactGrid = ({users, setUsers, getUsers, filteredUsers}) => {
    const [isLoading, setIsLoading] = useState(true)
    const filteredUsersList = filteredUsers();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <>
            <TableContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',}}>
                <Table size={'md'} variant='simple'>
                    <Thead>
                        <Tr>
                            <Th display={{base: 'none', md:'table-cell'}}>profile</Th>
                            <Th display={{base: 'none', md:'table-cell'}}>name</Th>
                            <Th display={{base: 'none', md:'table-cell'}}>phone</Th>
                            <Th display={{base: 'none', md:'table-cell'}}>email</Th>
                            <Th display={{base: 'none', md:'table-cell'}}>gender</Th>
                            <Th display={{base: 'none', md:'table-cell'}}>action</Th>
                        </Tr>
                    </Thead>
                    {filteredUsersList.map((user) => (
                        <ContactTable  key={user.id} user={user} setUsers={setUsers} getUsers={getUsers}
                        />
                    ))}
                </Table>
            </TableContainer>

            {isLoading && users.length === 0 && (
                <Text fontSize={'xl'} textAlign={'center'} mt={4}> No Contacts</Text>
            )}
        </>
    );
};