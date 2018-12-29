// please note,
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// but needs to check if window.opr is not undefined
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
// so use the below updated condition
export const clientIsChrome = () => {
	// @ts-ignore
	const isChromium = window.chrome;
	const winNav = window.navigator;
	const vendorName = winNav.vendor;
	// @ts-ignore
	const isOpera = typeof window.opr !== "undefined";
	const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	const isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
		// is Google Chrome on IOS
		return true;
	} else if (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && !isOpera && !isIEedge) {
		// is Google Chrome
		return true;
	}
// not Google Chrome
	return false;
};
