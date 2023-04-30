// lauren is a pro coder on jesus on my mom and my dad amazing spectacular amazeballs wow! - enzo

//* LEFT SIDE *//
let days = ["S", "M", "T", "W", "T", "F", "S"];
let mon = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// month objects
const jan = { numDays: 31, numSpaces: 0 };
const feb = { numDays: 28, numSpaces: 3 };
const mar = { numDays: 31, numSpaces: 3 };
const apr = { numDays: 30, numSpaces: 6 };
const may = { numDays: 31, numSpaces: 1 };
const jun = { numDays: 30, numSpaces: 4 };
const jul = { numDays: 31, numSpaces: 6 };
const aug = { numDays: 31, numSpaces: 2 };
const sep = { numDays: 30, numSpaces: 5 };
const oct = { numDays: 31, numSpaces: 0 };
const nov = { numDays: 30, numSpaces: 3 };
const dec = { numDays: 31, numSpaces: 5 };
let year = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];

// reference class from html and make a variable that holds all of the month sections
let monWrapper = document.querySelector(".months-wrapper");

for (let i = 0; i < 12; i++) {
  let month = document.createElement("section"); // make new section for each month
  month.classList.add("month-section");
  let title = document.createElement("div"); // make new div for each title
  title.classList.add("title");

  // horizontal line
  let preline = document.createElement("div");
  preline.classList.add("pre-line");
  month.appendChild(preline);

  // month name
  title.innerText = mon[i];

  // horizontal llne
  let postline = document.createElement("div");
  postline.classList.add("post-line");
  month.appendChild(postline);

  month.appendChild(title); // put the title div in the month section
  monWrapper.appendChild(month); // put the month section in the months-wrapper div
}

// get list of all elements with .month-section tag
let monthSections = document.querySelectorAll(".month-section");

let j = 0;
// for each section element with .month-section tag
monthSections.forEach((sec) => {
  // make new div for each day, add to the section
  for (let i = 0; i < 7; i++) {
    let day = document.createElement("div");
    day.classList.add("day");
    let text = document.createElement("p");
    text.innerText = days[i];
    day.appendChild(text);
    sec.appendChild(day);
  }
  // make an empty div at beginning of each month, add to section, reference list of month objects
  for (let i = 1; i <= year[j].numSpaces; i++) {
    let empty = document.createElement("div");
    sec.appendChild(empty);
  }
  // make new div for each date, add to section
  for (let i = 1; i <= year[j].numDays; i++) {
    let box = document.createElement("div");
    box.classList.add("dates");
    box.innerText = i;
    sec.appendChild(box);
  }
  j++;
});

// mark the current day
let todayMarker = document.createElement("img");
todayMarker.classList.add("today");
todayMarker.src = "./current-day.png";

let date = new Date();
let currentDate = date.toLocaleDateString();
let thisMonth = Number(currentDate.substring(0, currentDate.indexOf("/")));
let thisDay = Number(
  currentDate.substring(
    currentDate.indexOf("/") + 1,
    currentDate.lastIndexOf("/")
  )
);

let currMonth = monWrapper.children[thisMonth - 1];
let currMonthDates = [...currMonth.children].filter((element) => {
  return element.classList.contains("dates");
});

currMonthDates[thisDay - 1].appendChild(todayMarker.cloneNode(true));
//currMonthDates[thisDay - 1].style.color = "rgb(87, 99, 120)";

//* RIGHT SIDE *//
let nums = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

// references html to make variables
let eventsWrapper = document.querySelector(".events-wrapper");
let modal = document.querySelector(".pop");
let monthDate = document.querySelector(".month-date");
let star = document.querySelector(".star");

for (let i = 0; i < 12; i++) {
  // new section for each month
  let events = document.createElement("section");
  events.classList.add("event-section");

  // holds the month number and month name
  let eventHeader = document.createElement("div");
  eventHeader.classList.add("event-header");

  // holds the added events
  let eventContent = document.createElement("div");
  eventContent.classList.add("event-content");

  // big month number
  let numberBox = document.createElement("div");
  numberBox.classList.add("number-box");
  let number = document.createElement("p");
  number.innerText = nums[i];
  numberBox.appendChild(number);
  eventHeader.appendChild(numberBox);

  // month name
  let eventMonth = document.createElement("div");
  eventMonth.classList.add("event-month");
  eventMonth.innerText = mon[i];
  eventHeader.appendChild(eventMonth);
  events.appendChild(eventHeader);

  // pop up modal when click on the add event button
  let addEventButton = document.createElement("p");
  addEventButton.classList.add("event-button");
  addEventButton.innerText = " + add event... ";
  addEventButton.addEventListener("click", () => {
    modal.style.visibility = "visible";
    monthDate.innerText = nums[i] + "/";
  });
  eventContent.appendChild(addEventButton);
  events.appendChild(eventContent);

  // add every section to a wrapper
  eventsWrapper.appendChild(events);
}

