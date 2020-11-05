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


// const _BLACK_OUT_2019 = [
// 	"07-05-2019",
// 	"07-06-2019",
// 	"07-07-2019",
// 	"07-13-2019",
// 	"07-22-2019",
// 	"07-27-2019",
//
// 	"08-17-2019",
// 	"08-18-2019",
//
// 	"08-20-2019",
// 	"08-21-2019",
// 	"08-22-2019",
// 	"08-23-2019",
// 	"08-24-2019",
// 	"08-25-2019",
//
// 	"09-01-2019",
// 	"09-10-2019",
// 	"09-11-2019",
// 	"09-12-2019",
// 	"09-13-2019",
// 	"09-14-2019",
// 	"09-15-2019",
// 	"09-16-2019",
// 	"09-18-2019",
// 	"09-19-2019",
// 	"09-20-2019",
// 	"09-21-2019",
// 	"09-22-2019",
//
// 	"10-12-2019",
// 	"10-13-2019",
// 	"10-15-2019",
// 	"10-16-2019",
// 	"10-17-2019",
// 	"10-18-2019",
// 	"10-19-2019",
// 	"10-20-2019",
// 	"10-21-2019",
// 	"10-22-2019",
// 	"10-23-2019",
// 	"10-24-2019",
// 	"10-25-2019",
// 	"10-26-2019",
// 	"10-27-2019",
// 	"10-28-2019",
// 	"10-29-2019",
// 	"10-30-2019",
// 	"10-31-2019",
//
// 	"11-07-2019",
// 	"11-08-2019",
// 	"11-09-2019",
// 	"11-10-2019",
// 	"11-11-2019",
// 	"11-12-2019",
// 	"11-13-2019",
// 	"11-14-2019",
// 	"11-15-2019",
// 	"11-16-2019",
// 	"11-17-2019",
//
// 	"11-24-2019",
// 	"11-25-2019",
// 	"11-26-2019",
// 	"11-27-2019",
// 	"11-28-2019",
// 	"11-29-2019",
// 	"11-30-2019",
//
// 	"12-01-2019",
// 	"12-02-2019",
//
// 	"12-13-2019",
// 	"12-14-2019",
// 	"12-15-2019",
// 	"12-16-2019",
// 	"12-17-2019",
// 	"12-18-2019",
// 	"12-19-2019",
// 	"12-20-2019",
// 	"12-21-2019",
// 	"12-22-2019",
// 	"12-23-2019",
// 	"12-24-2019",
// 	"12-25-2019",
// 	"12-26-2019",
// 	"12-27-2019",
// 	"12-28-2019",
// 	"12-29-2019",
//
// 	"10-14-2019",
// 	"10-21-2019",
// 	"10-28-2019",
// 	"11-04-2019",
// 	"11-11-2019",
// 	"11-18-2019",
// 	"11-25-2019",
// 	"12-02-2019",
// 	"12-09-2019",
// 	"12-14-2019",
// 	"12-16-2019",
// 	"12-23-2019",
// 	"12-30-2019"
// ];

