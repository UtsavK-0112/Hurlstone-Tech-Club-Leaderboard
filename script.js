// DOCUMENT ELEMENTS
const leaderboard_div = document.querySelector(".leaderboard");
const date_span = document.querySelector(".date");

function displayDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    date_text = `Date: ${curr_date}/${curr_month}/${curr_year}`;
    date_span.textContent = date_text;
}

fetch("https://tech-club-api.onrender.com/leaderboard-users")
    .then((response) => response.json())
    .then((users) => {
        document.querySelector(".loading").remove();
        users.map((user) => {
            user_element = document.createElement("span");
            user_element.classList.add("leaderboard__row");

            user_element.innerHTML = `<p>#${user.rank}</p><p>${user.firstName} ${user.lastName}</p><p class="point">${user.points}</p>`;

            if (user.rank == 1) {
                user_element.classList.add("leaderboard__row--first");
            } else if (user.rank == 2) {
                user_element.classList.add("leaderboard__row--second");
            } else if (user.rank == 3) {
                user_element.classList.add("leaderboard__row--third");
            }

            leaderboard_div.appendChild(user_element);
        });
    });

displayDate();
