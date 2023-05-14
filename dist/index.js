"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("./http-status-codes/http-status-codes");
const Videomodels_1 = require("./models/Videomodels");
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
app.delete("/testing/all-data", (req, res) => {
    dbVideosRep_1.db.videos = [];
    res.sendStatus(204); //send(httpStatusCodes.NO_CONTEND_204)
});
app.get('/', (req, res) => {
    res.send('Доброе утро!');
});
app.get('/videos', (req, res) => {
    res.status(200).send(dbVideosRep_1.db.videos); //res.send(httpStatusCodes.OK_200).send(dbVideos) выдает ошибку попробую по другому
});
app.post('/videos', (req, res) => {
    const errors = [];
    let title = req.body.title;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({ message: "incorrect title",
            field: "title"
        });
    }
    let author = req.body.author;
    if (!author || typeof author !== 'string' || author.length > 20) {
        errors.push({
            message: "incorrect author",
            field: "author"
        });
    }
    let qualityVideos = req.body.availableResolutions;
    if (!qualityVideos || !Array.isArray(qualityVideos) || !(0, Videomodels_1.qualityCheck)(qualityVideos, Videomodels_1.dbavailableResolutions)) {
        errors.push({
            message: "incorrect availableResolutions",
            field: "availableResolutions"
        });
    }
    if (errors.length > 0) {
        return res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({ errorsMessages: errors });
    }
    const newVideo = {
        id: +currentDate,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
        minAgeRestriction: null,
        publicationDate: tommorowDate.toISOString(),
        createdAt: currentDate.toISOString(),
    };
    dbVideosRep_1.db.videos.push(newVideo);
    res.status(http_status_codes_1.httpStatusCodes.CREATED_201).send(newVideo);
    return;
});
app.put('/videos/:id', (req, res) => {
    const video = dbVideosRep_1.db.videos.find(v => v.id === +req.params.id);
    if (!video) {
        return res.sendStatus(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    }
    const errors = [];
    let title = req.body.title;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({ message: "incorrect title",
            field: "title"
        });
    }
    let author = req.body.author;
    if (!author || typeof author !== 'string' || author.length > 20) {
        errors.push({
            message: "incorrect author",
            field: "author"
        });
    }
    let canBeDownloaded = req.body.canBeDownloaded;
    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        errors.push({
            message: "incorrect canBeDownloaded",
            field: "canBeDownloaded"
        });
    }
    let publicationDate = req.body.publicationDate;
    if (publicationDate && typeof publicationDate !== 'string') {
        errors.push({
            message: "incorrect publicationDate",
            field: "publicationDate"
        });
    }
    let minAgeRestriction = req.body.minAgeRestriction;
    if (!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction > 18) {
        errors.push({ message: "incorrect minAgeRestriction",
            field: "minAgeRestriction"
        });
    }
    let qualityVideos = req.body.availableResolutions;
    if (!qualityVideos || !Array.isArray(qualityVideos) || !(0, Videomodels_1.qualityCheck)(qualityVideos, Videomodels_1.dbavailableResolutions)) {
        errors.push({
            message: "incorrect availableResolutions",
            field: "availableResolutions"
        });
    }
    if (errors.length > 0) {
        return res.status(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400).send({ errorsMessages: errors });
    }
    const newVideo = {
        id: +currentDate,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
        minAgeRestriction: req.body.minAgeRestriction,
        publicationDate: tommorowDate.toISOString(),
        createdAt: currentDate.toISOString(),
    };
    dbVideosRep_1.db.videos.push(newVideo);
    res.status(http_status_codes_1.httpStatusCodes.NO_CONTEND_204).send(newVideo);
    return;
});
app.get('/videos/:id', (req, res) => {
    const videoId = dbVideosRep_1.db.videos.find(v => v.id === +req.params.id);
    if (videoId) {
        res.send(videoId).sendStatus(http_status_codes_1.httpStatusCodes.OK_200);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/videos/:id', (req, res) => {
    const video = dbVideosRep_1.db.videos.find(v => v.id === +req.params.id);
    if (video) {
        dbVideosRep_1.db.videos = dbVideosRep_1.db.videos.filter(v => v.id !== video.id); // dbVideos.filter(p=>p.id !== +req.params.id) - так не получилось
        res.sendStatus(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
    }
    else
        res.sendStatus(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
