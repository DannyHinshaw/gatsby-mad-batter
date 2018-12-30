import { APIGatewayEvent, Context } from "aws-lambda";


/*      Shared functions/variables/resources
 ================================================= */

/**
 * Print pretty formatted JSON to console.
 * @param {object} o
 * @returns {string}
 */
export const pprint = (o: object): string => JSON.stringify(o, null, 2);

/**
 * Logger for functions console, wraps pprint.
 * @param {number} statusCode
 * @param {APIGatewayEvent} event
 * @param {Context} context
 */
export const logInfo = (statusCode: number, event: APIGatewayEvent, context: Context) => {
	console.log(401, "- event::", pprint(event));
	console.log(401, "- context::", pprint(context));
};
