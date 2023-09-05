"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const TableModel_1 = __importDefault(require("../models/TableModel"));
const ServerResponse_1 = __importDefault(require("../models/ServerResponse"));
exports.router = express_1.default.Router();
/* GET home page. */
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield TableModel_1.default.find();
        console.log('Sending tables');
        res.status(200).json(tables);
    }
    catch (error) {
        console.log(typeof error);
        res.status(404).json(new ServerResponse_1.default(error, false));
    }
}));