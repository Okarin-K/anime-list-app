import { Box, FormControl, FormLabel, Heading, Image, Select, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Anime } from "../types/anime";

const AnimeList: NextPage = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [selectCool, setSelectCool] = useState('2021/2')

    const whenData = [];
    const day = new Date();
    const nowYear = day.getFullYear();
    const startYear = 2014;
    const cools = ["冬", "春", "夏", "秋"];
    for(let year = startYear; year <= nowYear; year++) {
        for(let cool = 0; cool < cools.length; cool++) {
            whenData.push({index: cool + 1, year: year, cool: cools[cool]});
        }
    }

    useEffect(() => {
        const subscribe = async () => {
            console.log(selectCool);

            const coolArray = selectCool.split('/');

            console.log(coolArray);
            const queryParams = new URLSearchParams({
                year: coolArray[0],
                cool: coolArray[1]
            })
            const response = await fetch('http://localhost:5000/animeList?' + queryParams);

            const data: {
                items: Anime[],
                code: string
            } = await response.json();

            setAnimeList(data.items);
        }

        subscribe();
    }, [selectCool])
  
    return (
        <>
            <Box>
                <FormControl id='when'>
                    <FormLabel>アニメの放送時期</FormLabel>
                    <Select
                        placeholder="知りたい放送時期を選択してください"
                        onChange={(e) => {
                            e.preventDefault();

                            setSelectCool(e.target.value);
                        }}
                    >
                        {
                            whenData.map((data, index) => (
                                <option key={index} value={`${data.year}/${data.index}`}>{`${data.year} / ${data.cool} アニメ`}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
            <SimpleGrid columns={[2, null, 3]} spacing='40px'>
                {
                    animeList.map(anime => {
                        return (
                                <Box bg='green.100' height='300px'>
                                    <Image src={anime.image} />
                                    <Heading size='md'>{anime.title}</Heading>
                                </Box>
                        )
                    })
                }
            </SimpleGrid>
        </>
    );
}

export default AnimeList;