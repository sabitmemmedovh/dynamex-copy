
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
  nav.classList.toggle("navclose");
})


// Render Data
let bestSeller = document.getElementById("best_seller");
const renderData = async () => {
  bestSeller.innerHTML = "";
  const res = await fetch(`http://localhost:3000/posts`);
  const data = await res.json();
  console.log(data);
  data.forEach((item) => {
    let miniDiv = document.createElement("div");
    miniDiv.className = "miniDiv";
    miniDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p style="max-width:190px;text-align:center">${item.name}</p>
        <p>${item.marka}</p>
        <p>${item.price} TL</p>
        <button onclick="deleteProduct(${item.id})" style="border: none;background-color: #E53935;color: #fff;width: 90px;height: 35px;border-radius: 30px;">Delete</button>
        `;
    bestSeller.append(miniDiv);
  });
};
const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`http://localhost:3000/posts/${productId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data); // Eğer başarıyla silinirse geri dönen mesajı kontrol edebilirsiniz
    // Kullanıcı arayüzünden de kaldırabilirsiniz
    const productDiv = document.querySelector(`.miniDiv img[alt="${data.name}"]`).parentNode;
    productDiv.remove(); // Ürünü sildikten sonra HTML'den kaldır
  } catch (error) {
    console.error('Error deleting product:', error);
  }
  renderData()
};
window.onload = () => {
  renderData()
}






// Post
let idinp = document.getElementById("id");
let markainp = document.getElementById("marka");
let imageinp = document.getElementById("image");
let priceinp = document.getElementById("price");
let titleinp = document.getElementById("titleInp");
let nameinp = document.getElementById("nameinp");
let addProducts = document.getElementById("addProducts");
let myForm = document.getElementById("contact-form");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  axios
    .post("http://localhost:3000/posts", {
      id: idinp.value,
      marka: markainp.value,
      image: imageinp.value,
      price: priceinp.value,
      title: titleinp.value,
      name: nameinp.value,

    })
    .then((res) => {
      console.log(res.data);
      myForm.reset();
      renderData()
    });
});






// Search
const serachInput = document.getElementById("serachInput");
const best_seller = document.getElementById("best_seller");

const searchByName = async (name) => {
  try {
    const res = await fetch(`http://localhost:3000/posts`);
    const data = await res.json();

    let filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    best_seller.innerHTML = "";

    filteredData.forEach((item) => {
      let miniDiv = document.createElement("div");
      miniDiv.className = "miniDiv";
      miniDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>${item.marka}</p>
        <p>${item.price} TL</p>
        <button onclick="deleteProduct(${item.id})" style="border: none;background-color: #E53935;color: #fff;width: 90px;height: 35px;border-radius: 30px;">Delete</button>
        `;
      bestSeller.append(miniDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

serachInput.addEventListener("input", (e) => {
  searchByName(e.target.value);
});




