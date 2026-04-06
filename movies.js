const movies = [
    {
        title: "Left Behind",
        year: 2014,
        rating: 1.7,
        minutes: 110,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/b9Q2WR62yB5Aq0hd6kyRFS9cc3Y.jpg",
        comment: "I went into this expecting a disaster movie with biblical proportions, and was really disappointed. The moveie drags on so much. It takes over half an hour for the main plot point to happen, and even when it does, there is nothing interesting about it. Really just boring. "
        
    },
    {
        title: "Gods Not Dead",
        year: 2014,
        rating: 0.6,
        minutes: 113,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/yKUzBolWrwyByevBtDPfy3kIumv.jpg",
        comment: "This is a movie I remember watching when I was younger, and I wanted to watch it again now that I am older and my views and beliefs have changed. Yeah this is a bad movie. The movie is full of is full of stereotypes and straw man arguments, opting to create a weak debate rather than honestly explore philosophical questions. "
    },
    {
        title: "Pacific Rim",
        year: 2013,
        rating: 7.5,
        minutes: 131,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8wo4eN8dWKaKlxhSvBz19uvj8gA.jpg",
        comment: "A fun movie, especially if you want to dig giant robots fighting giant monsters. The story is pretty simple, but it works well. The CGI and graphics hold up pretty well too."
    },
    {
        title: "Conclave",
        year: 2024,
        rating: 9.0,
        minutes: 120,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vYEyxF1UT779RiEalpMjUT6kfdf.jpg",
        comment: "A captivating political drama that delves into the intricate world of Vatican politics. The film masterfully portrays the tension and intrigue surrounding the election of a new pope, with compelling performances and a gripping storyline that keeps viewers on the edge of their seats. The ending did feel a little rushed however."
    },
    {
        title: "Crimson Peak",
        year: 2015,
        rating: 8.3,
        minutes: 119,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/f9TOb5anVwZeSbYjU1qNxPk3KUk.jpg",
        comment: "This is a great mix of thriller, horror, mystery and romance. The story is pretty good, and the characters are all interesting. The cinematography is really good, and the use of color is really well done. The only thing I don't love about this movie is that it has a pretty slow start, but it definitely picks up after that."

    },
    {
        title: "Dead Poets Society",
        year: 1989,
        rating: 8.4,
        minutes: 128,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/erzbMlcNHOdx24AXOcn2ZKA7R1q.jpg",
        comment: "Why is it that every movie that has Robin Williams in it is so good? This is a really great movie. The acting is fantastic, and the message of the movie is really powerful. I would definitely recommend this movie to anyone."
    },
    {
        title: "The Snow Queen",
        year: 1957,
        rating: 4.8,
        minutes: 68,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/ptCK2qAyGEmQBys3cImY6o6qAyp.jpg",
        comment: "This movie has that VHS movie feel to it. The story is pretty simple. It basically is just one thing happening after another, so it can be hard to follow or stay invested in it. "
    },
    {
        title: "Shutter Island",
        year: 2012,
        rating: 9.0,
        minutes: 138,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg",
        comment: "A really great movie that had me feeling a little insane myself at times. The ending is open ended, but I feel it also has enough there to be satisfying."
    },
    {
        title: "Star Wars: Episode I: The Phantom Menace",
        year: 1999,
        rating: 5.9,
        minutes: 135,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg",
        comment: "I think this movie is ok. It has a few good scenes, but also a good number of bad ones. A lot of the acting is not great, and at times I found myself really bored. Maybe I'm just not a fan of Star Wars though."
    },
    {
        title: "The Rocky Horror Picture Show",
        year: 1975,
        rating: 2,
        minutes: 100,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg",
        comment: "Honestly this movie was really hard to finish for me. There seems to be no cohesive plot that I can follow. There are so many loose ends and things that go un addressed. I also find that the dialogue and in some cases the singing leave something to be desired."   
    },
    {
        title: "Ace Ventura: Pet Detective",
        year: 1994,
        rating: 6.2,
        minutes: 86,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/pqiRuETmuSybfnVZ7qyeoXhQyN1.jpg",
        comment: "One of Jim Carrey earlier movies, it has the same kind of comedy and expression as you can find in many of his other films. Unfortunately I don't think this one aged very well."

    },
    {
        title: "The VelociPastor",
        year: 2017,
        rating: 8.5,
        minutes: 70,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/trSmNw63luh84MBy5XLH0UiN1BC.jpg",
        comment: "An hilarious movie that doesn't take itself seriously. There are so many good bits in this, such as 'So your parents died, Doug. It's what parents do. They die on you'."
    },
    {
        title: "Glass Onion: A Knives Out Mystery",
        year: 2022,
        rating: 9.00,
        minutes: 139,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
        comment: "This movie is another really good murder mystery. This one is set during covid which is kind of a throwback. Anyways, it is nearly as good as the first one, and is a great watch."
    },
    {
        title: "Knives Out",
        year: 2019,
        rating: 9.29,
        minutes: 130,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
        comment: "An incredible murder mystery movie. It basically follows the basic idea, rich father is killed with inheritance at stake. The movie has a couple of twists and all of them are good."
    },
    {
        title: "labyrinth",
        year: 1986,
        rating: 6.9,
        minutes: 101,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/hbSdA1DmNA9IlfVoqJkIWYF2oYm.jpg",
        comment: "This is a wacky movie. It has a similar vibe as through the looking glass with it's fever dream like randomness. The practical effects are really good."
    },
    {
        title: "The Birds",
        year: 1963,
        rating: 6.4,
        minutes: 120,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/eClg8QPg8mwB6INIC4pyR5pAbDr.jpg",
        comment: "This is a decent movie. The use of silence is really good, and the suspense is pretty well done. The ending is a little bit of a let down though, and the acting is not the best."
    },
    {
        title: "The Good, the Bad and the Ugly",
        year: 1966,
        rating: 8.0,
        minutes: 161,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
        comment: "A pretty slow movie, but it has some really good moments. The story is pretty simple, but it works well. It's a classic for a reason."
    },
    {
        title: "Arthur",
        year: 1981,
        rating: 8,
        minutes: 97,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/m8yOFRDVZPxtsr4D2hVdzls6q6t.jpg",
        comment: "I really enjoyed this movie. The characters were all likeable, and had some amazing quotes. The only thing I don't love about it is that Arthur doesn't seem to develop or learn anything by the end of the movie. None the less, I'd recommend this movie."
    },
    {
        title: "Twelve Monkeys",
        year: 1995,
        rating: 6.1,
        minutes: 129,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gt3iyguaCIw8DpQZI1LIN5TohM2.jpg",
        comment: "A pretty cool time travelling movie. I kinda liked how it kept you guessing, but it felt like it may have been going on too long. The use of insanity was a really interesting twist to me. I also think that some of the cinematography was pretty decent, such as how it opened and closed with the same screen."
    },
    {
        title: "Interstellar",
        year: 2014,
        rating: 9.9,
        minutes: 169,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        comment: "An amazing film. The sound design and visuals are stunning. The story itself is really interesting, and it's fun to see how it all comes together. The power of love thing can be a little silly, but I think this movie pulled it off well. This is a movie I would love to see in theatres."
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
        comment: "A pretty silly star wars spoof. Pretty good if that's your thing."

    },
    {
        title: "The Stranger by the Shore" ,
        year: 2020,
        rating: 3.0,
        minutes: 59,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/4m74lboTcvrmnCM506t4y4c3klc.jpg",
        comment: "The movie itself was kinda forgettable. The animation was decent, but I noticed that everyone's necks were really long and I couldn't unsee it."
    },
    {
        title: "Jerry &, Marge Go Large" ,
        year: 2022,
        rating: 8.0,
        minutes: 96,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/bbBGSm1kjgmZ0O3bPUQIbA0xlKQ.jpg",
        comment: "A really fun and wholesome movie. Jerry uses his math skills to not only win the lottery for himself, but also for the whole town, which is really awesome. Plus it is based on a true story."
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
        comment: "Yeah don't watch this. It's basically just softcore porn. Would definitely not recommend."
    },
    {
        title: "American Psycho",
        year: 2000,
        rating: 9.21,
        minutes: 102,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9uGHEgsiUXjCNq8wdq4r49YL8A1.jpg",
        comment: "This guy makes everyone around him so uncomfortable, including me. Great acting for sure. The twist is pretty good too."
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
        comment: "Don't be a clown kids. Killing is bad for your teeth. "
    },
    {
        title: "Hotel Transylvania",
        year: 2012,
        rating: 8.0,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/eJGvzGrsfe2sqTUPv5IwLWXjVuR.jpg",
        comment: "I don't say blah bla blah. This is a pretty fun family movie. It's actually really wholesome."
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
        comment: "oooga boogoo oga"
    },
    {
        title: "Jeepers Creepers",
        year: 2001,
        rating: 2.42,
        minutes: 90,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/g410Y1U1ELbmJG14Zru3UAimm1G.jpg",
        comment: "This movie is really bad. Not even in a good way. Everything that happens has you upset. They do the typical stupid irrational horror movie things, but don't even attempt to provide a reason. A totally absurd and awful movie."
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
        comment: "They are alive! This is a fun movie from my childhood. It still holds up. Who wouldn't enjoy watching a museum come alive?"
    },
    {
        title: "Princess Mononoke",
        year: 1997,
        rating: 7.94,
        minutes: 134,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
        comment: "This was one was honestly just ok. The whole length of the movie, the main character was just aura farming and flexing on everyone. I found it infuriating that the humans got away unpunished after essentially killing an entire forest and its animals and spirits. That alone ruined the movie for me."

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
        comment: "I think this is an incredible movie. It's a really good look into how AI like this could behave. I won't spoil anything, but this is definitely worth a watch."
    },
    {
        title: "Monty Python and the Holy Grail",
        year: 1975,
        rating: 7.69,
        minutes: 91,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/7nTkHjETdGMYK1phHwDbPsrzbYl.jpg",
        comment: "I've heard a ton of good things about this movie, and I can't deny that its a classic, but I honestly feel that it is over rated. Some of the jokes are good for sure, but there is also a good number of them that fall flat."
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
        comment: "This is a movie that was really controversial when we watched it. I thought it was a 10/10, because there was so much meaning in everything, and the acting was really quite good. Others didn't like it, seemingly because they didn't really relate or empathize with the characters very much."
    },
    {
        title: "Sinners",
        year: 2025,
        rating: 9.33,
        minutes: 138,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg",
        comment: "This is a really well made movie, and also pretty unique in the vampire genre. There are no meaningless interactions or dialogue. Taking nearly anything out would only make to movie worse, which speaks to how well crafted it is. The music is also incredible. I only wish I could have seen it in theatres.  "
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
        comment: "An incredibly animated christmas movie. The story is a super fun twist on the saint nick story. Probably my favourite christmas movie!"
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
        comment: "The original behind the imposter trope found in all sorts of things now. It has become a staple horror movie, but that also means that it comes with the frustrating decisions of characters. The practical effects are really good though, and there is plenty to be gleaned from a rewatch or two."
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
        comment: "What a great movie. It has great mix of comedy, romance, and adventure. It also has some really good quotes. You should definitely watch this. I think its a movie anyone can enjoy."
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
        comment: "An amazing heist movie. The action scenes are fantastic, the characters are well written, but what stands out the most to me is the attention to detail, especially in the sound design. The way they use sound and lack of sound in the movie is phenomenal."
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
        comment: "A really good comedy-horror. Tucker and Dave are two good natured guys who keep being assumed to be serial killers, as some teenagers cause their own deaths in ridiculous ways while trying to flee."
    },
    {
        title: "Everything Everywhere All At Once",
        year: 2022,
        rating: 9.07,
        minutes: 140,
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/u68AjlvlutfEIcpmbYpKcdi09ut.jpg",
        comment: "Some people love it some people hate it. Personally I think this is a really unique and creative movie. It has a huge range of seriousness, from dildo sword fights and everything bagel singularities to deeper topics like the meaning of life and the power of choice."
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
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg",
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

let currentSort = "watch";
let sortDescending = false;
let currentMinStars = 0;

function updateMovies() {

    let filtered = movies.filter(movie =>
        getStarRating(movie) >= currentMinStars
    );

    let sorted = [...filtered];

    if (currentSort !== "watch") {
        sorted.sort((a, b) => a[currentSort] - b[currentSort]);
    }

    if (sortDescending) {
        sorted.reverse();
    }

    renderMovies(sorted);
}

function generateStars(rating) {
    let stars = "";
    const rounded = Math.round((rating / 2) * 2) / 2; 
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

const container = document.getElementById("movie-container");

function renderMovies(movieArray) {
    container.innerHTML = "";

    if (movieArray.length === 0) {
        container.innerHTML = "<p>No movies match this rating.</p>";
        return;
    }

    movieArray.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
            <div class="movie-info">
                <h2>${movie.title} (${movie.year})</h2>
                <div class="stars">${generateStars(movie.rating)}</div>
                <p>${movie.comment}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function calculateStats(movieArray) {

    const totalMinutes = movieArray.reduce((sum, movie) => sum + movie.minutes, 0);
    const averageRating = movieArray.reduce((sum, movie) => sum + movie.rating, 0) / movieArray.length;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const best = [...movieArray]
        .sort((a,b) => b.rating - a.rating)
        .slice(0, 10);

    const worst = [...movieArray]
        .sort((a,b) => a.rating - b.rating)
        .slice(0, 10);

    const stats = document.getElementById("movie-stats");

    stats.innerHTML = `
        <div class="stats-card">
            <h2>Total Watch Time</h2>
            <p>${hours}h ${minutes}m</p>
            <h2>Average Rating</h2>
            <p>${averageRating.toFixed(2)} / 10</p>
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

function getStarRating(movie) {
    const stars = movie.rating /2;
    return Math.round(stars * 2) / 2;
}

const filterButtons = document.querySelectorAll(".star-filter button");

const sortSelect = document.getElementById("sort-select");
const sortDirection = document.getElementById("sort-direction");

sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    updateMovies();
});

sortDirection.addEventListener("click", () => {
    sortDescending = !sortDescending;

    sortDirection.textContent = sortDescending ? "⬆" : "⬇";

    updateMovies();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentMinStars = Number(btn.dataset.stars);

        updateMovies();
    });
});

updateMovies();
calculateStats(movies);