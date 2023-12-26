document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#root tbody");
  const itemsPerPage = 30;
  let currentPage = 1;

  function renderPage(pageNumber, data) {
    tableBody.innerHTML = "";

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
      const item = data[i];
      const index = i + 1;

      const tableRow = document.createElement("tr");

      const indexCell = document.createElement("th");
      indexCell.scope = "row";
      indexCell.textContent = index;
      tableRow.appendChild(indexCell);

      const imgCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = item["data-img-url"];
      img.alt = `${item.title}' Image`;
      img.style.cssText =
        "height: 200px; width: 200px; object-fit: cover; overflow: hidden;";
      imgCell.appendChild(img);
      tableRow.appendChild(imgCell);

      const titleCell = document.createElement("td");
      titleCell.textContent = item.title;
      tableRow.appendChild(titleCell);

      const linkCell = document.createElement("td");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = "View";
      link.target = "_blank";
      linkCell.appendChild(link);
      tableRow.appendChild(linkCell);

      tableBody.appendChild(tableRow);
    }
  }

  function updatePagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.classList.add("me-2", "btn", "btn-outline-dark");
      pageLink.textContent = i;

      if (i === currentPage) {
        pageLink.classList.add("active");
      }

      pageLink.addEventListener("click", function () {
        currentPage = i;
        renderPage(currentPage, data);
        updatePagination(data);
      });

      paginationContainer.appendChild(pageLink);
    }
  }

  fetch("products.json")
    .then((response) => response.json())
    .then((jsonData) => {
      renderPage(currentPage, jsonData);
      updatePagination(jsonData);
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});
