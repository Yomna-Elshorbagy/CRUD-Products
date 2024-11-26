//Global Variables
let productNameInput = document.getElementById("name");
let productPriceInput = document.getElementById("price");
let productCategoryInput = document.getElementById("category");
let productDescriptionInput = document.getElementById("desc");
let productImageInput = document.getElementById("image");
let searchInput = document.getElementById("search");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");

let currentIndex = 0;
let allProducts = [];

if (localStorage.getItem("productContainer") !== null) {
  allProducts = JSON.parse(localStorage.getItem("productContainer"));
  displayAllProducts();
}
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;

  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
}

function createCols(i) {
  let regex = new RegExp(searchInput.value, "gi");

  return `    
  <tr>
   <td>${i + 1}</td>
   <td>${allProducts[i].name.replace(
     regex,
     (match) => `<span class="bg-info">${match}</span>`
   )} </td>
   <td>${allProducts[i].price}</td>
   <td>${allProducts[i].category}</td>
   <td>${allProducts[i].description}</td>
   <td>
      <img height="100px" class="card-img-top" src="  ${
        allProducts[i].image
      }  " alt=" ${allProducts[i].name} " />
   </td>   
   <td class="d-flex justify-content-center">
     <button class="btn btn-danger mx-3" onclick="deleteElement(${i})"> <i class="fa-solid fa-trash"></i> </button>
     <button class="btn btn-info mx-3" onclick="clearForm()"> <i class="fa-solid fa-eraser"></i> </button>
     <button class="btn btn-warning mx-3" onclick="setUpdateInfo(${i})"> <i class="fa-solid fa-pen-to-square"></i></button>
   </td>
  </tr>`;
}

function displayAllProducts() {
  let cartona = "";

  for (let i = 0; i < allProducts.length; i++) {
    cartona += createCols(i);
    document.getElementById("items").innerHTML = cartona;
  }
}

function addProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productDescriptionInput, "msgCategory") &&
    validationInputs(productCategoryInput, "msgDescription")
  ) {
    let product = {
      name: productNameInput.value.trim(),
      price: +productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/p-1.jpg",
    };
    allProducts.push(product);
    localStorage.setItem("productContainer", JSON.stringify(allProducts));
    displayAllProducts();
    clearForm();
  }
}
function deleteElement(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(allProducts));
  displayAllProducts();
}

function searchData() {
  let term = searchInput.value;
  let cartona = "";

  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += createCols(i);
    }
  }

  document.getElementById("items").innerHTML = cartona;
}
function setUpdateInfo(index) {
  currentIndex = index;
  productNameInput.value = allProducts[index].name;
  productPriceInput.value = allProducts[index].price;
  productCategoryInput.value = allProducts[index].category;
  productDescriptionInput.value = allProducts[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateData() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productDescriptionInput, "msgCategory") &&
    validationInputs(productCategoryInput, "msgDescription")
  ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/${productImageInput.files[0]?.name}`
        : "images/p-1.jpg",
    };

    allProducts.splice(currentIndex, 1, product);

    localStorage.setItem("productContainer", JSON.stringify(allProducts));

    displayAllProducts();
    clearForm();

    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
  }
}
function validationName() {
  let regex = /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/;
  let text = productNameInput.value;
  let msgName = document.getElementById("msgName");

  if (regex.test(text)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}
function validationPrice() {
  var regex = /^\d{1,10}(\.\d{1,2})?$/; // Regex to validate product price
  var text = productPriceInput.value;
  var msgPrice = document.getElementById("msgPrice");

  if (regex.test(text)) {
    // Valid input
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");
    return true;
  } else {
    // Invalid input
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    msgPrice.classList.remove("d-none");
    return false;
  }
}

function validationCategory() {
  var regex = /^(mobile|tv|screens|electronic)$/;
  var text = productCategoryInput.value;
  var msgCategory = document.getElementById("msgCategory");

  if (regex.test(text)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    msgCategory.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    msgCategory.classList.remove("d-none");
    return false;
  }
}

function validationDescription() {
  var regex = /^[\w\W\s]{3,150}$/;
  var text = productDescriptionInput.value;
  var msgDescription = document.getElementById("msgDescription");

  if (regex.test(text)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    msgDescription.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    msgDescription.classList.remove("d-none");
    return false;
  }
}

function validationInputs(element, msgText) {
  let regex = {
    name: /^[a-zA-Z][a-zA-Z0-9 _-]{2,19}$/,
    price: /^\d{1,10}(\.\d{1,2})?$/,
    category: /^(mobile|tv|screens|electronic)$/gi,
    desc: /^[\w\W\s]{3,150}$/,
  };
  let text = element.value;
  let msg = document.getElementById(msgText);

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
