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

	// 2021
	// "1-1-2021",
	// "1-2-2021",
	// "1-3-2021",
	// "1-4-2021",
	// "1-5-2021",
	// "1-6-2021",
	// "1-7-2021",
	// "1-8-2021",
	// "1-9-2021",
	// "1-19-2021",
	// "1-20-2021",
	// "1-21-2021",
	// "1-22-2021",
	// "1-23-2021",
	// "1-26-2021",
	// "1-27-2021",
	// "1-28-2021",
	// "1-29-2021",
	// "1-30-2021",
	// "3-25-2021",
	// "3-26-2021",
	// "3-27-2021",
	// "4-16-2021",
	// "1-3-2021",
	// "1-4-2021",
	// "1-10-2021",
	// "1-11-2021",
	// "1-12-2021",
	// "1-13-2021",
	// "1-14-2021",
	// "1-15-2021",
	// "1-16-2021",
	// "1-17-2021",
	// "1-18-2021",
	// "1-19-2021",
	// "1-24-2021",
	// "1-25-2021",
	// "1-27-2021",
	// "1-31-2021",
	// "2-1-2021",
	// "2-2-2021",
	// "2-3-2021",
	// "2-4-2021",
	// "2-5-2021",
	// "2-6-2021",
	// "2-7-2021",
	// "2-8-2021",
	// "2-9-2021",
	// "2-10-2021",
	// "2-11-2021",
	// "2-12-2021",
	// "2-13-2021",
	// "2-14-2021",
	// "2-15-2021",
	// "2-16-2021",
	// "2-17-2021",
	// "2-18-2021",
	// "2-19-2021",
	// "2-20-2021",
	// "2-21-2021",
	// "2-22-2021",
	// "2-23-2021",
	// "2-24-2021",
	// "2-25-2021",
	// "2-26-2021",
	// "2-27-2021",
	// "2-28-2021",
	// "3-1-2021",
	// "3-2-2021",
	// "3-3-2021",
	// "3-4-2021",
	// "3-5-2021",
	// "3-6-2021",
	// "3-7-2021",
	// "3-8-2021",
	// "3-9-2021",
	// "3-10-2021",
	// "3-11-2021",
	// "3-12-2021",
	// "3-13-2021",
	// "3-14-2021",
	// "3-15-2021",
	// "3-16-2021",
	// "3-17-2021",
	// "3-18-2021",
	// "3-19-2021",
	// "3-20-2021",
	// "3-21-2021",
	// "3-22-2021",
	// "3-23-2021",
	// "3-24-2021",
	// "3-28-2021",
	// "3-29-2021",
	// "3-30-2021",
	// "3-31-2021",
	// "4-1-2021",
	// "4-2-2021",
	// "4-3-2021",
	// "4-4-2021",
	// "4-5-2021",
	// "4-6-2021",
	// "4-7-2021",
	// "4-8-2021",
	// "4-9-2021",
	// "4-10-2021",
	// "4-11-2021",
	// "4-12-2021",
	// "4-13-2021",
	// "4-14-2021",
	// "4-15-2021",
	// "4-17-2021",
	// "4-18-2021",
	// "4-19-2021",
	// "4-20-2021",
	// "4-21-2021",
	// "4-22-2021",
	// "4-23-2021",
	// "4-24-2021",
	// "4-25-2021",
	// "4-26-2021",
	// "4-27-2021",
	// "4-28-2021",
	// "4-29-2021",
	// "4-30-2021",
	// "5-1-2021",
	// "5-2-2021",
	// "5-3-2021",
	// "5-4-2021",
	// "5-5-2021",
	// "5-6-2021",
	// "5-7-2021",
	// "5-8-2021",
	// "5-9-2021",
	// "5-10-2021",
	// "5-11-2021",
	// "5-12-2021",
	// "5-13-2021",
	// "5-14-2021",
	// "5-15-2021",
	// "5-16-2021",
	// "5-17-2021",
	// "5-18-2021",
	// "5-19-2021",
	// "5-20-2021",
	// "5-21-2021",
	// "5-22-2021",
	// "5-23-2021",
	// "5-24-2021",
	// "5-25-2021",
	// "5-26-2021",
	// "5-27-2021",
	// "5-28-2021",
	// "5-29-2021",
	// "5-30-2021",
	// "5-31-2021",
	// "6-1-2021",
	// "6-2-2021",
	// "6-3-2021",
	// "6-4-2021",
	// "6-5-2021",
	// "6-6-2021",
	// "6-7-2021",
	// "6-8-2021",
	// "6-9-2021",
	// "6-10-2021",
	// "6-11-2021",
	// "6-12-2021",
	// "6-13-2021",
	// "6-14-2021",
	// "6-15-2021",
	// "6-16-2021",
	// "6-17-2021",
	// "6-18-2021",
	// "6-19-2021",
	// "6-20-2021",
	// "6-21-2021",
	// "6-22-2021",
	// "6-23-2021",
	// "6-24-2021",
	// "6-25-2021",
	// "6-26-2021",
	// "6-27-2021",
	// "6-28-2021",
	// "6-29-2021",
	// "6-30-2021",
	// "7-1-2021",
	// "7-2-2021",
	// "7-3-2021",
	// "7-4-2021",
	// "7-5-2021",
	// "7-6-2021",
	// "7-7-2021",
	// "7-8-2021",
	// "7-9-2021",
	// "7-10-2021",
	// "7-11-2021",
	// "7-12-2021",
	// "7-13-2021",
	// "7-14-2021",
	// "7-15-2021",
	// "7-16-2021",
	// "7-17-2021",
	// "7-18-2021",
	// "7-19-2021",
	// "7-20-2021",
	// "7-21-2021",
	// "7-22-2021",
	// "7-23-2021",
	// "7-24-2021",
	// "7-25-2021",
	// "7-26-2021",
	// "7-27-2021",
	// "7-28-2021",
	// "7-29-2021",
	// "7-30-2021",
	// "7-31-2021",
	// "8-1-2021",
	// "8-2-2021",
	// "8-3-2021",
	// "8-4-2021",
	// "8-5-2021",
	// "8-6-2021",
	// "8-7-2021",
	// "8-8-2021",
	// "8-9-2021",
	// "8-10-2021",
	// "8-11-2021",
	// "8-12-2021",
	// "8-13-2021",
	// "8-14-2021",
	// "8-15-2021",
	// "8-16-2021",
	// "8-17-2021",
	// "8-18-2021",
	// "8-19-2021",
	// "8-20-2021",
	// "8-21-2021",
	// "8-22-2021",
	// "8-23-2021",
	// "8-24-2021",
	// "8-25-2021",
	// "8-26-2021",
	// "8-27-2021",
	// "8-28-2021",
	// "8-29-2021",
	// "8-30-2021",
	// "8-31-2021",
	// "9-1-2021",
	// "9-2-2021",
	// "9-3-2021",
	// "9-4-2021",
	// "9-5-2021",
	// "9-6-2021",
	// "9-7-2021",
	// "9-8-2021",
	// "9-9-2021",
	// "9-10-2021",
	// "9-11-2021",
	// "9-12-2021",
	// "9-13-2021",
	// "9-14-2021",
	// "9-15-2021",
	// "9-16-2021",
	// "9-17-2021",
	// "9-18-2021",
	// "9-19-2021",
	// "9-20-2021",
	// "9-21-2021",
	// "9-22-2021",
	// "9-23-2021",
	// "9-24-2021",
	// "9-25-2021",
	// "9-26-2021",
	// "9-27-2021",
	// "9-28-2021",
	// "9-29-2021",
	// "9-30-2021",
	// "10-1-2021",
	// "10-2-2021",
	// "10-3-2021",
	// "10-4-2021",
	// "10-5-2021",
	// "10-6-2021",
	// "10-7-2021",
	// "10-8-2021",
	// "10-9-2021",
	// "10-10-2021",
	// "10-11-2021",
	// "10-12-2021",
	// "10-13-2021",
	// "10-14-2021",
	// "10-15-2021",
	// "10-16-2021",
	// "10-17-2021",
	// "10-18-2021",
	// "10-19-2021",
	// "10-20-2021",
	// "10-21-2021",
	// "10-22-2021",
	// "10-23-2021",
	// "10-24-2021",
	// "10-25-2021",
	// "10-26-2021",
	// "10-27-2021",
	// "10-28-2021",
	// "10-29-2021",
	// "10-30-2021",
	// "10-31-2021",
	// "11-1-2021",
	// "11-2-2021",
	// "11-3-2021",
	// "11-4-2021",
	// "11-5-2021",
	// "11-6-2021",
	// "11-7-2021",
	// "11-8-2021",
	// "11-12-2021",
	// "11-13-2021",
	// "11-14-2021",
	// "11-15-2021",
	// "11-16-2021",
	// "11-17-2021",
	// "11-18-2021",
	// "11-19-2021",
	// "11-20-2021",
	// "11-21-2021",
	// "11-22-2021",
	// "11-23-2021",
	// "11-24-2021",
	// "11-25-2021",
	// "11-26-2021",
	// "11-27-2021",
	// "11-28-2021",
	// "11-29-2021",
	// "12-1-2021",
	// "12-2-2021",
	// "12-3-2021",
	// "12-4-2021",
	// "12-5-2021",
	// "12-6-2021",
	// "12-7-2021",
	// "12-8-2021",
	// "12-9-2021",
	// "12-10-2021",
	// "12-11-2021",
	// "12-12-2021",
	// "12-13-2021",
	// "12-14-2021",
	// "12-15-2021",
	// "12-16-2021",
	// "12-17-2021",
	// "12-18-2021",
	// "12-19-2021",
	// "12-20-2021",
	// "12-21-2021",
	// "12-22-2021",
	// "12-23-2021",
	// "12-24-2021",
	// "12-25-2021",
	// "12-26-2021",
	// "12-27-2021",
	// "12-28-2021",
	// "12-29-2021",
	// "12-30-2021",
	// "12-31-2021",

	// 2022 Sunday/Monday/Tuesday Blocks
	"1-2-2022",
	"1-3-2022",
	"1-9-2022",
	"1-10-2022",
	"1-16-2022",
	"1-17-2022",
	"1-23-2022",
	"1-24-2022",
	"1-30-2022",
	"1-31-2022",
	"2-6-2022",
	"2-7-2022",
	"2-13-2022",
	"2-14-2022",
	"2-20-2022",
	"2-21-2022",
	"2-27-2022",
	"2-28-2022",
	"3-6-2022",
	"3-7-2022",
	"3-13-2022",
	"3-14-2022",
	"3-20-2022",
	"3-21-2022",
	"3-27-2022",
	"3-28-2022",
	"4-3-2022",
	"4-4-2022",
	"4-10-2022",
	"4-11-2022",
	"4-17-2022",
	"4-18-2022",
	"4-24-2022",
	"4-25-2022",
	"5-1-2022",
	"5-2-2022",
	"5-8-2022",
	"5-9-2022",
	"5-15-2022",
	"5-16-2022",
	"5-22-2022",
	"5-23-2022",
	"5-29-2022",
	"5-30-2022",
	"5-31-2022",
	"6-1-2022",
	"6-2-2022",
	"6-3-2022",
	"6-4-2022",
	"6-5-2022",
	"6-6-2022",
	"6-7-2022",
	"6-10-2022",
	"6-11-2022",
	"6-12-2022",
	"6-13-2022",
	"6-14-2022",
	"6-15-2022",
	"6-16-2022",
	"6-19-2022",
	"6-20-2022",
	"6-21-2022",
	"6-26-2022",
	"6-27-2022",
	"6-28-2022",
	"7-3-2022",
	"7-4-2022",
	"7-10-2022",
	"7-11-2022",
	"7-12-2022",
	"7-17-2022",
	"7-18-2022",
	"7-19-2022",
	"7-24-2022",
	"7-25-2022",
	"7-26-2022",
	"7-31-2022",
	"8-1-2022",
	"8-2-2022",
	"8-7-2022",
	"8-8-2022",
	"8-9-2022",
	"8-14-2022",
	"8-15-2022",
	"8-16-2022",
	"8-17-2022",
	"8-21-2022",
	"8-22-2022",
	"8-23-2022",
	"8-28-2022",
	"8-29-2022",
	"8-30-2022",
	"9-3-2022",
	"9-4-2022",
	"9-5-2022",
	"9-6-2022",
	"9-10-2022",
	"9-11-2022",
	"9-12-2022",
	"9-13-2022",
	"9-18-2022",
	"9-19-2022",
	"9-20-2022",
	"9-26-2022",
	"9-27-2022",
	"10-2-2022",
	"10-3-2022",
	"10-4-2022",
	"10-9-2022",
	"10-10-2022",
	"10-11-2022",
	"10-16-2022",
	"10-17-2022",
	"10-18-2022",
	"10-23-2022",
	"10-24-2022",
	"10-25-2022",
	"10-30-2022",
	"10-31-2022",
	"11-1-2022",
	"11-6-2022",
	"11-7-2022",
	"11-8-2022",
	"11-13-2022",
	"11-14-2022",
	"11-15-2022",
	"11-20-2022",
	"11-21-2022",
	"11-22-2022",
	"11-27-2022",
	"11-28-2022",
	"11-29-2022",
	"12-4-2022",
	"12-5-2022",
	"12-6-2022",
	"12-11-2022",
	"12-12-2022",
	"12-13-2022",
	"12-18-2022",
	"12-19-2022",
	"12-20-2022",
	"12-25-2022",
	"12-26-2022",
	"12-27-2022",

	// 2022
	"1-1-2022",
	"1-4-2022",
	"1-5-2022",
	"1-6-2022",
	"1-7-2022",
	"1-8-2022",
	"1-9-2022",
	"1-10-2022",
	"1-11-2022",
	"1-12-2022",
	"1-13-2022",
	"1-14-2022",
	"1-15-2022",
	"1-16-2022",
	"1-17-2022",
	"1-18-2022",

	// 2022 PREGGERS SCHEDULE
	"1-19-2022",
	"1-20-2022",
	"1-21-2022",
	"1-22-2022",
	"1-23-2022",
	"1-24-2022",
	"1-25-2022",
	"1-26-2022",
	"1-27-2022",
	"1-28-2022",
	"1-29-2022",
	"1-30-2022",
	"1-31-2022",
	"2-1-2022",
	"2-2-2022",
	"2-3-2022",
	"2-4-2022",
	"2-5-2022",
	"2-6-2022",
	"2-7-2022",
	"2-8-2022",
	"2-9-2022",
	"2-10-2022",
	"2-11-2022",
	"2-12-2022",
	"2-13-2022",
	"2-14-2022",
	"2-15-2022",
	"2-16-2022",
	"2-17-2022",
	"2-18-2022",
	"2-19-2022",
	"2-20-2022",
	"2-21-2022",
	"2-22-2022",
	"2-23-2022",
	"2-24-2022",
	"2-25-2022",
	"2-26-2022",
	"2-27-2022",
	"2-28-2022",
	"3-1-2022",
	"3-2-2022",
	"3-3-2022",
	"3-4-2022",
	"3-5-2022",
	"3-6-2022",
	"3-7-2022",
	"3-8-2022",
	"3-9-2022",
	"3-10-2022",
	"3-11-2022",
	"3-12-2022",
	"3-13-2022",
	"3-14-2022",
	"3-15-2022",
	"3-16-2022",
	"3-17-2022",
	"3-18-2022",
	"3-19-2022",
	"3-20-2022",
	"3-21-2022",
	"3-22-2022",
	"3-23-2022",
	"3-24-2022",
	"3-25-2022",
	"3-26-2022",
	"3-27-2022",
	"3-28-2022",
	"3-29-2022",
	"3-30-2022",
	"3-31-2022",
	"4-1-2022",
	"4-2-2022",
	"4-5-2022",
	"4-6-2022",
	"4-7-2022",
	"4-8-2022",
	"4-9-2022",
	"4-12-2022",
	"4-13-2022",
	"4-14-2022",
	"4-15-2022",
	"4-16-2022",
	"4-19-2022",
	"4-20-2022",
	"4-21-2022",
	"4-22-2022",
	"4-23-2022",
	"4-26-2022",
	"4-27-2022",
	"4-28-2022",
	"4-29-2022",
	"4-30-2022",
	"5-1-2022",
	"5-2-2022",
	"5-3-2022",
	"5-4-2022",
	"5-5-2022",
	"5-6-2022",
	"5-7-2022",
	"5-10-2022",
	"5-11-2022",
	"5-12-2022",
	"5-13-2022",
	"5-14-2022",
	"5-15-2022",
	"5-16-2022",
	"5-17-2022",
	"5-18-2022",
	"5-19-2022",
	"5-20-2022",
	"5-21-2022",
	"5-22-2022",
	"5-23-2022",
	"5-24-2022",
	"5-25-2022",
	"5-26-2022",
	"5-27-2022",
	"5-28-2022",
	"5-29-2022",
	"5-30-2022",
	"5-31-2022",
	"6-1-2022",
	"6-2-2022",
	"6-3-2022",
	"6-4-2022",
	"6-5-2022",
	"6-6-2022",
	"6-7-2022",
	"6-8-2022",
	"6-9-2022",
	"6-17-2022",
	"6-18-2022",
	"6-22-2022",
	"6-20-2022",
	"6-21-2022",
	"6-22-2022",
	"6-23-2022",
	"6-24-2022",
	"6-25-2022",
	"6-29-2022",
	"6-30-2022",
	"7-1-2022",
	"7-2-2022",
	"7-5-2022",
	"7-6-2022",
	"7-7-2022",
	"7-8-2022",
	"7-9-2022",
	"7-13-2022",
	"7-14-2022",
	"7-15-2022",
	"7-16-2022",
	"7-17-2022",
	"7-18-2022",
	"7-19-2022",
	"7-20-2022",
	"7-21-2022",
	"7-22-2022",
	"7-23-2022",
	"7-27-2022",
	"7-28-2022",
	"7-29-2022",
	"7-30-2022",
	"8-03-2022",
	"8-04-2022",
	"8-05-2022",
	"8-06-2022",
	"8-10-2022",
	"8-11-2022",
	"8-12-2022",
	"8-13-2022",
	"8-18-2022",
	"8-19-2022",
	"8-20-2022",
	"8-24-2022",
	"8-25-2022",
	"8-26-2022",
	"8-27-2022",
	"8-29-2022",
	"8-30-2022",
	"8-31-2022",
	"9-1-2022",
	"9-2-2022",
	"9-3-2022",
	"9-4-2022",
	"9-5-2022",
	"9-6-2022",
	"9-7-2022",
	"9-8-2022",
	"9-9-2022",
	"9-10-2022",
	"9-11-2022",
	"9-12-2022",
	"9-13-2022",
	"9-14-2022",
	"9-15-2022",
	"9-16-2022",
	"9-17-2022",
	"9-18-2022",
	"9-25-2022",
	"11-24-2022",
	"11-25-2022",
	"12-24-2022",
	"12-25-2022",
	"12-28-2022",
	"12-29-2022",
	"12-30-2022",
	"12-31-2022",
	"01-01-2023",
	"01-02-2023",
	"01-03-2023",

	// 2023 Sundays, Monday, Tuesdays
	"01-08-2023",
	"01-09-2023",
	"01-10-2023",
	"01-15-2023",
	"01-16-2023",
	"01-17-2023",
	"01-22-2023",
	"01-23-2023",
	"01-24-2023",
	"01-29-2023",
	"01-30-2023",
	"01-31-2023",
	"02-05-2023",
	"02-06-2023",
	"02-07-2023",
	"02-12-2023",
	"02-13-2023",
	"02-14-2023",
	"02-19-2023",
	"02-20-2023",
	"02-21-2023",
	"02-26-2023",
	"02-27-2023",
	"02-28-2023",
	"03-05-2023",
	"03-06-2023",
	"03-07-2023",
	"03-12-2023",
	"03-13-2023",
	"03-14-2023",
	"03-19-2023",
	"03-20-2023",
	"03-21-2023",
	"03-26-2023",
	"03-27-2023",
	"03-28-2023",
	"04-02-2023",
	"04-03-2023",
	"04-04-2023",
	"04-09-2023",
	"04-10-2023",
	"04-11-2023",
	"04-16-2023",
	"04-17-2023",
	"04-18-2023",
	"04-23-2023",
	"04-24-2023",
	"04-25-2023",
	"04-30-2023",
	"05-01-2023",
	"05-02-2023",
	"05-07-2023",
	"05-08-2023",
	"05-09-2023",
	"05-14-2023",
	"05-15-2023",
	"05-16-2023",
	"05-21-2023",
	"05-22-2023",
	"05-23-2023",
	"05-28-2023",
	"05-29-2023",
	"05-30-2023",
	"06-04-2023",
	"06-05-2023",
	"06-06-2023",
	"06-11-2023",
	"06-12-2023",
	"06-13-2023",
	"06-18-2023",
	"06-19-2023",
	"06-20-2023",
	"06-25-2023",
	"06-26-2023",
	"06-27-2023",
	"07-02-2023",
	"07-03-2023",
	"07-04-2023",
	"07-09-2023",
	"07-10-2023",
	"07-11-2023",
	"07-16-2023",
	"07-17-2023",
	"07-18-2023",
	"07-23-2023",
	"07-24-2023",
	"07-25-2023",
	"07-30-2023",
	"07-31-2023",
	"08-01-2023",
	"08-06-2023",
	"08-07-2023",
	"08-08-2023",
	"08-13-2023",
	"08-14-2023",
	"08-15-2023",
	"08-20-2023",
	"08-21-2023",
	"08-22-2023",
	"08-27-2023",
	"08-28-2023",
	"08-29-2023",
	"09-03-2023",
	"09-04-2023",
	"09-05-2023",
	"09-10-2023",
	"09-11-2023",
	"09-12-2023",
	"09-17-2023",
	"09-18-2023",
	"09-19-2023",
	"09-24-2023",
	"09-25-2023",
	"09-26-2023",
	"10-01-2023",
	"10-02-2023",
	"10-03-2023",
	"10-08-2023",
	"10-09-2023",
	"10-10-2023",
	"10-15-2023",
	"10-16-2023",
	"10-17-2023",
	"10-22-2023",
	"10-23-2023",
	"10-24-2023",
	"10-29-2023",
	"10-30-2023",
	"10-31-2023",
	"11-05-2023",
	"11-06-2023",
	"11-07-2023",
	"11-12-2023",
	"11-13-2023",
	"11-14-2023",
	"11-19-2023",
	"11-20-2023",
	"11-21-2023",
	"11-26-2023",
	"11-27-2023",
	"11-28-2023",
	"12-03-2023",
	"12-04-2023",
	"12-05-2023",
	"12-10-2023",
	"12-11-2023",
	"12-12-2023",
	"12-17-2023",
	"12-18-2023",
	"12-19-2023",
	"12-24-2023",
	"12-25-2023",
	"12-26-2023",
	"12-31-2023",
	"01-01-2024"
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
