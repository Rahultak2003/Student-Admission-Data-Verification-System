const authentication = document.getElementsByClassName("authentication");
const registerBtn = document.getElementById("registerBtn");
const registrationForm = document.getElementById("registration-Form");
const loginBtn = document.getElementById("loginBtn");
const login_Form = document.getElementById("login-Form");
const closebtn = document.getElementById("close");
const closebtn1 = document.getElementById("close1");

registerBtn.addEventListener("click", () => {
  registrationForm.style.display = "block";
  login_Form.style.display = "none";
});

loginBtn.addEventListener("click", () => {
  login_Form.style.display = "block";
  registrationForm.style.display = "none";
});

closebtn.addEventListener("click", () => {
  registrationForm.style.display = "none";
});
closebtn1.addEventListener("click", () => {
  login_Form.style.display = "none";
});

// registor form

const regForm = document.getElementById("registerForm");
regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const uiId = document.getElementById("uid").value;
  let checkstatus = 0;

  if (username == "" || email == "" || password == "" || uiId == "") {
    alert("please enter complete data");
  } else {
    let authdata = JSON.parse(localStorage.getItem("authdatadetails")) ?? [];
    for (let data of authdata) {
      if (
        data.username === username ||
        data.email === email ||
        data.password === password ||
        data.uid === uiId
      ) {
        checkstatus = 1;
        break;
      }
    }
    if (checkstatus == 1) {
      alert("Your all ready logined");
    } else {
      authdata.push({
        username: username,
        email: email,
        password: password,
        uid: uiId,
      });

      localStorage.setItem("authdatadetails", JSON.stringify(authdata));
      e.target.reset();
      window.location.href = `userpage.html?data=${uiId}`;
    }
  }
});

const logForm = document.getElementById("loginForm");
logForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const uid1 = document.getElementById("uid1").value;
  const pass1 = document.getElementById("password1").value;

  if (uid1 == "" || pass1 == "") {
    alert("Please enter complete data");
  } else {
    let authdata = JSON.parse(localStorage.getItem("authdatadetails")) ?? [];
    const foundUser = authdata.find(
      (user) => user.uid == uid1 && user.password == pass1
    );

    if (foundUser) {
      alert("Login successful!");
      window.location.href = `userpage.html?data=${uid1}`;
    } else {
      alert("Invalid detalis. Please try again.");
    }
    // authdata.forEach((item) => {
    //   if (item.uid === uid1 || item.password === pass1) {
    //     window.location.href = "userpage.html"
    //   } else {
    //   }
    // });
  }
});

