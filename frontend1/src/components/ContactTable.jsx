import {Flex, IconButton, Tbody, Td, Tr, useToast, Image} from "@chakra-ui/react";
import {EditModal} from "./EditModal.jsx";
import {CiTrash} from "react-icons/ci";
import { BASE_URL } from "../App.jsx";

export const ContactTable = ({user, setUsers, getUsers}) => {
    const toast = useToast();

    const handleDeleteContact = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/contacts/${user.id}`, {method: 'DELETE',});
            const data = await res.json();
            if (!res.ok) {throw new Error(data.error)}
            getUsers();
            toast({title: 'Contact deleted', status: 'success',})
        }catch (error) {
            toast({title: 'An error occurred', description: error.message, status: 'error',});
        }
    }

    return (
        <>
            <Tbody w={'100%'} maxW={'1200px'} >
                <Tr>
                    <Td>
                        <Image width= '50px' height= '50px' objectFit="cover" borderRadius={'50%'} src={user.contactImg_url}/>
                    </Td>
                    <Td>{user.name}</Td>
                    <Td display={{base: 'none', md:'table-cell'}}>{user.phoneNumber}</Td>
                    <Td display={{base: 'none', md:'table-cell'}}>{user.address}</Td>
                    <Td display={{base: 'none', md:'table-cell'}}>{user.gender}</Td>
                    <Td>
                        <Flex>
                            <EditModal setUsers={setUsers} user={user} getUsers={getUsers} />

                            <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' onClick={handleDeleteContact} icon={<CiTrash size={20}/>}/>
                        </Flex>
                    </Td>
                </Tr>
            </Tbody>
        </>
    )
}