"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerResponse {
    constructor(message, success, body) {
        this.message = message;
        this.success = success;
        this.body = body;
    }
}
exports.default = ServerResponse;
