"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const commonMiddleware_1 = __importDefault(require("./middleware/commonMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //used for reading the json files at the end iske bina json files or data read nahi hoga
app.use('/auth', authRoutes_1.default);
app.use('/my', profileRoutes_1.default);
app.use('/projects', projectRoutes_1.default);
app.use(commonMiddleware_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
