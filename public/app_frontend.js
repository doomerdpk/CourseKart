// Course Section
function courseComponent(data) {
  // Create 3 elements: parent div, image, and child div
  const parentDiv = document.createElement("div");
  const imageEl = document.createElement("img");
  const childDiv = document.createElement("div");

  //Create children of child div elements
  const pEl = document.createElement("p");
  const p1El = document.createElement("p");
  const p2El = document.createElement("p");
  const p3El = document.createElement("p");
  const p4El = document.createElement("p");

  // Add properties to these elements
  parentDiv.classList.add("card");
  parentDiv.style.width = "18rem";
  parentDiv.style.marginBottom = "2vh";
  parentDiv.style.marginRight = "1vh";
  parentDiv.style.marginLeft = "1vh";

  imageEl.classList.add("card-img-top");
  imageEl.setAttribute("src", data.imageUrl);
  imageEl.setAttribute("alt", "Course-Image");
  imageEl.style.width = "100%";
  imageEl.style.height = "50%";

  pEl.innerHTML = `<b>${data.title}</b>`;
  p1El.innerHTML = data.description;
  p1El.classList.add("lead");
  p2El.innerHTML = `<b>Price:</b> Rs.` + data.price;
  p2El.classList.add("lead");
  p3El.innerHTML = `<b>Course Creator:</b>` + data.creatorName;
  p3El.classList.add("lead");
  p4El.innerHTML = `<b>Course ID:</b>` + data._id;

  childDiv.classList.add("card-body");
  childDiv.style.color = "black";

  // Append the children to parent div
  childDiv.appendChild(pEl);
  childDiv.appendChild(p1El);
  childDiv.appendChild(p2El);
  childDiv.appendChild(p3El);
  childDiv.appendChild(p4El);
  parentDiv.appendChild(imageEl);
  parentDiv.appendChild(childDiv);

  return parentDiv;
}

function render(data, id) {
  document.getElementById(id).innerHTML = "";
  if (data.empty_message) {
    document.getElementById(id).innerHTML = `<h1>${data.empty_message}</h1>`;
    return;
  }

  for (let i = 0; i < data.message.length; i++) {
    let message = courseComponent(data.message[i]);
    document.getElementById(id).appendChild(message);
  }
}

async function previewCourses() {
  document.getElementById("app-description").style.display = "none";
  const courses = await axios.get(
    "http://localhost:3000/api/v1/course/preview"
  );
  document.getElementById("homepage-btn").style.display = "block";
  render(courses.data, "course-preview");
}

//Normal User Section
function UserLoginFormComponent() {
  const parentEl = document.createElement("div");
  parentEl.style.backgroundColor = "transparent";
  const child1El = document.createElement("div");
  child1El.style.backgroundColor = "transparent";
  const child2El = document.createElement("div");
  child2El.style.backgroundColor = "transparent";

  const brEL = document.createElement("br");

  const emailEl = document.createElement("input");
  const passwordEl = document.createElement("input");
  const email2El = document.createElement("input");
  const password2El = document.createElement("input");
  const firstNameEl = document.createElement("input");
  const lastNameEl = document.createElement("input");
  const signupEl = document.createElement("button");
  const loginEl = document.createElement("button");

  parentEl.classList.add("card");
  parentEl.classList.add("text-center");
  child1El.classList.add("card-header");
  child2El.classList.add("card-body");

  emailEl.setAttribute("type", "text");
  emailEl.setAttribute("placeholder", "Enter your email...");
  emailEl.setAttribute("id", "useremail");
  emailEl.style.marginRight = "1vw";
  passwordEl.setAttribute("type", "text");
  passwordEl.setAttribute("placeholder", "Enter your password...");
  passwordEl.setAttribute("id", "userpassword");
  passwordEl.style.marginRight = "1vw";
  firstNameEl.setAttribute("type", "text");
  firstNameEl.setAttribute("placeholder", "Enter your First name...");
  firstNameEl.setAttribute("id", "userfirstname");
  firstNameEl.style.marginRight = "1vw";
  firstNameEl.style.marginTop = "1vh";
  lastNameEl.setAttribute("type", "text");
  lastNameEl.setAttribute("placeholder", "Enter your Last name...");
  lastNameEl.setAttribute("id", "userlastname");
  lastNameEl.style.marginRight = "1vw";
  lastNameEl.style.marginRight = "1vw";
  signupEl.setAttribute("type", "button");
  signupEl.setAttribute("onclick", "UserSignUp()");
  signupEl.classList.add("btn");
  signupEl.classList.add("btn-primary");
  signupEl.innerHTML = "Signup";
  signupEl.style.marginTop = "1vh";
  signupEl.style.marginRight = "0.5vw";
  signupEl.style.marginBottom = "1vh";
  email2El.setAttribute("type", "text");
  email2El.setAttribute("placeholder", "Enter your email...");
  email2El.setAttribute("id", "user2email");
  email2El.style.marginRight = "1vw";
  password2El.setAttribute("type", "text");
  password2El.setAttribute("placeholder", "Enter your password...");
  password2El.setAttribute("id", "user2password");
  password2El.style.marginRight = "1vw";
  loginEl.setAttribute("type", "button");
  loginEl.setAttribute("onclick", "LoginUser()");
  loginEl.classList.add("btn");
  loginEl.classList.add("btn-primary");
  loginEl.style.marginTop = "1vh";
  loginEl.innerHTML = "login";

  child1El.innerHTML = "<h4>Welcome to CourseKart, Your Learning Buddy!</h4>";

  child2El.appendChild(emailEl);
  child2El.appendChild(passwordEl);
  child2El.appendChild(firstNameEl);
  child2El.appendChild(lastNameEl);
  child2El.appendChild(signupEl);
  child2El.appendChild(brEL);
  child2El.appendChild(email2El);
  child2El.appendChild(password2El);
  child2El.appendChild(loginEl);
  parentEl.append(child1El, child2El);

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "button");
  buttonEl.classList.add("btn", "btn-primary");
  buttonEl.innerHTML = "Go Back to Home Page";
  buttonEl.style.marginTop = "1vh";
  buttonEl.setAttribute("onclick", "location.reload()");

  document.getElementById("signup-login").appendChild(parentEl);
  document.getElementById("signup-login").appendChild(buttonEl);
}

