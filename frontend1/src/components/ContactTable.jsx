import {Flex, IconButton, Tbody, Td, Tr, useToast, Image, Link} from "@chakra-ui/react";
import {EditModal} from "./EditModal.jsx";
import {CiEdit, CiTrash} from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { BASE_URL } from "../api/Request";
import { ViewModal } from "./ViewModal.jsx";

export const ContactTable = ({
                                 user,
                                 setUsers, image, setImage, tempContact,
                                 getUsers, handleAddMessage, handleDeleteMessage, note, setNote, onOpen, isOpen, onClose, setIsEditing,
    name, setName, phoneNumber, setPhoneNumber, address, setAddress, gender, setGender, handleChangeImg, handleDeleteImg,
    messages, setMessages, handleEdit, handleEditContact
}) => {
    const toast = useToast();

    const handleDeleteContact = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/contacts/${user.id}`, {method: 'DELETE',});
            const data = await res.json();
            if (!res.ok) {throw new Error(data.error)}
            getUsers();
            toast({title: 'contact deleted', status: 'success',})
        }catch (error) {
            toast({title: 'error occurred', description: error.message, status: 'error',});
        }
    }

    return (
        <>
            <Tbody w={'100%'} maxW={'1200px'} >
                <Tr>
                    <Td>
                        <Image width= '50px' height= '50px' objectFit="cover" borderRadius={'50%'} src={user.contactImg_url}/>
                    </Td>
                    <Td translate="no" >{user.name}</Td>
                    <Td translate="no" display={{base: 'none', md:'table-cell'}}>{user.phoneNumber}</Td>
                    <Td translate="no" display={{base: 'none', md:'table-cell'}} cursor={'pointer'}>
                        <Link href={`mailto:${user.address}`} isExternal>
                            {user.address}
                        </Link>
                    </Td>
                    <Td display={{base: 'none', md:'table-cell'}}>{user.gender}</Td>
                    <Td>
                        <Flex>
                            <ViewModal user={tempContact} setUsers={setUsers}  getUsers={getUsers}
                                       messages={messages} setMessages={setMessages} note={note}
                                       setNote={setNote}
                                       name={name}
                                       setName={setName}
                                       phoneNumber={phoneNumber}
                                       setPhoneNumber={setPhoneNumber}
                                       address={address}
                                       setAddress={setAddress}
                                       genger={gender}
                                       setGender={setGender}
                                       image={image}/>

                            <IconButton variant='ghost' colorScheme='green' size={'sm'} aria-label={'See the info'} icon={<CiEdit size={20} />} onClick={() => handleEdit(user)}/>

                            {/*<EditModal setUsers={setUsers} user={user} getUsers={getUsers}*/}
                            {/*           messages={messages} setMessages={setMessages} note={note}*/}
                            {/*           setNote={setNote}*/}
                            {/*           name={name}*/}
                            {/*//            setName={setName}*/}
                            {/*//            phoneNumber={phoneNumber}*/}
                            {/*//            setPhoneNumber={setPhoneNumber}*/}
                            {/*//            address={address}*/}
                            {/*//            setAddress={setAddress}*/}
                            {/*//            genger={gender}*/}
                            {/*//            setGender={setGender}*/}
                            {/*//            image={image}*/}
                            {/*//            setImage={setImage}*/}
                            {/*//            tempContact={tempContact}*/}
                            {/*//             handleEdit={handleEdit}*/}
                            {/*//             handleEditContact={handleEditContact}*/}
                            {/*//             handleAddMessage={handleAddMessage} handleDeleteMessage={handleDeleteMessage}*/}
                            {/*//            handleChangeImg={handleChangeImg}*/}
                            {/*//            handleDeleteImg={handleDeleteImg}*/}
                            {/*// />*/}

                            <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='see menu' onClick={handleDeleteContact} icon={<CiTrash size={20}/>}/>
                        </Flex>
                    </Td>
                </Tr>
            </Tbody>
        </>
    )
}