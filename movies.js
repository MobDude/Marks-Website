const movies = [
    {
        title: "Interstellar",
        year: 2014,
        rating: 9.9,
        minutes: 169,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        comment: ""
    },
    {
        title: "The Adventures of Pluto Nash",  
        year: 2002,
        rating: 4.1,
        minutes: 95,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/96vvhLWWDosS1zRrfQ6XEGAzByL.jpg",
        comment: ""
    },
    {
        title: "Spaceballs",  
        year: 1987,
        rating: 7.7,
        minutes: 96,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/kNbaxEsnCyWBTfANVPHayujBsxp.jpg",
        comment: ""

    },
    {
        title: "The Stranger by the Shore" ,
        year: 2020,
        rating: 3.0,
        minutes: 59,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/4m74lboTcvrmnCM506t4y4c3klc.jpg",
        comment: ""
    },
    {
        title: "Jerry &, Marge Go Large" ,
        year: 2022,
        rating: 8.0,
        minutes: 96,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/bbBGSm1kjgmZ0O3bPUQIbA0xlKQ.jpg",
        comment: ""
    },
    {
        title: "Bit",
        year: 2019,
        rating: 2.92,
        minutes:94,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9SlKmu0a1G1eihI29WMQogBWgzr.jpg",
        comment: ""
    },
    {
        title: "The Ribald Tales of Robin Hood",
        year: 1969,
        rating: 0.3,
        minutes: 77,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/ph4jqjQczR32uaD7Fho5cmHkKmr.jpg",
        comment: ""
    },
    {
        title: "American Psycho",
        year: 2000,
        rating: 9.21,
        minutes: 102,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
        comment: ""
    },
    {
        title: "Treasure Planet",
        year: 2002,
        rating: 8.38,
        minutes: 96,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/kNhZkR3UNbXfvESQo7mJpOi4tGd.jpg",
        comment: ""
    },
    {
        title: "Killer Klowns from Outer Space",
        year: 1988,
        rating: 7.08,
        minutes: 86,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/nOC22f6kzrKPWXBoYr2XNWfMFEh.jpg",
        comment: ""
    },
    {
        title: "Hotel Transylvania",
        year: 2012,
        rating: 8.0,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/eJGvzGrsfe2sqTUPv5IwLWXjVuR.jpg",
        comment: ""
    },
    {
        title: "Twilight",
        year: 2008,
        rating: 3.29,
        minutes: 122,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/3Gkb6jm6962ADUPaCBqzz9CTbn9.jpg",
        comment: ""
    },
    {
        title: "Quest for Fire",
        year: 1981,
        rating: 3.08,
        minutes: 100,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tyzW1M00xfHKNtmTlT6wJ3F4pNr.jpg",
        comment: ""
    },
    {
        title: "Jeepers Creepers",
        year: 2001,
        rating: 2.42,
        minutes: 90,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/g410Y1U1ELbmJG14Zru3UAimm1G.jpg",
        comment: ""
    },
    {
        title: "A Goofy Movie",
        year: 1995,
        rating: 7.42,
        minutes: 78,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/bycmMhO3iIoEDzP768sUjq2RV4T.jpg",
        comment: ""
    },
    {
        title: "Night at the Museum",
        year: 2006,
        rating: 6.67,
        minutes: 108,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/pDsAAYf6Zn0yiAGJ6lYGs6hoZ4E.jpg",
        comment: ""
    },
    {
        title: "Princess Mononoke",
        year: 1997,
        rating: 7.94,
        minutes: 134,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
        comment: ""

    },
    {
        title: "Rover Dangerfield",
        year: 1991,
        rating: 3.3,
        minutes: 74,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/dM73WqNaIPDj7lwRBOT2ioMFAsq.jpg",
        comment: ""
    },
    {
        title: "The Mitchells vs. the Machines",
        year: 2021,
        rating: 5.93,
        minutes: 114,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/mI2Di7HmskQQ34kz0iau6J1vr70.jpg",
        comment: ""
    },
    {
        title: "Ex Machina",
        year: 2014,
        rating: 9.2,
        minutes: 108,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg",
        comment: ""
    },
    {
        title: "Monty Python and the Holy Grail",
        year: 1975,
        rating: 7.69,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/7nTkHjETdGMYK1phHwDbPsrzbYl.jpg",
        comment: ""
    },
    {
        title: "Shrek the Musical",
        year: 2013,
        rating: 6.07,
        minutes: 130,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/wRvMRdLa8zQ85drGAWEsZTuKJO.jpg",
        comment: ""

    },
    {
        title: "I Saw the TV Glow",
        year: 2024,
        rating: 7.79,
        minutes: 100,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/hS4GYkYpN1rfl4GIxyc02sCyfAj.jpg",
        comment: ""
    },
    {
        title: "Sinners",
        year: 2025,
        rating: 9.33,
        minutes: 138,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg",
        comment: ""
    },
    {
        title: "Encino Man",
        year: 1992, 
        rating: 5.8,
        minutes: 108,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/y8HtL6pyjfODdHOFgciFVFmt8Eq.jpg",
        comment: ""
    },
    {
        title: "Evil Bong 420",
        year: 2015,
        rating: 0.08
    },
    {
        title: "Gingerdead Man vs. Evil Bong",
        year: 2013,
        rating: 0.32
    },
    {
        title: "Evil Bong 3: The Wrath of Bong",
        year: 2011,
        rating: 0.94
    },
    {
        title: "Evil Bong 2: King Bong",
        year: 2009,
        rating: 1.63
    },
    {
        title: " Evil Bong",
        year: 2006,
        rating: 2.09
    },
    {
        title: "Help! I'm a Fish",
        year: 2000,
        rating: 7.57
    },
    {
        title: "The Silence of the Lambs",
        year: 1991,
        rating: 8.71
    },
    {
        title: " Arthur Christmas",
        year: 2011,
        rating: 6.07
    },
    {
        title: "Eight Crazy Nights",
        year: 2002,
        rating: 4.93
    },
    {
        title: "Klaus",
        year: 2019,
        rating: 9.57
    },
    {
        title: "The Lost Boys",
        year: 1987,
        rating: 6.8
    },
    {
        title: "The Thing",
        year: 1982,
        rating: 8.5
    },
    {
        title: "The Sixth Sense",
        year: 1999,
        rating: 7.94
    },
    {
        title: "The Truman Show",
        year: 1998,
        rating: 9.43
    },
    {
        title: "Idiocracy",
        year: 2006,
        rating: 2.58
    },
    {
        title: "Dune Part Two",
        year: 2024,
        rating: 9.07
    },
    {
        title: "Scream",
        year: 1996,
        rating: 9.0
    },
    {
        title: "Barbie as The Princess & the Pauper",
        year: 2004,
        rating: 5.44
    },
    {
        title: "Dune Part One",
        year: 2021,
        rating: 8.93
    },
    {
        title: "C.I.APE",
        year: 2022,
        rating: 2.06
    },
    {
        title: "Ender's Game",
        year: 2013,
        rating: 3.88
    },
    {
        title: "The Usual Suspects",
        year: 1995,
        rating: 8.25
    },
    {
        title: "Barbarella",
        year: 1986,
        rating: 3.79
    },
    {
        title: "Mr. Poppers Penguins",
        year: 2011,
        rating: 6.25
    },
    {
        title: "The Boss Baby",
        year: 2017,
        rating: 3.36
    },
    {
        title: "The Princess Bride",
        year: 1987,
        rating: 9.75
    },
    {
        title: "Remember the Titans",
        year: 2000,
        rating: 7.64
    },
    {
        title: "Porco Rosso",
        year: 1992,
        rating: 7.75
    },
    {
        title: "The Secret Life of Walter Mitty",
        year: 2013,
        rating: 9.36
    },
    {
        title: "MegaMind",
        year: 2010,
        rating: 9.0
    },
    {
        title: "The Adventures of Tintin",
        year: 2011,
        rating: 7.83
    },
    {
        title: "Baby Driver",
        year: 2017,
        rating: 9.69
    },
    {
        title: "Look Back",
        year: 2024, 
        rating: 8.5
    },
    {
        title: "Finding Jesus",
        year: 2020,
        rating: 0.05
    },
    {
        title: "Voyage to the Planet of Prehistoric Women",
        year: 1968,
        rating: 0.48
    },
    {
        title: "Superbad",
        year: 2007,
        rating: 5.75
    },
    {
        title: "Early Man",
        year: 2018,
        rating: 7.14
    },
    {
        title: "The Flintstones",
        year: 1994,
        rating: 5.17
    },
    {
        title: "The Lego Batman Movie",
        year: 2017,
        rating: 7.83
    },
    {
        title: "Cats",
        year: 2019,
        rating: 0.14
    },
    {
        title: "The Prince of Egypt",
        year: 1998,
        rating: 9.0
    },
    {
        title: "Coneheads",
        year: 1993,
        rating: 5.75
    },
    {
        title: "The Croods: A New Age",
        year: 2020,
        rating: 6.08
    },
    {
        title: "Plan 9 from Outer Space",
        year: 1957,
        rating: 0.92
    },
    {
        title: "Tucker and Dale vs. Evil",
        year: 2010,
        rating: 9.07
    },
    {
        title: "Everything Everywhere All At Once",
        year: 2022,
        rating: 9.07
    },
    {
        title: "Scott Pilgrim vs. the World",
        year: 2010,
        rating: 7.36
    },
    {
        title: "Epic",
        year: 2013,
        rating: 7.42
    },
    {
        title: "The Wild",
        year: 2006,
        rating: 0.99
    },
    {
        title: "The Lorax",
        year: 2012,
        rating: 7.14
    },
    {
        title: "The Adventures of Sharkboy and Lavagirl",
        year: 2005,
        rating: 3.0
    },
    {
        title: "Paranoman",
        year: 2012,
        rating: 8.0
    },
    {
        title: "Spy Kids",
        year: 2001,
        rating: 3.5
    },
    {
        title: "The Phoenician Scheme",
        year: 2025,
        rating: 7.08
    },
    {
        title: "The Incredibles 2",
        year: 2018,
        rating: 4.92
    },
    {
        title: "The Incredibles",
        year: 2004,
        rating: 9.21
    },
    {
        title: "The Cat in the Hat",
        year: 2003,
        rating: 7.5
    },
    {
        title: "Monster House",
        year: 2006,
        rating: 8.06
    },
    {
        title: "Strays",
        year: 2023,
        rating: 5.8
    },
    {
        title: "Year One",
        year: 2009,
        rating: 5.17
    },
    {
        title: "Baby John",
        year: 2024,
        rating: 4.38
    },
    {
        title: "Cave Man",
        year: 1981,
        rating: 5.0
    },
    {
        title: "Scooby Doo",
        year: 2002,
        rating: 6.29
    },
    {
        title: "Planet Terror",
        year: 2007,
        rating: 5.2
    },
    {
        title: "Premature",
        year: 2014,
        rating: 6.2
    },
    {
        title: "Emporers New Groove",
        year: 2000,
        rating: 8.86
    },
    {
        title: "Mars Needs Moms",
        year: 2011,
        rating: 3.1
    },
    {
        title: "Trolls",
        year: 2016,
        rating: 2.33
    },
    {
        title: "Planet 51",
        year: 2009,
        rating: 6.1
    },
    {
        title: "Monsters vs. Aliens",
        year: 2009,
        rating: 7.21
    },
    {
        title: "Croods",
        year: 2013,
        rating: 7.36
    },
    {
        title: "Chicken Little",
        year: 2005,
        rating: 6.0
    }
];

