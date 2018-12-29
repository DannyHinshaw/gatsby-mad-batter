import { ErrorMessage, Field, Form, Formik, FormikActions } from "formik";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import * as Yup from "yup";
import ParallaxPanel from "../ParallaxPanel";
import "./ContactPanel.scss";

export type StateSetter = Dispatch<SetStateAction<any>>;
const functionsBaseURL: string = "https://madbatterbake.com/.netlify/functions/";
const tokenURL: string = functionsBaseURL.concat("token");
const emailURL: string = functionsBaseURL.concat("email");

interface IContactFormValues {
	date: string
	name: string
	email: string
	phone: string
	people: string
	subject: string
	message: string
}

const REQUIRED = "Required*";
const initialValues: IContactFormValues = {
	date: "",
	name: "",
	email: "",
	phone: "",
	people: "",
	subject: "",
	message: ""
};

const validationSchema = Yup.object().shape({
	date: Yup.string()
		.required(REQUIRED),
	name: Yup.string()
		.test("len", "Name must be at least one letter", s => s && s.length)
		.required(REQUIRED),
	email: Yup.string()
		.email()
		.required(REQUIRED),
	phone: Yup.string()
		.required(REQUIRED),
	people: Yup.string()
		.required(REQUIRED),
	subject: Yup.string()
		.required(REQUIRED),
	message: Yup.string()
		.required(REQUIRED)
});

const numberOfPeopleOptions: string[] = [
	"1 - 10",
	"10 - 20",
	"20 - 30",
	"40 - 50",
	"50 - 60",
	"60 - 70",
	"70 - 80",
	"80 - 90",
	"90 - 100"
];

/**
 * Wrapper for extracting input element values.
 * @param {Event} e
 * @returns {string | undefined}
 */
export const getInputVal = (e: Event): string | undefined => {
	const target = e.target as HTMLInputElement;
	return target && target.value;
};

/**
 * Util function to handle form input changes.
 * @param {React.Dispatch<React.SetStateAction<string>>} updateFunc
 * @returns {(e: Event) => "" | void}
 */
export const handleFormInputChange = (updateFunc: StateSetter) => (e: Event) => {
	const input: string | undefined = getInputVal(e);
	return input && updateFunc(input);
};

/**
 * Main contact form component.
 * @returns {JSX.Element}
 * @constructor
 */
const ContactPanel = (): JSX.Element => {

	// Form submission
	const submit = (values: IContactFormValues, actions: FormikActions<IContactFormValues>) => {
		actions.setSubmitting(true);
		return fetch(tokenURL)
			.then(res => res.json())
			.then(({ token }) => {
				console.log("TOKEN::RESPONSE::data::", token);
				return fetch(emailURL, {
					method: "POST",
					body: JSON.stringify({ token, ...values })
				});
			})
			.then((data) => {
				console.log("EMAIL::RESPONSE::data::", data);
				actions.setSubmitting(false);
			})
			.catch(err => {
				console.error(err);
				actions.setSubmitting(false);
				// actions.setErrors(transformMyRestApiErrorsToAnObject(error));
				actions.setStatus({ msg: "An error occurred while sending message." });
			});
		// MyImaginaryRestApiCall(user.id, values).then(
		// 	updatedUser => {
		// 		actions.setSubmitting(false);
		// 	},
		// 	error => {
		// 		actions.setSubmitting(false);
		// 		actions.setErrors(transformMyRestApiErrorsToAnObject(error));
		// 		actions.setStatus({ msg: "Set some arbitrary status or data" });
		// 	}
		// );
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
						target="_blank"
						title="Instagram"
					>
						<FaFacebook className="social" />
					</a>
					<a
						href="https://www.instagram.com/sprinkleallthethings/"
						target="_blank"
						title="Instagram"
					>
						<FaInstagram className="social" />
					</a>
				</div>

				<div id="contactFormContainer">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={submit}
						render={({ errors, status, touched, isSubmitting }) => (
							<Form>
								<h3 style={{ textAlign: "center" }}>
									Message
								</h3>

								<label htmlFor="name">Name</label>
								<Field type="text" name="name" placeholder="Mary Jane" />
								<ErrorMessage className="error" name="name" component="div" />

								<label htmlFor="email">Email</label>
								<Field type="email" name="email" placeholder="mary@example.com" />
								<ErrorMessage className="error" name="email" component="div" />

								<label htmlFor="phone">Phone</label>
								<Field type="phone" name="phone" placeholder="555-555-5555" />
								<ErrorMessage className="error" name="phone" component="div" />

								<label htmlFor="people">Number of People</label>
								<Field name="people" component="select" placeholder="Number of people">
									{numberOfPeopleOptions.map((val: string, i: number) => (
										<option key={val} value={val}>{val}</option>
									))}
								</Field>
								<ErrorMessage className="error" name="people" component="div" />

								<label htmlFor="date">Event Date</label>
								<Field type="date" name="date" placeholder="" />
								<ErrorMessage className="error" name="date" component="div" />

								<label htmlFor="subject">Subject</label>
								<Field type="text" name="subject" placeholder="Ex. Birthday Cake!" />
								<ErrorMessage className="error" name="subject" component="div" />

								<label htmlFor="message">Message</label>
								<Field component="textarea" type="text" name="message" rows="5" />
								<ErrorMessage className="error" name="message" component="div" />

								{status && status.msg && <div>{status.msg}</div>}

								<div style={{ textAlign: "center" }}>
									<button type="submit" disabled={isSubmitting}>
										Submit
									</button>
								</div>
							</Form>
						)}
					/>
				</div>
			</div>
		</ParallaxPanel>
	);
};

export default ContactPanel;

/*
<FormField label="Name" htmlFor="input-name">
  <FormInput
    autoFocus={true}
    onChange={handleSetName}
    type="name"
    placeholder="Enter name"
    name="input-name" />
</FormField>
<FormField label="Email address" htmlFor="input-email">
  <FormInput onChange={handleSetEmail} type="email" placeholder="Enter email" name="input-email" />
</FormField>
<FormSelect options={[
  { label: "1 - 10", value: "1 - 10" },
  { label: "10 - 20", value: "10 - 20" },
  { label: "20 - 30", value: "20 - 30" },
  { label: "40 - 50", value: "40 - 50" },
  { label: "50 - 60", value: "50 - 60" },
  { label: "60 - 70", value: "60 - 70" },
  { label: "70 - 80", value: "70 - 80" },
  { label: "80 - 90", value: "80 - 90" },
  { label: "90 - 100", value: "90 - 100" }
]} firstOption="Select" onChange={setPeople} />

<Button submit={true}>Submit</Button>
*/