async function UserSignUp() {
  const email = document.getElementById("useremail").value;
  const password = document.getElementById("userpassword").value;
  const firstName = document.getElementById("userfirstname").value;
  const lastName = document.getElementById("userlastname").value;

  const response = await axios.post(
    "http://localhost:3000/api/v1/user/signup",
    {
      email,
      password,
      firstName,
      lastName,
    }
  );

  if (response.data.error) {
    alert(response.data.error);
    return;
  }

  alert(response.data.message);
  document.getElementById("useremail").value = "";
  document.getElementById("userpassword").value = "";
  document.getElementById("userfirstname").value = "";
  document.getElementById("userlastname").value = "";
}

function UserLogin() {
  document.getElementById("signup-login").innerHTML = "";
  document.getElementById("authAdmin").style.display = "none";
  document.getElementById("authUser").style.display = "none";
  document.getElementById("app-description").style.display = "none";
  document.getElementById("homepage-btn").style.display = "none";
  document.getElementById("course-preview").style.display = "none";
  document.getElementById("signup-login").style.display = "block";

  UserLoginFormComponent();
}

function LogOut() {
  localStorage.setItem("token", "");
  location.reload();
}

function UserDetailsComponent(userName) {
  const loggedInUser = document.createElement("div");

  const h4El = document.createElement("h4");
  h4El.innerHTML = `<b>Current Logged in user is:</b>` + userName;
  const logoutbtn = document.createElement("button");
  logoutbtn.innerHTML = "Log out";
  logoutbtn.setAttribute("onclick", "LogOut()");
  logoutbtn.setAttribute("type", "button");
  logoutbtn.classList.add("btn");
  logoutbtn.classList.add("btn-primary");
  const h3El = document.createElement("h3");
  h3El.innerHTML = "List of your purchased courses:";

  loggedInUser.append(h4El, logoutbtn, h3El);
  document.getElementById("authUser").appendChild(loggedInUser);
}

function UserPurchasedCourseComponent(data) {
  const purchasedCourses = document.createElement("div");
  purchasedCourses.setAttribute("id", "purchases");
  purchasedCourses.style.marginTop = "1vh";
  document.getElementById("authUser").append(purchasedCourses);
  render(data, "purchases");
  purchasedCourses.style.display = "flex";
  purchasedCourses.style.justifyContent = "center";
}

