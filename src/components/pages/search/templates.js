const images = [
	"../../homePage/assets/images/aleksey-kuprikov-sKJH-nRnthg-unsplash.jpg",
	"../../homePage/assets/images/aleksey-kuprikov-sKJH-nRnthg-unsplash.png",
	"../../homePage/assets/images/alexander-andrews-yOIT88xWkbg-unsplash.jpg",
	"../../homePage/assets/images/andrei-korostyliov--5svGQJwrU0-unsplash.jpg",
	"../../homePage/assets/images/ashley-knedler-Pf5Pj7A5ddA-unsplash.jpg",
	"../../homePage/assets/images/daniel-leone-g30P1zcOzXo-unsplash.jpg",
	"../../homePage/assets/images/josiah-pauls-XpM3UKpzBeQ-unsplash.jpg",
	"../../homePage/assets/images/karsten-winegeart-oU6KZTXhuvk-unsplash.jpg",
	"../../homePage/assets/images/linus-sandvide-5DIFvVwe6wk-unsplash.jpg",
	"../../homePage/assets/images/manuel-will-gd3t5Dtbwkw-unsplash.jpg",
	"../../homePage/assets/images/marek-szturc-n3qWOO_WO3E-unsplash.jpg",
	"../../homePage/assets/images/pexels-felix-mittermeier-957061.jpg",
	"../../homePage/assets/images/ray-hennessy-xUUZcpQlqpM-unsplash.jpg",
	"../../homePage/assets/images/stefano-zocca-zjaOb2kOk_8-unsplash.jpg",
];

const templates = [];

const keys = [
	"holi",
	"diwali",
	"new-year",
	"football",
	"dashain",
	"design",
	"art",
	"quote",
	"motivation",
	"mcc",
	"mla",
	"nepal-idol",
	"jhapa-news",
	"nari-diwas",
];

const tags = [
	["holi", "rangoli", "Holi", "Holi"],
	["diwali", "Diwali", "Tihar"],
	["new-year", "Naya Barsha", "New Year"],
	["football", "FootBall", "Football"],
	["Dashain", "dashain"],
	["Design", "design"],
	["Art", "art"],
	["Quotes", "quote", "Quote"],
	["motivation", "Motivation"],
	["MCC", "mcc"],
	["mla", "emaley", "emala"],
	["nepal-idol", "Nepal Idol"],
	["Jhapa News", "jhapa-news"],
	["Nari Diwas", "nari-diwas"],
];

const date = new Date();
for (let i = 0; i < images.length; i++) {
	const id = date.getTime() + i;

	const data = {
		id,
		key: keys[i],
		tags: tags[i],
		image: images[i],
	};

	templates.push(data);
}

export { templates };
