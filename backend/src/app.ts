import axios from 'axios';
import cors from 'cors';
import express from 'express';

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
        const data = response.data;
    
        console.log(data);
    
        res.status(200).send({
            items: data,
            code: 'Success'
        })
    } catch(err) {
        console.error(err)
    }
})

app.listen(5000, () => console.log('listen to server...'))