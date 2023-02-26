const loadPhones = (searcText, dataLimit) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searcText}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, dataLimit));
};

const displayPhones = (phones, dataLimit) => {
  // dataLimit
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // no phoens found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) noPhone.classList.remove("d-none");
  else {
    noPhone.classList.add("d-none");
  }
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";

  phones.forEach((phone) => {
    //   console.log(phone.slug);

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
         <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                   
                    


                    <!-- Button trigger modal -->
        <button   onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn        btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal">
              phone details
        </button>
             </div>
          </div>
      `;
    phonesContainer.appendChild(div);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searcText = document.getElementById("input-text").value;
  loadPhones(searcText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

document
  .getElementById("input-text")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = (id) => {
  fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};
const displayPhoneDetails =(details)=>{
  console.log(details)

  document.getElementById('exampleModalLabel').innerText=details.name;
  document.getElementById('modal-body').innerHTML=`
  <p>Brand: ${details.brand}</p>
  <p>mainfeature: ${details.mainFeatures.chipSet}</p>
  
  `

} 


loadPhones('oppo')