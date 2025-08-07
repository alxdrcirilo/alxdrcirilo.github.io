---
title: Cycling 80km in the Netherlands 🚴‍♂️
description: Data-driven exploration of my longest cycling ride yet
date: "2025-02-20"
readtime: "4"
tags:
  {
    language: [],
    field: ["data visualisation"],
    type: ["mental health", "sports"],
  }
---

## Preface

I have been living in the Netherlands since September 2018. In the blink of an eye, I graduated, got my first job, switched careers, and in the midst of it, a whole pandemic occurred. Safe to say that these last 6.5 years felt like they flew by. When people think about the Netherlands, one of the first things that comes to mind is, you guessed it, **bikes**! According to the **Netherlands Institute for Transport Policy Analysis** (KiM), in 2022, there were an estimated 23.9 million[^1] bicycles, amounting to about 1.3 bicycles per person. That's a whole lot of bikes.

Personally, I enjoy cycling quite a bit. Not only because it's great for overall fitness, but also because of its effect on my mental health. Over nine months ago (May 9, 2024), I decided to go on a long distance cycling ride, partly motivated by the blooming flower fields, but also just because I enjoy it. I ended up cycling over a distance of 80km, starting at home, in Amsterdam, going around 35km South, to Lisse, a little town close to the famous flower fields of **Keukenhof**, and then all the way back home. In this blog post, I want to take you together with me on this ride and share some nerdy insights and moments.

[^1]: [Cycling facts 2023](https://english.kimnet.nl/binaries/kimnet-english/documenten/publications/2024/01/10/cycling-facts-2023/KiM+brochure+Cycling+facts+2023_def.pdf)

## Cycling route

As you would expect, the Netherlands has excellent cycling infrastructure with approximately 153,000km[^1] of cycle paths. So it's not difficult to imagine that you can pretty much get anywhere by bike in this country. I didn't have a very strict plan or route in mind, my sole goal was to bike a considerable distance and see the flower fields. Below you can find the whole trip with markers at every 10km.

![route](images/2025/12-cycling/route.png)

<p class="figure-caption">Cycling route (May 9, 2024).</p>

### Statistics

Here are some basic statistics on speed (km/h) and elevation (m) for this trip.

|      Metric       | Value |
| :---------------: | :---: |
|   Minimum speed   | 0.01  |
|   Maximum speed   | 30.63 |
|   Median speed    | 18.2  |
|    Mean speed     | 16.91 |
| Minimum elevation | -5.02 |
| Maximum elevation | 6.34  |

### Speed

If there's one thing I learned with this experience, it's that long distance cycling rides are tiring (who would have thought?). If you're a beginner, make sure to get some rest every other hour, bring plenty of water, a source of energy (e.g. protein bars), and be sure to also bring a power bank with you lest you get lost in the wilderness and can't find your way back.

My median speed was 18.2 km/h. For me, that was a maintainable speed for this type of long distance ride. I pushed it all the way up to 30.63 km/h at some point because I really wanted to know how fast I could bike with my 75€ rusty student bike (yep, still alive and kicking). It was fun, but it's not a bike that is really meant for this type of trip, more of a city bike.

<div>
  <figure class="figure">
    <img alt="Speed plot" src="images/2025/12-cycling/speed.svg" class="figure-image svg">
  </figure>
  <p class="figure-caption">Speed plot.</p>
</div>

> 🗒️ **Note**: All plots have been averaged per minute, so you won't be able to see the entirety of the data, particularly isolated peaks. I'm using SVG[^2] files to display the data. There are 17081 data points for this ride. This significantly slows the rendering of the page. Thus, I averaged the data per minute, yielding a total of 289 data points.

[^2]: Scalable Vector Graphics

### Elevation

In terms of elevation, the ride was relatively flat, as expected in the Netherlands. The minimum elevation of -5.02m below sea level and the maximum elevation of 6.34m show that there were only minor changes in altitude, mainly due to bridges and viaducts. This made the ride less physically demanding and more enjoyable.

<div>
  <figure class="figure">
    <img alt="Elevation plot" src="images/2025/12-cycling/elevation.svg" class="figure-image svg">
  </figure>
  <p class="figure-caption">Elevation plot.</p>
</div>

### Distance

Lastly, let's take a look at the cumulative distance. It's interesting to see that, with the exception of the one longer pause I took close to the middle of the trip, the distance I rode with my bike was virtually linear. This is somewhat peculiar as I would have guessed that, with the passing hours, one would tire and the speed at which you would ride a bike would slowly decreasing, and this would be reflected in this plot, perhaps best represented by a logarithmic trendline.

<div>
  <figure class="figure">
    <img alt="Distance plot" src="images/2025/12-cycling/distance.svg" class="figure-image svg">
  </figure>
  <p class="figure-caption">Distance plot.</p>
</div>

## Outro

This was a great experience that I would highly recommend to anyone who enjoys cycling or is looking for a way to explore a less conventional way to uplift their spirits. The combination of physical activity, scenery, and the sense of accomplishment from completing such a long ride made it a memorable adventure. Whether you're a seasoned cyclist or a beginner, there's something rewarding about pushing your limits and discovering new places on two wheels. So, grab your bike, plan your route, and embark on your own cycling journey. Here are a few shots from my trip 😊

I'm planning to do another cycling trip this year once the weather clears up a bit, this time around I'm aiming for 100km! 🚴‍♂️

![trip](images/2025/12-cycling/trip.png)

<p class="figure-caption">A few shots from my trip.</p>
