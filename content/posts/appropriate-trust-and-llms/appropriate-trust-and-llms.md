---
title: "Appropriate Trust and LLMs"
date: 2025-10-28
draft: false
---

This blog post is my attempt to explain a critical mismatch between how much people trust LLMs and how much they probably should be trusted. I believe this disparity is partly due to everyone being used to traditional computing paradigms that almost always return the correct or near optimal solutions to the problems that they were designed to solve.

To get my points across, I will be using some of the popular softwares everyone uses as examples and comparing their working, output and failure modes against LLMs in this blog. These softwares include Maps that show the fastest route to a place, Excel and other databases that hold data and compute results effortlessly and accurately, and chat apps that reliably transmit messages between users. The interactions with these softwares over time built an implicit trust in the outputs we receive from them which translated to us trusting the output from LLMs too.

There are bugs and errors in traditional softwares too, but their most common failure mode is to display an error message or a program crash, both of which are evident to the user. For LLMs on the other hand, the most common failure mode is hallucinations, where incorrect information is represented as accurate with confidence. This makes it much harder to notice the instances in which LLMs fail.

<br>

![ChatGPT Failure](images/chatgpt-fail.png)
<center>
<!-- <blockquote class="twitter-tweet"><p lang="en" dir="ltr">I do find this just amazing <a href="https://t.co/4YGcDmwcpk">pic.twitter.com/4YGcDmwcpk</a></p>&mdash; Tom Goodwin (@tomfgoodwin) <a href="https://twitter.com/tomfgoodwin/status/1981392894817948137?ref_src=twsrc%5Etfw">October 23, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  -->
    <figcaption><i>A ChatGPT failure that became popular on twitter. We will be seeing a lot more instances where decisions with real world consequences are taken based on facts LLMs hallucinated.</i></figcaption>
</center>

This brings us to the point on why LLMs cannot be as reliable as the previously mentioned apps. Traditional software applications do severely narrow tasks compared to LLMs and have very restricted input and output formats. The main ones for the above used examples being, source and destination in maps, data or formula in Excel, and text messages in chat apps. A well-defined and deterministic algorithm computes the output based on the inputs for these cases. There are also very few variations of the tasks that these programs have to handle. This allows each case-specific algorithm to be manually programmed as per how we want the output to be. 

In contrast, LLMs are a generalized learned function that accepts natural language input and is capable of doing the requested task in the prompt such as explaining topics, text summarization, idea brainstorming, or holding conversations.

This requires LLMs to have information on a vast number of topics and also have an internal world model representation to accurately find the relationships between them. This information is stored in the weights of the LLMs which are a collection of numbers that are learned during training. The amount of weights an LLM can store is predefined at the time of training and is chosen considering practical training and inference costs. 

The limited amount of weights forces LLMs to store information in a compressed way, much like trying to memorize an entire library by taking summary notes. Just as you would lose details and occasionally misremember facts when working from condensed notes, LLMs must compress the vast knowledge from their training data into a fixed number of parameters. This compression is inherently lossy which means some information gets distorted or lost in the process. This is why distortions and hallucinations are inevitable with the current LLM architectures.

The natural language and conversational style interaction with the LLMs also leads to people anthropomorphizing and attributing human-like understanding of concepts to them. This is wrong as LLMs are trained for the task of next token(a small unit of text like a word or few letters) prediction and do not have an inherent knowledge or understanding of concepts like we expect from other humans. Instead LLMs do pattern matching with its training data and generate the next most probable collection of tokens that would follow the input.

So what is the appropriate trust we should place on the outputs from LLMs? It depends on the importance of the task and consequences due to wrong decisions. You want to refine a paragraph you wrote? Just proofread the output to ensure that it conveys the same idea you wanted to convey. Want to learn the basics of a popular topic like programming or skills like basic cooking? The outputs are correct almost all the time. However, talk to it in depth about a topic you know about — in my case, Deep Learning — and you'll see it making up facts or coming to the wrong conclusions using flawed reasoning steps. Even for simple tasks, LLMs can hallucinate information, like the CSV parsing failure in the above Twitter post. Overall, I think the appropriate trust should be a good amount of cynicism on the LLM output which will be used for making non-trivial decisions. Cross check the facts on your own, ask the LLM to explain the reasoning process and also pass the same query multiple times in new sessions or with different LLMs to check if the response changes.

The part where LLMs excel is brainstorming ideas along with you and creating the initial draft. This allows quick iteration of ideas and also identifies potential gaps in your reasoning. They are also good at reformatting, summarizing, providing critiques and refining already existing content. In fact, I relied on LLMs extensively while writing this blog, from grammar correction to helping me spot gaps I might have missed. LLMs are really useful for these everyday tasks and this post is not intended to discourage people from using them. Instead I just want others to be more aware of the drawbacks and use them more responsibly.

As time progresses, the general public will become more used to the capabilities of the LLMs and will undergo a trust calibration. The LLMs will also get better over time, reducing hallucinations and being more grounded. However, the evolution will take time and we as users have to maintain a healthy amount of skepticism — knowing when to trust the output, when to verify and when to look elsewhere.