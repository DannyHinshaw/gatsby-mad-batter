import { action } from "typesafe-actions";
import { IContactFormValues } from "../reducers/formDataReducer";
import { IContactFormErrors } from "../reducers/formErrorsReducer";
import * as actionTypes from "./types";


/*                      Define TypeSafe Actions
 ===================================================================== */


export interface IActionBase {
	type: string
}

export interface IContactFormValuesAction extends IActionBase {
	payload: IContactFormValues
}

export interface IContactFormErrorsAction extends IActionBase {
	payload: IContactFormErrors
}


/*      Form Data
 ======================= */

export const formDataSet = (payload: IContactFormValues): IContactFormValuesAction =>
	action(actionTypes.FORM_DATA_VALUES_SET, payload);

export const formErrorSet = (payload: IContactFormErrors): IContactFormErrorsAction =>
	action(actionTypes.FORM_DATA_ERRORS_SET, payload);

