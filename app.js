const imgCont = document.getElementById("imgContainer");
const searchTermElem = document.getElementById("search");
const form = document.getElementById("gifForm");
const removeBtn = document.getElementsByClassName("removeBtn")[0];

const apiKey = "SLeoo9UIilcmAKv2GMbnzqXHde7sVBqh";
const gifLimit = "1";

form.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const searchTerm = searchTermElem.value;
	
	if (searchTerm === "") {return;} 

	const giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${gifLimit}&q=${searchTerm}&rating=g`;

	searchTermElem.value = "";

	const loadingWrap = addLoader();
	
	axios({
		method: "get",
		url: giphyURL,
	}).then((resp) => {
		addGif(resp.data.data[0].images.downsized.url);
		loadingWrap.remove();
	}).catch((err) => {
		console.log(err);
		loadingWrap.remove();
	});
	
});

removeBtn.addEventListener("click", () => {
	imgCont.innerHTML = "";
});

function addGif(gifUrl) {
	const imgWrap = document.createElement("div");
	imgWrap.classList.add("img-wrapper");
	const gifImg = document.createElement("img");
	gifImg.setAttribute("src", gifUrl);
	gifImg.setAttribute("alt", "Gif Image");
	imgWrap.append(gifImg)
	imgCont.append(imgWrap);
}

function addLoader() {
	const loadingWrap = document.createElement("div");
	loadingWrap.classList.add("img-wrapper");
	const loadingDiv = document.createElement("div");
	loadingDiv.classList.add("loader");
	loadingWrap.append(loadingDiv);
	imgCont.append(loadingWrap);
	return loadingWrap;
}
