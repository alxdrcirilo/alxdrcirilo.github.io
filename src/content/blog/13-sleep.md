---
title: Sleep analysis with Apple Health Parser
description: Adding sleep analysis capabilities to the Apple Health Parser Python package
date: "2025-07-21"
readtime: "5"
tags:
  {
    language: ["python"],
    field: ["open source", "data science", "data visualisation"],
    type: ["package", "tool"],
  }
repo: https://github.com/alxdrcirilo/apple-health-parser
---

## Preface

Last year, I launched the first version of my **Apple Health Parser** Python package, which became available on [PyPI](https://pypi.org/project/apple-health-parser) on July 5, 2024. I also shared a [blog post](./05-apple_health_parser.md) detailing its initial release. Since then, I've been eager to expand its capabilities. Recently, I finally found some time and motivation to introduce a new feature: sleep data analysis. This post covers the motivation, process, and results of adding this functionality.

### Motivation

Sleep is a crucial aspect of our health, and I wanted to incorporate sleep analysis into the **Apple Health Parser**. This feature allows users to extract and analyse their sleep data from Apple Health, providing insights into their sleep patterns and quality.

## Implementation

The implementation of sleep analysis was straightforward, thanks to the existing structure of the **Apple Health Parser**. The package already supported various health data types, so adding sleep data was a matter of extending the functionality.

First, I defined a new enum `SleepType` to represent the different types of sleep data. This enumeration includes values for in-bed time, awake time, and various stages of sleep such as core, deep, and REM sleep.

```py [apple_health_parser/models/records.py]
class SleepType(StrEnum):
    IN_BED = "HKCategoryValueSleepAnalysisInBed"
    AWAKE = "HKCategoryValueSleepAnalysisAwake"
    CORE = "HKCategoryValueSleepAnalysisAsleepCore"
    DEEP = "HKCategoryValueSleepAnalysisAsleepDeep"
    REM = "HKCategoryValueSleepAnalysisAsleepREM"
    UNSPECIFIED = "HKCategoryValueSleepAnalysisAsleepUnspecified"
```

Then, I created a dataclass `SleepColors` to define the colors associated with each sleep type. This allows for easy customization of the visual representation of sleep data.

```py [apple_health_parser/config/definitions.py]
@dataclass(frozen=True)
class SleepColors:
    in_bed: str = "#00c7bd"
    awake: str = "#ff816a"
    core: str = "#32abe4"
    deep: str = "#007aff"
    rem: str = "#3634a3"
    unset: str = "#505050"
```

Once these are set, we need to create a new class to handle sleep data. This class will inherit from the base `HealthData` class, allowing it to integrate seamlessly with the existing framework.

```py [apple_health_parser/models/sleep.py]
class SleepData(HealthData):
    timezone: TimeZoneName | str = Field(
        alias="timezone",
        title="Timezone",
        description="Timezone of the sleep data",
        examples=["Europe/Amsterdam", "Africa/Cairo"],
    )

    @computed_field
    def range(self) -> timedelta:
        """
        Get the range of the sleep data.

        Returns:
            Timedelta: Range of the sleep data
        """
        return self.end_date - self.start_date
```

This class includes a `timezone` field to store the timezone of the sleep data and a computed field `range` to calculate the duration of the sleep period. The timezone make use of `TimeZoneName` which can be imported from pydantic's extra types module:

```py
from pydantic_extra_types.timezone_name import TimeZoneName
```

Finally, I implemented a `SleepPlot` class to visualize the sleep data using `plotly`. This class takes the parsed sleep data and generates a plot that displays the different sleep stages over time. The two most relevant parts of the code for this class are the timerange validation (if provided as an argument) and the plotting logic.

### Timerange validation

The `SleepPlot` class accepts an optional `timerange` argument, which allows users to filter the sleep data by a specific date range. If provided, the timerange is validated to ensure it is a tuple of two strings in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. The strings are then converted to `datetime` objects for filtering the dataframe.

```py [apple_health_parser/plot/sleep.py]
if timerange is not None:
    # Validate timerange
    if not isinstance(timerange, tuple) or len(timerange) != 2:
        raise ValueError("timerange must be a tuple of two date strings.")
    if not all(isinstance(date, str) for date in timerange):
        raise ValueError(
            "Both elements of timerange must be strings in ISO format."
        )

    # Convert strings to datetime objects
    start_dt, end_dt = (datetime.fromisoformat(date) for date in timerange)
    timerange_iso: tuple[datetime, datetime] = (start_dt, end_dt)

    # Filter the dataframe based on the timerange
    self.dataframe = self.dataframe[
        (self.dataframe["start_date"] >= timerange_iso[0])
        & (self.dataframe["end_date"] <= timerange_iso[1])
    ]
```

### Plotting logic

For the color mapping, the `SleepColors` dataclass is used. This dataclass defines the colors for each sleep type, allowing for easy customization of the plot's appearance. The colors are mapped to the corresponding `SleepType` values in a dictionary, which is then used in the plotting logic.

```py [apple_health_parser/plot/sleep.py]
colors = {
    SleepType.IN_BED: SleepColors.in_bed,
    SleepType.AWAKE: SleepColors.awake,
    SleepType.CORE: SleepColors.core,
    SleepType.DEEP: SleepColors.deep,
    SleepType.REM: SleepColors.rem,
    SleepType.UNSPECIFIED: SleepColors.unset,
}
```

The plotting logic in the `SleepPlot` class uses `plotly` to create a figure that visualizes the sleep data. Each sleep stage is represented by a horizontal line, with different colors assigned to each stage based on the `SleepColors` dataclass. The hover text provides additional information about the sleep stage and its duration. Here's the relevant code snippet for generating the plot:

```py [apple_health_parser/plot/sleep.py]
fig = Figure()
for row in self.dataframe.itertuples():
    fig.add_trace(
        Scatter(
            x=[row.start_date, row.end_date],
            y=[row.value, row.value],
            name=row.value,
            showlegend=False,
            mode="lines",
            line_shape="hvh",
            line=dict(
                color=colors.get(SleepType(row.value), "black"), width=10
            ),
            hoverinfo="text",
            hovertext=f"{row.start_date} - {row.end_date}<br>Sleep stage: {row.value}",
        )
    )

fig.update_layout(
    xaxis_title="Date",
    yaxis_title=self.psets.title_yaxis,
    legend_title_text=self.psets.legend,
    template="simple_white",
)

return fig
```

## Outro

With the addition of sleep analysis capabilities, the **Apple Health Parser** Python package now provides users with a powerful tool to extract and visualize their sleep data. This feature enhances the package's functionality, allowing users to gain insights into their sleep patterns and make informed decisions about their health. Do note that this is a bit of a crude implementation, and there are potentially many ways to improve it, such as adding more detailed statistics or integrating with other health data types. The code itself could also be improved, but that's the best I could do for now given how little time I get outside of work and other commitments. The final result looks similar to the following example:

<div>
  <figure class="figure">
    <img alt="Sleep plot" src="images/2025/13-sleep/sleep.svg" class="figure-image svg" style="max-width: 400px;">
  </figure>
  <p class="figure-caption">Sleep plot.</p>
</div>

I hope this post has provided a clear overview of the motivation and implementation of the sleep analysis feature. If you're interested in using the **Apple Health Parser**, you can find it on [GitHub](https://github.com/alxdrcirilo/apple-health-parser) and [PyPI](https://pypi.org/project/apple-health-parser). Feel free to contribute or suggest improvements! And remember to get enough sleep and take care of your health, as they say, "one apple a day keeps the doctor away"!
