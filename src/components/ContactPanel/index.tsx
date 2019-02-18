import * as React from "react";
import { FormEvent, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import DateInput from "semantic-ui-calendar-react/dist/inputs/DateInput";
import { DropdownItemProps, Form, FormProps } from "semantic-ui-react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import ParallaxPanel from "../ParallaxPanel";
import "./ContactPanel.scss";

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
}

interface IContactFormErrors {
	zipError: boolean
	dateError: boolean
	nameError: boolean
	emailError: boolean
	phoneError: boolean
	peopleError: boolean
	subjectError: boolean
	messageError: boolean
	glutenFreeError: boolean
}

const BLACK_OUT_DATES: string[] = [
	"05-23-2019",
	"05-24-2019",
	"05-25-2019",
	"05-26-2019",
	"05-27-2019",
	"05-28-2019"
];
const functionsBaseURL: string = "https://madbatterbake.com/.netlify/functions/";
const tokenURL: string = functionsBaseURL.concat("token");
const emailURL: string = functionsBaseURL.concat("email");

const initialFormValues: IContactFormValues = {
	zip: "",
	date: "",
	name: "",
	email: "",
	phone: "",
	people: "",
	subject: "",
	message: "",
	glutenFree: "No"
};

const initialFormErrors: IContactFormErrors = {
	zipError: false,
	dateError: false,
	nameError: false,
	emailError: false,
	phoneError: false,
	peopleError: false,
	subjectError: false,
	messageError: false,
	glutenFreeError: false
};

const numberOfPeopleOptions: DropdownItemProps[] = [
	"1 - 10",
	"10 - 20",
	"20 - 30",
	"40 - 50",
	"50 - 60",
	"60 - 70",
	"70 - 80",
	"80 - 90",
	"90 - 100"
].map((v: string) => ({ key: v, value: v, text: v }));

/**
 * Check email is valid.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email: string): boolean =>
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

/**
 * Util function to force component rerender.
 * @returns {() => void}
 */
const useForceUpdate = () => {
	const [value, set] = useState(true);
	return () => set(!value);
};

/**
 * Main contact form component.
 * @returns {JSX.Element}
 * @constructor
 */
