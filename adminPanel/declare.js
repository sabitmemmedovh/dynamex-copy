
let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})


let declared = document.getElementById("declareContainer")
const renderData = async () => {
    try {
        const res = await fetch(`http://localhost:3000/declare`);
        const data = await res.json();
        console.log(data);
        data.forEach((item) => {
            let miniDiv = document.createElement("div");
            miniDiv.className = "declareDiv";
            miniDiv.innerHTML = `
            <h6>${item.customerName}</h6>
            <h6>${item.surname}</h6>
            <h6>${item.phone}</h6>
            <h6 class="tracking">${item.tracking}</h6>
            <h6 class="declaredValue">${item.declared ? 'true' : 'false'}</h6>
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Status
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item gumruk" href="#" data-product-id="${item.id}">Gömrük yoxlanışında</a></li>
                <li><a class="dropdown-item cesidleme" href="#" data-product-id="${item.id}">Çeşidləmə</a></li>
                <li><a class="dropdown-item yerliAnbar" href="#" data-product-id="${item.id}">Yerli anbar</a></li>
            </ul>
        </div>
            `;
            declared.appendChild(miniDiv);
        });

        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', async (event) => {
                event.preventDefault();
                const productId = event.target.getAttribute('data-product-id');
                const status = event.target.textContent.trim(); // Dropdown öğesinin metnini al
                await sendToCustoms(productId, status);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const sendToCustoms = async (productId, status) => {
    try {
        await fetch(`http://localhost:3000/declare/${productId}`, {
            method: 'PATCH', // Veriyi güncellemek için PATCH metodu kullanılır
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status // Seçilen durumu API'ye gönder
            })
        });
        renderData(); // Verileri yeniden yükle
    } catch (error) {
        console.error('Error sending to customs:', error);
    }
};

window.onload = () => {
    renderData();
};
