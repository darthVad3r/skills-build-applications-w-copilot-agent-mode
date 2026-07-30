"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPort = exports.apiBaseUrl = void 0;
const apiPort = 8000;
exports.apiPort = apiPort;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${apiPort}.app.github.dev`
    : `http://localhost:${apiPort}`;