const ContactPanel = (): JSX.Element => {
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [formData, setFormData] = useState(initialFormValues);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);
	const forceUpdate = useForceUpdate();

	const handleInputChange = (e: any, { name, value }: any) => {
		console.log("CALLED");
		console.log(name, value);
		if (formData.hasOwnProperty(name)) {
			setFormData({ ...formData, [name]: value });
			console.log(formData);
		}
	};

	// Form submission
	// @ts-ignore
	const submit = (event: FormEvent, data: FormProps) => {
		Object.keys(initialFormErrors).forEach((k: string) => initialFormErrors[k] = false);
		setFormErrors(initialFormErrors);
		setLoading(true);

		const { name, email, phone, zip, people, date, subject, message } = formData;
		console.log("isValidEmail::", isValidEmail(email));
		if (!name || name.length < 2) {
			initialFormErrors.nameError = true;
		}
		if (!email || !isValidEmail(email)) {
			initialFormErrors.emailError = true;
		}
		// @ts-ignore
		if (!phone || phone.match(/\d/g).length !== 10) {
			initialFormErrors.phoneError = true;
		}
		// @ts-ignore
		if (!zip || zip.match(/\d/g).length < 5) {
			initialFormErrors.zipError = true;
		}
		if (!people) {
			initialFormErrors.peopleError = true;
		}
		if (!date) {
			initialFormErrors.dateError = true;
		}
		if (!subject) {
			initialFormErrors.subjectError = true;
		}
		if (!message) {
			initialFormErrors.messageError = true;
		}

		setFormErrors(initialFormErrors);
		const errors: boolean = Object.keys(formErrors).some((k: string) => formErrors[k]);
		if (errors) {
			setLoading(false);

			// Force a rerender to finish validation errors
			// Needed for SUI onChange bug
			return forceUpdate();
		}

		return fetch(tokenURL)
			.then(res => res.json())
			.then(({ token }) => fetch(emailURL, {
				method: "POST",
				body: JSON.stringify({ token, ...formData })
			})).then(() => {
				setLoading(false);
				setSuccess(false);
				setFormData(initialFormValues);
			}).catch(err => {
				console.error(err);
				setLoading(false);
				setError(false);
			});
	};

	return (
		<ParallaxPanel scrollId="contact" bgImage="imgs/flowers-batch.jpeg" pHeight="115vh">
			<div id="contactContainer" className="panel-text">
				<div className="header-center-container">
					<h3 className="title" style={{ width: "12rem" }}>
						CONTACT
					</h3>
				</div>

				<div id="socialLinks">
					<a
						href="https://www.facebook.com/madefromscratchbaking/"
						rel="noreferrer noopener"
						target="_blank"
						title="Instagram"
					>
						<FaFacebook className="social" />
					</a>
					<a
						href="https://www.instagram.com/sprinkleallthethings/"
						rel="noreferrer noopener"
						target="_blank"
						title="Instagram"
					>
						<FaInstagram className="social" />
					</a>
				</div>

				<div id="semanticForm">
					<Form
						loading={loading}
						onSubmit={submit}
					>
						<h3 style={{ textAlign: "center" }}>
							Message
						</h3>

						<p style={{ fontSize: ".7rem" }}>
							Required Fields *
						</p>

						<Form.Input
							fluid={true}
							name="name"
							label="Name*"
							placeholder="Mary Jane"
							value={formData.name}
							onChange={handleInputChange}
							error={formErrors.nameError}
						/>
						<Form.Input
							fluid={true}
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							label="Email*"
							placeholder="mary@example.com"
							error={formErrors.emailError}
						/>
						<Form.Input
							fluid={true}
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							label="Phone*"
							placeholder="555-555-5555"
							error={formErrors.phoneError}
						/>
						<Form.Input
							fluid={true}
							name="zip"
							value={formData.zip}
							onChange={handleInputChange}
							label="Event Zip Code*"
							placeholder="29045"
							error={formErrors.zipError}
						/>
						<Form.Group grouped={true}>
							<label>Gluten Free?</label>
							<Form.Radio
								label="Yes"
								value="Yes"
								name="glutenFree"
								checked={formData.glutenFree === "Yes"}
								onChange={handleInputChange}
							/>
							<Form.Radio
								label="No"
								value="No"
								name="glutenFree"
								checked={formData.glutenFree === "No"}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Dropdown
							name="people"
							value={formData.people}
							onChange={handleInputChange}
							label="Number of People*"
							placeholder="Head Count"
							selection={true}
							options={numberOfPeopleOptions}
							error={formErrors.peopleError}
						/>
						<Form.Field>
							<label>Event Date*</label>
							<span style={{ fontSize: ".6rem", fontStyle: "italic" }}>
								Will be closed May 23 - May 28, 2019
							</span>
							<DateInput
								name="date"
								dateFormat="MM-DD-YYYY"
								placeholder="Date"
								value={formData.date}
								iconPosition="left"
								disable={BLACK_OUT_DATES}
								popupPosition="top center"
								onChange={handleInputChange}
								error={formErrors.dateError}
							/>
						</Form.Field>
						<Form.Input
							fluid={true}
							name="subject"
							id="subjectInput"
							value={formData.subject}
							onChange={handleInputChange}
							label="Subject*"
							placeholder="Ex. Birthday Cake!"
							error={formErrors.subjectError}
						/>
						<Form.TextArea
							name="message"
							value={formData.message}
							onChange={handleInputChange}
							label="Message*"
							placeholder="Tell us more about your order..."
							error={formErrors.messageError}
						/>

						<Message
							success={success}
							header="Message sent!"
							style={{ backgroundColor: "#a3f5a3" }}
							content="Thanks for reaching out, you will hear back from us soon!"
						/>
						<Message
							error={error}
							header="Error"
							style={{ backgroundColor: "#f55969" }}
							content="Oops, something went wrong. Please try again later."
						/>

						<div style={{ textAlign: "center" }}>
							<Form.Button
								disabled={
									!formData.message ||
									!formData.subject ||
									!formData.people ||
									!formData.name ||
									!formData.zip ||
									!formData.phone ||
									!formData.email ||
									!formData.date
								}
							>
								Submit
							</Form.Button>
						</div>

					</Form>
				</div>
			</div>
		</ParallaxPanel>
	);
};

export default ContactPanel;
