// CONSTANTS

const max_rank = 5;

// DOCUMENT ELEMENTS
const leaderboard_div = document.querySelector(".leaderboard");
const date_span = document.querySelector(".date");

// SHEETS VALUES
const SHEET_ID = "1KJeXTxnx7_tO_tEq16EfAnXTgauHUAggwm5FqzPYczI";
const SHEET_TITLE = "2023 Term 4 - Hurlstone Tech Club Leaderboard";
const SHEET_RANGE = "A1:D50";

const FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

async function getLeaderBoardUsers() {
    const response = await fetch(FULL_URL);
    const body = await response.text();

    json = JSON.parse(body.slice(47, -2)); // Extracting Raw JS Object from body text
    rows = json.table.rows;

    users_array = rows.map((value, index) => {
        person = value.c;

        rank = 0;
        firstName = person[0].v;
        lastName = person[1].v;
        points = person[2].v;
        email = person[3].v;

        return { firstName, lastName, points, email };
    });

    // SORT USERS BASED ON THIER POINTS
    sorted_array = users_array.sort((userA, userB) => {
        if (userA.points > userB.points) {
            return -1;
        } else if (userB.points > userA.points) {
            return 1;
        } else {
            if (userA.firstName < userB.firstName) {
                return -1;
            } else {
                return 1;
            }
        }
    });

    // ADD RANKING TO USER OBJECTS
    current_rank = 1;
    sorted_array.map((user, index) => {
        user.rank = current_rank;
        next_user =
            index + 1 == sorted_array.length ? null : sorted_array[index + 1];

        if (next_user) {
            if (next_user.points !== user.points) {
                current_rank += 1;
            }
        }
    });

    // ONLY GET THE TOP USERS
    top_users = sorted_array.filter((user) => {
        return user.rank <= max_rank;
    });

    return top_users;
}

function displayDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    date_text = `Date: ${curr_date}/${curr_month}/${curr_year}`;
    date_span.textContent = date_text;
}

getLeaderBoardUsers().then((users) => {
    console.log(users);
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
