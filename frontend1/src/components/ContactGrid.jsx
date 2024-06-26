import { Table, Thead, Tr, Th, TableContainer } from '@chakra-ui/react';
import { Text} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {ContactTable} from "./ContactTable.jsx";

// @ts-ignore
export const ContactGrid = ({users, setUsers, getUsers, filteredUsers,
                                handleAddMessage, handleDeleteMessage, tempContact, onOpen, isOpen, onClose, setIsEditing,
                            messages, setMessages, note, setNote, image, setImage, handleChangeImg, handleDeleteImg,
    name, setName, phoneNumber, setPhoneNumber, address, setAddress, gender, setGender, handleEditContact, handleEdit
                            }) => {
    const [isLoading, setIsLoading] = useState(true)
    const filteredUsersList = filteredUsers();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <>
            <TableContainer style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginBottom: "50px"}}>
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
                                        handleAddMessage={handleAddMessage} handleDeleteMessage={handleDeleteMessage}
                                       messages={messages} setMessages={setMessages} note={note}
                                       setNote={setNote}
                                       name={name}
                                       setName={setName}
                                       phoneNumber={phoneNumber}
                                       setPhoneNumber={setPhoneNumber}
                                       address={address}
                                       setAddress={setAddress}
                                       gender={gender}
                                       setGender={setGender}
                                       image={image}
                                       setImage={setImage}
                                       tempContact={tempContact}
                                       handleEdit={handleEdit}
                                       handleEditContact={handleEditContact}
                                       handleChangeImg={handleChangeImg}
                                       handleDeleteImg={handleDeleteImg}
                                       isOpen={isOpen}
                                       onOpen={onOpen}
                                       onClose={onClose}
                                       setIsEditing={setIsEditing}
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