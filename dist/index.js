"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("./http-status-codes/http-status-codes");
const dbVideosRep_1 = require("./repositories/dbVideosRep");
const app = (0, express_1.default)();
const port = 3003;
const jsonMiddleWare = express_1.default.json();
app.use(jsonMiddleWare);
const currentDate = new Date();
const incrementDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
const tommorowDate = incrementDate(currentDate, 1);
app.delete('/testing/all-data', (req, res) => {
    dbVideosRep_1.dbVideos.splice(0, dbVideosRep_1.dbVideos.length);
    res.send(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
});
app.get('/', (req, res) => {
    res.send('Доброе утро!');
});
app.get('/videos', (req, res) => {
    res.send(dbVideosRep_1.dbVideos); //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
});
app.post('/videos', (req, res) => {
    res.send(dbVideosRep_1.dbVideos);
    let title = req.body.title; // Как записать если нет и автора и тайтл
    if (!title || typeof title !== 'string' || title.length > 40)
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect title",
                    "field": "tile"
                }]
        });
    let author = req.body.author; // Как записать если нет и автора и тайтл
    if (!author || typeof author !== 'string' || author.length > 20)
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect author",
                    "field": "author"
                }]
        });
    let availableResolutions = req.body.availableResolutions; // Как записать если нет и автора и тайтл
    if (!availableResolutions || !Array.isArray(availableResolutions))
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect availableResolutions",
                    "field": "availableResolutions"
                }]
        });
    let UpdateVideosModels = {
        id: +currentDate,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        publicationDate: tommorowDate.toISOString(),
        createdAt: currentDate.toISOString(),
    };
    dbVideosRep_1.dbVideos.push(UpdateVideosModels);
});
app.put('/videos/:id', (req, res) => {
    let foundVideos = (dbVideosRep_1.dbVideos.find(v => v.id === +req.params.id));
    if (!foundVideos) {
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "video not found",
                    "field": "canBeDownloaded"
                }]
        });
    }
    let title = req.body.title;
    if (!title || title.length > 40 || typeof title !== "string") {
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect title",
                    "field": "tile"
                }]
        });
    }
    let author = req.body.author;
    if (!author || typeof author !== 'string' || author.length > 20)
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect author",
                    "field": "author"
                }]
        });
    let availableResolutions = req.body.availableResolutions; // Как записать если нет и автора и тайтл
    if (!availableResolutions || !Array.isArray(availableResolutions)) {
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect availableResolutions",
                    "field": "availableResolutions"
                }]
        });
    }
    else {
        //foundVideos.title = req.body.title
        res.json(foundVideos);
        let UpdateVideosModels = {
            id: +currentDate,
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            publicationDate: tommorowDate.toISOString(),
            createdAt: currentDate.toISOString()
        };
        dbVideosRep_1.dbVideos.push(UpdateVideosModels);
    }
});
app.get('/videos/id', (req, res) => {
    let video = dbVideosRep_1.dbVideos.find(p => p.id === +req.params.id);
    if (video) {
        res.send(video).send(http_status_codes_1.httpStatusCodes.OK_200);
    }
    else {
        res.send(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    }
});
app.delete('/videos/:id', (req, res) => {
    let video = dbVideosRep_1.dbVideos.find(p => p.id === +req.params.id);
    if (video) {
        dbVideosRep_1.dbVideos.filter(v => v.id !== +req.params.id);
        res.send(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
    }
    else
        res.send(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    res.send(dbVideosRep_1.dbVideos);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
