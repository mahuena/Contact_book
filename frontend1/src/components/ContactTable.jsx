import { Flex, IconButton, Tbody, Td, Tr, Image, Link } from "@chakra-ui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { ViewModal } from "./ViewModal.jsx";
import { GrView } from "react-icons/gr";

export const ContactTable = ({
  user,
  image,
  tempContact,
  handleEdit,
  handleDeleteContact,
  setName,
  name,
  setPhoneNumber,
  phoneNumber,
  setAddress,
  address,
  handleView,
  isReviewing,
  setImage,
  isOpen,
  onOpen,
  onClose,
  userMessages,
}) => {
  return (
    <>
      <Tbody w={"100%"} maxW={"1200px"}>
        <Tr>
          <Td>
            <Image
              width="50px"
              height="50px"
              objectFit="cover"
              borderRadius={"50%"}
              src={user["contactImg_url"]}
            />
          </Td>
          <Td translate="no">{user.name}</Td>
          <Td translate="no" display={{ base: "none", md: "table-cell" }}>
            {user.phoneNumber}
          </Td>
          <Td
            translate="no"
            display={{ base: "none", md: "table-cell" }}
            cursor={"pointer"}
          >
            <Link href={`mailto:${user.address}`} isExternal>
              {user.address}
            </Link>
          </Td>
          <Td display={{ base: "none", md: "table-cell" }}>{user.gender}</Td>
          {/*<Td>{user.id}</Td>*/}
          <Td>
            <Flex>
              <ViewModal
                image={image}
                name={name}
                phoneNumber={phoneNumber}
                address={address}
                user={user}
                handleView={handleView}
                isReviewing={isReviewing}
                setName={setName}
                setPhoneNumber={setPhoneNumber}
                setAddress={setAddress}
                setImage={setImage}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                userMessages={userMessages}
              />

              {/*<IconButton*/}
              {/*  variant="ghost"*/}
              {/*  colorScheme="blue"*/}
              {/*  size={"sm"}*/}
              {/*  aria-label={"View Contact"}*/}
              {/*  icon={<GrView size={20} />}*/}
              {/*  onClick={() => handleView(user)}*/}
              {/*  // icon={<GrView size={20} onClick={() => handleView(user)} />}*/}
              {/*  // onClick={() => handleView(user)}*/}
              {/*/>*/}

              <IconButton
                variant="ghost"
                colorScheme="green"
                size={"sm"}
                aria-label={"Edit Contact"}
                icon={<CiEdit size={20} />}
                onClick={() => handleEdit(user)}
              />

              <IconButton
                variant="ghost"
                colorScheme="red"
                size={"sm"}
                aria-label="see menu"
                onClick={() => handleDeleteContact(user.id)}
                icon={<CiTrash size={20} />}
              />
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </>
  );
};