async function purchase() {
  const courseId = document.getElementById("courseId").value;
  const token = localStorage.getItem("token");
  const purchaseCourse = await axios.post(
    "http://localhost:3000/api/v1/user/purchase-course",
    {
      courseId,
    },
    {
      headers: {
        token,
      },
    }
  );

  if (purchaseCourse.data.error) {
    alert(purchaseCourse.data.error);
    return;
  }

  alert(purchaseCourse.data.message);
  document.getElementById("courseId").value = "";

  const purchases = await axios.get(
    "http://localhost:3000/api/v1/user/my-purchased-courses",
    {
      headers: {
        token: token,
      },
    }
  );

  UserPurchasedCourseComponent(purchases.data);
}

function UserPurchaseComponent() {
  const purchaseCourse = document.createElement("div");
  purchaseCourse.style.borderTop = "1px solid grey";
  const header = document.createElement("h5");
  header.innerHTML = "Purchase a New Course:";
  const courseId = document.createElement("input");
  courseId.setAttribute("type", "text");
  courseId.setAttribute("placeholder", "Enter Course Id...");
  courseId.setAttribute("id", "courseId");
  const purchasebtn = document.createElement("button");
  purchasebtn.setAttribute("type", "button");
  purchasebtn.setAttribute("onclick", "purchase()");
  purchasebtn.classList.add("btn");
  purchasebtn.classList.add("btn-primary");
  purchasebtn.innerHTML = "Purchase Course";
  purchasebtn.style.marginLeft = "1vw";
  purchaseCourse.append(header, courseId, purchasebtn);
  document.getElementById("authUser").appendChild(purchaseCourse);
}

async function LoginUser() {
  document.getElementById("authUser").innerHTML = "";
  document.getElementById("authAdmin").style.display = "none";
  document.getElementById("app-description").style.display = "none";
  document.getElementById("homepage-btn").style.display = "none";
  document.getElementById("course-preview").style.display = "none";
  document.getElementById("authUser").style.display = "block";

  const email = document.getElementById("user2email").value;
  const password = document.getElementById("user2password").value;

  const response = await axios.post("http://localhost:3000/api/v1/user/login", {
    email,
    password,
  });
  if (response.data.error) {
    alert(response.data.error);
    document.getElementById("user2email").value = "";
    document.getElementById("user2password").value = "";
    return;
  }

  document.getElementById("signup-login").style.display = "none";

  localStorage.setItem("token", response.data.token);
  alert(response.data.message);

  UserDetailsComponent(response.data.userName);

  const token = localStorage.getItem("token");

  const purchases = await axios.get(
    "http://localhost:3000/api/v1/user/my-purchased-courses",
    {
      headers: {
        token: token,
      },
    }
  );

  UserPurchasedCourseComponent(purchases.data);

  UserPurchaseComponent();
}

//Admin Section

