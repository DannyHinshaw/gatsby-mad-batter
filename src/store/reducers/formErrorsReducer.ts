import { IContactFormErrorsAction } from "../actions";
import { FORM_DATA_ERRORS_SET } from "../actions/types";
import { createReducer } from "../util";


export interface IContactFormErrors {
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

export const initialFormErrors: IContactFormErrors = {
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


const formErrorsSet = (state: IContactFormErrors, action: IContactFormErrorsAction): IContactFormErrors =>
	action.payload;

/**
 * Main reducer mapping.
 */
export default createReducer(initialFormErrors, {
	[FORM_DATA_ERRORS_SET]: formErrorsSet
});

