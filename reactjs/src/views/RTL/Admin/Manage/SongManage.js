import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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

export default function Dashboard() {
  // Chakra Color Mode
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();
  const [song, setSong] = useState([]);
  const userInfo = useSelector((state) => state.reducerLogin).userInfo;
  if (userInfo === undefined) {
    history.push('/auth/signin/');
  }
  useEffect(() => {
    getAllSongData();
  }, [])
  //Get song data from database
  const getAllSongData = async () => {
    const res = await axios.post("/api/getAllSongInfo");
    if (res.data.status === 200) {
      setSong(res.data.songs);
    }
  }
  //Handle add new song
  const goToAddSongPage = () => {
    history.push('/zingstm/add-song');
  }
  //Handle update song
  const goToUpdateSongPage = (event) => {
    const songCurrentId = event.target.value;
    history.push('/zingstm/update-song/' + songCurrentId);
  }
  // Handle delete song
  const handleDeleteSong = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    swal("Are you sure you to delete this song?", {
      buttons: {
        cancel: "No",
        catch: {
          text: "Yes",
          value: "catch",
        },
      },
    })
      .then((value) => {
        switch (value) {
          case "cancel":
            break;
          case "catch":
            axios.post("/api/deleteOneSong", { songId: id });
            setTimeout(function () {
              swal({
                title: "Success!",
                text: "Delete Song Successfully",
                icon: "success",
                button: "OK!",
              })
            }, 200);
            thisClicked.closest("tr").remove();
            break;
          default:
            break;
        }
      });
  }
  return (
    <div style={{ margin: '125px 0px 0px 0px' }}>
      <Card overflowX={{ xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Song Data
          </Text>
          <Button style={{ margin: "0 0 0 75%", 'borderRadius': "5px" }} colorScheme="blue" onClick={goToAddSongPage}>Add song
          </Button>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th color="gray.400">
                  Song
                </Th>
                <Th color="gray.400">Album</Th>
                <Th color="gray.400">Genre</Th>
                <Th color="gray.400">Time</Th>
                <Th color="gray.400">Update</Th>
                <Th color="gray.400">Delete</Th>

              </Tr>
            </Thead>
            <Tbody>
              {song.map((data, index) => {
                return (
                  <Tr key={index}>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                      <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Avatar src={data.imagePath} w="50px" borderRadius="12px" me="18px" />
                        <Flex direction="column">
                          <Text
                            fontSize="lg"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            {data.title}
                          </Text>
                          <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {data.artistName}
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>

                    <Td>
                      <Flex direction="column">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                          {data.albumTitle}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="column">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">
                          {data.genreName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Text fontSize="lg" color={textColor} fontWeight="bold">
                        {data.duration}
                      </Text>
                    </Td>
                    <Td>
                      <Button colorScheme="green" size="sm" onClick={goToUpdateSongPage} value={data.songId}>Update</Button>
                    </Td>
                    <Td>
                      <Button colorScheme="red" size="sm" onClick={(e) => { handleDeleteSong(e, data.songId) }}>Delete</Button>
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
