---
title: Curating my played videogames
description: A collection of the games I have played and reviewed with metadata fetched using the IGDB API
date: "2024-10-10"
readtime: "6"
tags: { language: ["python"], field: ["gaming"], type: ["script"] }
---

## Preface

In my [previous post](06-movies.md), I discussed consolidating my movie watchlist. In this post, I will explain how I am compiling a list of the video games I have played to date.

I've always had a computer in my bedroom, ever since I can remember. In the early days of my childhood, I spent countless hours engaging with the imaginary hidden behind each and every pixel of my bulky CRT monitor. I catalogued a great many titles of old that are now relics of a time past, a time that I now look back at with tenderness and nostalgia.

Safe to say that video gaming has been a hobby I've always enjoyed indulging in. The creativity and imaginary side of which, many people will be too quick to dismiss in favour of something deemed healthier for our bodies. Which is, in my opinion, partly true. It is indeed not a very active hobby, but health is not just of the body, but also of the mind. Video games have brought me joy on many different occasions: whether in displeasing moments of my life, as a pastime, or when the weather was not cooperative, or simply because I felt like it.

Recently, I made some efforts to keep track of the movies I have seen. Now I want to do the same for video games. But, this time, I want to also give them a rating of my own and a small review. This short post will describe how I gather video game metadata (e.g. genre, platforms, etc.).

## Gathering video game metadata from IGDB

