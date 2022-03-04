const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const filterBtn = document.querySelector("#good-dog-filter");
const allDogsArray = [];

fetch("http://localhost:3000/pups")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((dogObj) => {
      allDogsArray.push(dogObj);
      createSpan(dogObj);
    });
  });

function createSpan(dogObj) {
  let span = document.createElement("span");
  span.textContent = dogObj.name;

  span.addEventListener("click", () => {
    renderDog(dogObj);
  });

  dogBar.appendChild(span);
}

function renderDog(dogObj) {
  dogInfo.textContent = "";

  const dogName = document.createElement("h2");
  const dogImage = document.createElement("img");
  const dogStatusBtn = document.createElement("button");

  dogName.textContent = dogObj.name;
  dogImage.src = `${dogObj.image}`;

  if (dogObj.isGoodDog) {
    dogStatusBtn.textContent = "Good Dog!";
  } else {
    dogStatusBtn.textContent = "Bad Dog!";
  }

  dogStatusBtn.addEventListener("click", () => {
    dogObj.isGoodDog = !dogObj.isGoodDog;

    if (dogObj.isGoodDog) {
      dogStatusBtn.textContent = "Good Dog!";
    } else {
      dogStatusBtn.textContent = "Bad Dog!";
    }

    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ isGoodDog: dogObj.isGoodDog }),
    }).then((response) => response.json());
    // .then((data) => console.log(data));
  });

  dogInfo.append(dogName, dogImage, dogStatusBtn);
}

filterBtn.addEventListener("click", (e) => {
  if (e.target.textContent === "Filter good dogs: OFF") {
    let visibleDogsArray = allDogsArray.filter((dog) => dog.isGoodDog);
    dogBar.textContent = "";
    visibleDogsArray.forEach((dogObj) => createSpan(dogObj));

    e.target.textContent = "Filter good dogs: ON";
  } else {
    dogBar.textContent = "";
    allDogsArray.forEach((dogObj) => createSpan(dogObj));
    e.target.textContent = "Filter good dogs: OFF";
  }
});
