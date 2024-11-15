let editBtns = document.getElementsByClassName("edit-btn");
let trashBtns = document.getElementsByClassName("trash-btn");
let submitBtns = document.getElementsByClassName("submit-btn");

Array.from(editBtns).forEach(function (editBtn) {
  editBtn.addEventListener("click", function () {


    Array.from(editBtn.closest("form").querySelectorAll(".title-input")).forEach(element => element.classList.toggle('show-input'))
    Array.from(editBtn.closest("form").querySelectorAll(".genre-input")).forEach(element => element.classList.toggle('show-input'))
    Array.from(editBtn.closest("form").querySelectorAll(".year-input")).forEach(element => element.classList.toggle('show-input'))
    Array.from(editBtn.closest("form").querySelectorAll(".submit-btn")).forEach(element => element.classList.toggle('show-input'))

  });
});

Array.from(submitBtns).forEach(function (submitBtn) {
    submitBtn.addEventListener("click", function(event) {
      event.preventDefault()  
      let parentElement = submitBtn.closest("li");
      const orginalTitle = parentElement.querySelector(".movie-title");
      const orginalGenre = parentElement.querySelector(".movie-genre");
      const orginalYear = parentElement.querySelector(".movie-year");
      const newTitle = parentElement.querySelector(".title-input");
      const newGenre = parentElement.querySelector(".genre-input");
      const newYear = parentElement.querySelector(".year-input");


      fetch("movies", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "title": orginalTitle.innerText.trim(),
          "newTitle": newTitle.value.trim(),
          "genre": orginalGenre.innerText.trim(),
          "newGenre": newGenre.value.trim(),
          "year": orginalYear.innerText.trim(),
          "newYear": newYear.value.trim()
          
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          console.log(data);
          window.location.reload(true);
        });
    })
})

Array.from(trashBtns).forEach(function (element) {
  element.addEventListener("click", function () {
    const title = this.parentNode.parentNode.childNodes[1].innerText;
    const genre = this.parentNode.parentNode.childNodes[5].innerText;
    const year = this.parentNode.parentNode.childNodes[9].innerText;
    fetch("movies", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": title,
        "genre": genre,
        "year": year
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