function AdminLoginFormComponent() {
  const parentEl = document.createElement("div");
  parentEl.style.backgroundColor = "transparent";
  const child1El = document.createElement("div");
  child1El.style.backgroundColor = "transparent";
  const child2El = document.createElement("div");
  child2El.style.backgroundColor = "transparent";
  const brEL = document.createElement("br");

  const emailEl = document.createElement("input");
  const passwordEl = document.createElement("input");
  const email2El = document.createElement("input");
  const password2El = document.createElement("input");
  const firstNameEl = document.createElement("input");
  const lastNameEl = document.createElement("input");
  const signupEl = document.createElement("button");
  const loginEl = document.createElement("button");

  parentEl.classList.add("card");
  parentEl.classList.add("text-center");
  child1El.classList.add("card-header");
  child2El.classList.add("card-body");

  emailEl.setAttribute("type", "text");
  emailEl.setAttribute("placeholder", "Enter your email...");
  emailEl.setAttribute("id", "adminemail");
  emailEl.style.marginRight = "1vw";
  passwordEl.setAttribute("type", "text");
  passwordEl.setAttribute("placeholder", "Enter your password...");
  passwordEl.setAttribute("id", "adminpassword");
  passwordEl.style.marginRight = "1vw";
  firstNameEl.setAttribute("type", "text");
  firstNameEl.setAttribute("placeholder", "Enter your First name...");
  firstNameEl.setAttribute("id", "adminfirstname");
  firstNameEl.style.marginRight = "1vw";
  firstNameEl.style.marginTop = "1vh";
  lastNameEl.setAttribute("type", "text");
  lastNameEl.setAttribute("placeholder", "Enter your Last name...");
  lastNameEl.setAttribute("id", "adminlastname");
  lastNameEl.style.marginRight = "1vw";
  lastNameEl.style.marginRight = "1vw";
  signupEl.setAttribute("type", "button");
  signupEl.setAttribute("onclick", "AdminSignUp()");
  signupEl.classList.add("btn");
  signupEl.classList.add("btn-primary");
  signupEl.innerHTML = "Signup";
  signupEl.style.marginTop = "1vh";
  signupEl.style.marginRight = "0.5vw";
  signupEl.style.marginBottom = "1vh";
  email2El.setAttribute("type", "text");
  email2El.setAttribute("placeholder", "Enter your email...");
  email2El.setAttribute("id", "admin2email");
  email2El.style.marginRight = "1vw";
  password2El.setAttribute("type", "text");
  password2El.setAttribute("placeholder", "Enter your password...");
  password2El.setAttribute("id", "admin2password");
  password2El.style.marginRight = "1vw";
  loginEl.setAttribute("type", "button");
  loginEl.setAttribute("onclick", "LoginAdmin()");
  loginEl.classList.add("btn");
  loginEl.classList.add("btn-primary");
  loginEl.style.marginTop = "1vh";
  loginEl.innerHTML = "login";

  child1El.innerHTML = "<h4>Welcome to CourseKart, Your Learning Buddy!</h4>";

  child2El.appendChild(emailEl);
  child2El.appendChild(passwordEl);
  child2El.appendChild(firstNameEl);
  child2El.appendChild(lastNameEl);
  child2El.appendChild(signupEl);
  child2El.appendChild(brEL);
  child2El.appendChild(email2El);
  child2El.appendChild(password2El);
  child2El.appendChild(loginEl);
  parentEl.append(child1El, child2El);

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "button");
  buttonEl.classList.add("btn", "btn-primary");
  buttonEl.innerHTML = "Go Back to Home Page";
  buttonEl.style.marginTop = "1vh";
  buttonEl.setAttribute("onclick", "location.reload()");

  document.getElementById("signup-login").appendChild(parentEl);
  document.getElementById("signup-login").appendChild(buttonEl);
}

async function AdminSignUp() {
  const email = document.getElementById("adminemail").value;
  const password = document.getElementById("adminpassword").value;
  const firstName = document.getElementById("adminfirstname").value;
  const lastName = document.getElementById("adminlastname").value;

  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/signup",
    {
      email,
      password,
      firstName,
      lastName,
    }
  );

  if (response.data.error) {
    alert(response.data.error);
    return;
  }

  alert(response.data.message);
  document.getElementById("adminemail").value = "";
  document.getElementById("adminpassword").value = "";
  document.getElementById("adminfirstname").value = "";
  document.getElementById("adminlastname").value = "";
}

function AdminLogin() {
  document.getElementById("signup-login").innerHTML = "";
  document.getElementById("authAdmin").style.display = "none";
  document.getElementById("authUser").style.display = "none";
  document.getElementById("app-description").style.display = "none";
  document.getElementById("homepage-btn").style.display = "none";
  document.getElementById("course-preview").style.display = "none";
  document.getElementById("signup-login").style.display = "block";

  AdminLoginFormComponent();
}

function AdminDetailsComponent(userName) {
  const loggedInAdmin = document.createElement("div");

  const h4El = document.createElement("h4");
  h4El.innerHTML = `<b>Current Logged in admin is:</b>` + userName;
  const logoutbtn = document.createElement("button");
  logoutbtn.innerHTML = "Log out";
  logoutbtn.setAttribute("onclick", "LogOut()");
  logoutbtn.setAttribute("type", "button");
  logoutbtn.classList.add("btn");
  logoutbtn.classList.add("btn-primary");
  const h3El = document.createElement("h3");
  h3El.innerHTML = "List of your created courses:";

  loggedInAdmin.append(h4El, logoutbtn, h3El);
  document.getElementById("authAdmin").appendChild(loggedInAdmin);
}

function AdminCreatedCourseComponent(data) {
  const createdCourses = document.createElement("div");
  createdCourses.setAttribute("id", "courses");
  createdCourses.style.marginTop = "1vh";
  document.getElementById("authAdmin").append(createdCourses);
  render(data, "courses");
  createdCourses.style.display = "flex";
  createdCourses.style.justifyContent = "center";
}

