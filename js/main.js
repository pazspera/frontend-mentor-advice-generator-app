/* 
    When .dice-btn is clicked, send a request to the API
    We get a slip object
        id: advice number
        advice: advice text
    
    When we get the data, we update the html text content with the return values

    Call the function on DOMcontentloaded to have an advice on load
    Also add an event listener to .dice-btn
*/
console.log("hello");
/* ------ VARIABLES ------ */
const d = document;
const URL_ADVICE = "https://api.adviceslip.com/advice/";

/* ------ FUNCTIONS ------ */
const getAdvice = async () => {
	try {
		let res = await fetch(URL_ADVICE, {
			method: "GET",
			headers: {
				"Content-type": "text/html; charset=UTF-8",
			},
		});
		let data = await res.json();
		console.log(data);

		if (!res.ok) {
			throw {
				status: res.status,
				statusText: res.statusText,
			};
		}
	} catch (err) {
		let message = err.statusText || "An error occurred";
		console.log(message);
	}
};

/* ------ CODE ------ */
d.addEventListener("DOMContentloaded", getAdvice);
