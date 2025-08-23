---
title: Python tips and quirks 🐍
description: A few concepts I have come upon while working with Python over the past year
date: "2025-08-23"
readtime: "12"
tags: { language: ["python"], field: [], type: ["notes"] }
---

## Preface

In this blog post, I will discuss several Python concepts and quirks I've encountered throughout the year, as well as some recurring topics that are worth revisiting, including:

- Class methods vs. static methods
- Ellipsis
- Forward references
- Keyword-only argument separator
- Positional-only arguments
- Logging optimisation
- Native HTTP server
- Task groups

### `@classmethod` vs. `@staticmethod`

If you've worked with more elaborate classes containing multiple methods performing different tasks, surely you've come accross class (`@classmethod`) and static (`@staticmethod`) methods by now. They are both methods of a class but serve different purposes.

#### Class methods

Class methods are usually used to create **factory methods**[^1] - methods that return an instance of the class. They can be called on the class itself, rather than on instances of the class. Class methods are also used to modify class state (via the `cls` parameter). To create a class method, you simply decorate a method with the `@classmethod` decorator.

[^1]: [Factory Method](https://refactoring.guru/design-patterns/factory-method)

#### Static methods

Static methods, on the other hand, do not have access to the class or an instance of the class. They are defined using the `@staticmethod` decorator and are used when you don't need to access or modify class or instance state. Static methods are essentially just regular functions defined within a class. It makes sense to use them for utility functions that operate on the input parameters rather than the class or instance itself.

> 🗒️ **Note**: _Why use static methods within a class instead of just creating a function in the global scope?_
>
> Static methods are useful when the function logically belongs to the class, even if it doesn't access class or instance data. Grouping related functionality within a class improves code organization, readability, and discoverability, especially in larger projects.

#### Example

Let's illustrate the difference between class methods and static methods with a simple example. In the example below, we have a `Temperature` class that demonstrates both types of methods. The class has an instance variable `degrees` that stores the temperature in Celsius.

> 🗒️ **Note**: An instance variable is not the same as a class variable. An instance variable is unique to each instance of a class, while a class variable is shared among all instances of the class.
>
> ```py
> class Animal:
>     animal_class = "mammal"  # Class variable
>
>     def __init__(self, value):
>         self.species = "dog"  # Instance variable
> ```

The class also includes a class method for converting Celsius to Fahrenheit and a static method for validating temperature values.

```py
class Temperature:
    def __init__(self):
        self.degrees = 20

    @classmethod
    def celsius_to_fahrenheit(cls):
        return cls(degrees * 9 / 5 + 32)

    @staticmethod
    def is_valid_temperature(degrees):
        return -273.15 <= degrees <= 1000
```

For `celsius_to_fahrenheit`, we can use a class method because it logically belongs to the class and operates on class state. For `is_valid_temperature`, we can use a static method because it doesn't need to access any class or instance data. You'll notice that the class method also creates a new instance of the class, which is a common pattern for factory methods. In this case, the class method is responsible for creating a new instance of the class with the converted temperature in Fahrenheit.

Conversely, for `is_valid_temperature`, we can use a static method because it doesn't need to access any class or instance data. All it does is validate the temperature value.

If you want to explore more about class methods and static methods, I recommend checking out the [official Python documentation](https://docs.python.org/3/library/functions.html#classmethod) and [this article](https://realpython.com/instance-class-and-static-methods-demystified/) from Real Python.

### Ellipsis

The ellipsis[^2] (`...`), originally added in Python 3.10, is a special built-in constant that is often used as a placeholder. It can be particularly useful in scenarios where you want to indicate that something is intentionally left incomplete or to be implemented later. Functionally, it behaves similarly to `pass`, but it can be more visually distinctive in certain contexts.

```py
def function_to_be_defined():
    ...
```

[^2]: [Ellipsis](https://docs.python.org/3/library/constants.html#Ellipsis)

### Forward references

Forward references[^3] allow you to use a type before it is fully defined. This can be useful in situations where you have mutually dependent types or when you want to refer to a type that is defined later in the code. In Python, you can use forward references by enclosing the type name in quotes. This tells the type checker to treat the name as a string and resolve it later.

[^3]: [Forward References](https://peps.python.org/pep-0484/#forward-references)

```py
def process_node(node: "Node"):
    # Do something with the node
    pass


class Node:
    def __init__(self, value: int, children: list["Node"]):
        self.value = value
        self.children = children
```

As an example, take this `Node` class that has an `__init__()` method. The `Node` class represents a tree structure where each node can have multiple children. The `children` parameter is a list of `Node` instances, but since the `Node` class is not fully defined at the point where we use it, we need to use a forward reference. This is a prime example of mutually dependent types, where the `Node` class references itself in its own definition.

Another example is when you have a function that takes a type hint for a parameter that is defined later in the code. In this case, you can use a forward reference to refer to the type before it is fully defined. In the example above, the `process_node` function takes a `Node` parameter, but the `Node` class is defined after the function. By using a forward reference, we can still type hint the parameter correctly and allow the type checker to validate the types.

### Keyword-only argument separator

To my knowledge, this is a lesser known feature of Python. And believe it or not, but the PEP that introduced this feature is [PEP 3102](https://peps.python.org/pep-3102/), which was created nearly 20 years ago, all the way back to 2006. It allows you to define keyword-only arguments in a function signature by using `*` as a separator.

```py
def foobar(a, b, *, c, d):
    pass
```

In this example, `a` and `b` are positional arguments, while `c` and `d` are keyword-only arguments. The `*` acts as a separator, indicating that any arguments after it must be specified as keywords when calling the function. This is particularly useful when you want to enforce that certain arguments must be provided as keywords, improving code readability and preventing accidental positional argument misplacement.

Another use case for keyword-only arguments is when you want to provide default values for certain parameters while still enforcing that they must be specified as keywords.

```py
def foobar(a, b, *, c=1, d=2):
    pass
```

In this example, `c` and `d` have default values, but they must still be specified as keywords when calling the function. This allows you to provide some flexibility in how the function is called while maintaining clarity in the code.

### Positional-only arguments

We can't talk about keyword-only arguments without mentioning positional-only arguments. Introduced in [PEP 570](https://peps.python.org/pep-0570/), positional-only arguments are defined by placing a `/` in the function signature. This indicates that any arguments before the `/` must be provided positionally and cannot be specified as keywords.

```py
def foobar(a, b, /, c, d):
    pass
```

In this example, `a` and `b` are positional-only arguments, while `c` and `d` can be specified as either positional or keyword arguments. Although the keyword-only argument separator (`*`) first appeared in Python 3.0, positional-only arguments were introduced much later in Python 3.8.

### Logging optimisation

When it comes to logging in Python, you might be tempted to use f-strings for formatting log messages in which you need string interpolation. However, using `%s` formatting is more efficient in terms of performance. I was surprised to learn this, as I had always assumed that f-strings were always the most performant way to format strings in Python (I admit, without giving much thought). The thing is, f-strings are evaluated at runtime, which means that the string interpolation happens even if the logging never occurs (e.g., if the log level is set higher than the message being logged). This is called **eager evaluation**, and it can lead to unnecessary overhead, especially in performance-critical applications. The `%` string interpolation, on the other hand, only evaluates the message if the log level is active, making it more efficient. This is known as **lazy evaluation**.

To illustrate the performance difference, let's look at two examples that log the same message using both f-strings and `%` formatting. In both examples, we will log a message 1 million times, but we will set the logging level to `CRITICAL`, which means that the log messages will not actually be output when using `log.info()`. This way, we can focus on the performance of the string formatting itself without the overhead of actual logging output.

#### Using f-strings

In this example, the log message is formatted using an f-string. Even though the log level is set to `CRITICAL`, the f-string is still evaluated 1 million times, leading to unnecessary overhead.

```py [log_fstring.py]
import logging

logging.basicConfig(level=logging.CRITICAL)
log = logging.getLogger()

args1 = "value1"
args2 = "value2"
for _ in range(10**6):
    log.info(f"some log {args1} data {args2} to be logged")
```

#### Using `%` formatting

Conversely, in this example, the log message is formatted using `%` formatting. The message is only evaluated if the log level is active, which means that the string interpolation does not occur when the log level is set to `CRITICAL`.

```py [log_percent.py]
import logging

logging.basicConfig(level=logging.CRITICAL)
log = logging.getLogger()

args1 = "value1"
args2 = "value2"
for _ in range(10**6):
    log.info("some log %s data %s to be logged", args1, args2)
```

#### Performance comparison

You'll notice the only difference between the two examples is the way the log message is formatted. The first example uses f-strings, while the second uses `%` formatting. Now let's compare their performance using the `hyperfine` tool:

```sh
hyperfine --warmup 3 --runs 25 'python log_fstring.py' 'python log_percent.py'
```

Here's the output of the performance comparison:

| Command                       |   Mean [ms] | Min [ms] | Max [ms] |    Relative |
| :---------------------------- | ----------: | -------: | -------: | ----------: |
| `python log_fstring.py 10**6` | 324.9 ± 3.0 |    320.5 |    332.2 | 1.16 ± 0.01 |
| `python log_percent.py 10**6` | 280.6 ± 2.5 |    277.2 |    286.3 |        1.00 |
| `python log_fstring.py 10**7` |  2234 ± 2.2 |     2198 |     1273 | 1.22 ± 0.02 |
| `python log_percent.py 10**7` |  1831 ± 2.1 |     1798 |     1872 |        1.00 |
| `python log_fstring.py 10**8` | 21771 ± 240 |    21265 |    22343 | 1.24 ± 0.02 |
| `python log_percent.py 10**8` | 17534 ± 223 |    17186 |    17998 |        1.00 |

As you can see, the `%` formatting is consistently faster than f-strings, especially as the number of iterations increases (about ~15-25% faster). Cool tip to keep in mind when working with extensive logging in Python. Shout-out to my team mate for this one! 🙌

### Native HTTP server

If you're looking for a quick way to serve files over HTTP, Python has a built-in HTTP server that can be started with just one command. This is particularly useful when you just want a quick and dirty way to serve locally. For this purpose, you can use the `http.server` module to start a simple HTTP server. A few days ago, I had generated my blog locally to a directory (`.output/public`) and wanted to quickly preview it in my browser. Instead of setting up a more complex server, I used Python's built-in HTTP server to serve the files in that directory. Pretty neat and quick!

```sh
python -m http.server 8000 --directory .output/public
```

### TaskGroups

Task groups are a feature introduced in Python 3.11 that allows you to manage multiple asynchronous tasks more easily. They provide a way to group related tasks together and wait for all of them to complete before proceeding. This is particularly useful when you have multiple asynchronous operations that need to be executed concurrently and you want to ensure that they all finish before moving on.

Task groups are created using the `asyncio.TaskGroup` class, which provides a context manager for managing tasks. When you enter the context of a task group, you can create and run multiple tasks concurrently. When you exit the context, the task group waits for all tasks to complete.

> 🗒️ **Note**: Context managers are a way to manage resources in Python. They allow you to define a block of code that will be executed with a specific resource, and ensure that the resource is properly cleaned up when the block is exited. Context managers are created using the `with` statement, which provides a way to define a block of code that will be executed with a specific resource.

Here's a simple example of how to use task groups in Python:

```py
import asyncio


async def task1():
    await asyncio.sleep(1)
    print("Task 1 completed")

async def task2():
    await asyncio.sleep(1)
    print("Task 2 completed")

async def main():
    async with asyncio.TaskGroup() as tg:
        tg.create_task(task1())
        tg.create_task(task2())
    print("All tasks completed")

if __name__ == "__main__":
    asyncio.run(main())
```

In this example, we define two asynchronous tasks, `task1` and `task2`, which simulate some work by sleeping for 1s. In the `main` function, we create a task group using the `async with` statement. We then create and run both tasks within the task group. When we exit the context of the task group, it waits for both tasks to complete before printing `"All tasks completed"`.