async function createCourse() {
  const title = document.getElementById("createtitle").value;
  const description = document.getElementById("createdescription").value;
  const price = +document.getElementById("createprice").value;
  const imageUrl = document.getElementById("createimage").value;
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/create-course",
    {
      title,
      description,
      price,
      imageUrl,
    },
    {
      headers: {
        token,
      },
    }
  );

  if (response.data.error) {
    alert(response.data.error);
    document.getElementById("createtitle").value = "";
    document.getElementById("createdescription").value = "";
    document.getElementById("createprice").value = "";
    document.getElementById("createimage").value = "";
    return;
  }

  alert(response.data.message);
  document.getElementById("createtitle").value = "";
  document.getElementById("createdescription").value = "";
  document.getElementById("createprice").value = "";
  document.getElementById("createimage").value = "";

  const courses = await axios.get(
    "http://localhost:3000/api/v1/admin/my-created-courses",
    {
      headers: {
        token: token,
      },
    }
  );
  AdminCreatedCourseComponent(courses.data);
}

async function updateCourse() {
  const courseId = document.getElementById("updatecourse").value;
  const updatedtitle = document.getElementById("updatetitle").value;
  const updateddescription = document.getElementById("updatedescription").value;
  const updatedprice = +document.getElementById("updateprice").value;
  const updatedimageUrl = document.getElementById("updateimage").value;
  const token = localStorage.getItem("token");

  const response = await axios.put(
    "http://localhost:3000/api/v1/admin/update-course",
    {
      courseId,
      updatedtitle,
      updateddescription,
      updatedprice,
      updatedimageUrl,
    },
    {
      headers: {
        token,
      },
    }
  );

  if (response.data.error) {
    alert(response.data.error);
    document.getElementById("updatecourse").value = "";
    document.getElementById("updatetitle").value = "";
    document.getElementById("updatedescription").value = "";
    document.getElementById("updateprice").value = "";
    document.getElementById("updateimage").value = "";
    return;
  }

  alert(response.data.message);
  document.getElementById("updatecourse").value = "";
  document.getElementById("updatetitle").value = "";
  document.getElementById("updatedescription").value = "";
  document.getElementById("updateprice").value = "";
  document.getElementById("updateimage").value = "";

  const courses = await axios.get(
    "http://localhost:3000/api/v1/admin/my-created-courses",
    {
      headers: {
        token: token,
      },
    }
  );
  AdminCreatedCourseComponent(courses.data);
}

async function deleteCourse() {
  const courseId = document.getElementById("deletecourse").value;
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    "http://localhost:3000/api/v1/admin/delete-course",
    {
      headers: {
        token,
      },
      data: {
        courseId,
      },
    }
  );

  if (response.data.error) {
    alert(response.data.error);
    document.getElementById("deletecourse").value = "";
    return;
  }

  alert(response.data.message);
  document.getElementById("deletecourse").value = "";

  const courses = await axios.get(
    "http://localhost:3000/api/v1/admin/my-created-courses",
    {
      headers: {
        token: token,
      },
    }
  );
  AdminCreatedCourseComponent(courses.data);
}

