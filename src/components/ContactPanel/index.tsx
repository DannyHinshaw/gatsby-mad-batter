import * as Sentry from "@sentry/react";
import BackgroundImage from "gatsby-background-image";
import * as React from "react";
import { ComponentType, FormEvent, useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import { DateInput } from "semantic-ui-calendar-react-yz";
import { DropdownItemProps, Form, FormProps } from "semantic-ui-react";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import { ImgurData } from "../../globals";
import { ISectionProps } from "../../pages";
import { formDataSet, formErrorSet } from "../../store/actions";
import { IContactFormValues, initialFormValues } from "../../store/reducers/formDataReducer";
import { IContactFormErrors, initialFormErrors } from "../../store/reducers/formErrorsReducer";
import "./ContactPanel.scss";


// FIXME: WARNING
//   We have to leave at least one day of the month unblocked or semantic-ui-calendar-react throws an error.
//   Issue filed here: https://github.com/arfedulov/semantic-ui-calendar-react/issues/202
const BLACK_OUT_DATES: string[] = [
	// 2024
	"01-01-2024",
	"01-02-2024",
	"01-03-2024",
	"01-04-2024",
	"01-05-2024",
	"01-06-2024",
	"01-07-2024",
	"01-08-2024",
	"01-09-2024",
	"01-10-2024",
	"01-11-2024",
	"01-12-2024",
	"01-13-2024",
	"01-14-2024",
	"01-15-2024",
	"01-16-2024",
	"01-17-2024",
	"01-18-2024",
	"01-19-2024",
	"01-20-2024",
	"01-21-2024",
	"01-22-2024",
	"01-23-2024",
	"01-24-2024",
	"01-25-2024",
	"01-26-2024",
	"01-27-2024",
	"01-28-2024",
	"01-29-2024",
	"01-30-2024",
	"01-31-2024",
	"02-01-2024",
	"02-02-2024",
	"02-03-2024",
	"02-04-2024",
	"02-05-2024",
	"02-06-2024",
	"02-07-2024",
	"02-08-2024",
	"02-09-2024",
	"02-10-2024",
	"02-11-2024",
	"02-12-2024",
	"02-13-2024",
	"02-14-2024",
	"02-15-2024",
	"02-16-2024",
	"02-17-2024",
	"02-18-2024",
	"02-19-2024",
	"02-20-2024",
	"02-21-2024",
	"02-22-2024",
	"02-23-2024",
	"02-24-2024",
	"02-25-2024",
	"02-26-2024",
	"02-27-2024",
	"03-03-2024",
	"03-04-2024",
	"03-05-2024",
	"03-10-2024",
	"03-11-2024",
	"03-12-2024",
	"03-17-2024",
	"03-18-2024",
	"03-19-2024",
	"03-24-2024",
	"03-25-2024",
	"03-26-2024",
	"03-31-2024",
	"04-01-2024",
	"04-02-2024",
	"04-06-2024",
	"04-07-2024",
	"04-08-2024",
	"04-09-2024",
	"04-10-2024",
	"04-11-2024",
	"04-12-2024",
	"04-13-2024",
	"04-14-2024",
	"04-15-2024",
	"04-16-2024",
	"04-17-2024",
	"04-18-2024",
	"04-19-2024",
	"04-20-2024",
	"04-21-2024",
	"04-22-2024",
	"04-23-2024",
	"04-24-2024",
	"04-25-2024",
	"04-26-2024",
	"04-27-2024",
	"04-28-2024",
	"04-29-2024",
	"04-30-2024",
	"05-01-2024",
	"05-02-2024",
	"05-03-2024",
	"05-04-2024",
	"05-05-2024",
	"05-06-2024",
	"05-07-2024",
	"05-08-2024",
	"05-09-2024",
	"05-10-2024",
	"05-11-2024",
	"05-12-2024",
	"05-13-2024",
	"05-14-2024",
	"05-15-2024",
	"05-16-2024",
	"05-17-2024",
	"05-18-2024",
	"05-19-2024",
	"05-20-2024",
	"05-21-2024",
	"05-22-2024",
	"05-23-2024",
	"05-24-2024",
	"05-25-2024",
	"05-26-2024",
	"05-27-2024",
	"05-28-2024",
	"05-29-2024",
	"05-30-2024",
	"05-31-2024",
	"06-01-2024",
	"06-02-2024",
	"06-03-2024",
	"06-04-2024",
	"06-05-2024",
	"06-06-2024",
	"06-09-2024",
	"06-10-2024",
	"06-11-2024",
	"06-14-2024",
	"06-15-2024",
	"06-16-2024",
	"06-17-2024",
	"06-18-2024",
	"06-23-2024",
	"06-24-2024",
	"06-25-2024",
	"06-29-2024",
	"06-30-2024",
	"07-01-2024",
	"07-02-2024",
	"07-07-2024",
	"07-08-2024",
	"07-09-2024",
	"07-10-2024",
	"07-11-2024",
	"07-12-2024",
	"07-14-2024",
	"07-15-2024",
	"07-16-2024",
	"07-18-2024",
	"07-19-2024",
	"07-20-2024",
	"07-21-2024",
	"07-22-2024",
	"07-23-2024",
	"07-27-2024",
	"07-28-2024",
	"07-29-2024",
	"07-30-2024",
	"08-04-2024",
	"08-05-2024",
	"08-06-2024",
  "08-07-2024",
	"08-08-2024",
	"08-09-2024",
	"08-10-2024",
	"08-11-2024",
	"08-12-2024",
	"08-13-2024",
	"08-14-2024",
	"08-15-2024",
	"08-16-2024",
	"08-17-2024",
	"08-18-2024",
	"08-19-2024",
	"08-20-2024",
	"08-25-2024",
	"08-26-2024",
	"08-27-2024",
	"09-01-2024",
	"09-02-2024",
	"09-03-2024",
	"09-08-2024",
	"09-09-2024",
	"09-10-2024",
	"09-11-2024",
	"09-12-2024",
	"09-13-2024",
	"09-14-2024",
	"09-15-2024",
	"09-16-2024",
	"09-17-2024",
	"09-18-2024",
	"09-19-2024",
	"09-20-2024",
	"09-21-2024",
	"09-22-2024",
	"09-23-2024",
	"09-24-2024",
	"09-25-2024",
	"09-26-2024",
	"09-27-2024",
	"09-28-2024",
	"09-29-2024",
	"09-30-2024",
	"10-01-2024",
	"10-04-2024",
	"10-05-2024",
	"10-06-2024",
	"10-07-2024",
	"10-08-2024",
	"10-13-2024",
	"10-14-2024",
	"10-15-2024",
	"10-16-2024",
	"10-17-2024",
	"10-18-2024",
	"10-19-2024",
	"10-20-2024",
	"10-21-2024",
	"10-22-2024",
	"10-27-2024",
	"10-28-2024",
	"10-29-2024",
	"11-03-2024",
	"11-04-2024",
	"11-05-2024",
	"11-10-2024",
	"11-11-2024",
	"11-12-2024",
	"11-17-2024",
	"11-18-2024",
	"11-19-2024",
	"11-24-2024",
	"11-25-2024",
	"11-26-2024",
	"11-28-2024",
	"11-29-2024",
	"12-01-2024",
	"12-02-2024",
	"12-03-2024",
	"12-08-2024",
	"12-09-2024",
	"12-10-2024",
	"12-15-2024",
	"12-16-2024",
	"12-17-2024",
	"12-22-2024",
	"12-23-2024",
	"12-24-2024",
	"12-25-2024",
	"12-26-2024",
	"12-27-2024",
	"12-28-2024",
	"12-29-2024",
	"12-30-2024",
	"12-31-2024",
	"01-01-2025",

	// 2025
"01-02-2025",
"01-03-2025",
"01-05-2025",
"01-06-2025",
"01-07-2025",
"01-12-2025",
"01-13-2025",
"01-14-2025",
"01-19-2025",
"01-20-2025",
"01-21-2025",
"01-26-2025",
"01-27-2025",
"01-28-2025",
"02-02-2025",
"02-03-2025",
"02-04-2025",
"02-09-2025",
"02-10-2025",
"02-11-2025",
"02-16-2025",
"02-17-2025",
"02-18-2025",
"02-23-2025",
"02-24-2025",
"02-25-2025",
"03-01-2025",
"03-02-2025",
"03-03-2025",
"03-04-2025",
"03-09-2025",
"03-10-2025",
"03-11-2025",
"03-16-2025",
"03-17-2025",
"03-18-2025",
"03-23-2025",
"03-24-2025",
"03-25-2025",
"03-30-2025",
"03-31-2025",
"04-01-2025",
"04-06-2025",
"04-07-2025",
"04-08-2025",
"04-13-2025",
"04-14-2025",
"04-15-2025",
"04-20-2025",
"04-21-2025",
"04-22-2025",
"04-27-2025",
"04-28-2025",
"04-29-2025",
"05-04-2025",
"05-05-2025",
"05-06-2025",
"05-11-2025",
"05-12-2025",
"05-13-2025",
"05-18-2025",
"05-19-2025",
"05-20-2025",
"05-25-2025",
"05-26-2025",
"05-27-2025",
"06-01-2025",
"06-02-2025",
"06-03-2025",
"06-05-2025",
"06-06-2025",
"06-07-2025",
"06-08-2025",
"06-09-2025",
"06-10-2025",
"06-15-2025",
"06-16-2025",
"06-17-2025",
"06-22-2025",
"06-23-2025",
"06-24-2025",
"06-29-2025",
"06-30-2025",
"07-01-2025",
"07-06-2025",
"07-07-2025",
"07-08-2025",
"07-13-2025",
"07-14-2025",
"07-15-2025",
"07-20-2025",
"07-21-2025",
"07-22-2025",
"07-27-2025",
"07-28-2025",
"07-29-2025",
"08-03-2025",
"08-04-2025",
"08-05-2025",
"08-10-2025",
"08-11-2025",
"08-12-2025",
"08-17-2025",
"08-18-2025",
"08-19-2025",
"08-24-2025",
"08-25-2025",
"08-26-2025",
"08-31-2025",
"09-01-2025",
"09-02-2025",
"09-07-2025",
"09-08-2025",
"09-09-2025",
"09-14-2025",
"09-15-2025",
"09-16-2025",
"09-21-2025",
"09-22-2025",
"09-23-2025",
"09-28-2025",
"09-29-2025",
"09-30-2025",
"10-05-2025",
"10-06-2025",
"10-07-2025",
"10-12-2025",
"10-13-2025",
"10-14-2025",
"10-19-2025",
"10-20-2025",
"10-21-2025",
"10-26-2025",
"10-27-2025",
"10-28-2025",
"11-01-2025",
"11-02-2025",
"11-03-2025",
"11-04-2025",
"11-09-2025",
"11-10-2025",
"11-11-2025",
"11-16-2025",
"11-17-2025",
"11-18-2025",
"11-23-2025",
"11-24-2025",
"11-25-2025",
"11-27-2025",
"11-28-2025",
"11-30-2025",
"12-01-2025",
"12-02-2025",
"12-07-2025",
"12-08-2025",
"12-09-2025",
"12-14-2025",
"12-15-2025",
"12-16-2025",
"12-21-2025",
"12-22-2025",
"12-23-2025",
"12-24-2025",
"12-25-2025",
"12-26-2025",
"12-27-2025",
"12-28-2025",
"12-29-2025",
"12-30-2025",
"12-31-2025"
];

// const functionsBaseURL: string = "http://localhost:9000/.netlify/functions/";
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
	"90 - 100",
	"100+"
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
	formErrorSet: typeof formErrorSet;
	formDataSet: typeof formDataSet;
	formErrors: IContactFormErrors;
	formData: IContactFormValues;
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


// SAUCE: https://jsfiddle.net/2hmxt03m/2/
const postImgurImage = (data: FormData) => {
	const apiUrl = "https://api.imgur.com/3/image";
	return fetch(apiUrl, {
		headers: { Authorization: "Client-ID 3f60fce07d0722b" },
		method: "POST",
		body: data
	});
};

/**
 * Main contact form component.
 * @returns {JSX.Element}
 * @constructor
 */
const ContactForm: ComponentType<IContactPanel> = (props: IContactPanel): JSX.Element => {
	const [dateWarning, setDateWarning] = useState(true);
	const [pictures, setPictures] = useState<File[]>([]);
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

	// Inject picture file names into component
	useEffect(() => {
		const picsLen = pictures.length;
		if (!picsLen) {
			return;
		}

		const button = document.querySelector(".chooseFileButton ") as HTMLButtonElement;
		if (picsLen >= 3) {
			button.style.backgroundColor = "#828ca0";
			button.disabled = true;
		} else {
			button.style.backgroundColor = "#4d76cc";
			button.disabled = false;
		}

		const imgErrEl = document.querySelector(".errorsContainer");
		if (!imgErrEl) {
			return;
		}

		const namesContainer = document.getElementById("namesContainer");
		if (!namesContainer) {
			imgErrEl.insertAdjacentHTML("afterend", `<div id="namesContainer"></div>`);
		}

		const container = document.getElementById("namesContainer");
		if (container) {
			container.innerHTML = pictures.map(picFile => {
				return `<p>${picFile.name}</p>`;
			}).join("");
		}
	}, [pictures]);

	const onImageDrop = (files: File[], pics: string[]) => {
		setPictures(files);
	};

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

		let imageLinks: string[] = [];
		return fetch(tokenURL)
			.then(async (res) => {
				if (res.status === 401) {
					const body = await res.text();
					throw Error(body);
				}

				return res.json();
			}).then(({ token }) => {
				const reqs = pictures.map(file => {
					const formData = new FormData();
					formData.append("image", file);
					return postImgurImage(formData);
				});

				return Promise.all(reqs).then(async (responses) => {
					for (const res of responses) {
						const json = await res.json();
						const { link } = json.data as ImgurData;
						imageLinks = [...imageLinks, link];
					}

					return token;
				});
			}).then((token) => {
				return fetch(emailURL, {
					method: "POST",
					body: JSON.stringify({
						...props.formData,
						imageLinks,
						token
					})
				});
			}).then(() => {
				setLoading(false);
				setSuccess(false);
				imageLinks = [];
				props.formDataSet(initialFormValues);
			}).catch(err => {
				Sentry.captureException(err);
				console.error(err);
				setLoading(false);
				setError(false);
			});
	};

	const picker = () =>
		// @ts-ignore
		<DateInput readonly={true} style={{ marginTop: 0 }}
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
					href="https://www.facebook.com/sprinkleallthethings/"
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
						id="nameInput"
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
						id="emailInput"
						placeholder="mary@example.com"
						error={props.formErrors.emailError}
					/>
					<Form.Input
						fluid={true}
						name="phone"
						value={props.formData.phone}
						onChange={handleInputChange}
						label="Phone*"
						id="phoneInput"
						placeholder="555-555-5555"
						error={props.formErrors.phoneError}
					/>
					<Form.Input
						fluid={true}
						name="zip"
						value={props.formData.zip}
						onChange={handleInputChange}
						label="Event Zip Code*"
						id="zipInput"
						placeholder="29045"
						error={props.formErrors.zipError}
					/>
					<Form.Dropdown
						name="people"
						value={props.formData.people}
						onChange={handleInputChange}
						label="Number of People*"
						id="headCountInput"
						placeholder="Head Count"
						selection={true}
						options={numberOfPeopleOptions}
						error={props.formErrors.peopleError}
					/>
					<Form.Field>
						<label>
							Event Date*
							<br />
							<br />
							<p style={{ fontSize: ".75rem", fontStyle: "italic" }}>
								{/*	NOTE:*/}
								{/*	<br />*/}
								{/*	<br />*/}
								{/*	MBC will be out on maternity leave mid Jan-April 1st. Keep an eye out on our social media for regular*/}
								{/*	updates and flash sales.*/}
								{/*	<br />*/}
								{/*	<br />*/}
								*Blocked out dates on the calendar are fully booked/not available*
							</p>
							{picker()}
						</label>
					</Form.Field>
					<Form.Group grouped={true}>
						<label>
							Gluten Free?
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
						</label>
					</Form.Group>

					<br />
					<Form.Group grouped={true}>
						<label>
							{/*TODO: Ref this el and inject text previews of files*/}
							Reference Photos?
							<ImageUploader
								label={"Max images 3 (size: 5mb): .jpg, .gif, .png, .webp"}
								imgExtension={[".jpg", ".jpeg", ".png", ".webp"]}
								onChange={onImageDrop}
								maxFileSize={5242880}
								withPreview={false}
								withIcon={false}
							/>
						</label>
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
						id="messageInput"
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
const ContactPanel: ComponentType<ISectionProps> = ({ bgImage }) => (
	<BackgroundImage id="contact" fluid={bgImage} Tag="section">
		<ContactFormLoaded />
	</BackgroundImage>
);

export default ContactPanel;
