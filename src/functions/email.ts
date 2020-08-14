const { ACCESS_TOKEN, EMAIL_FROM, EMAIL_TO, MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
import { APIGatewayEvent, Context, Handler } from "aws-lambda";
import { messages } from "mailgun-js";
import { MailOptions } from "nodemailer/lib/smtp-transport";
import { logInfo } from "./util";

type SendData = messages.SendData;
type SendResponse = messages.SendResponse;

interface IContactFormValues {
	zip: string
	date: string
	name: string
	email: string
	phone: string
	people: string
	subject: string
	message: string
	glutenFree: string
	imageLinks: string[]
}

interface IRequestData extends IContactFormValues {
	token: string,
}

const keys: string[] = [
	"zip",
	"date",
	"name",
	"email",
	"phone",
	"people",
	"subject",
	"message",
	"glutenFree"
];

// Email cron constants
// const emailTo: string = "madbatterbake@gmail.com";
const mailgun = require("mailgun-js")({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

/**
 * Construct the html body of and options config of report email.
 * @param {IContactFormValues} messageData
 * @returns {MailOptions}
 */
const constructEmailData = (messageData: IContactFormValues): SendData => {
	const { date, name, email, glutenFree, imagelinks, phone, people, subject, message, zip } = messageData;
	const uploadedImages = imagelinks.length
		? ["Uploaded Images:", ...imagelinks].join("\n")
		: null;

	return {
		to: EMAIL_TO as string,
		from: EMAIL_FROM,
		subject: `New message from madbatterbake.com! Subject: ${subject}`,
		text: `
New message from madbatterbake.com!\n

From: ${name} - ${email} - ${phone}\n
Event Date: ${date}\n
Event Zip Code: ${zip}\n
Gluten Free: ${glutenFree}\n
Number of People: ${people}\n
Message: \n${message}\n

${uploadedImages}
This is an automated email from your main man, love you!
		`
	};
};

/**
 * Compile and send the email to recipient.
 * @param {IContactFormValues} messageData
 */
const sendEmail = (messageData: IContactFormValues): Promise<any> => {
	const mailData: SendData = constructEmailData(messageData);
	return mailgun.messages().send(mailData)
		.then((t: SendResponse) => {
			console.log(200, "Email sent successfully.");
			return { success: 200, message: "Email sent" };
		}).catch(console.error);
};

/**
 * Send email.
 * @param event
 * @param context
 * @returns {Promise<{body: string; statusCode: number}>}
 */
export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
	if (event.httpMethod !== "POST") {
		logInfo(405, event, context);
		return { statusCode: 405, body: "Method Not Allowed" };
	}

	const invalidToken: string = JSON.stringify({ token: "INVALID" });
	const { token, ...messageData }: IRequestData = JSON.parse(event.body || invalidToken);
	if (token !== ACCESS_TOKEN) {
		logInfo(401, event, context);
		return { statusCode: 401, body: "Unauthorized" };
	}

	const bodyKeys: string[] = Object.keys(messageData);
	const discrepantKeys: boolean = bodyKeys.some(k => !keys.includes(k));
	const hasAllKeys: boolean = bodyKeys.every(k => keys.includes(k));
	if (discrepantKeys || !hasAllKeys) {
		logInfo(422, event, context);
		return { statusCode: 422, body: "Unprocessable Entity" };
	}

	return sendEmail(messageData)
		.then((res) => {
			logInfo(200, event, context);

			return {
				statusCode: 200,
				// headers: responseHeaders,
				body: JSON.stringify(res)
			};
		}).catch(err => {
			const formattedError = JSON.stringify(err, null, 2);
			logInfo(500, event, context);
			console.error(err);

			return {
				statusCode: 500,
				body: formattedError
			};
		});
};
