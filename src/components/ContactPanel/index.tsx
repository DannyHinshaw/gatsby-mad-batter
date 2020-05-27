import * as React from "react";
import { ComponentType, FormEvent, useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { connect } from "react-redux";
import { DateInput } from "semantic-ui-calendar-react";
import { DropdownItemProps, Form, FormProps } from "semantic-ui-react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import { baseUrl, bgImageQuality } from "../../api";
import { formDataSet, formErrorSet } from "../../store/actions";
import { IContactFormValues, initialFormValues } from "../../store/reducers/formDataReducer";
import { IContactFormErrors, initialFormErrors } from "../../store/reducers/formErrorsReducer";
import ParallaxPanel from "../ParallaxPanel";
import "./ContactPanel.scss";


const _BLACK_OUT_2019 = [
	"07-05-2019",
	"07-06-2019",
	"07-07-2019",
	"07-13-2019",
	"07-22-2019",
	"07-27-2019",

	"08-17-2019",
	"08-18-2019",

	"08-20-2019",
	"08-21-2019",
	"08-22-2019",
	"08-23-2019",
	"08-24-2019",
	"08-25-2019",

	"09-01-2019",
	"09-10-2019",
	"09-11-2019",
	"09-12-2019",
	"09-13-2019",
	"09-14-2019",
	"09-15-2019",
	"09-16-2019",
	"09-18-2019",
	"09-19-2019",
	"09-20-2019",
	"09-21-2019",
	"09-22-2019",

	"10-12-2019",
	"10-13-2019",
	"10-15-2019",
	"10-16-2019",
	"10-17-2019",
	"10-18-2019",
	"10-19-2019",
	"10-20-2019",
	"10-21-2019",
	"10-22-2019",
	"10-23-2019",
	"10-24-2019",
	"10-25-2019",
	"10-26-2019",
	"10-27-2019",
	"10-28-2019",
	"10-29-2019",
	"10-30-2019",
	"10-31-2019",

	"11-07-2019",
	"11-08-2019",
	"11-09-2019",
	"11-10-2019",
	"11-11-2019",
	"11-12-2019",
	"11-13-2019",
	"11-14-2019",
	"11-15-2019",
	"11-16-2019",
	"11-17-2019",

	"11-24-2019",
	"11-25-2019",
	"11-26-2019",
	"11-27-2019",
	"11-28-2019",
	"11-29-2019",
	"11-30-2019",

	"12-01-2019",
	"12-02-2019",

	"12-13-2019",
	"12-14-2019",
	"12-15-2019",
	"12-16-2019",
	"12-17-2019",
	"12-18-2019",
	"12-19-2019",
	"12-20-2019",
	"12-21-2019",
	"12-22-2019",
	"12-23-2019",
	"12-24-2019",
	"12-25-2019",
	"12-26-2019",
	"12-27-2019",
	"12-28-2019",
	"12-29-2019",

	"10-14-2019",
	"10-21-2019",
	"10-28-2019",
	"11-04-2019",
	"11-11-2019",
	"11-18-2019",
	"11-25-2019",
	"12-02-2019",
	"12-09-2019",
	"12-14-2019",
	"12-16-2019",
	"12-23-2019",
	"12-30-2019"
];

const BLACK_OUT_DATES: string[] = [

	// 2020!!!
	"2-13-2020",
	"2-14-2020",
	"2-15-2020",

	"3-06-2020",
	"3-07-2020",
	"3-08-2020",
	"3-09-2020",
	"3-10-2020",
	"3-11-2020",
	"3-12-2020",
	"3-13-2020",
	"3-14-2020",
	"3-15-2020",
	"3-16-2020",
	"3-17-2020",
	"3-22-2020",

	"4-21-2020",
	"4-22-2020",
	"4-23-2020",
	"4-24-2020",
	"4-25-2020",
	"4-26-2020",
	"4-27-2020",
	"4-28-2020",
	"4-29-2020",
	"4-30-2020",

	"5-01-2020",
	"5-02-2020",
	"5-03-2020",
	"5-04-2020",
	"5-05-2020",
	"5-06-2020",
	"5-07-2020",
	"5-08-2020",
	"5-09-2020",
	"5-10-2020",
	"5-11-2020",
	"5-12-2020",
	"5-13-2020",
	"5-14-2020",
	"5-15-2020",
	"5-16-2020",
	"5-17-2020",
	"5-18-2020",
	// "5-19-2020", // THIS DATE BREAKS THE COMPONENT
	"5-20-2020",
	"5-21-2020",
	"5-22-2020",
	"5-23-2020",
	"5-24-2020",
	"5-25-2020",
	"5-26-2020",
	"5-27-2020",
	"5-28-2020",
	"5-29-2020",
	"5-30-2020",
	"5-31-2020",

	"6-01-2020",
	"6-05-2020",
	"6-06-2020",
	"6-07-2020",
	"6-21-2020",

	"7-7-2020",
	"7-8-2020",

	"8-29-2020",
	"8-30-2020",

	"9-18-2020",
	"9-19-2020",
	"9-20-2020",

	// 2020 Monday Blocks
	"3-02-2020",
	"3-09-2020",
	"3-16-2020",
	"3-23-2020",
	"3-30-2020",
	"4-06-2020",
	"4-13-2020",
	"4-20-2020",
	"4-27-2020",
	"5-04-2020",
	"5-11-2020",
	"5-18-2020",
	"5-25-2020",
	"6-01-2020",
	"6-04-2020",
	"6-05-2020",
	"6-06-2020",
	"6-07-2020",
	"6-08-2020",
	"6-15-2020",
	"6-22-2020",
	"7-06-2020",
	"7-13-2020",
	"7-20-2020",
	"7-27-2020",
	"8-03-2020",
	"8-10-2020",
	"8-17-2020",
	"8-24-2020",
	"8-31-2020",
	"9-07-2020",
	"9-14-2020",
	"9-21-2020",
	"9-28-2020",
	"10-05-2020",
	"10-12-2020",
	"10-19-2020",
	"10-26-2020",
	"11-02-2020",
	"11-09-2020",
	"11-16-2020",
	"11-23-2020",
	"11-30-2020",
	"12-07-2020",
	"12-14-2020",
	"12-21-2020",
	"12-28-2020"
];
const functionsBaseURL: string = "https://madbatterbake.com/.netlify/functions/";
const tokenURL: string = functionsBaseURL.concat("token");
const emailURL: string = functionsBaseURL.concat("email");


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
].map((v: string) =>
	({ key: v, value: v, text: v }));

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

