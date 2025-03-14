function userdata() {
  let authdata = JSON.parse(localStorage.getItem("authdatadetails"));
  // console.log(authdata)

  const urlParams = new URLSearchParams(window.location.search);
  const uiddata = urlParams.get("data");
  // console.log(uiddata)

  // jab user login kare
  const findlogined = authdata.find((item) => item.uid === uiddata);
  // console.log(findlogined)

  if (findlogined) {
    const head = document.getElementById("authButtons");
    head.innerHTML = `
      <p class="teext">Welcome.. ${findlogined.username} !!</p>
      <button id="logoutBtn" type="button" class="py-2 px-3 rounded-pill">Logout
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    `;

    // Move the event listener inside the conditional block
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      alert("Logged out successfully");
      window.location.href = "index.html";
    });
  }
}
window.onload = userdata;

document.getElementById("Reportsbtn").addEventListener("click", () => {
  window.location.href = "studentdatapage.html";
});

async function fetchBTERData() {
  try {
    const response = await fetch("https://mocki.io/v1/6e1b42c8-1fdc-4097-9d41-132eb048f8be");
    if (!response.ok) {
      throw new Error(`Failed to fetch BTER data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching BTER data:", error);
    return null;
  }
}

async function fetchRBSEData() {
  try {
    const response = await fetch("https://mocki.io/v1/d47cca67-5e4f-43ed-b666-b92f5e505399");
    if (!response.ok) {
      throw new Error(`Failed to fetch RBSE data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching RBSE data:", error);
    return null;
  }
}

function displayBTERData(data) {
  document.getElementById("App_no").value = data.Application_no;
  document.getElementById("Name").value = data.Name;
  document.getElementById("Father's_name").value = data.Father_Name;
  document.getElementById("Mother's_name").value = data.Mother_Name;
  document.getElementById("DOB").value = data.DOB;
  document.getElementById("Gender").value = data.Gender;
  document.getElementById("Category").value = data.Category;
  document.getElementById("Board").value = data.Board;
  document.getElementById("Roll_no").value = data.Roll_no;
  document.getElementById("Year").value = data.Year;
  document.getElementById("Math_mark").value = data.Math_mark;
  document.getElementById("Sci_mark").value = data.Science_mark;
  document.getElementById("Total_op").value = data.total_op;
  document.getElementById("Parsentage").value = `${data.parsentage}%`;
}

function displayRBSEData(data1) {
  console.log(data1);
  document.getElementById("Name1").value = data1.Name;
  document.getElementById("Father's_name1").value = data1.Father_Name;
  document.getElementById("Mother's_name1").value = data1.Mother_Name;
  document.getElementById("DOB1").value = data1.DOB;
  document.getElementById("Gender1").value = data1.Gender;
  document.getElementById("Category1").value = data1.Category;
  document.getElementById("Board1").value = data1.Board;

  document.getElementById("Roll_no1").value = data1.Roll_no;
  document.getElementById("Year1").value = data1.Year;
  document.getElementById("Math_mark1").value = data1.Math_mark;
  document.getElementById("Sci_mark1").value = data1.Science_mark;
  document.getElementById("Total_op1").value = data1.total_op;
  document.getElementById("Parsentage1").value = `${data1.parsentage}%`;
}

async function compareRBSEData(filteredBTERData) {
  try {
    document.getElementById("datas").style.display = "block";

    const RBSEData = await fetchRBSEData();

    if (!RBSEData) {
      throw new Error("Failed to fetch RBSE data");
    }

    const bterRollNo = filteredBTERData[0].Roll_no;
    const matchedRBSEData = RBSEData.find(
      (item) => item.Roll_no === bterRollNo
    );

    console.log(matchedRBSEData);

    if (!matchedRBSEData) {
      console.log("No RBSE data found matching BTER Roll_no.");
      return;
    }

    displayRBSEData(matchedRBSEData);

    //validation button
    document
      .getElementById("stvalidation")
      .addEventListener("click", function () {
        compareAndAddData(filteredBTERData, matchedRBSEData);
      });

    async function compareAndAddData(filteredBTERData, matchedRBSEData) {
      try {
        const BTER = filteredBTERData.map((item) => ({
          ...item,
          id: item.Roll_no,
        }));
        const RBSE = matchedRBSEData;

        console.log(BTER);
        console.log(RBSE);

        if (!BTER || !RBSE) return;

        const matchedItems = BTER.filter((bterItem) => {
          return (
            bterItem.Name === RBSE.Name &&
            bterItem.Father_Name === RBSE.Father_Name &&
            bterItem.Mother_name === RBSE.Mother_name &&
            bterItem.DOB === RBSE.DOB &&
            bterItem.Gender === RBSE.Gender &&
            bterItem.Category === RBSE.Category &&
            bterItem.Roll_no === RBSE.Roll_no &&
            bterItem.Year === RBSE.Year &&
            bterItem.Math_mark === RBSE.Math_mark &&
            bterItem.Science_mark === RBSE.Science_mark &&
            bterItem.total_op === RBSE.total_op &&
            bterItem.parsentage === RBSE.parsentage
          );
        });

        if (matchedItems.length > 0) {
          alert("Data verified successfully!");
          try {
            const response = await fetch(
              "https://retoolapi.dev/Q3833l/Unverified/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(...matchedItems),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error adding matched data:", error);
          }
          window.location.href = window.location.href;
        } else {
          alert("Data verification failed!");
          try {
            const response = await fetch("https://retoolapi.dev/v1yfFA/data/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(...BTER),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error adding unmatched data:", error);
          }
          window.location.href = window.location.href;
        }
      } catch (error) {
        console.error("Error comparing and adding data:", error);
      }
    }
  } catch (error) {
    console.error("Error comparing RBSE data:", error);
  }
}

async function showData() {
  const applicationNumber = document.getElementById("id").value;
  console.log(applicationNumber)

  if (!applicationNumber) {
    alert("Please enter an application number.");
    document.getElementById("datast").style.display = "none";
    return;
  } else {
    document.getElementById("datast").style.display = "block";
  }

  const BTERData = await fetchBTERData();

  if (!BTERData) {
    console.log("Failed to fetch BTER data");
    return;
  }

  const filteredBTERData = BTERData.filter(
    (item) => item.Application_no === Number(applicationNumber)
  );

  if (filteredBTERData.length === 0) {
    console.log("No BTER data found for the provided application number.");
    return;
  }

  console.log(filteredBTERData[0]);

  displayBTERData(filteredBTERData[0]);

  document.getElementById("matchButton").addEventListener("click", function () {
    compareRBSEData(filteredBTERData);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchButton").addEventListener("click", showData);
});
