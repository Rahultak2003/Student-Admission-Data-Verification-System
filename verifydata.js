// fetch data from the API
async function verifieddata1() {
  try {
    const response = await fetch("https://retoolapi.dev/Q3833l/Unverified");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
async function unverifieddata1() {
  try {
    const response = await fetch("https://retoolapi.dev/v1yfFA/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


// Function verify data

async function verifieddata() {

  const tableBody = document.getElementById("data-body1");

  // const apiData = await verifieddata1();
  const apiData = await verifieddata1();
  if (!apiData) return;

  tableBody.innerHTML = "";

  apiData.forEach((item) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.Application_no}</td>
      <td>${item.Name}</td>
      <td>${item.Father_Name}</td>
      <td>${item.Mother_name}</td>
      <td>${item.DOB}</td>
      <td>${item.Gender}</td>
      <td>${item.Category}</td>
      <td>${item.Board}</td>
      <td>${item.Roll_no}</td>
      <td>${item.Year}</td>
      <td>${item.Math_mark}</td>
      <td>${item.Science_mark}</td>
      <td>${item.total_op}</td>
      <td>${item.parsentage}%</td>
      <td>Success</td>`;

    tableBody.appendChild(row);
  });

  // Show data and another table display none
  document.getElementById("data-table").style.display = "block";
  document.getElementById("unmatchdata").style.display = "none";
}

//action button
document
  .getElementById("fetchDataButton")
  .addEventListener("click", verifieddata);


// function unverify data

async function unverifieddata() {

  const tableBody = document.getElementById("data-body2");

  const apiData = await unverifieddata1();
  if (!apiData) return;

  tableBody.innerHTML = "";

  apiData.forEach((item) => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.Application_no}</td>
      <td>${item.Name}</td>
      <td>${item.Father_Name}</td>
      <td>${item.Mother_name}</td>
      <td>${item.DOB}</td>
      <td>${item.Gender}</td>
      <td>${item.Category}</td>
      <td>${item.Board}</td>
      <td>${item.Roll_no}</td>
      <td>${item.Year}</td>
      <td>${item.Math_mark}</td>
      <td>${item.Science_mark}</td>
      <td>${item.total_op}</td>
      <td>${item.parsentage}%</td>
      <td>faild</td>`;

    tableBody.appendChild(row);
  });

  // Show data and another table display none
  document.getElementById("data-table").style.display = "none";
  document.getElementById("unmatchdata").style.display = "block";
}

//action button
document
  .getElementById("unfetchDataButton")
  .addEventListener("click", unverifieddata);