// FIXME: WARNING
//   We have to leave at least one day of the month unblocked or semantic-ui-calendar-react throws an error.
//   Issue filed here: https://github.com/arfedulov/semantic-ui-calendar-react/issues/202
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

	// "5-01-2020",
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
	"5-19-2020",
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
	"6-09-2020",
	"6-10-2020",
	"6-11-2020",
	"6-12-2020",
	"6-13-2020",
	"6-14-2020",
	"6-15-2020",
	"6-16-2020",
	"6-17-2020",
	"6-18-2020",
	"6-19-2020",
	"6-20-2020",
	"6-21-2020",
	"6-22-2020",
	"6-23-2020",
	"6-24-2020",
	"6-25-2020",
	"6-26-2020",
	"6-27-2020",
	"6-28-2020",
	"6-29-2020",
	"6-30-2020",

	"7-1-2020",
	"7-2-2020",
	"7-3-2020",
	"7-4-2020",
	"7-5-2020",
	"7-6-2020",
	"7-7-2020",
	"7-9-2020",
	"7-10-2020",
	"7-11-2020",
	"7-12-2020",
	"7-13-2020",
	"7-14-2020",
	"7-15-2020",
	"7-16-2020",
	"7-17-2020",
	"7-18-2020",
	"7-19-2020",
	"7-20-2020",
	"7-25-2020",
	"7-31-2020",

	"8-1-2020",
	"8-29-2020",
	"8-30-2020",

	"9-4-2020",
	"9-5-2020",
	"9-6-2020",
	"9-7-2020",
	"9-18-2020",
	"9-19-2020",
	"9-20-2020",

	// 2020 Sunday Blocks
	"6-7-2020",
	"6-14-2020",
	"6-21-2020",
	"6-28-2020",
	"7-5-2020",
	"7-12-2020",
	"7-19-2020",
	"7-20-2020",
	"7-21-2020",
	"7-22-2020",
	"7-23-2020",
	"7-24-2020",
	"7-25-2020",
	"7-26-2020",
	"7-27-2020",
	"7-28-2020",
	"7-29-2020",
	"7-30-2020",
	"7-31-2020",

	"8-1-2020",
	"8-2-2020",
	"8-3-2020",
	"8-4-2020",
	"8-5-2020",
	"8-6-2020",
	"8-7-2020",
	"8-8-2020",
	"8-9-2020",
	"8-10-2020",
	"8-11-2020",
	"8-12-2020",
	"8-13-2020",
	"8-14-2020",
	"8-15-2020",
	"8-16-2020",
	"8-18-2020",
	"8-19-2020",
	"8-20-2020",
	"8-21-2020",
	"8-22-2020",
	"8-23-2020",
	"8-24-2020",
	// "8-25-2020", // Prevent calendar component from breaking
	"8-26-2020",
	"8-27-2020",
	"8-28-2020",
	"8-30-2020",

	"9-01-2020",
	"9-02-2020",
	"9-03-2020",
	"9-04-2020",
	"9-05-2020",
	"9-06-2020",
	"9-07-2020",
	"9-08-2020",
	"9-09-2020",
	"9-10-2020",
	"9-11-2020",
	"9-12-2020",
	"9-13-2020",
	"9-14-2020",
	"9-15-2020",
	"9-16-2020",
	"9-17-2020",
	"9-18-2020",
	"9-19-2020",
	"9-20-2020",
	"9-21-2020",
	"9-22-2020",
	"9-23-2020",
	"9-24-2020",
	"9-25-2020",
	"9-26-2020",
	"9-27-2020",

	"10-01-2020",
	"10-02-2020",
	"10-03-2020",
	"10-04-2020",
	"10-10-2020",
	"10-11-2020",
	"10-12-2020",
	"10-13-2020",
	"10-14-2020",
	"10-15-2020",
	"10-16-2020",
	"10-17-2020",
	"10-18-2020",
	"10-19-2020",
	"10-20-2020",
	"10-21-2020",
	"10-22-2020",
	"10-23-2020",
	"10-24-2020",
	"10-25-2020",
	"10-26-2020",
	"10-27-2020",
	"10-28-2020",
	"10-29-2020",
	"10-30-2020",
	"10-31-2020",

	"11-01-2020",
	"11-02-2020",
	"11-03-2020",
	"11-04-2020",
	"11-05-2020",
	"11-06-2020",
	"11-07-2020",
	"11-08-2020",
	"11-12-2020",
	"11-13-2020",
	"11-14-2020",
	"11-15-2020",
	"11-20-2020",
	"11-22-2020",
	"11-26-2020",
	"11-27-2020",
	"11-29-2020",
	"12-06-2020",
	"12-13-2020",
	"12-20-2020",
	"12-24-2020",
	"12-25-2020",
	"12-26-2020",
	"12-27-2020",

	// 2021
	"1-3-2021",
	"1-4-2021",
	"1-5-2021",
	"1-6-2021",
	"1-7-2021",
	"1-8-2021",
	"7-31-2021",

	// 2020 Sunday/Monday Blocks
	"1-3-2021",
	"1-4-2021",
	"1-10-2021",
	"1-11-2021",
	"1-17-2021",
	"1-18-2021",
	"1-24-2021",
	"1-25-2021",
	"1-31-2021",
	"2-1-2021",
	"2-7-2021",
	"2-8-2021",
	"2-14-2021",
	"2-15-2021",
	"2-21-2021",
	"2-22-2021",
	"2-28-2021",
	"3-1-2021",
	"3-7-2021",
	"3-8-2021",
	"3-14-2021",
	"3-15-2021",
	"3-21-2021",
	"3-22-2021",
	"3-28-2021",
	"3-29-2021",
	"4-4-2021",
	"4-5-2021",
	"4-11-2021",
	"4-12-2021",
	"4-18-2021",
	"4-19-2021",
	"4-25-2021",
	"4-26-2021",
	"5-2-2021",
	"5-3-2021",
	"5-9-2021",
	"5-10-2021",
	"5-16-2021",
	"5-17-2021",
	"5-23-2021",
	"5-24-2021",
	"5-30-2021",
	"5-31-2021",
	"6-6-2021",
	"6-7-2021",
	"6-13-2021",
	"6-14-2021",
	"6-20-2021",
	"6-21-2021",
	"6-27-2021",
	"6-28-2021",
	"7-4-2021",
	"7-5-2021",
	"7-11-2021",
	"7-12-2021",
	"7-18-2021",
	"7-19-2021",
	"7-25-2021",
	"7-26-2021",
	"8-1-2021",
	"8-2-2021",
	"8-8-2021",
	"8-9-2021",
	"8-15-2021",
	"8-16-2021",
	"8-22-2021",
	"8-23-2021",
	"8-29-2021",
	"8-30-2021",
	"9-5-2021",
	"9-6-2021",
	"9-12-2021",
	"9-13-2021",
	"9-19-2021",
	"9-20-2021",
	"9-26-2021",
	"9-27-2021",
	"10-3-2021",
	"10-4-2021",
	"10-10-2021",
	"10-11-2021",
	"10-17-2021",
	"10-18-2021",
	"10-24-2021",
	"10-25-2021",
	"10-31-2021",
	"11-1-2021",
	"11-7-2021",
	"11-8-2021",
	"11-14-2021",
	"11-15-2021",
	"11-21-2021",
	"11-22-2021",
	"11-28-2021",
	"11-29-2021",
	"12-5-2021",
	"12-6-2021",
	"12-12-2021",
	"12-13-2021",
	"12-19-2021",
	"12-20-2021",
	"12-26-2021",
	"12-27-2021",


	// 2020 Sunday/Monday Blocks
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
	"10-05-2020",
	"10-06-2020",
	"10-07-2020",
	"10-08-2020",
	"10-09-2020",
	"10-10-2020",
	"10-11-2020",
	"10-12-2020",
	"10-13-2020",
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
							<span style={{ fontSize: ".6rem", fontStyle: "italic" }}>
								*Blocked out dates on the calendar are already booked*
							</span>
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
