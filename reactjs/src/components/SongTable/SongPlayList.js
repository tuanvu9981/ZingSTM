import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import SongButton from "./SongButton";

function SongPlayList(props) {
    const { logo, name, singer, subdomain, domain, status, date } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    return (
        <Tr>
            <Td minWidth={{ sm: "250px" }} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
                    <Flex direction="column">
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {name}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {singer}
                        </Text>
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Flex direction="column">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {domain}
                    </Text>
                </Flex>
            </Td>
            <Td>
                <Flex direction="column">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {status}
                    </Text>
                </Flex>
            </Td>
            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold">
                    {date}
                </Text>
            </Td>
            <Td>
                <SongButton />
            </Td>
        </Tr>
    );
}

export default SongPlayList;