function AdminCreateUpdateDeleteComponent() {
  const parentEl = document.createElement("div");
  parentEl.style.marginTop = "1.5vh";
  parentEl.style.borderTop = "1px solid grey";
  const createEl = document.createElement("div");
  createEl.style.width = "30%";
  const updateEl = document.createElement("div");
  updateEl.style.width = "30%";
  const deleteEl = document.createElement("div");
  deleteEl.style.width = "30%";

  const brEl = document.createElement("br");
  //create-course
  const createHeader = document.createElement("h5");
  createHeader.innerHTML = "Create a New Course:";
  const titleEl = document.createElement("input");
  titleEl.setAttribute("type", "text");
  titleEl.setAttribute("placeholder", "Title of the course...");
  titleEl.setAttribute("id", "createtitle");
  const descriptionEl = document.createElement("input");
  descriptionEl.setAttribute("type", "text");
  descriptionEl.setAttribute("placeholder", "Description of the course...");
  descriptionEl.setAttribute("id", "createdescription");
  const priceEl = document.createElement("input");
  priceEl.setAttribute("type", "number");
  priceEl.setAttribute("placeholder", "Price of the course...");
  priceEl.setAttribute("id", "createprice");
  const imageEl = document.createElement("input");
  imageEl.setAttribute("type", "text");
  imageEl.setAttribute("placeholder", "Image for the course...");
  imageEl.setAttribute("id", "createimage");
  const createbtn = document.createElement("button");
  createbtn.setAttribute("type", "button");
  createbtn.setAttribute("onclick", "createCourse()");
  createbtn.innerHTML = "Create-Course";
  createbtn.classList.add("btn", "btn-primary");
  createbtn.style.marginTop = "1vh";
  createEl.append(
    createHeader,
    titleEl,
    descriptionEl,
    priceEl,
    imageEl,
    createbtn
  );

  //update-course
  const updateHeader = document.createElement("h5");
  updateHeader.innerHTML = "Update an Existing Course:";
  const updateCourse = document.createElement("input");
  updateCourse.setAttribute("type", "text");
  updateCourse.setAttribute("placeholder", "CourseId of the Course...");
  updateCourse.setAttribute("id", "updatecourse");
  const updatetitleEl = document.createElement("input");
  updatetitleEl.setAttribute("type", "text");
  updatetitleEl.setAttribute("placeholder", "Title of the course...");
  updatetitleEl.setAttribute("id", "updatetitle");
  const updatedescriptionEl = document.createElement("input");
  updatedescriptionEl.setAttribute("type", "text");
  updatedescriptionEl.setAttribute(
    "placeholder",
    "Description of the course..."
  );
  updatedescriptionEl.setAttribute("id", "updatedescription");
  const updatepriceEl = document.createElement("input");
  updatepriceEl.setAttribute("type", "text");
  updatepriceEl.setAttribute("placeholder", "Price of the course...");
  updatepriceEl.setAttribute("id", "updateprice");
  const updateimageEl = document.createElement("input");
  updateimageEl.setAttribute("type", "text");
  updateimageEl.setAttribute("placeholder", "Image for the course...");
  updateimageEl.setAttribute("id", "updateimage");
  const updatebtn = document.createElement("button");
  updatebtn.setAttribute("type", "button");
  updatebtn.setAttribute("onclick", "updateCourse()");
  updatebtn.innerHTML = "Update-Course";
  updatebtn.classList.add("btn", "btn-primary");
  updatebtn.style.marginTop = "1vh";
  updatebtn.style.marginLeft = "1vw";
  updateEl.append(
    updateHeader,
    updateCourse,
    updatetitleEl,
    updatedescriptionEl,
    updatepriceEl,
    updateimageEl,
    updatebtn
  );

  //delete-course
  const deleteHeader = document.createElement("h5");
  deleteHeader.innerHTML = "Delete an Existing Course:";
  const courseId = document.createElement("input");
  courseId.setAttribute("type", "text");
  courseId.setAttribute("placeholder", "Enter Course Id....");
  courseId.setAttribute("id", "deletecourse");
  const deletebtn = document.createElement("button");
  deletebtn.setAttribute("type", "button");
  deletebtn.setAttribute("onclick", "deleteCourse()");
  deletebtn.innerHTML = "Delete-Course";
  deletebtn.classList.add("btn", "btn-primary");
  deletebtn.style.marginTop = "1vh";
  const h6El = document.createElement("h6");
  h6El.innerHTML = "Warning: Proceed with caution. Irreversible!";
  h6El.style.color = "red";
  deleteEl.append(deleteHeader, courseId, brEl, h6El, deletebtn);

  parentEl.append(createEl, updateEl, deleteEl);
  parentEl.style.display = "flex";
  parentEl.style.justifyContent = "center";
  document.getElementById("authAdmin").appendChild(parentEl);
}

async function LoginAdmin() {
  document.getElementById("authAdmin").innerHTML = "";
  document.getElementById("authUser").style.display = "none";
  document.getElementById("app-description").style.display = "none";
  document.getElementById("homepage-btn").style.display = "none";
  document.getElementById("course-preview").style.display = "none";
  document.getElementById("authAdmin").style.display = "block";

  const email = document.getElementById("admin2email").value;
  const password = document.getElementById("admin2password").value;

  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/login",
    {
      email,
      password,
    }
  );
  if (response.data.error) {
    alert(response.data.error);
    document.getElementById("admin2email").value = "";
    document.getElementById("admin2password").value = "";
    return;
  }

  document.getElementById("signup-login").style.display = "none";

  localStorage.setItem("token", response.data.token);
  alert(response.data.message);

  AdminDetailsComponent(response.data.userName);

  const token = localStorage.getItem("token");

  const courses = await axios.get(
    "http://localhost:3000/api/v1/admin/my-created-courses",
    {
      headers: {
        token: token,
      },
    }
  );
  AdminCreatedCourseComponent(courses.data);

  AdminCreateUpdateDeleteComponent();
}
