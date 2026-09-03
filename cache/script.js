let detailsPrintState = [];
window.addEventListener("beforeprint", () => {
	const details = document.querySelectorAll("details");
	detailsPrintState = Array.from(details, detail => detail.open);
	details.forEach(detail => { detail.open = true; }); });
window.addEventListener("afterprint", () => {
	const details = document.querySelectorAll("details");
	details.forEach((detail, index) => { detail.open = detailsPrintState[index] ?? false; });
	detailsPrintState = []; });