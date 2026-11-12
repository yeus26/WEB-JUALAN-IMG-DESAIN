let selectedService = "";
let selectedPrice = 0;


// FORMAT RUPIAH
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
}


// SCROLL KE LAYANAN
function scrollToServices() {
    document.getElementById("layanan").scrollIntoView({
        behavior: "smooth"
    });
}


// BUKA CHECKOUT
function openCheckout(service, price) {

    selectedService = service;
    selectedPrice = price;

    document.getElementById("selectedService").textContent =
        service;

    document.getElementById("selectedPrice").textContent =
        formatRupiah(price);

    document.getElementById("checkoutModal")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


// TUTUP CHECKOUT
function closeCheckout() {

    document.getElementById("checkoutModal")
        .classList.remove("active");

    document.body.style.overflow = "auto";
}


// GENERATE NOMOR PESANAN
function generateOrderNumber() {

    const randomNumber =
        Math.floor(100000 + Math.random() * 900000);

    return "PC-" + randomNumber;
}


// SUBMIT CHECKOUT
document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const customerName =
            document.getElementById("customerName").value;

        const customerEmail =
            document.getElementById("customerEmail").value;

        const customerPhone =
            document.getElementById("customerPhone").value;

        const orderDetail =
            document.getElementById("orderDetail").value;

        const paymentMethod =
            document.getElementById("paymentMethod").value;


        if (
            !customerName ||
            !customerEmail ||
            !customerPhone ||
            !orderDetail ||
            !paymentMethod
        ) {

            alert("Mohon lengkapi semua data.");

            return;
        }


        const orderNumber = generateOrderNumber();

        document.getElementById("orderNumber")
            .textContent = orderNumber;


        // SIMULASI PEMBAYARAN
        console.log({
            orderNumber: orderNumber,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            service: selectedService,
            price: selectedPrice,
            detail: orderDetail,
            payment: paymentMethod
        });


        closeCheckout();


        document.getElementById("successModal")
            .classList.add("active");


        // RESET FORM
        document.getElementById("checkoutForm").reset();

    });


// TUTUP SUCCESS
function closeSuccess() {

    document.getElementById("successModal")
        .classList.remove("active");

    document.body.style.overflow = "auto";
}


// KLIK DI LUAR MODAL
window.addEventListener("click", function(event) {

    const checkoutModal =
        document.getElementById("checkoutModal");

    const successModal =
        document.getElementById("successModal");


    if (event.target === checkoutModal) {
        closeCheckout();
    }


    if (event.target === successModal) {
        closeSuccess();
    }

});
