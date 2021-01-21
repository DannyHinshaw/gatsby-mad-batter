import { IContactFormValuesAction } from "../actions";
import { FORM_DATA_VALUES_SET } from "../actions/types";
import { createReducer } from "../util";


export interface IContactFormValues {
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

export const initialFormValues: IContactFormValues = {
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


const formDataSet = (state: IContactFormValues, action: IContactFormValuesAction): IContactFormValues =>
	action.payload;

/**
 * Main reducer mapping.
 */
export default createReducer(initialFormValues, {
	[FORM_DATA_VALUES_SET]: formDataSet
});

