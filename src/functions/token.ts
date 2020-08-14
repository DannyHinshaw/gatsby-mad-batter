import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { logInfo } from "./util";

interface IHeaders {
	[name: string]: string
}

const { ACCESS_TOKEN } = process.env;
const validReferers: string[] = [
	"https://madbatterbake.com",
	"https://www.madbatterbake.com"
];

/**
 * Check referer header against allowed.
 * @param {APIGatewayEvent} event
 * @returns {any}
 */
const isValidReferer = (event: APIGatewayEvent) => {
	const headers: IHeaders = event.headers;
	if (!headers) {
		return false;
	}

	const refHeader: string = headers["referer"]; // tslint:disable-line
	return refHeader && validReferers.some((r: string) => {
		return refHeader === r || refHeader === r.concat("/");
	});
};

/**
 * Retrieve access token from environment.
 * @param event
 * @param context
 * @returns {Promise<{body: string; statusCode: number}>}
 */
export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
	// Only allow GET requests
	if (event.httpMethod !== "GET") {
		logInfo(405, event, context);
		return {
			statusCode: 405,
			body: "Method Not Allowed"
		};
	}

	// Only allow requests from website
	if (!isValidReferer(event)) {
		logInfo(401, event, context);
		return {
			statusCode: 401,
			body: "Invalid referer"
		};
	}

	logInfo(200, event, context);
	return {
		statusCode: 200,
		// headers: responseHeaders,
		body: JSON.stringify({
			token: ACCESS_TOKEN || null
		})
	};
};
