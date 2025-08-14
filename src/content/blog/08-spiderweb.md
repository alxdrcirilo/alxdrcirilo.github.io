---
title: Spinning a spiderweb 🕸️
description: BooOooOo 👻
date: "2024-10-31"
readtime: "9"
tags:
  {
    language: ["python", "rust"],
    field: ["data visualisation", "themed"],
    type: ["fun", "script"],
  }
repo: https://github.com/alxdrcirilo/spiderweb
---

## Preface

Halloween 🎃 is here, and with it come all the treats of autumn: think pumpkins, hot chocolate, cozy movie nights under a warm blanket, and... spiders! 🕷️

The other day, I was running in the park, as I usually do on Saturdays, and came up with a fun coding idea: building a spiderweb. Being the season and all, I thought it was appropriate. All I needed was to devise a way to represent the spiderweb, and use any plotting library of my liking to generate the actual image of the spiderweb. Since the scope of this project is very small, I thought it was a good excuse to try out _Rust_, the programming language.

## Spider-what?

So, what is a spiderweb? Spiderwebs come in all shapes and forms, but they all usually follow a simple recipe. In mathematical terms, a spiderweb is simply a **radial graph**. In this type of graph, **nodes** (the points where strands intersect) are arranged around a central point (the origin), and **edges** (the strands of the web) radiate outwards. Funnily enough, there is even a type of chart that takes its name from the spiderweb: the [spider chart](https://en.wikipedia.org/wiki/Radar_chart), more commonly known as the "radar chart".

I came up with a small illustration of a spiderweb which I'm going to use as template to design the way I will generate a spiderweb programmatically.

<div>
  <figure class="figure">
    <img alt="..." src="images/2024/8-spiderweb/sketch.svg" class="figure-image svg" style="max-height: 260px; width: auto;">
  </figure>
  <p class="figure-caption">Sketch of a spiderweb.</p>
</div>

### Design

Ok, so we now know that we need to define:

- **Edges**: strands pointing outwards from the origin
- **Nodes**: nodes in the graph - `(x, y)` coordinates
- **Depth**: layers (or rings) of the spiderweb

Anything else? 🤔

Well, yes! Spiderwebs are not perfectly symmetrical, as nature intended (that's part of their charm too). In fact, the "edges" do not deviate linearly from the origin, they can sometimes deviate more or less to one or the other direction. We'll refer to this as the **angle deviation** for the purpose of this blog post.

There is still something else we're missing: as the "rings" spread outwards from the origin of the spiderweb, the distance between each ring seems to increase significantly. Let's call this the **spreading factor**.

### Implementation

For the data generation part of this small project, I decided to get a bit out of my comfort zone and try to _Rust_ it out 🦀

I've only dabbled in Rust a few times before, and it's quite nice to see how verbose the error messages are; verbose but to the point. I'm also very happy to see that **cargo** - Rust's build system and package manager - includes a formatter out of the box: `cargo fmt`. How nice, no need for yet another third-party dependency! I'm a bit of a minimalist, so bear with me on that one 🤓

#### Defining the constants

Getting into the code, the first concepts we need to define are the constants enumerated in the [Design](#design) section. In Rust, one can define constants in the global scope, respecting the uppercase naming convention:

```rs [main.rs]
const DEPTH: u16 = 10;
const EDGES: u16 = 18;
const SCALING_FACTOR: f64 = 360.0 / EDGES as f64 / 2.0;
```

Notice that the variables are all constants (`CONST`), and they even include a type annotation (`...: u16`). If you're used to other languages like C++ or JavaScript, you'll notice that a semicolon - `;` is also added at the end of every statement.

> 🗒️ **Note**: Notice that we cast `EDGES` to `f64` - 64-bit floating-point literal to ensure that the division operation is a floating-point number. Rust is adamant about this and would complain otherwise.

The constants `DEPTH` and `EDGES` are of type `u16` - 16-bit unsigned integers (i.e. `2 ** 16 = 65536`, with values ranging from 0 to 65535).

#### Generating the angles

Next, we need to generate the angles from which each edge (or strand, in this context) will grow. I decided to go with `Vec<t>` which is a native type in Rust commonly used for dynamic arrays (heap-allocated resizable array).

> 🗒️ **Note**: Rust also has an array type with a fixed size (known at compile time); e.g. `let array: [i8; 3] = [1, 2, 3]` is an array of length `3` and type `i8`.

```rs [main.rs]
fn get_angles(edges: u16) -> Vec<u16> {
    // Divide the circle into a vector of angles
    (0..edges).map(|i: u16| i * 360 / edges).collect()
}
```

In the function `get_angles`, we simply generate a vector of equidistant angles (i.e. angles with the same distance from each other) based on the number of edges we defined. If we would have defined `edges = 4`, then the function would return `[0, 90, 180, 270]`. Easy peasy lemon squeezy, no? 🫛 🍋

> 📝 **Reminder**: No need for `return` at the end of a function in Rust. The last value is implicitly returned.

#### Generating the coordinates

Now that we have determined the angles at which each strand of the spiderweb protrude from the origin, we can move on to generating the coordinates of the nodes, i.e. the positions at which the strands intersect with the radial rings of the spiderweb. But how can we store such information? One way is to create a [hash table](https://en.wikipedia.org/wiki/Hash_table). If you're a _Pythonista_ 🐍, then a _dictionary_ might resonate better with you. It is essentially the same concept. Rust provides a hash table from the standard library - [`std::collections::HashMap`](https://doc.rust-lang.org/std/collections/struct.HashMap.html). But wait! We need to make sure the order in which the `key, value` pairs are added to the hash table is guaranteed. This is because we will use this to our advantage downstream when we plot the generated data. Unfortunately, `HashMap` is not ordered, but `BTreeMap` is 🎉 - [`std::collections.BTreeMap`](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html).

Let's define our hash table (in this case, based on a [B-tree](https://en.wikipedia.org/wiki/B-tree)):

```rs
let mut coordinates: BTreeMap<u16, Vec<(f64, f64)>> = BTreeMap::new();
```

Looks a tad scary for a simple variable declaration and initialisation 👻 Fear not!

First, we need to declare the variable as **mutable** with `let mut coordinates`. In Rust, variables are immutable by default, meaning that if you want to modify it, you need to explicitly declare it as mutable using the `mut` keyword. Next comes the type definition of the variable - `: BTreeMap<u16, Vec<(f64, f64)>>`. Again, it may look rather verbose and intimidating if you're coming from a dynamically-typed language such as Python. Rust needs to know the types of all variables at compilation time (type inference is used whenever the type is unspecified). All this means is that `coordinates` is of type `BTreeMap` where the _keys_ are of type `u16` (16-bit unsigned integer) and the _values_ are vectors of tuples, each containing two values of type `f64` (64-bit floating point). Finally, `= BTreeMap::new()` initialises the coordinates variable with a new, empty `BTreeMap`.

Let's go back to the angles we were talking about [earlier](#generating-the-angles) for a moment. Remember when I mentioned **angle deviation**? We need to apply small deviations to the angles we generated earlier. Have you ever seen a perfectly symmetrical spiderweb in the wild? Thought so! 😄

One way to add some variation to the values we generated for the angles is to add a so-called "scaling factor" as I mentioned [beforehand](#defining-the-constants). Safe to say that this scaling factor is large enough to simulate a significant variation in the angle value, but not too large in order to avoid angles being able to (nearly) overlap each other. Let's make use of a random number generator to add a flair of stochasticity to our data.

> 🗒️ **Note**: In Rust, external (i.e. non-native) libraries are called **crates**. There is a popular crate used for generating random numbers - [`rand`](https://docs.rs/rand/latest/rand).

But where are crates defined? And how do I add a crate to my project? 📦

In a nutshell, the `Cargo.toml` configuration file located at the root of any Rust project is responsible for defining the project's metadata, dependencies, and other configuration settings. This is what it looks like for this project:

```toml [Cargo.toml]
[package]
name = "spiderweb"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8.5"
```

The `[package]` section contains metadata about the package. And look what we have here: the `[dependencies]` lists the external crates that the project depends on. Neat, but how did I actually add it there? Well, you can always do it the old-fashioned way and add it manually. But you can also use the aptly named [`cargo-add`](https://doc.rust-lang.org/cargo/commands/cargo-add.html) command, in this case: `cargo add rand`.

Back to the code, here's how I implemented the angle deviation:

1. Import `rand` crate
2. Initialise the random number generator
3. Generate a random deviation for each angle

```rs [main.rs]
use rand::Rng;

let mut rng: rand::prelude::ThreadRng;
let angle: f64 = rng.gen_range(angle as f64 - SCALING_FACTOR..angle as f64 + SCALING_FACTOR);
```

The `gen_range` method is responsible for generating a random number in the defined interval which is just a range of values centered on the angle value with a variation of `SCALING_FACTOR`.

And now, a quick trip back to high school. Remember how to determine the position of a point on a circle? This is how you do it: `x = R × cos(θ)`, `y = R × sin(θ)`. If you're still a bit rusty (pun intended 🦀) after this, look at the image below.

<div>
  <figure class="figure">
    <img alt="Polar coordinates" src="images/2024/8-spiderweb/polar_coordinates.svg" class="figure-image svg" style="max-height: 260px; width: auto;">
  </figure>
  <p class="figure-caption">Determining polar coordinates on a circle.</p>
</div>

Note that _θ_ is given in [radians](https://en.wikipedia.org/wiki/Radian). Meaning we need to convert from degrees to radians. That's another free ticket to high school: `radians = π / 180° × degrees`, remember? In Rust, it looks like this:

```rs [main.rs]
let radians: f64 = angle as f64 * std::f64::consts::PI / 180.0;
```

All that remains now is to generate the coordinates for the remaining points in the spiderweb, at varying "depths" (i.e. rings in the spiderweb), and to store it in the hash table we have defined earlier - `coordinates` (of type `BTreeMap`), using the angles at the origin as _keys_, and the list of subsequent coordinates on that strand as _values_.

```rs [main.rs]
let mut angle_coordinates: Vec<(f64, f64)> = Vec::with_capacity(DEPTH as usize);

// Generate coordinates for each level
for level in 1..=DEPTH {
    // Add 5% random scaling factor to the radius
    let radius: f64 = rng.gen_range(0.95..1.05) * (level as f64).powi(3);

    // Add 3% random scaling factor to the (child) angle
    angle_coordinates.push((
        radius * radians.cos() * rng.gen_range(0.97..1.03),
        radius * radians.sin() * rng.gen_range(0.97..1.03),
    ));
}
coordinates.insert(angle as u16, angle_coordinates);
```

In essence, we initialise a temporary variable - `angle_coordinates` - that will hold the coordinates for one strand in the spiderweb, from the origin to the outermost ring. For each `level` (i.e. ring), we add a scaling factor of 5% to the radius of that ring to create some unevenness, and multiply it by the `level` (i.e. ring number). We do this to emulate how spiderwebs look in the wild: the further away from the origin, the larger the space in between each ring. We also add a scaling factor of 3% to each child node from the origin, all the way up to the last ring in the spiderweb. In other words, at each node, we vary each coordinate `x` and `y` independently by 3%. This inadvertently changes the child angle ever so slightly as a result, emulating the imperfect nature of spiderwebs.

## Spinning the spiderweb

Now that we're finally done with the implementation, we can go on and plot it! In short, I dump the `(key, value)` pairs of the `coordinates` hash table into a `.txt` file. Then I use the battle-proven [`matplotlib`](https://matplotlib.org) plotting library for Python. There are two phases during the drawing:

1. Draw strands protruding outwards from the origin
2. Draw the rings extending out from the origin

Our data will be looking somewhat like this:

```shell
[(0.0, 0.0), (1.0052278894916074, -0.12060741224622419), (8.094786850761109, -0.912748249683266), (26.492261322516562, -3.038783926023062), ...]
[(0.0, 0.0), (0.9190256748570114, 0.30465225364639914), (7.950517685945768, 2.6454729323344464), (25.026063704000304, 8.214566614571297), ...]
[(0.0, 0.0), (0.6770019651368773, 0.7559346625223347), (5.683326252770676, 6.093486083780733), (18.911062391835564, 20.245618349019534), ...]
```

Eeach line is a strand in the spiderweb, represented by a list of coordinates. To draw the spiderweb, we need to connect the points row-wise and column-wise, drawing the strands and the rings, respectively. And that's it! Have a look at the result below 🕷️🕸️

<div>
  <figure class="figure">
    <img alt="Spiderweb" src="images/2024/8-spiderweb/spiderweb.svg" class="figure-image svg" style="max-height: 260px; width: auto;">
  </figure>
  <p class="figure-caption">Spiderweb generated using <i>Rust</i> and <i>Python</i>.</p>
</div>

### Poking the spider 🕷️👈

Now that everything is set up, we can fiddle around with the constants (`DEPTH` and `EDGES`) and scaling factors to tweak the way the spiderweb looks. Here are some examples.

Here's what tweaking the number of **strands** looks like:

<div>
  <figure class="figure">
    <img alt="spiderweb depth=16 edges=6" src="images/2024/8-spiderweb/spiderweb_d16-e6.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
    <img alt="spiderweb depth=16 edges=12" src="images/2024/8-spiderweb/spiderweb_d16-e12.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
    <img alt="spiderweb depth=16 edges=18" src="images/2024/8-spiderweb/spiderweb_d16-e18.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
  </figure>
  <p class="figure-caption">Spiderwebs generated with <strong>DEPTH=16</strong> and <strong>EDGES=[6, 12, 18]</strong>, from left to right.</p>
</div>

And here's what modifying the number of **rings** looks like:

<div>
  <figure class="figure">
    <img alt="spiderweb depth=8 edges=18" src="images/2024/8-spiderweb/spiderweb_d8-e18.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
    <img alt="spiderweb depth=16 edges=18" src="images/2024/8-spiderweb/spiderweb_d16-e18.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
    <img alt="spiderweb depth=32 edges=18" src="images/2024/8-spiderweb/spiderweb_d32-e18.svg" class="figure-image svg" style="max-width: calc(100% / 3); padding: 0 6px; object-fit: contain;">
  </figure>
  <p class="figure-caption">Spiderwebs generated with <strong>DEPTH=[8, 16, 32]</strong> and <strong>EDGES=18</strong>, from left to right.</p>
</div>

You could tweak the scaling factor that affects the length of the strands, as well as modifying the scaling factor responsible for varying the angle of the strand protruding from each node. But that's a tale for another time!

## Outro

This was a fun little halloween-themed project! A few improvements could be made to further add to the realism such as making the edges between neighbouring nodes curved instead of linear, and changing the thickness of the strands somewhat randomly. But I'm happy with how it turned out for now.

Feel free to have a look at the code in the GitHub repository linked in the header of this blog post. Happy Halloween! 🎃
