(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./token.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./token.ts":
/*!******************!*\
  !*** ./token.ts ***!
  \******************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./util/index.ts");

const {
  ACCESS_TOKEN
} = process.env;
const validReferers = ["https://madbatterbake.com", "https://www.madbatterbake.com"];
/**
 * Check referer header against allowed.
 * @param {APIGatewayEvent} event
 * @returns {any}
 */

const isValidReferer = event => {
  const headers = event.headers;

  if (!headers) {
    return false;
  }

  const refHeader = headers["referer"]; // tslint:disable-line

  return refHeader && validReferers.some(r => {
    return refHeader === r || refHeader === r.concat("/");
  });
};
/**
 * Retrieve access token from environment.
 * @param event
 * @param context
 * @returns {Promise<{body: string; statusCode: number}>}
 */


const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    Object(_util__WEBPACK_IMPORTED_MODULE_0__["logInfo"])(405, event, context);
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  } // Only allow requests from website
  // if (!isValidReferer(event)) {
  // 	logInfo(401, event, context);
  // 	return {
  // 		statusCode: 401,
  // 		body: "Invalid referer"
  // 	};
  // }


  Object(_util__WEBPACK_IMPORTED_MODULE_0__["logInfo"])(200, event, context);
  return {
    statusCode: 200,
    headers: _util__WEBPACK_IMPORTED_MODULE_0__["responseHeaders"],
    body: JSON.stringify({
      token: ACCESS_TOKEN || null
    })
  };
};

/***/ }),

/***/ "./util/index.ts":
/*!***********************!*\
  !*** ./util/index.ts ***!
  \***********************/
/*! exports provided: pprint, logInfo, responseHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pprint", function() { return pprint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logInfo", function() { return logInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "responseHeaders", function() { return responseHeaders; });
/*      Shared functions/variables/resources
 ================================================= */

/**
 * Print pretty formatted JSON to console.
 * @param {object} o
 * @returns {string}
 */
const pprint = o => JSON.stringify(o, null, 2);
/**
 * Logger for functions console, wraps pprint.
 * @param {number} statusCode
 * @param {APIGatewayEvent} event
 * @param {Context} context
 */

const logInfo = (statusCode, event, context) => {
  console.log(statusCode, "- event::", pprint(event));
  console.log(statusCode, "- context::", pprint(context));
};
/**
 * Headers for handling CORS with local development.
 * @type {{"Access-Control-Allow-Origin": string; "Access-Control-Allow-Headers": string} | {}}
 */

const responseHeaders =  true ? {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
} : undefined;

/***/ })

/******/ })));