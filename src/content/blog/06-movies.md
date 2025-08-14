---
title: Consolidating my movie watchlist
description: Using the Open Movie Database (OMDb) API to fetch metadata from the movies I have seen
date: "2024-08-31"
readtime: "5"
tags: { language: ["python"], field: ["cinema"], type: ["script"] }
---

## Preface

During my first year at university, all the way back to 2011, I heartwarmingly recall meeting some really cool people that later became close friends; the same friends who introduced me to cinema and all its magic. I remember devouring movies in those times, I was an avid cinemagoer, regularly found at the _Cinemateca Portuguesa_, in Lisbon, Portugal - a public institution that "has the mission to safeguard and divulge the cinematic heritage".

Life has its own ways and I have less time to indulge in cinema today as much as I had back then, as a student. I admit: I did skip classes often in my first years to indulge in self-discovery, and that included cinema of course. No regrets there, it made me part of who I am today, and I wouldn't have it any other way. Perhaps you've heard of this quote from Pedro Almodóvar before:

> _Cinema can fill in the empty spaces of your life and your loneliness_ - **Pedro Almodóvar**

Although it may sound rather pessimistic if you do not give it a second thought, I assure you that it is not the case. Cinema, beyond the obvious _passe-temps_ activity, can help one see life through a different lens, and on different angles. It is the emulation of the human experience and all its intricacies, and beyond, in the realm of fantasy. For me, cinema has been a force: a refuge when I fail to see the beauty that surrounds me, a reminder of our shared humanity, a place where I can indulge in the pleasures of visual and acoustic arts, and much, much more.

Fast-forwarding to present times: I now work a full-time job, and in between my work and daily chores, I try to keep mentally and physically fit, maintain a healthy social life, and nurture my curiosity and relationships. This leaves me with less time that I can dedicate to watching movies, at least much less than I used to. I still greatly enjoy watching movies and probably always will.

## Keeping track of movies

Given that I now am sort of a _geek_, I wanted for some time to make a very small Python script to scrap data from some API[^1] with the intent of generating a table consolidating all the information (metadata) related to the movies I have seen (e.g. title, year, directory, IMDb[^2] rating).

[^1]: Application Programming Interface

