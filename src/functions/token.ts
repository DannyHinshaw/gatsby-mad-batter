import { APIGatewayEvent, Context, Handler } from "aws-lambda";

const { ACCESS_TOKEN } = process.env;

/**
 * Retrieve access token from environment.
 * @param event
 * @param context
 * @returns {Promise<{body: string; statusCode: number}>}
 */
export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
	Object.keys(event.headers).forEach(key => {
		console.log(key, event.headers[key]);
	});

	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: "Method Not Allowed"
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			token: ACCESS_TOKEN || null
		})
	};
};
