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
 * Extracts referer from headers.
 * @param {APIGatewayEvent} event
 * @returns {string}
 */
const getReferer = (event: APIGatewayEvent): string | null => {
	const headers: IHeaders = event.headers;
	if (!headers) {
		return null;
	}

	return headers.referer;
};

/**
 * Check referer header against allowed.
 * @param {string} referer
 * @returns {any}
 */
const isValidReferer = (referer: string) => {
	return referer && validReferers.some((r: string) => {
		return referer === r || referer === r.concat("/");
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

	const referer = getReferer(event);
	if (!referer) {
		logInfo(401, event, context);
		return {
			statusCode: 401,
			body: "No referer header present on request."
		};
	}

	// Only allow requests from website
	if (!isValidReferer(referer)) {
		logInfo(401, event, context);
		const msg = `Invalid referer in request header: ${referer}`;
		console.log(msg);
		return {
			statusCode: 401,
			body: msg
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