export interface IContactPanel {
	formErrorSet: typeof formErrorSet
	formDataSet: typeof formDataSet
	formErrors: IContactFormErrors
	formData: IContactFormValues
}

/**
 * Convert from 'yyyy-mm-dd' to 'mm-dd-yyyy'.
 * @param {string} dateString
 * @returns {string}
 */
const humanFriendlyDate = (dateString: string): string => {
	const [year, month, day]: string[] = dateString.split("-");
	return `${month}-${day}-${year}`;
};

/**
 * Main contact form component.
 * @returns {JSX.Element}
 * @constructor
 */
const ContactForm: ComponentType<IContactPanel> = (props: IContactPanel): JSX.Element => {
	const [dateWarning, setDateWarning] = useState(true);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	const [error, setError] = useState(true);
	const forceUpdate = useForceUpdate();
	const reBackwardsDate: RegExp = /^\d{4}-\d{2}-\d{2}$/;

	// Try to disable keyboard from popping over datepicker on mobile.
	useEffect(() => {
		const datePickers = document.querySelectorAll("[name=\"date\"]");

		// @ts-ignore
		[...datePickers].forEach((el => {
			const currPicker = el as HTMLInputElement;
			currPicker.setAttribute("readOnly", "true");
		}));
	}, []);

	const handleInputChange = (e: any, { name, value }: any) => {
		if (props.formData.hasOwnProperty(name)) {
			const newVals = { ...props.formData, [name]: value };
			props.formDataSet(newVals);
		}
	};

	// Form submission
	// @ts-ignore
	const submit = (event: FormEvent, data: FormProps) => {
		Object.keys(initialFormErrors).forEach((k: string) => initialFormErrors[k] = false);
		props.formErrorSet(initialFormErrors);
		setLoading(true);

		const { name, email, phone, zip, people, date, subject, message } = props.formData;
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

		props.formErrorSet(initialFormErrors);
		const errors: boolean = Object.keys(props.formErrors)
			.some((k: string) => props.formErrors[k]);
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
				body: JSON.stringify({ token, ...props.formData })
			})).then(() => {
				setLoading(false);
				setSuccess(false);
				props.formDataSet(initialFormValues);
			}).catch(err => {
				console.error(err);
				setLoading(false);
				setError(false);
			});
	};

	const picker = () =>
		// @ts-ignore
		<DateInput readonly={true}
			name="date" dateFormat="MM-DD-YYYY" placeholder="Date" value={props.formData.date}
			iconPosition="left" disable={BLACK_OUT_DATES} hideMobileKeyboard={true}
			popupPosition="top center" onChange={handleInputChange}
			error={props.formErrors.dateError} />;

	return (
		<div id="contactContainer" className="panel-text">
			<div className="header-center-container">
				<h3 className="title" style={{ width: "15rem" }}>
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
						value={props.formData.name}
						onChange={handleInputChange}
						error={props.formErrors.nameError}
					/>
					<Form.Input
						fluid={true}
						name="email"
						value={props.formData.email}
						onChange={handleInputChange}
						label="Email*"
						placeholder="mary@example.com"
						error={props.formErrors.emailError}
					/>
					<Form.Input
						fluid={true}
						name="phone"
						value={props.formData.phone}
						onChange={handleInputChange}
						label="Phone*"
						placeholder="555-555-5555"
						error={props.formErrors.phoneError}
					/>
					<Form.Input
						fluid={true}
						name="zip"
						value={props.formData.zip}
						onChange={handleInputChange}
						label="Event Zip Code*"
						placeholder="29045"
						error={props.formErrors.zipError}
					/>
					<Form.Dropdown
						name="people"
						value={props.formData.people}
						onChange={handleInputChange}
						label="Number of People*"
						placeholder="Head Count"
						selection={true}
						options={numberOfPeopleOptions}
						error={props.formErrors.peopleError}
					/>
					<Form.Field>
						<label>Event Date*</label>
						<span style={{ fontSize: ".6rem", fontStyle: "italic" }}>
								*Blocked out dates on the calendar are already booked*
							</span>

						{picker()}

					</Form.Field>
					<Form.Group grouped={true}>
						<label>Gluten Free?</label>
						<Form.Radio
							label="Yes"
							value="Yes"
							name="glutenFree"
							checked={props.formData.glutenFree === "Yes"}
							onChange={handleInputChange}
						/>
						<Form.Radio
							label="No"
							value="No"
							name="glutenFree"
							checked={props.formData.glutenFree === "No"}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Input
						fluid={true}
						name="subject"
						id="subjectInput"
						value={props.formData.subject}
						onChange={handleInputChange}
						label="Subject*"
						placeholder="Ex. Birthday Cake!"
						error={props.formErrors.subjectError}
					/>
					<Form.TextArea
						name="message"
						value={props.formData.message}
						onChange={handleInputChange}
						label="Message*"
						placeholder="Tell us more about your order..."
						error={props.formErrors.messageError}
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
								!props.formData.message ||
								!props.formData.subject ||
								!props.formData.people ||
								!props.formData.name ||
								!props.formData.zip ||
								!props.formData.phone ||
								!props.formData.email ||
								!props.formData.date
							}
						>
							Submit
						</Form.Button>
					</div>

				</Form>
			</div>
		</div>
	);
};

const mapStateToProps = ({ formData, formErrors }) => ({ formData, formErrors });
const ContactFormLoaded = connect(mapStateToProps, {
	formErrorSet,
	formDataSet
})(ContactForm);

/**
 * ParallaxPanel wrapper for the contact form to abstract away store and double refreshes.
 * @returns {any}
 * @constructor
 */
const ContactPanel = () => {
	const bgImage: string = `${baseUrl}/upload/${bgImageQuality},f_auto/v1563103411/mad-batter/cupcakes-background.jpg`;
	return (
		<ParallaxPanel scrollId="contact" bgImage={bgImage} pHeight="115vh">
			<ContactFormLoaded />
		</ParallaxPanel>
	);
};
export default ContactPanel;
