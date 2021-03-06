import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Chakra imports
import {
	Flex,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GenresBanner from "components/Banner/GenresBanner";
import SongInRow from "components/Song/SongInRow";
import axios from "axios";

function Genres() {
	const { genreId } = useParams();
	const [genre, setGenre] = useState(null);
	const [songs, setSongs] = useState(null);
	const textColor = useColorModeValue("gray.700", "white");

	// Get genre info
	useEffect(() => {
		if (!genre) {
			getGenreInfo(genreId);
		}
	}, []);

	const getGenreInfo = async (genreId) => {
		const data = {
			genreId: genreId,
		};

		const res = await axios.post("/api/getGenreInfoById", data);
		if (res.data.status === 200) {
			setGenre(res.data.genre);
		}
	};

	// Get songs
	useEffect(() => {
		if (!songs) {
			getGenreSong(genreId);
		}
	}, []);

	const getGenreSong = async (genreId) => {
		const data = {
			genreId: genreId,
		};

		const res = await axios.post("/api/getGenresSong", data);
		if (res.data.status === 200) setSongs(res.data.songs);
		else setSongs([]);
	};
	// ('songId', 'imagePath', 'songPath', 'duration','title','genreName')

	return (
		<Flex direction="column" pt={{ base: "120px", md: "75px" }}>
			{genre == null ? (
				"Loading..."
			) : (
				<GenresBanner
					genreId={genreId}
					genres={genre.genreName}
					imgURL={genre.genreImage}
				/>
			)}
			<Card overflowX={{ xl: "hidden" }}>
				<CardHeader p="6px 0px 22px 0px">
					<Text fontSize="xl" color={textColor} fontWeight="bold">
						Song
					</Text>
				</CardHeader>
				<CardBody>
					<Table variant="simple" color={textColor}>
						<Thead>
							<Tr my=".8rem" pl="0px" color="gray.400">
								<Th color="gray.400"></Th>
								<Th color="gray.400"></Th>
								<Th color="gray.400">Genre</Th>
								<Th color="gray.400">Duration</Th>
							</Tr>
						</Thead>
						<Tbody>
							{!songs
								? "Loading..."
								: songs.map((row) => {
										return (
											<SongInRow
												songId={row.songId}
												title={row.title}
												logo={row.imagePath}
												songPath={row.songPath}
												genreName={row.genreName}
												artistName={row.artistName}
												duration={row.duration}
												status="x"
												key={row.songId}
											/>
										);
								  })}
						</Tbody>
					</Table>
				</CardBody>
			</Card>
		</Flex>
	);
}

export default Genres;