The Internet Game Database ([IGDB](https://www.igdb.com)) is an online database for video games initially launched in 2014 and owned by Amazon[^1]. Similarly to [OMDb](https://www.omdbapi.com), IGDB stores information about video games, including genre, game engine, company, and many others. IGDB also has a [documented public API](https://api-docs.igdb.com) that you can use to query against any video game in the database.

[^1]: [Wikipedia - IGDB](https://en.wikipedia.org/wiki/IGDB)

### Trying out **uv**

I thought this small script was a good excuse to give `uv` a try. `uv` is a new name in the realm of "Python package and project managers". What distances it from competitors like good-old `pip`, or more modern, all-encompassing project managers, like `poetry`, is that it is completely written in Rust under the hood. Claiming to be 10-100x faster than `pip`, and boasting attractive features like inline dependency metadata, virtual environment management, managed Python versions, all the while also providing a pip-compatible interface, makes it a very strong contender for my new go-to Python package and project manager tool to be added to my toolset.

To start any project in Python using `uv`, similarly to what `poetry` does, simply call `uv init ...` (use the `--help` flag if you feel lost). In my case, I ran the following command:

```shell
uv init --name games --no-package
```

The `--no-package` flag tells `uv` that this project is not a Python package (in fact, it is just a small Python script). After running the abovementioned command, `uv` will generate the project directory structure for you, including the `pyproject.toml` file containing project metadata.

Adding dependencies is as straightforward as it comes, e.g. to add `polars` as a dependency, simply call:

```shell
uv add polars
```

### Setting the dependencies

For this small project, I selected the following dependencies:

- `polars` for data processing
- `python-dotenv` to store secrets locally
- `requests` to interact with APIs using HTTP requests

After adding the aforementioned dependencies, our `pyproject.toml` looks like this:

```toml
[project]
name = "games"
version = "0.1.0"
description = "Fetch video game metadata via the IGDB API"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "polars>=1.7.1",
    "python-dotenv>=1.0.1",
    "requests>=2.32.3",
]
```

### Storing secrets

Sensitive data (also called _secrets_) needs to be securely stored and managed. In the context of this project, we have two such secrets:

- `CLIENT_ID`
- `CLIENT_SECRET`

The `CLIENT_ID` is a unique identifier for the client and comes with a `CLIENT_SECRET` that the user can generate using their Twitch account (IGDB is owned by Twitch, which is itself owned by Amazon). Both of these variables are confidential and should be kept away from prying eyes, as they will be used to request an `access_token` from the IGDB API which will then be used for authentication.

One proven way to store sensitive information like the one described above is to store these values in a local `.env` file.

> ⚠️ **Warning**: Never ever push `.env` files or similar secret-containing files to any VCS[^2]!

[^2]: Version Control System

In Python, the `python-dotenv` package allows us to easily define our secrets in a `.env` file, which can then be loaded into our Python script.

For this project, I defined my `.env` file as follows:

```py
CLIENT_ID="🤐"
CLIENT_SECRET="🤐"
```

Obviously, the contents of each variable are different; I'm trying to prove a point here!

Loading these variables into your Python script is as easy as it comes:

```py [main.py]
import os

from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
```

By using `python-dotenv`, you can keep your sensitive information out of your source code, making your project more secure and easier to manage. That's it!

### Authentication against the IGDB API

Now comes the authentication part. To request an `access_token` from the IGDB API, we make the following POST request:

```py [main.py]
# Get the access token from the response
url = f"https://id.twitch.tv/oauth2/token?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&grant_type=client_credentials"
resp = requests.post(url).json()
token = resp["access_token"]
```

### Request video game metadata

Now that we have our secrets set up and acquired our access token, we can finally make our first request to fetch video game metadata.

Here's what this looks like:

```py [main.py]
# Set up IGDB url and headers
igdb_url = "https://api.igdb.com/v4/games"
headers = {
    "Client-ID": CLIENT_ID,
    "Authorization": f"Bearer {token}",
}

# Specify game we want to query
game = "Alien Isolation"

# Make a POST request to get video game metadata
query = f'search "{game}"; fields name,first_release_date,genres.name,platforms.name,rating,url; where category = 0 & version_parent = null; limit 5;'
resp = requests.post(igdb_url, headers=headers, data=query).json()
```

The only part worth mentioning is the actual POST request, the rest is self-explanatory. The `query` looks rather verbose but it is required as this is where we define the fields we want to include in our response. In this case, we requested:

- `name`: video game name
- `first_release_date`: first release date (UNIX timestamp[^3])
- `genres.name`: video game genres (e.g. "Adventure")
- `platforms.name`: video game platforms (e.g. "PlayStation 5")
- `rating`: average IGDB user rating
- `url`: IGDB video game URL

Feel free to explore more fields provisioned by the IGDB API in the [docs](https://api-docs.igdb.com/#game).

[^3]: [Wikipedia - Unix time](https://en.wikipedia.org/wiki/Unix_time)

On top of these fields, we also filter the results on the following points:

- `category = 0`: only include the main game (e.g. no DLCs)
- `version_parent = null`: exclude game versions (e.g. "Deluxe Edition")
- `limit 5`: restrict results to a maximum of five entries

Once the query is set, we make the actual POST request using `requests.post`, making sure to include the `headers` to allow us to authenticate successfully. The results are then parsed to JSON format so that we can process it further.

### Creating a table

Some trivial data post-processing is performed on the results such as converting Unix timestamps to human-readable format and extracting only the year, rounding the IGDB average rating to 1 decimal case, sorting the genres alphabetically, among others. I also kept track of games that failed being parsed (e.g. not present in the database, wrong name, etc.). Once all is set and done, I created a `polars.DataFrame` and generated a CSV file using the `write_csv` method from the `DataFrame` class. That's it! 🎉

Here's what the output CSV file looks like:

|   Name    | Year |                    Genres                     |                           Platforms                            | Rating |                        URL                        |
| :-------: | :--: | :-------------------------------------------: | :------------------------------------------------------------: | :----: | :-----------------------------------------------: |
| Anno 1800 | 2019 | Real Time Strategy (RTS), Simulator, Strategy |                     PC (Microsoft Windows)                     |  8.8   | [Anno 1800](https://www.igdb.com/games/anno-1800) |
| Frostpunk | 2018 |          Indie, Simulator, Strategy           |      Mac, PC (Microsoft Windows), PlayStation 4, Xbox One      |  8.4   | [Frostpunk](https://www.igdb.com/games/frostpunk) |
|  Valheim  | 2022 |     Adventure, Indie, Role-playing (RPG)      | Linux, Mac, PC (Microsoft Windows), Xbox One, Xbox Series X\|S |  8.6   |   [Valheim](https://www.igdb.com/games/valheim)   |

Now I can easily import this metadata into note-taking apps that suppor importing CSV files. One such app that I recently discovered, and am so far a happy user of, is [Appflowy](https://appflowy.io) - in a nusthell, a FOSS[^4] replacement for well-established note-taking apps such as Notion and Obsidian.

[^4]: Free and Open Source Software

## Outro

This was a fun little project, easy to come up with and also an excuse to try out new tools (such as `uv`). Maybe I can use this ordered data to create some kind of recommendation system, or integrate it with my own reviews and display that somewhere online for archival purposes.
