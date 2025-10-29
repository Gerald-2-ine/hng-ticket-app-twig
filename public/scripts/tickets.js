document.addEventListener("DOMContentLoaded", () => {
  const ticketList = document.getElementById("ticketList");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const ticketForm = document.getElementById("ticketForm");
  const ticketTitle = document.getElementById("ticketTitle");
  const ticketDescription = document.getElementById("ticketDescription");
  const saveBtn = document.getElementById("saveTicketBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const addTicketBtn = document.getElementById("addTicketBtn");
  const toast = document.getElementById("toast");

  // 🔹 Load or initialize tickets
  let tickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
  let editingTicket = null;

  // 🔹 Toast
  const showToast = (message, type = "info") => {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // hide after 3s
  };

  // 🔹 Save to localStorage
  const saveTickets = () => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
    renderTickets();
  };

  // 🔹 Render tickets dynamically
  const renderTickets = () => {
    if (tickets.length === 0) {
      ticketList.innerHTML = `<p>No tickets yet. Add one above!</p>`;
      return;
    }

    ticketList.innerHTML = tickets
      .map(
        (ticket) => `
      <div class="ticket-card" data-id="${ticket.id}">
        <h3>${ticket.title}</h3>
        <p>${ticket.description}</p>
        <p class="status ${ticket.status}">${ticket.status}</p>
        <div class="ticket-actions">
          <select class="status-select">
            <option value="open" ${
              ticket.status === "open" ? "selected" : ""
            }>Open</option>
            <option value="in-progress" ${
              ticket.status === "in-progress" ? "selected" : ""
            }>In Progress</option>
            <option value="closed" ${
              ticket.status === "closed" ? "selected" : ""
            }>Closed</option>
          </select>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `
      )
      .join("");
  };

  // 🔹 Modal open/close
  const openModal = (edit = false, ticket = null) => {
    modalOverlay.style.display = "flex";
    modalTitle.textContent = edit ? "Edit Ticket" : "Create New Ticket";
    saveBtn.textContent = edit ? "Update" : "Add Ticket";
    editingTicket = edit ? ticket : null;
    ticketTitle.value = edit ? ticket.title : "";
    ticketDescription.value = edit ? ticket.description : "";
  };

  const closeModal = () => {
    modalOverlay.style.display = "none";
    editingTicket = null;
    ticketForm.reset();
  };

  addTicketBtn.addEventListener("click", () => openModal());
  cancelBtn.addEventListener("click", closeModal);

  // 🔹 Add or Edit Ticket
  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = ticketTitle.value.trim();
    const description = ticketDescription.value.trim();

    if (!title || !description) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (editingTicket) {
      editingTicket.title = title;
      editingTicket.description = description;
      showToast("Ticket updated successfully!", "success");
    } else {
      tickets.unshift({
        id: Date.now(),
        title,
        description,
        status: "open",
      });
      showToast("Ticket added successfully!", "success");
    }

    saveTickets();
    closeModal();
  });

  // 🔹 Handle Delete, Edit, and Status Change
  ticketList.addEventListener("click", (e) => {
    const card = e.target.closest(".ticket-card");
    if (!card) return;
    const id = Number(card.dataset.id);
    const ticket = tickets.find((t) => t.id === id);

    if (e.target.classList.contains("delete-btn")) {
      tickets = tickets.filter((t) => t.id !== id);
      saveTickets();
      showToast("Ticket deleted!", "error");
      return;
    }

    if (e.target.classList.contains("edit-btn")) {
      openModal(true, ticket);
    }
  });

  ticketList.addEventListener("change", (e) => {
    if (e.target.classList.contains("status-select")) {
      const id = Number(e.target.closest(".ticket-card").dataset.id);
      const ticket = tickets.find((t) => t.id === id);
      ticket.status = e.target.value;
      saveTickets();
      showToast(`Status changed to ${e.target.value}`, "info");
    }
  });

  // 🔹 Initial render
  renderTickets();
});
