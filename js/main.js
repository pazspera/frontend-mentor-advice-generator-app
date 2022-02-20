/* ------ VARIABLES ------ */
const d = document;
const URL_ADVICE = "https://api.adviceslip.com/advice";
let $adviceNumber = d.querySelector(".advice-card__number");
let $adviceText = d.querySelector(".advice-card__text");
// Variables for responsiveContent()
let $imgDivider = d.getElementById("img-divider");
let breakpoint = "(min-width: 1024px)";
let desktopContent = `<img  src="./images/pattern-divider-desktop.svg" alt="Pattern divider" />`;
let mobileContent = `<img  src="./images/pattern-divider-mobile.svg" alt="Pattern divider" />`;

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

// Function to display a different image depending on the viewport size
const responsiveContent = (domElement, breakpointSize, mobileContent, desktopContent) => {
	let breakpoint = window.matchMedia(breakpointSize);

	const responsive = (e) => {
		if (e.matches) {
			// Al menos 1024px
			domElement.innerHTML = desktopContent;
		} else {
			// Menos de 1024px
			domElement.innerHTML = mobileContent;
		}
	};

	breakpoint.addListener(responsive);
	responsive(breakpoint);
};

/* ------ CODE ------ */
// Gets an advice on DOM load
d.addEventListener("DOMContentloaded", getAdvice());
d.addEventListener("DOMContentloaded", responsiveContent($imgDivider, breakpoint, mobileContent, desktopContent));

// Add listener to btn
d.addEventListener("click", (e) => {
	if (e.target.matches(".dice-btn") || e.target.matches(".dice-btn img")) {
		e.preventDefault();
		getAdvice();
	}
});
