let declareCustomer = document.querySelector(".declare-customer");
const renderProducts = () => {
    axios.get(`http://localhost:3000/declare`)
    .then((res) => {
        db = res.data;
        db.map((item) => {
            let declare = document.createElement("div");
            declare.className = "declare";
            declare.innerHTML = `
                <h6>${item.marka} <button class="declareButton">${item.declared ? 'Bəyan edildi' : 'Bəyan et'}</button></h6>
                <p><h6 class="status">${item.status !== undefined ? item.status : ''}</h6></p>
                <p>İzləmə kodu: <span>${item.tracking}</span></p>
                <p>Haradan: <span>${item.where}</span></p>
                <p>Ümumi qiymət: <span>${item.price}</span></p>
                <p>Məhsulun adı: <span>${item.name}</span></p>
                <p>Çəki: <span>${item.weight}</span></p>
                <p>Tarix: <span>${item.date}</span></p>
                <p>Bağlamanın şəkli: <button class="imageButton" data-image-url="${item.image}">Resim</button></p>
                <button class="whereButton">Sumqayıt</button>
            `;

            let declareButton = declare.querySelector(".declareButton");
            if (item.declared) {
                declareButton.innerText = "Bəyan edildi";
            }

            declareButton.addEventListener("click", (event) => {
                event.preventDefault();

                if (item.declared !== true) {
                    declareButton.innerText = "Bəyan edildi";

                    axios.put(`http://localhost:3000/declare/${item.id}`, {
                        declared: true,
                        name: item.name,
                        marka: item.marka,
                        price: item.price,
                        where: item.where,
                        tracking: item.tracking,
                        date: item.date,
                        weight: item.weight,
                        customerName: item.customerName,
                        surname: item.surname,
                        phone: item.phone,
                        email: item.email,
                        image: item.image,
                    })
                    .then((res) => {
                        console.log('Ürün beyan edildi:', res.data);
                    })
                    .catch((err) => {
                        console.error('Ürün beyan edilirken bir hata oluştu:', err);
                    });
                } else {
                    console.log("Bu ürün zaten beyan edilmiş.");
                }
            });

            declareCustomer.appendChild(declare);
        });
    })
    .catch((err) => {
        console.error('Ürünler getirilirken bir hata oluştu:', err);
    });

}



// Tesvire bax
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('imageButton')) {
        const imageUrl = event.target.getAttribute('data-image-url');
        window.open(imageUrl, '_blank');
    }
});

window.onload = () => {
    renderProducts()
}


// Dostunu devet et
document.addEventListener('DOMContentLoaded', function() {
    const inviteLink = document.querySelector('.invite');

    inviteLink.addEventListener('click', function(event) {
        event.preventDefault(); 

        const urlToCopy = 'http://127.0.0.1:5502/pages/index.html';

        const tempInput = document.createElement('input');
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);

        tempInput.focus();
        tempInput.select();

        document.execCommand('copy');

        document.body.removeChild(tempInput);

        alert('Bağlantı kopyalandı: ' + urlToCopy);
    });
});





const userAbout = document.querySelector('.userAbout')
const checkUserName = () => {
    loggedUser = JSON.parse(localStorage.getItem('loggedin'))
    if (loggedUser) {
        userAbout.innerHTML = loggedUser.name + " " + loggedUser.surname + "<br>" + "Id:" + loggedUser.id + "<br>" 
    }
}

checkUserName()


