filterBtn.addEventListener("click", () => {
    let visibleDogs;
    if (filterBtn.innerText === "Filter good dogs: OFF") {
      filterBtn.innerText = "Filter good dogs: ON";
      visibleDogs = allDogs.filter((dog) => dog.isGoodDog);
    } else {
      filterBtn.innerText = "Filter good dogs: OFF";
      visibleDogs = allDogs.filter((dog) => !dog.isGoodDog);
    }
  
    dogBar.innerHTML = "";
    visibleDogs.forEach((dog) => {});
  });
  