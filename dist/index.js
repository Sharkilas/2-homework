"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("./http-status-codes/http-status-codes");
const app = (0, express_1.default)();
const port = 3003;
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const dbVideos = [
    { id: 1,
        title: "string-1",
        author: "string-1",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2023-05-08T10:49:49.732Z",
        publicationDate: '2023-05-09T10:49:49.732Z',
        availableResolutions: ['P144', 'P240'] },
    { id: 2,
        title: "string-2",
        author: "string-2",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2023-05-08T10:49:49.732Z",
        publicationDate: '2023-05-09T10:49:49.732Z',
        availableResolutions: ['P144', 'P360'] },
];
const jsonMiddleWare = express_1.default.json();
app.use(jsonMiddleWare);
const currentDate = new Date();
const tomorrowDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
app.get('/videos', (req, res) => {
    res.send(dbVideos);
});
app.post('/videos', (req, res) => {
    res.send(dbVideos);
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
        publicationDate: req.body.publicationDate,
        createdAt: req.body.createdAt
    };
    dbVideos.push(UpdateVideosModels);
});
app.put('/videos/:id', (req, res) => {
    let foundVideos = (dbVideos.find(v => v.id === +req.params.id));
    if (!foundVideos) {
        res.sendStatus(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
        return;
    }
    if (!req.body.title || !(req.body.title.length < 41) || !(typeof (req.body.title) === "string")) {
        res.sendStatus(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
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
    if (!availableResolutions || !Array.isArray(availableResolutions))
        res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({
            errorMessage: [{
                    'message': "incorrect availableResolutions",
                    "field": "availableResolutions"
                }]
        });
    foundVideos.title = req.body.title;
    res.json(foundVideos);
    let UpdateVideosModels = {
        id: +currentDate,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded,
        minAgeRestriction: req.body.minAgeRestriction,
        publicationDate: req.body.publicationDate,
        createdAt: req.body.createdAt
    };
    dbVideos.push(UpdateVideosModels);
});
app.get('/videos/id', (req, res) => {
    let video = dbVideos.find(p => p.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else
        res.send(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    res.send(dbVideos);
});
app.delete('/videos/:id', (req, res) => {
    let video = dbVideos.find(p => p.id === +req.params.id);
    if (video) {
        dbVideos.filter(v => v.id !== +req.params.id);
        res.sendStatus(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
    }
    else
        res.send(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    res.send(dbVideos);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
