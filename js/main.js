/* ------ VARIABLES ------ */
const d = document;
const URL_ADVICE = "https://api.adviceslip.com/advice";
let $adviceNumber = d.querySelector(".advice-card__number");
let $adviceText = d.querySelector(".advice-card__text");

/* ------ FUNCTIONS ------ */
const getAdvice = async () => {
	try {
		let res = await fetch(URL_ADVICE, {
			method: "GET",
		});
		// Converts response to JSON
		let data = await res.json();
		// Gets the slip obj from the data
		let adviceObj = data.slip;

		if (!res.ok) {
			throw {
				status: res.status,
				statusText: res.statusText,
			};
		}

		// Adds advice number and text to DOM
		$adviceNumber.textContent = `Advice #${adviceObj.id}`;
		$adviceText.textContent = `"${adviceObj.advice}"`;
	} catch (err) {
		let message = err.statusText || "An error occurred";
		console.log(message);
	}
};

/* ------ CODE ------ */
// Gets an advice on DOM load
d.addEventListener("DOMContentloaded", getAdvice());

// Add listener to btn
d.addEventListener("click", (e) => {
	if (e.target.matches(".dice-btn") || e.target.matches(".dice-btn img")) {
		e.preventDefault();
		getAdvice();
	}
});