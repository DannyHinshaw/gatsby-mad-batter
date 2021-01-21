import { APIGatewayEvent, Context } from "aws-lambda";


/*      Shared functions/variables/resources
 ================================================= */

/**
 * Print pretty formatted JSON to console.
 * @param {object} o
 * @returns {string}
 */
export const pprint = (o: object): string =>
	JSON.stringify(o, null, 2);

/**
 * Logger for functions console, wraps pprint.
 * @param {number} statusCode
 * @param {APIGatewayEvent} event
 * @param {Context} context
 */
export const logInfo = (statusCode: number, event: APIGatewayEvent, context: Context) => {
	console.log(statusCode, "- event::", pprint(event));
	console.log(statusCode, "- context::", pprint(context));
};

/**
 * Headers for handling CORS with local development.
 * @type {{"Access-Control-Allow-Origin": string; "Access-Control-Allow-Headers": string} | {}}
 */
export const responseHeaders = process.env.NODE_ENV === "dev" ? {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
} : {};
