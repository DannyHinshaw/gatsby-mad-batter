const { ACCESS_TOKEN } = process.env;

/**
 * Retrieve access token from environment.
 * @param event
 * @param context
 * @returns {Promise<{body: string; statusCode: number}>}
 */
export const handler = async (event, context) => {
	console.log("Event::\n", event);
	console.log("Context::\n", context);

	// Only allow GET
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
