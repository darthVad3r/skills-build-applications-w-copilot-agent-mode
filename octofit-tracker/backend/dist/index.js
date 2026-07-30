"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const apiUrl_1 = require("./config/apiUrl");
require("./config/database");
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        message: 'OctoFit Tracker API is running',
        baseUrl: apiUrl_1.apiBaseUrl,
        port: apiUrl_1.apiPort,
    });
});
app.listen(apiUrl_1.apiPort, () => {
    console.log(`OctoFit backend listening at ${apiUrl_1.apiBaseUrl}`);
});
