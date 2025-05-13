
let menuicn = document.querySelector(".menuicn"); 
let nav = document.querySelector(".navcontainer"); 
  
menuicn.addEventListener("click", () => { 
    nav.classList.toggle("navclose"); 
})



const renderData = async () => {
  const res = await fetch(
    `http://localhost:3000/comment`
  );
  const data = await res.json();
  console.log(data);
  data.forEach((item) => {
    let miniDiv = document.createElement("div");
    miniDiv.className = "miniDiv";
    miniDiv.innerHTML = `
    
    <p>${item.name}</p>
    <h6>${item.surname}</h6>
    <h6 style="display: flex;
    align-items: center;
    justify-content: center;">${item.phone}</h6>
    <h6 class="email" style="display: flex;
    align-items: center; width:200px;justify-content: start;">${item.email}</h6>
    <h6>${item.message}</h6>
    `;
    comment.append(miniDiv);
  });
};

window.onload = () => {
  renderData();
};


