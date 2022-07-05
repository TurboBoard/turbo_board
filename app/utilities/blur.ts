const blur = () => {
	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}
};

export default blur;
