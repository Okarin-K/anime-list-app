import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { scrapingAnimeImage } from './scrapingAnimeImage';
import { Anime } from './types/anime';

const app = express();

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

app.get('/animeList', async (req, res) => {
    const year = req.query['year'];
    const cool = req.query['cool'];

    try {

        const response = await axios(`http://api.moemoe.tokyo/anime/v1/master/${year}/${cool}`);
        const data = response.data as Anime[];

        const animeList: Anime[] = [];
        for(const d of data) {
            const image = await scrapingAnimeImage(d.public_url);
            animeList.push({
                ...d,
                image: image['og:image']
            })
        }

        console.log(animeList)

        res.status(200).send({
            items: animeList,
            code: 'Success'
        })
    } catch(err) {
        console.error(err)
        res.end();
    }
})

app.listen(5000, () => console.log('listen to server...'))