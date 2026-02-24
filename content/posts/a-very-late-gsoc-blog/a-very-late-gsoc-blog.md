---
title: "A very late GSoC blog post"
date: 2026-02-24
draft: false
---

I did GSoC, at DeepChem, back in 2024, during the third year of my undergrad. It's early 2026 now, everyone writes a blog post about their GSoC experience, after the program. I told my Twitter followers I would write one. Life happened after that, and I didn't really get to writing the blog.

Okay, nothing kept me so busy for a year and a half that I couldn't find time. But meh. I think I'll get to it now. I started writing the blog like the usual GSoC blogs: How I got to know about GSoC, how I got selected etc etc. Halfway through, I realised no one really gives a crap about it now. So I'll spare you those boring details. 

Instead, let's get into some of my key takeaways from the program and other general programming experience. You probably already know these anyway. 

1. The software is alive. It's a living breathing entity. The software/program is the organism. And the contributors are the living cells that keep the organism running. Constantly repairing the broken parts, growing new organs and expanding the capabilities of the organism. The outside users don't see the cells, they see the organism. They know its capabilities and would invest in one that looks like it thrives and has a long life ahead of it. An organism that's in the process of perishing, oh no, users would befriend it only in moments of desperation. Just like how a healthy set of cells is important for the continued existence of an organism, a project also needs a good number of competent contributors.

2. Think a decade ahead. Somewhere right now, a developer is spending their afternoon fixing a breaking change that someone introduced two years ago without thinking twice about downstream effects. 

   Multiple other programs and libraries will use the code you write. Any breaking changes in the future will affect these programs. The consequence of this will be multiple developer hours being spent to integrate the changes. When faced with having to make design and architectural decisions, go for one that wouldn't break the existing functionality and wouldn't stop or get in the way of adding further functionality in the future. With experience, you'll find more elegant and stable ways to add or make changes to the codebase. But it requires conscious thinking about the consequences of wrong decisions and trying to find a choice that would minimise it.

     
P.S. If you feel this blog seems like an excuse for me to talk about these points and doesn't have anything to do with GSoC, you're absolutely right. Pat yourself on the back and continue reading.  
   

3. Don't shy away from utility functions. As your codebase increases in size, you will have multiple custom classes, data types or objects, that handle certain functionalities and will have to manipulate the data in and of these classes itself. Even for things as trivial as converting the object into a different type or adding a wrapper class around it, if you think these operations will be done multiple times in the codebase, add a utility function for it. You'll thank yourself later when you want to modify some behaviour of the class and can modify the utility function instead of finding all the instances where the class is used.

   However, in my experience of adding new functionality to existing mature codebases, these utility functions are rarely documented and many times are not even in dedicated utility files. You can find them at the top of code files or god forbid as a function inside a function. I don't know what the right way to document these functions for new contributors would be. Personally, I come across these functions when familiarising myself with the codebase, but that depends entirely on whether I happen to open the right files, especially in large codebases.

4. Document as much as possible. If you are confused about the amount of content that should be documented, err on the side of more, as said in my organisation's contributor guidelines. As said in multiple other places, it's a courtesy you are doing to others and to your future self. Reading the documentation and understanding the working of a function or class is easier than reading the code to understand it. Also document the known edge cases where the code will break or won’t give the expected results. 

Thank you for reading this. Apologies if you wanted more details of the program and my experience itself but I am going to count this as my *The GSoC blog*, and there probably won't be any other blogs talking about the program. If you are curious about the technical side of my project and the work I did during the contribution period, they are documented in this report [here](https://hackmd.io/@gaushn/rk5Mkvw5C).  
