'use strict';
var categories = [];

function loadCategories(params) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ecobank-privilege-api.herokuapp.com/api/v1/category/filter?status=approved');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      categories = response.data;
      var cats = JSON.stringify(categories)
      sessionStorage.setItem('categories', cats);
      categories.forEach(category => {
        createSection(category)
      });
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

function createSection(category) {
  var categoriesWrapper = document.getElementById('section-wrapper');
  var html =
    `<div class="section__content">
          <div class="section__content__text">
            <h5 class="text-blue">${category.name}</h5>
            <p>${category.description}</p>
            <a href="categories.html?category=${category.id}" class="text-blue">View ${category.name}</a>
          </div>
        </div>
        <div class="section__media">
          <img src="/images/spa.jpg">
        </div>`
  var htmlSection = document.createElement('section')
  htmlSection.classList.add('section')
  htmlSection.innerHTML = html
  categoriesWrapper.appendChild(htmlSection)
}

function loadPartners(location) {
  categories = JSON.parse(sessionStorage.getItem('categories'))
  var categoryId = location.substring(1).split('=')[1];
  var currentCategory = categories.find(function (category) {
    return category.id == categoryId;
  })
  var pageTitle = document.getElementById('page-title')
  var pageDescription = document.getElementById('page-description')
  pageTitle.innerHTML = currentCategory.name
  pageDescription.innerHTML = currentCategory.description
  fetchPartners(categoryId)
}

function fetchPartners(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://ecobank-privilege-api.herokuapp.com/api/v1/partner/query?status=approved&categoryId=${id}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      let partners = response.data;
      partners.forEach(partner => {
        createPartner(partner)
      });
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}
function createPartner(partner) {
  var partnerWrapper = document.getElementById('partner-container')
  var html = `
      <div class="section__media section__media--circle">
        <img src="${partner.image}">
      </div>
      <div class="section__content">
        <div class="section__content__text">
          <h5 class="text-blue">${partner.name}</h5>
          <p>${partner.description}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${partner.latitude},${partner.longitude}" class="text-blue">View on Map</a> |
          <a href="#" class="text-blue">How To Redeem</a>
        </div>
      </div>
  `
  var htmlSection = document.createElement('section')
  htmlSection.classList.add('section')
  htmlSection.innerHTML = html
  partnerWrapper.appendChild(htmlSection)
}