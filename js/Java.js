document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            return showNotification("Por favor completa todos los campos.", "error");
        }

        showNotification("Mensaje enviado correctamente. ¡Gracias por contactarnos!", "success");
        form.reset();
    });

    function showNotification(msg, type = "info") {
        const container = document.getElementById("notification-container");

        const notif = document.createElement("div");
        notif.className = `notification ${type}`;
        notif.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${msg}</span>
        `;

        container.appendChild(notif);

        setTimeout(() => notif.classList.add("show"), 50);
        setTimeout(() => {
            notif.classList.remove("show");
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
});
