const movies = [
    {
        title: "Twelve Monkeys",
        year: 1995,
        rating: 6.1,
        minutes: 129,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gt3iyguaCIw8DpQZI1LIN5TohM2.jpg",
        comment: "A pretty cool time travelling movie. I kinda liked how it kept you guessing, but it felt like it may have been going on too long. The use of insanity was a really interesting twist to me. I also think that some of the cinamatography was pretty decent, such as how it opened and closed with the same screen."
    },
    {
        title: "Interstellar",
        year: 2014,
        rating: 9.9,
        minutes: 169,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        comment: "An amazing film. The sound design and visuals are stunning. The story itself its really interesting, and its fun to see how it all comes together. The power of love thing can be a little silly, but I think this movie puklled it off well. This is a movie I would love to see in theatres."
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
        comment: "A pretty silly star wars spoof. Pretty good if thats your thing."

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
        comment: "A really fun and wholesome movie. Jerry uses his math skills to not only win the lottery for himself, but also for the whole town, which is really awesome. PLus it is based on a true story."
    },
    {
        title: "Bit",
        year: 2019,
        rating: 2.92,
        minutes:94,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9SlKmu0a1G1eihI29WMQogBWgzr.jpg",
        comment: "Gay vampires, uh power corrupts, and a rat hole. This is a movie I guess."
    },
    {
        title: "The Ribald Tales of Robin Hood",
        year: 1969,
        rating: 0.3,
        minutes: 77,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/ph4jqjQczR32uaD7Fho5cmHkKmr.jpg",
        comment: "Yeah dont watch this. Its basically just softcore porn. Would definately not recomend."
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
        comment: "An absolute favourite of mine. I love the original Treasure Planet book, and this movie is a great homage to that. It still has its own identity, and it draws from the strength of the original story. The animation  is really good, especially for the time. Its a shame the movie was marketed so poorly. I feel like it didn't get the attention it deserved."
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
        comment: "I dont say blah bla blah. This is a pretty fun familiy movie. Its actually really wholesome."
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
        comment: "This movie is really bad. Not even in a good way. Everything that happens has you upset. They do the typical stupid irrational horror movie things, but dont even attempt to provide a reason. A totally absurd and awful movie."
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
        comment: "They are alive! This is a fun movie from my childhood. It still holds up. Who wouldnt enjoy watching a museum come alive?"
    },
    {
        title: "Princess Mononoke",
        year: 1997,
        rating: 7.94,
        minutes: 134,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
        comment: "This was one was honestly just ok. The whole length of the movie, the main charachter was just aura farming and flexing on everyone. I found it infuriateing that the humans got away unpunished after essentially killing an entire forest and its animals and spirits. That alone ruined the movie for me."

    },
    {
        title: "Rover Dangerfield",
        year: 1991,
        rating: 3.3,
        minutes: 74,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/dM73WqNaIPDj7lwRBOT2ioMFAsq.jpg",
        comment: "Story wise, not a great movie. Not even good really, but the animation is really goofy. You can pause on any frame and have a good chuckle."
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
        comment: "I think this is an incredible movie. I really good look into how AI like this could behave. I wont spoil anything, but this is definately worth a watch."
    },
    {
        title: "Monty Python and the Holy Grail",
        year: 1975,
        rating: 7.69,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/7nTkHjETdGMYK1phHwDbPsrzbYl.jpg",
        comment: "I've heard a ton of good things about this movie, and I cant deny that its a classic, but I honestly feel that it is over rated. Some of the jokes are good for sure, but there is also a good number of them that fall flat."
    },
    {
        title: "Shrek the Musical",
        year: 2013,
        rating: 6.07,
        minutes: 130,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/wRvMRdLa8zQ85drGAWEsZTuKJO.jpg",
        comment: "I went into this expecting it to be horrible, but somehow this was actually really entertaining to watch. Honestly. It might even be more fun that the original. Ah maybe not."

    },
    {
        title: "I Saw the TV Glow",
        year: 2024,
        rating: 7.79,
        minutes: 100,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/hS4GYkYpN1rfl4GIxyc02sCyfAj.jpg",
        comment: "This is a movie that was really controversial when we watched it. I thought it was a 10/10, because there was so much meaning in everything, and the acting was really quite good. Others didn't like it, seemingly because they didnt really relate or empathize with the characters very much."
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
        rating: 0.08,
        minutes: 53,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8W2u9wFRtBcaezebHT0uLybuzV9.jpg",
        comment: ""
    },
    {
        title: "Gingerdead Man vs. Evil Bong",
        year: 2013,
        rating: 0.32,
        minutes: 83,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/g5AefV3s6ojqbqC1Lh7vEAaBTf.jpg",
        comment: ""
    },
    {
        title: "Evil Bong 3: The Wrath of Bong",
        year: 2011,
        rating: 0.94,
        minutes: 86,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/da5UVMB9021zljUAxExAS38IAlG.jpg",
        comment: ""
    },
    {
        title: "Evil Bong 2: King Bong",
        year: 2009,
        rating: 1.63,
        minutes: 80,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8ATSJrEaWaAi5NmRoxYB1If6lQP.jpg",
        comment: ""
    },
    {
        title: " Evil Bong",
        year: 2006,
        rating: 2.09,
        minutes: 84,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tQlUiiQD5PviCm5pJ21cgb8Qxw0.jpg",
        comment: ""
    },
    {
        title: "Help! I'm a Fish",
        year: 2000,
        rating: 7.57,
        minutes: 80,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/s9yFQD19xJqXEnAnUAZFUan25DJ.jpg",
        comment: ""
    },
    {
        title: "The Silence of the Lambs",
        year: 1991,
        rating: 8.71,
        minutes: 119,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
        comment: ""
    },
    {
        title: "Arthur Christmas",
        year: 2011,
        rating: 6.07,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/yF7SNheAGWavNnjbAronedwjC1N.jpg",
        comment: ""

    },
    {
        title: "Eight Crazy Nights",
        year: 2002,
        rating: 4.93,
        minutes: 76,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/k25VkKJjo52vuo4rUKEG4qFLQjL.jpg",
        comment: ""
    },
    {
        title: "Klaus",
        year: 2019,
        rating: 9.57,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/q125RHUDgR4gjwh1QkfYuJLYkL.jpg",
        comment: ""
    },
    {
        title: "The Lost Boys",
        year: 1987,
        rating: 6.8,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/nH1lvyQvfbL5GKScTtT6zkIvDEn.jpg",
        comment: ""
    },
    {
        title: "The Thing",
        year: 1982,
        rating: 8.5,
        minutes: 109,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
        comment: ""
    },
    {
        title: "The Sixth Sense",
        year: 1999,
        rating: 7.94,
        minutes: 107,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vOyfUXNFSnaTk7Vk5AjpsKTUWsu.jpg",
        comment: ""
    },
    {
        title: "The Truman Show",
        year: 1998,
        rating: 9.43,
        minutes: 103,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
        comment: ""
    },
    {
        title: "Idiocracy",
        year: 2006,
        rating: 2.58,
        minutes: 84,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/k75tEyoPbPlfHSKakJBOR5dx1Dp.jpg",
        comment: ""
    },
    {
        title: "Dune: Part Two",
        year: 2024,
        rating: 9.07,
        minutes: 167,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        comment: ""
    },
    {
        title: "Scream",
        year: 1996,
        rating: 9.0,
        minutes: 112,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/lr9ZIrmuwVmZhpZuTCW8D9g0ZJe.jpg",
        comment: ""
    },
    {
        title: "Barbie as The Princess & the Pauper",
        year: 2004,
        rating: 5.44,
        minutes: 86,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/xHYsUwUe4MaNc6mbNBGTkqZSnPk.jpg",
        comment: ""

    },
    {
        title: "Dune",
        year: 2021,
        rating: 8.93,
        minutes: 155,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        comment: ""

    },
    {
        title: "C.I.APE",
        year: 2022,
        rating: 2.06,
        minutes: 82,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/oaW0zqkYJxgdYdgykKY89jr118X.jpg",
        comment: ""
    },
    {
        title: "Ender's Game",
        year: 2013,
        rating: 3.88,
        minutes: 114,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/pVcRI5YKnkkgaAD876jBeKb189d.jpg",
        comment: ""
    },
    {
        title: "The Usual Suspects",
        year: 1995,
        rating: 8.25,
        minutes: 106,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/99X2SgyFunJFXGAYnDv3sb9pnUD.jpg",
        comment: ""

    },
    {
        title: "Barbarella",
        year: 1986,
        rating: 3.79,
        minutes: 98,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/facTz5BZz4AkJal1FWgjYciekih.jpg",
        comment: ""
    },
    {
        title: "Mr. Poppers Penguins",
        year: 2011,
        rating: 6.25,
        minutes: 94,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/jGwZ1QI5DaL7mHQ2ZsMV1p8xvPS.jpg",
        comment: ""
    },
    {
        title: "The Boss Baby",
        year: 2017,
        rating: 3.36,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/unPB1iyEeTBcKiLg8W083rlViFH.jpg",
        comment: ""
    },
    {
        title: "The Princess Bride",
        year: 1987,
        rating: 9.75,
        minutes: 99,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/kTXxdNv44najTayFcrT487xWuDv.jpg",
        comment: ""
    },
    {
        title: "Remember the Titans",
        year: 2000,
        rating: 7.64,
        minutes: 113,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/825ohvC4wZ3gCuncCaqkWeQnK8h.jpg",
        comment: ""
    },
    {
        title: "Porco Rosso",
        year: 1992,
        rating: 7.75,
        minutes: 93,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8mIvSvnVBApfORL9N6S38Q7wD6A.jpg",
        comment: ""
    },
    {
        title: "The Secret Life of Walter Mitty",
        year: 2013,
        rating: 9.36,
        minutes: 114,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tY6ypjKOOtujhxiSwTmvA4OZ5IE.jpg",
        comment: ""
    },
    {
        title: "MegaMind",
        year: 2010,
        rating: 9.0,
        minutes: 96,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/uZ9ytt3sPTx62XTfN56ILSuYWRe.jpg",
        comment: ""
    },
    {
        title: "The Adventures of Tintin",
        year: 2011,
        rating: 7.83,
        minutes: 107,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/fQZ3sLR1Fi63NMsNRbjm9q5qODJ.jpg",
        comment: ""

    },
    {
        title: "Baby Driver",
        year: 2017,
        rating: 9.69,
        minutes: 113,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tYzFuYXmT8LOYASlFCkaPiAFAl0.jpg",
        comment: ""
    },
    {
        title: "Look Back",
        year: 2024, 
        rating: 8.5,
        minutes: 58,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/4f2EcNkp1Mvp9wE5w7HKxcmACWg.jpg",
        comment: ""
    },
    {
        title: "Finding Jesus",
        year: 2020,
        rating: 0.05,
        minutes: 69,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/qNLiZTxTQU1w999Avs7UBGJxqPV.jpg",
        comment: ""
    },
    {
        title: "Voyage to the Planet of Prehistoric Women",
        year: 1968,
        rating: 0.48,
        minutes: 80,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/aTZHuHghiEpB3WYM93V1FtYyJ4B.jpg",
        comment: ""
    },
    {
        title: "Superbad",
        year: 2007,
        rating: 5.75,
        minutes: 113,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
        comment: ""
    },
    {
        title: "Early Man",
        year: 2018,
        rating: 7.14,
        minutes: 89,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/5iW2rntwLZoGlFCYYy8TjHyblbw.jpg",
        comment: ""
    },
    {
        title: "The Flintstones",
        year: 1994,
        rating: 5.17,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/k7gkf5Wa8YZ9iyEOylBMfw9pnkp.jpg",
        comment: ""
    },
    {
        title: "The Lego Batman Movie",
        year: 2017,
        rating: 7.83,
        minutes: 104,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/snGwr2gag4Fcgx2OGmH9otl6ofW.jpg",
        comment: ""
    },
    {
        title: "Cats",
        year: 2019,
        rating: 0.14,
        minutes: 110,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/aCNch5FmzT2WaUcY44925owIZXY.jpg",
        comment: ""
    },
    {
        title: "The Prince of Egypt",
        year: 1998,
        rating: 9.0,
        minutes: 99,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/2xUjYwL6Ol7TLJPPKs7sYW5PWLX.jpg",
        comment: ""
    },
    {
        title: "Coneheads",
        year: 1993,
        rating: 5.75,
        minutes: 88,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vlpQnf0rl0FpMjWLS0TNd8Bog2F.jpg",
        comment: ""
    },
    {
        title: "The Croods: A New Age",
        year: 2020,
        rating: 6.08,
        minutes: 95,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tbVZ3Sq88dZaCANlUcewQuHQOaE.jpg",
        comment: ""
    },
    {
        title: "Plan 9 from Outer Space",
        year: 1957,
        rating: 0.92,
        minutes: 79,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/bmicZi7PvlnZ9rZqp6QXN2Db0pT.jpg",
        comment: ""
    },
    {
        title: "Tucker and Dale vs. Evil",
        year: 2010,
        rating: 9.07,
        minutes: 89,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8shwLEDzajJGSfLgbpac8x8xn1U.jpg",
        comment: ""
    },
    {
        title: "Everything Everywhere All At Once",
        year: 2022,
        rating: 9.07,
        minutes: 140,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/u68AjlvlutfEIcpmbYpKcdi09ut.jpg",
        comment: ""
    },
    {
        title: "Scott Pilgrim vs. the World",
        year: 2010,
        rating: 7.36,
        minutes: 113,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/g5IoYeudx9XBEfwNL0fHvSckLBz.jpg",
        comment: ""
    },
    {
        title: "Epic",
        year: 2013,
        rating: 7.42,
        minutes: 102,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/81cSsWzjTfR3cJSqnTiHwy1eyPK.jpg",
        comment: ""
    },
    {
        title: "The Wild",
        year: 2006,
        rating: 0.99,
        minutes: 82,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/sxqzaOto1qyUseSg6YpIP9Su5lp.jpg",
        comment: ""
    },
    {
        title: "The Lorax",
        year: 2012,
        rating: 7.14,
        minutes: 86,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/tePFnZFw5JvjwjQjaKkqDPNMLPU.jpg",
        comment: ""
    },
    {
        title: "The Adventures of Sharkboy and Lavagirl",
        year: 2005,
        rating: 3.0,
        minutes: 92,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/xpFbHSkRgOxOoutKqXob9T8iBPA.jpg",
        comment: ""
    },
    {
        title: "Paranoman",
        year: 2012,
        rating: 8.0,
        minutes: 93,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9DZPtuYTKYxt6vzHvZ5FLThG4fl.jpg",
        comment: ""
    },
    {
        title: "Spy Kids",
        year: 2001,
        rating: 3.5,
        minutes : 88,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/j3rUkHIAAoKr6jU30q3Db4fcIF9.jpg",
        comment: ""
    },
    {
        title: "The Phoenician Scheme",
        year: 2025,
        rating: 7.08,
        minutes: 122,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/u2jxeYLXTYfu0bqJmnLGIgZswib.jpg",
        comment: ""
    },
    {
        title: "Incredibles 2",
        year: 2018,
        rating: 4.92,
        minutes: 118,
        psoter: "https://www.themoviedb.org/t/p/w600_and_h900_face/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg",
        comment: ""
    },
    {
        title: "The Incredibles",
        year: 2004,
        rating: 9.21,
        minutes: 115,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
        comment: ""
    },
    {
        title: "The Cat in the Hat",
        year: 2003,
        rating: 7.5,
        minutes: 82,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/uYYLz67e5xEQMsY858VSSCDsLU6.jpg",
        comment: ""
    },
    {
        title: "Monster House",
        year: 2006,
        rating: 8.06,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/1YtLhQ9j6gTqH2yU8rFvXlXoG7.jpg",
        comment: ""
    },
    {
        title: "Strays",
        year: 2023,
        rating: 5.8,
        minutes: 93,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/n1hqbSCtyBAxaXEl1Dj3ipXJAJG.jpg",
        comment: ""
    },
    {
        title: "Year One",
        year: 2009,
        rating: 5.17,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/qF573jdJYwtCbXVXPDn4xu8nW2a.jpg",
        comment: ""
    },
    {
        title: "Baby John",
        year: 2024,
        rating: 4.38,
        minutes: 162,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/5Oqsh17dq0cIRFPynPNy5elmyxW.jpg",
        comment: ""
    },
    {
        title: "Cave Man",
        year: 1981,
        rating: 5.0,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/cfZfl3wxO8QxHKJsiWUHZg1D62B.jpg",
        comment: ""
    },
    {
        title: "Scooby Doo",
        year: 2002,
        rating: 6.29,
        minutes: 87,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/mTAiBJGg8mqEfnYHHbi37ZoRSZm.jpg",
        comment: ""
    },
    {
        title: "Planet Terror",
        year: 2007,
        rating: 5.2,
        minutes: 105,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/3705GxG0RN9XDV5y9IiXKYHw1fK.jpg",
        comment: ""
    },
    {
        title: "Premature",
        year: 2014,
        rating: 6.2,
        minutes: 93,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9nqj8s1l7XoGQYp3v2mLh5ZtH8.jpg",
        comment: ""
    },
    {
        title: "The Emperor's New Groove",
        year: 2000,
        rating: 8.86,
        minutes: 78,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/isA0acj3ONKBLp1pKadUNzxEPFv.jpg",
        comment: ""
    },
    {
        title: "Mars Needs Moms",
        year: 2011,
        rating: 3.1,
        minutes: 88,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/g94LNU4pipIUJLkTvYIgNGfT2J2.jpg",
        comment: ""
    },
    {
        title: "Trolls",
        year: 2016,
        rating: 2.33,
        minutes: 92,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9VlK2j0THZWzhQPq0W3Oc0IIdBB.jpg",
        comment: ""
    },
    {
        title: "Planet 51",
        year: 2009,
        rating: 6.1,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/x7Itcg3ZdExKwdKguy73WPEqosW.jpg",
        comment: ""
    },
    {
        title: "Monsters vs. Aliens",
        year: 2009,
        rating: 7.21,
        minutes: 94,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/hpHarddVj34j53T7NsoUGdKj4mP.jpg",
        comment: ""
    },
    {
        title: "Croods",
        year: 2013,
        rating: 7.36,
        minutes: 99,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/27zvjVOtOi5ped1HSlJKNsKXkFH.jpg",
        comment: ""
    },
    {
        title: "Chicken Little",
        year: 2005,
        rating: 6.0,
        minutes: 81,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/87FpA4b90eTaw3U6zmCNikoPLir.jpg",
        comment: ""
    }
];

function generateStars(rating) {
    let stars = "";
    const rounded = Math.round(rating * 2) / 2; // Round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
        if (rounded >= i){
            stars += "★";
        } else if (rounded + 0.5 ===i) {
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