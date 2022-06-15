/**
 * Una solución supersencilla, podemos agregar una propiedad de carga *
 * en el window.history, es decir que cuando de cambie un hostname a  *
 * otro o vengamos de otro hostname entonces podemos agregar ese href *
 * de carga inicial de la siguiente manera:                           *
 */

// window.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     navigator();
//     // Agregando un estado de carga inical
//     window.history.pushState({ loadUrl: window.location.href }, null, "");
//   },
//   false
// );

/**
 * Esa propiedad de carga de estado la he llamado loadUrl entonces si *
 * cargamos la aplicación desde su inicio el href no deberá contener  *
 *ningún tipo de hash pero si venimos de youtube por ejemplo entonces *
 * el loadUrl nos dará todo el href se esa ruta de carga con todo y   *
 * hash. Entonces si la ruta de carga inicial contiene el símbolo de  *
 * hash (#) entonces nos mandará a la home desde el evento click del  *
 * botón.
 */

// arrowBtn.addEventListener("click", () => {
//   const stateLoad = window.history.state ? window.history.state.loadUrl : "";
//   if (stateLoad.includes("#")) {
//     window.location.hash = "";
//   } else {
//     window.history.back();
//   }
// });

/**
 * Después de que neveguemos en diferentes rutas de la aplicación el  *
 * window.history.state se borra dando como resultado null por eso es *
 * que la variable stateLoad regresamos un string vacío o lo que      *
 * queremos realmente que es el window.history.state.loadUrl          *
 */

/**
 * Opcion hecha en clase, la de arriba es de un alumno funciona al    *
 * segundo click, se puede mejorar.                                   *
 *
 */

arrowBtn.addEventListener("click", () => {
  history.back();
  //location.hash = "#home=";
});

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends=";
});

window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  //document.scrollTop = 0;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();
}

function searchPage() {
  console.log("SEARCH!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#search', 'buscqueda']
  const [_, query] = location.hash.split("=");

  getMoviesBySearch(query);
}

function movieDetailsPage() {
  console.log("MOVIE!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  // ['#movie', 'id']
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function categoriesPage() {
  console.log("CATEGORY!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split("=");
  const [categoryid, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(categoryid);
}

function homePage() {
  console.log("HOME!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategegoriesPreview();
}
