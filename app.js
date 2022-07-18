"use strict";

const STAR_CHARACTER = "&#9733;"; // utf-8 star character

// event handler for click, mouse over and out events
const starRatingEv = function (event) {
  const currStar = this;

  if (event.type === "click") {
    currStar.parentNode.ratingValue = currStar.ratingValue;
    currStar.parentNode.nextElementSibling.textContent = `You rated it with ${
      currStar.ratingValue
    } ${currStar.ratingValue > 1 ? "stars" : "star"}!`;
  }

  currStar.parentNode.querySelectorAll("li.star").forEach((li) => {
    if (event.type === "mouseover") {
      li.classList.remove("rated");
      if (li.ratingValue <= currStar.ratingValue) {
        li.classList.add("selected");
      }
    } else if (event.type === "mouseout") {
      li.classList.remove("selected");
      if (currStar.parentNode.ratingValue !== 0) {
        if (li.ratingValue <= currStar.parentNode.ratingValue) {
          li.classList.add("rated");
        }
      }
    } else {
      // star was clicked
      li.classList.remove("selected");
      if (li.ratingValue <= currStar.ratingValue) {
        li.classList.add("rated");
      }
    }
  });
};

// create elements for stars-rating and setup events
document.querySelectorAll(".stars-rating-wrapper").forEach((ratingWrapper) => {
  const ul = document.createElement("ul");
  ul.classList.add("stars-rating");
  ul.ratingValue = 0;

  for (let i = 1; i <= 5; i++) {
    const li = document.createElement("li");
    li.classList.add("star");
    li.ratingValue = i;
    li.innerHTML = STAR_CHARACTER;

    // one event handler for mouseover, mouseout and click events
    ["mouseover", "mouseout", "click"].forEach((eventName) =>
      li.addEventListener(eventName, starRatingEv)
    );

    ul.appendChild(li);
  }

  ratingWrapper.appendChild(ul);

  const info = document.createElement("div");
  info.classList.add("ratings-info");
  info.textContent = "Rate it!";

  ratingWrapper.appendChild(info);
});