[^2]: [Internet Movie Database](https://imdb.com)

### Fetching metadata from the OMDb API

I won't bore you with the details of the data preprocessing step and will skip straight to the actual retrieval of metadata.

Looking for suitable candidates, I came upon the OMDb[^3] API - "a RESTful web service to obtain movie information". The OMDb API provides a very straightforward way to fetch movie metadata. You can simply send a **query string** that is customizable to fetch whatever information you seek about a movie (given that it exists). A query string is a part of a URL[^4] that assigns values to specified parameters. These parameters are appended to the URL after a question mark (`?`) and are typically used to pass data to the server. Each parameter is represented as a key-value pair, separated by an equal sign (`=`), and multiple parameters are separated by an ampersand (`&`).

[^3]: [Open Movie Database](https://www.omdbapi.com)

[^4]: Uniform Resource Locator

OMDb expects the user to provide an API key within the query string. In the script I created, I have defined the URL as follows, including the API key.

```py
API_KEY = "This is a secret! 😉🔒"
BASE_URL = f"http://www.omdbapi.com/?apikey={API_KEY}"
```

I have also defined the metadata that I wish to extract from the OMDb database:

```py
HEADERS = [
    "Title",
    "Year",
    "Runtime",
    "Genre",
    "Director",
    "Plot",
    "Language",
    "Country",
    "Poster",
    "imdbRating",
    "imdbVotes",
    "imdbID",
]
```

Now we can query the API with our list of movies. In a nutshell, for each movie we have its title and year. We append that to our query string and send a `GET` request to the OMDb API. We then get the JSON payload from the response and dump it to a local file so we don't have to query the API again in the future.

In Python, this can be succinctly done using the [`Requests`](https://requests.readthedocs.io) library:

```py
res = requests.get(url=f"{BASE_URL}&t={movie.title}&y={movie.year}")
payload = res.json()

with open(f"data/json/{movie.title} ({movie.year}).json", "w") as f:
    json.dump(payload, f)
```

Here's what the content of the JSON file for the "_In the Mood for Love_" movie from 2000 looks like:

```json
{
  "Title": "In the Mood for Love",
  "Year": "2000",
  "Rated": "PG",
  "Released": "09 Mar 2001",
  "Runtime": "98 min",
  "Genre": "Drama, Romance",
  "Director": "Kar-Wai Wong",
  "Writer": "Kar-Wai Wong",
  "Actors": "Tony Leung Chiu-wai, Maggie Cheung, Siu Ping-Lam",
  "Plot": "Two neighbors form a strong bond after both suspect extramarital activities of their spouses. However, they agree to keep their bond platonic so as not to commit similar wrongs.",
  "Language": "Cantonese, Shanghainese, French, Spanish",
  "Country": "Hong Kong, France",
  "Awards": "Nominated for 1 BAFTA Award44 wins & 50 nominations total",
  "Poster": "https://m.media-amazon.comimages/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.1/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "92%"
    },
    {
      "Source": "Metacritic",
      "Value": "87/100"
    }
  ],
  "Metascore": "87",
  "imdbRating": "8.1",
  "imdbVotes": "169,609",
  "imdbID": "tt0118694",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$2,738,980",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
```

This is a whole lot of information for the purpose of my small script. We can discard most of the metadata by only keeping the key-value pairs we're interested in. Remember the headers we defined earlier? Let's make good use of them!

```py
movies_data[f"{movie.title}-{movie.year}"] = {
    header: payload.get(header) for header in HEADERS
}
```

All we're doing here is just keeping the key-value pairs we're interested in, where the key is comprised within the headers we have defined. The metadata for each movie is stored in a dictionary that stores this information (which is itself also a dictionary).

### Generating the movie table

To generate the actual movie table with all the metadata that I was interested in, I used [Polars](https://pola.rs). You can use any data manipulation library you like or you are used to (e.g. the well-known [Pandas](https://pandas.pydata.org)). I went with Polars to try it out as I'm a long-time user of Pandas and well-accustomed to it overall, but I have heard of how Polars is supposed to be blazingly fast and performant (it's written in Rust under-the-hood). For this purpose, I can't say much about that since the dataset is so small and I'm only building a dataframe from a dictionary. But I must say the syntax is quite close to Pandas and the documentation is really good as well.

```py [main.py]
def get_movies_dataframe() -> pl.DataFrame:
    json_dir = Path("data/json")
    movies_data = {}

    for json_file in json_dir.glob("*.json"):
        with open(json_file, "r") as f:
            data = json.loads(f.read())
            movies_data[f"{data.get("Title")}-{data.get("Year")}"] = {
                header: data.get(header) for h in HEADERS
            }

    df = pl.from_dicts(list(movies_data.values()))
    df.write_csv("movies.csv")

    return df
```

Here's what the table looks like picking the top 5 rows (for brevity, I omitted some columns):

|       **Title**       | **Year** | **Runtime** |      **Genre**      |  **Director**   | **Rating** |
| :-------------------: | :------: | :---------: | :-----------------: | :-------------: | :--------: |
| In the Mood for Love  |   2000   |   98 min    |   Drama, Romance    |  Kar-Wai Wong   |    8.1     |
|     Paris, Texas      |   1984   |   145 min   |        Drama        |   Wim Wenders   |    8.1     |
|      Breathless       |   1960   |   90 min    |    Crime, Drama     | Jean-Luc Godard |    7.7     |
| Raise the Red Lantern |   1991   |   125 min   |   Drama, Romance    |   Yimou Zhang   |    8.1     |
|        Ugetsu         |   1953   |   96 min    | Drama, Fantasy, War | Kenji Mizoguchi |    8.2     |

## Outro

Moving forward, we could use this consolidated data to build a [recommendation system](https://en.wikipedia.org/wiki/Recommender_system) since the data includes IMDb ratings. This could turn out to be a fun little project on the side. Alternatively, we could do some EDA[^5] and generate some nice plots to gain visual insight into the dataset (e.g. highest occurring genre, mean rating, distribution of movies per year, etc.).

[^5]: Exploratory Data Analysis
