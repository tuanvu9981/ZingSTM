import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Avatar,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Tfoot,
    Td,
    TableCaption,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

export default function SuperAdmin() {
    // Chakra Color Mode
    const textColor = useColorModeValue("gray.700", "white");
    const history = useHistory();
    const [user, getUser] = useState([]);
    useEffect(() => {
        getUserData();
    }, [])
    //Get user data from database
    const getUserData = async () => {
        const res = await axios.post("/api/getAllUserInfo");
        if (res.data.status === 200) {
            getUser(res.data.users);
            console.log(res.data.users);
        }
    }

    //Handle update user
    const goToUpdateUser = (event) => {
        const userId = event.target.value;
        console.log(userId);
    }
    // // Handle delete user
    // const handleDeleteSong = (e, id) => {
    //     e.preventDefault();
    //     const thisClicked = e.currentTarget;
    //     swal("Are you sure you to delete this song?", {
    //         buttons: {
    //             cancel: "No",
    //             catch: {
    //                 text: "Yes",
    //                 value: "catch",
    //             },
    //         },
    //     })
    //         .then((value) => {
    //             switch (value) {
    //                 case "cancel":
    //                     break;
    //                 case "catch":
    //                     axios.post("/api/deleteOneSong", { songId: id });
    //                     setTimeout(function () {
    //                         swal({
    //                             title: "Success!",
    //                             text: "Delete Song Successfully",
    //                             icon: "success",
    //                             button: "OK!",
    //                         })
    //                     }, 200);
    //                     thisClicked.closest("tr").remove();
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         });
    // }
    return (
        <div style={{ margin: '125px 0px 0px 0px' }}>
            <Card overflowX={{ xl: "hidden" }}>
                <CardHeader p="6px 0px 22px 0px">
                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                        User Data
                    </Text>
                </CardHeader>
                <CardBody>
                    <Table variant="simple" color={textColor}>
                        <Thead>
                            <Tr my=".8rem" pl="0px" color="gray.400">
                                <Th color="gray.400">
                                    User
                                </Th>
                                {/* <Th color="gray.400">FullName</Th> */}
                                <Th color="gray.400">Email</Th>
                                <Th color="gray.400">Role</Th>
                                <Th color="gray.400">Update</Th>
                                <Th color="gray.400">Delete</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {user.map((data, index) => {
                                if (data.userId == 1)
                                    return (
                                        <Tr key={index}>
                                            <Td minWidth={{ sm: "250px" }} pl="0px">
                                                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                    <Avatar src={data.profilePic} w="50px" borderRadius="12px" me="18px" />
                                                    <Flex direction="column">
                                                        <Text
                                                            fontSize="lg"
                                                            color={textColor}
                                                            fontWeight="bold"
                                                            minWidth="100%"
                                                        >
                                                            {data.fullname}
                                                        </Text>
                                                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                                            {data.username}
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>

                                            <Td>
                                                <Flex direction="column">
                                                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                        {data.email}
                                                    </Text>
                                                </Flex>
                                            </Td>
                                            <Td>
                                                <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                    {data.role}
                                                </Text>
                                            </Td>
                                            <Td>

                                                <Button colorScheme="green" size="sm" onClick={goToUpdateUser} value={data.userId}>Set As User</Button>
                                            </Td>
                                            <Td>
                                                {/* <Button colorScheme="red" size="sm" onClick={(e) => { handleDeleteSong(e, data.songId) }}>Delete</Button> */}
                                            </Td>
                                        </Tr>
                                    );
                                return (
                                    <Tr key={index}>
                                        <Td minWidth={{ sm: "250px" }} pl="0px">
                                            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                                <Avatar src={data.profilePic} w="50px" borderRadius="12px" me="18px" />
                                                <Flex direction="column">
                                                    <Text
                                                        fontSize="lg"
                                                        color={textColor}
                                                        fontWeight="bold"
                                                        minWidth="100%"
                                                    >
                                                        {data.fullname}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                                        {data.username}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Td>

                                        <Td>
                                            <Flex direction="column">
                                                <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                    {data.email}
                                                </Text>
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Text fontSize="lg" color={textColor} fontWeight="bold">
                                                {data.role}
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Button colorScheme="green" size="sm" onClick={goToUpdateUser} value={data.userId}>Set As Admin</Button>
                                        </Td>
                                        <Td>
                                            {/* <Button colorScheme="red" size="sm" onClick={(e) => { handleDeleteSong(e, data.songId) }}>Delete</Button> */}
                                        </Td>
                                    </Tr>
                                );
                            })}

                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>


    );
}