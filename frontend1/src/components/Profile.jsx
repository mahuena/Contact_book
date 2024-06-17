import {useState} from "react";
import {Flex, IconButton, Image, Input} from "@chakra-ui/react";
import {CiEdit, CiTrash} from "react-icons/ci";

export const Profile = ({image, handleChange, handleDelete}) => {

    return (
        <>
            <Flex style={{flexDirection: 'column', position: 'relative', width: '150px', height: '150px', margin: 'auto',}}>
                <Input type="file" id="fileInput" style={{display: 'none'}} onChange={handleChange}/>
                <Image id="output" src={image} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', margin: 'auto'}}/>
                 <Flex gap={3} my={'10px'} m={'auto'}>
                     <IconButton
                         variant='ghost'
                         colorScheme='green'
                         size={'sm'}
                         aria-label={'See the info'}
                         icon={<CiEdit size={20} />}
                         onClick={() => document.getElementById('fileInput').click()}
                     />
                     <IconButton
                         variant='ghost'
                         colorScheme='red'
                         size={'sm'}
                         aria-label='See menu'
                         onClick={handleDelete}
                         icon={<CiTrash size={20}/>}
                    />
                 </Flex>
            </Flex>
        </>
    )
}