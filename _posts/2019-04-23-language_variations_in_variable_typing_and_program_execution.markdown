---
layout: post
title:      "Language Variations in Variable Typing and Program Execution"
date:       2019-04-23 17:22:22 +0000
permalink:  language_variations_in_variable_typing_and_program_execution
---


Programming languages all have certain characteristics by which they can be compared. The most common of which are typing and the method in which they are turned into machine readable instructions. 

When discussing a programming language's typing, we are referring to the manner in which it determines which category of data a given variable belongs to. Each language typically has its 'primitive', or included types, such as integer, character, float, etc. In addition to primitive types, languages usually allow programmers to create their own datatypes as well, such as user-defined structures and objects. A reason why a given language needs to 'type' its variables is that different types take up different amounts of memory and errors can occur if a variable's assigned contents won't fit in it's alloted memory. 


**Static vs. Dyamic Typing**

In statically typed languages such as C++ and Java, the type of the variable defined in a program is determined linguistacally as the code is being compiled into binary. The type is determined once and does not and cannot change afterwards.  

Dynamically typed languages like Python and Javascript allow for variables to change type at will because there is an extra layer between the language syntax and machine code, typically called an interpreter. The interpreter can handle a type change as the code is being run because it is creating machine code on the fly. 


**Stong vs. Weak Typing**

In addition to being statically or dynamically typed, a language can also be described as strongly typed or weakly (loosely) typed. A strongly typed language is very strict about changing the type of a variable, requiring explicit casting or coersion of one type into another. A weakly typed language will do its own casting / coersion without explicit instruction from the programmer. It will do so according to its own rules thought, so it's important to know what they are going to take advantage of them.



**Compiled vs. Interpreted vs. Runtime / Virtual Machine**

Related to but distinct from typing is a language's execution translation and execution process. C++ is a compiled language. The instuctions that the programmer writes in C++ syntax are read and turned into a separate program written in assembly language by a compiler, which is a separate program designed to make this new program. 

Python is an interpreted (scripted) language, meaning that instead of a compiler, it requires an intepreter to run. The high level instructions are read by the interpretor, which then translates and executes them, typically command by command. A new program is not created as with a compiler.

Java is an example of a runtime language which employs a virtual machine to translate between high level and machine code. The high level instructions are being compiled by the virtual machine, but not in total the way a compiler would. It compiles and then executes while the program is being run.

Hopefully this has shed some light on the differences that programming languages have in typing and execution concepts. For more information check out the links below.

https://en.wikipedia.org/wiki/Strong_and_weak_typing

https://kb.iu.edu/d/agsz

https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages
