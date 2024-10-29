const validateForm = (formData, formFields) => {
	let newErrors = {};
	let isValid = true;

	formFields.forEach(field => {
		if (!formData[field.id]) {
			isValid = false;
			newErrors[field.id] = `El campo "${field.label}" es obligatorio`;
		}
	});

	return { isValid, newErrors };
};

export default validateForm;

