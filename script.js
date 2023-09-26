// DOCUMENT ELEMENTS
const leaderboard_div = document.querySelector(".leaderboard");

// SHEETS CONSTANTS
const SHEET_ID = "1KJeXTxnx7_tO_tEq16EfAnXTgauHUAggwm5FqzPYczI";
const SHEET_TITLE = "2023 Term 4 - Hurlstone Tech Club Leaderboard";
const SHEET_RANGE = "A1:D3";

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
            return 0;
        }
    });

    // ADD RANKING TO USER OBJECTS
    sorted_array.map((user, index) => {
        user.rank = index + 1;
    });

    return users_array;
}

getLeaderBoardUsers().then((users) => {
    users.map((user) => {
        user_element = document.createElement("p");

        console.log(user);
        user_element.textContent = `#${user.rank} ${user.firstName} ${user.lastName}, ${user.points}`;

        leaderboard_div.appendChild(user_element);
    });
});
