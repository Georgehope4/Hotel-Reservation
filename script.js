function Hotels(data) {
  const hotelsData = data[1].entries;

  const cityBar = document.querySelector("#searchBar");
  const form = document.querySelector("form");
  const hotelsBox = document.querySelector("#hotels");
  const hotelsDataList = document.querySelector("#hotels_list");
  const price = document.querySelector("#price");
  const selectedPriceValue = document.querySelector("#selected_price");
  const rating = document.querySelector("#rating");
  const guestRating = document.querySelector("#guest-rating");
  const location = document.querySelector("#locations");
  const recommendation = document.querySelector("#recommendations");

  function handleSubmit(event) {
    event.preventDefault();
    selectedCity = cityBar.value;
    filterHotels();
  }
  function handlePriceInput(event) {
    selectedPriceValue.innerText = event.target.value + " \u20ac";
  }
  function handlePriceChange(event) {
    selectedPrice = parseInt(event.target.value);
    filterHotels();
  }
  function handleGuestRatingChange(event) {
    selectedGuestRating = event.target.value;
    filterHotels();
  }
  function handleRatingChange(event) {
    selectedRating = parseInt(event.target.value);
    filterHotels();
  }
  function handleLocation(event) {
    selectedLocation = event.target.value;
    filterHotels();
  }

  function handleRecom(event) {
    selectedRecom = event.target.value;
    filterHotels();
  }

  function filterByCity(hotel) {
    if (selectedCity) {
      return hotel.city.toLowerCase() === selectedCity.toLowerCase();
    } else {
      return true;
    }
  }
  function filterByPrice(hotel) {
    return hotel.price <= selectedPrice;
  }
  function filterByRating(hotel) {
    if (selectedRating) {
      return hotel.rating == selectedRating;
    } else {
      return true;
    }
  }
  function filterByGuestRating(hotel) {
    if (selectedGuestRating != "all") {
      return hotel.ratings.text === selectedGuestRating;
    } else {
      return true;
    }
  }
  function filterByLocation(hotel) {
    if (selectedLocation != "all") {
      return hotel.city === selectedLocation;
    } else {
      return true;
    }
  }

  function filteredByRecom(hotel) {
    if (selectedRecom != "all") {
      return hotel.filters.map(function (hotel) {
        return hotel.name === selectedRecom;
      });
    } else {
      return true;
    }
  }

  function filterHotels() {
    console.log(
      selectedCity,
      selectedPrice,
      selectedRating,
      selectedGuestRating,
      selectedLocation,
      selectedRecom
    );

    filteredHotels = hotelsData.filter(function (hotel) {
      return (
        filterByCity(hotel) &&
        filterByPrice(hotel) &&
        filterByRating(hotel) &&
        filterByGuestRating(hotel) &&
        filterByLocation(hotel) &&
        filteredByRecom(hotel)
      );
    });

    showHotels();
  }

  const cities = [];
  const recommendations = [];
  let options = "";
  let optionsRecom = "";
  for (let i = 0; i < hotelsData.length; i++) {
    if (cities.indexOf(hotelsData[i].city) < 0) {
      cities.push(hotelsData[i].city);
      options += `<option value="${hotelsData[i].city}"></option>`;
      for (let j = 0; j < hotelsData[i].filters.length; j++) {
        if (recommendations.indexOf(hotelsData[i].filters[j].name) < 0) {
          recommendations.push(hotelsData[i].filters[j].name);
          optionsRecom += `<option value="${hotelsData[i].filters[j].name}">${hotelsData[i].filters[j].name}</option>`;
        }
      }
    }
  }
  hotelsDataList.innerHTML = options;
  recommendation.innerHTML = `<option valu="all">All</option>` + optionsRecom;

  let filteredHotels = hotelsData;
  let selectedCity = null;
  let selectedPrice = 1500;
  let selectedRating = "";
  let selectedGuestRating = "all";
  let selectedLocation = "all";
  let selectedRecom = "all";

  function showHotels() {
    hotelsBox.innerHTML = "";
    let hotelsOutput = "";
    filteredHotels.map(function (hotel) {
      hotelsOutput += `

      <div class="hotel">
    
        <div class="row">
         <div class="col-lg-4 col-md-6 col-sm-4">
            <img src="${hotel.thumbnail}" height="220" width="250"/>
         </div>
         <div class="col-lg-4 col-md-6 col-sm-4">
            <p id="hotelName">${hotel.hotelName}</p>
            <p id="hotelCity">${hotel.city}</p>
            <p>${hotel.rating} <span class="fa fa-star checked"></span>  </p>
            <p><span class="badge badge-success badge-pill">${hotel.ratings.no}</span> ${hotel.ratings.text} </p>
            <p id="price"><b>${hotel.price} </b>&euro; </p>
          </div>
          <div class="col-lg-4 col-md-2 col-sm-4">
          <iframe src=${hotel.mapurl} width="230" height="200" padding-top=20px; frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    `;
    });
    hotelsBox.innerHTML = hotelsOutput;
  }

  form.addEventListener("submit", handleSubmit);
  price.addEventListener("input", handlePriceInput);
  price.addEventListener("change", handlePriceChange);
  rating.addEventListener("change", handleRatingChange);
  guestRating.addEventListener("change", handleGuestRatingChange);
  location.addEventListener("change", handleLocation);
  recommendation.addEventListener("change", handleRecom);

  showHotels();
}

document.querySelector("#today2").valueAsDate = new Date();
document.querySelector("#today1").valueAsDate = new Date();

fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(Hotels)
  .catch(function (error) {
    console.log("Error:", error.message);
  });