// 0 padding lead on single digit numbers for the event date
function zeroPadding(input) {
  if (!isNaN(input.value) && input.value.length < 2 && input.value != 0) {
    input.value = "0" + input.value;
  }
  if (!isNaN(input.value) && input.value.length > 2) {
    input.value = input.value.replace("0", "");
  }
}

// star tag toggle when click
let starred = false;
star.addEventListener("click", () => {
  starred = !starred;
  if (!starred) {
    star.src = "./star.png";
  } else {
    star.src = "./filledstar.png";
  }
});

// store information in the pop-up
let confirmButton = document.getElementById("confirm");
confirmButton.addEventListener("click", () => {
  let eventName = document.getElementById("event-name");
  let eventDay = document.getElementById("event-day");
  let month = monthDate.innerText.slice(0, 2);

  // alert user if input is invalid
  if (
    eventName.value.length < 1 &&
    (eventDay.value.length < 1 || isNaN(eventDay.value))
  ) {
    alert("Please enter a valid name and date.");
  } else if (eventName.value.length < 1) {
    alert("Please enter a valid name.");
  } else if (
    eventDay.value.length < 1 ||
    isNaN(eventDay.value) ||
    eventDay.value < 0 ||
    eventDay.value > year[Number(month) - 1].numDays
  ) {
    alert("Please enter a valid date.");
  } else {
    // add to calendar
    addToCalendar(
      Number(month) - 1,
      eventName.value,
      Number(eventDay.value),
      starred
    );

    // clear input fields upon submission
    eventDay.value = "";
    eventName.value = "";
    starred = false;
    star.src = "./star.png";
  }
});

// clear input fields upon cancelation
let cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
  let eventName = document.getElementById("event-name");
  let eventDay = document.getElementById("event-day");
  eventName.value = "";
  eventDay.value = "";
  starred = false;
  star.src = "./star.png";
  modal.style.visibility = "hidden";
});

function addToCalendar(month, name, d, star) {
  let circleOutline = document.createElement("img");
  circleOutline.classList.add("circle-outline");
  circleOutline.src = "./circle-outline.png";
  let starOutline = document.createElement("img");
  starOutline.classList.add("star-outline");
  starOutline.src = "./star-outline.png";

  let mon = monWrapper.children[month];
  let datesList = [...mon.children].filter((element) => {
    return element.classList.contains("dates");
  });

  let markers = datesList[d - 1].children;
  if (markers.length > 0 && d != thisDay) {
    alert("That day is already booked!");
  } else if (!star) {
    datesList[d - 1].appendChild(circleOutline.cloneNode(true));
    modal.style.visibility = "hidden";
  } else if (star) {
    datesList[d - 1].appendChild(starOutline.cloneNode(true));
    modal.style.visibility = "hidden";
  }
  let toDoItem = document.createElement("div");
  toDoItem.classList.add("to-do-item");

  let itemDate = document.createElement("p");
  itemDate.classList.add("item-date");
  itemDate.innerText = "";
  if (d < 10) {
    itemDate.innerText = "0";
  }
  itemDate.innerText += d;

  let itemName = document.createElement("p");
  itemName.innerText = name;

  toDoItem.appendChild(itemDate);
  toDoItem.appendChild(itemName);

  let checkedOff = false;
  toDoItem.addEventListener("click", () => {
    checkedOff = !checkedOff;
    if (checkedOff) {
      toDoItem.style.textDecoration = "line-through";
    } else {
      toDoItem.style.textDecoration = "none";
    }
  });

  let contentBox = document.querySelector(
    `.event-section:nth-child(${month + 2}) .event-content`
  );
  contentBox.prepend(toDoItem);
}