function generateStars(rating) {
    let stars = "";
    for (let i = 1; i < 5; i++) {
        if (rating >= i){
            stars += "★";
        } else if (rating >= i - 0.5) {
            stars += "⯨";
        } else {
            stars += "☆";
        }
    }
    return stars;
}

const container = document.getElementById("movie-list");

movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
        <div class="movie-info">
            <h2>${movie.title} (${movie.year})</h2>
            <div class="stars">${generateStars(movie.rating/2)}</div>
            <p>${movie.comment}</p>
        </div>
    `;
    container.appendChild(card);
});

function calculateStats() {

    const totalMinutes = movies.reduce((sum, movie) => sum + movie.minutes, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const best = [...movies]
        .sort((a,b) => b.rating - a.rating)
        .slice(0, 10);

    const worst = [...movies]
        .sort((a,b) => a.rating - b.rating)
        .slice(0, 10);

    const stats = document.getElementById("movie-stats");

    stats.innerHTML = `
        <div class="stats-card">
            <h2>Total Watch Time</h2>
            <p>${hours}h ${minutes}m</p>
        </div>
        <div class="stats-card">
            <h2>Top 10 Best</h2>
            <ol>${best.map(m => `<li>${m.title}</li>`).join("")}</ol>
        </div>
        <div class="stats-card">
            <h2>Top 10 Worst</h2>
            <ol>${worst.map(m => `<li>${m.title}</li>`).join("")}</ol>
        </div>
    `;
}

calculateStats();