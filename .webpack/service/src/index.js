/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const company_router_1 = __webpack_require__(/*! ./company/router/company.router */ "./src/company/router/company.router.ts");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/companies', company_router_1.companyRouter);
exports["default"] = app;


/***/ }),

/***/ "./src/company/controller/company.controller.ts":
/*!******************************************************!*\
  !*** ./src/company/controller/company.controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.companyController = exports.CompanyController = void 0;
const company_service_1 = __webpack_require__(/*! ../service/company.service */ "./src/company/service/company.service.ts");
class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    getCompanies(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = yield this.companyService.getCompanies();
            console.log(companies);
            res.json(companies);
            res.status(200);
        });
    }
    getCompanyById(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyService.getCompanyById(id);
            res.json(company);
            res.status(200);
        });
    }
}
exports.CompanyController = CompanyController;
exports.companyController = new CompanyController(company_service_1.companyService);


/***/ }),

/***/ "./src/company/router/company.router.ts":
/*!**********************************************!*\
  !*** ./src/company/router/company.router.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.companyRouter = void 0;
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const company_controller_1 = __webpack_require__(/*! ../controller/company.controller */ "./src/company/controller/company.controller.ts");
const get_company_by_id_schema_1 = __webpack_require__(/*! ../../job/schema/get-company-by-id.schema */ "./src/job/schema/get-company-by-id.schema.ts");
const express_validation_1 = __webpack_require__(/*! ../../core/express-validation */ "./src/core/express-validation.ts");
const companyRouter = express_1.default.Router();
exports.companyRouter = companyRouter;
companyRouter.get('/', (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield company_controller_1.companyController
            .getCompanies(res)
            .catch(next);
    }))().catch(next);
});
companyRouter.get('/:id', express_validation_1.validator.params(get_company_by_id_schema_1.getCompanySchema), (req, res, next) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield company_controller_1.companyController
            .getCompanyById(req.params.id.toLowerCase(), res)
            .catch(next);
    }))().catch(next);
});


/***/ }),

/***/ "./src/company/service/company.service.ts":
/*!************************************************!*\
  !*** ./src/company/service/company.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.companyService = exports.CompanyService = void 0;
const pool_database_1 = __webpack_require__(/*! ../../core/database/pool.database */ "./src/core/database/pool.database.ts");
class CompanyService {
    getCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool_database_1.pool.query('SELECT * FROM companies');
            return result.rows;
        });
    }
    getCompanyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool_database_1.pool.query('SELECT * FROM companies WHERE id = $1', [id]);
            return result.rows;
        });
    }
}
exports.CompanyService = CompanyService;
exports.companyService = new CompanyService();


/***/ }),

/***/ "./src/core/database/pool.database.ts":
/*!********************************************!*\
  !*** ./src/core/database/pool.database.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pool = void 0;
const pg_1 = __webpack_require__(/*! pg */ "pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'back_end_test_table',
    password: 'postgres',
    port: 5432,
});


/***/ }),

/***/ "./src/core/express-validation.ts":
/*!****************************************!*\
  !*** ./src/core/express-validation.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validator = void 0;
const express_joi_validation_1 = __webpack_require__(/*! express-joi-validation */ "express-joi-validation");
exports.validator = (0, express_joi_validation_1.createValidator)({
    passError: true,
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const Sentry = __importStar(__webpack_require__(/*! @sentry/serverless */ "@sentry/serverless"));
const serverless_http_1 = __importDefault(__webpack_require__(/*! serverless-http */ "serverless-http"));
const app_1 = __importDefault(__webpack_require__(/*! ./app */ "./src/app.ts"));
const sentrylessHandler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, serverless_http_1.default)(app_1.default)(event, context);
});
exports.handler = Sentry.AWSLambda.wrapHandler(sentrylessHandler);


/***/ }),

/***/ "./src/job/schema/get-company-by-id.schema.ts":
/*!****************************************************!*\
  !*** ./src/job/schema/get-company-by-id.schema.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCompanySchema = void 0;
const express_joi_validation_1 = __webpack_require__(/*! express-joi-validation */ "express-joi-validation");
const Joi = __importStar(__webpack_require__(/*! joi */ "joi"));
exports.getCompanySchema = Joi.object({
    id: Joi.string().uuid().required(),
});


/***/ }),

/***/ "@sentry/serverless":
/*!*************************************!*\
  !*** external "@sentry/serverless" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@sentry/serverless");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-joi-validation":
/*!*****************************************!*\
  !*** external "express-joi-validation" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("express-joi-validation");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map