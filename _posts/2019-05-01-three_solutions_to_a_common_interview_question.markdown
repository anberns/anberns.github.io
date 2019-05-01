---
layout: post
title:      "Three Solutions to a Common Interview Question"
date:       2019-05-01 19:49:58 +0000
permalink:  three_solutions_to_a_common_interview_question
---


This week I’d like to share a version of a coding problem that I’ve come across in various forms when completing technical interviews and talk about the possible solutions to it along with their strengths and weaknesses.

In the problem you’re given an unsorted array of integer values and asked to process them in order to find out if the sum of any two of the values equal a third given value. For example:


array of values = [ 3, 5, 1, 7, 4, 8 ]

target value = 10


Various scenarios can be made up in order to ground this type of problem in the real world and there are any number of additional qualifications that can be made, such as how to handle multiple solution sets.

For now we’ll just work with the basic version, which can be stated: “determine if a pair of values exist in the given array such that their sum is equal to the target value given. No value can be repeated. Return true or false.”

The brute force / naive solution to this problem is a nested loop where each value is added to every other value and a matching pair results in a true return value.
```
const findSum = (array, target) => {
  for (let i = 0; i < array.length; ++i) {
	  for (let j = i+1; j < array.length; ++j) {
		  if (array[i] + array[j] === target) {
			 return true;
		  }
	  }
  }
  return false;
}

```
This solution performs slightly better than the standard nested loop runtime of O(n^2) because for each pass of the outer loop, the inner loop runs one less time as values that have been summed before don’t need to be summed again. For example when i is equal to 0, j starts at index 1. When i is equal to 1, j does not go back to index 0 because indexes 1 and 0 have already been summed. This small change doesn’t effect the overall runtime complexity however. The inner loop would have to ignore half of the remaining portion of the array for a real different to be made.

The upside to this solution, even though O(n^2) is rarely ever an acceptable runtime, is that no extra space is required. The array values are summed in place. 

Another approach that is slightly better is to sort the array, either in place if allowed or more typically in a copy of the original. Most library sort functions run in O(nlogn) time, so if we can keep the rest of the algorithm within that constraint we’ll have a better overall runtime. 

It turns out that we can by taking each value in the array, subtracting if from the target to find the missing addend, then performing a binary search for in the rest of the array for the missing addend.
```
const findSum = (array, target) => {
	const sortedArray = array.sort();

	for (let i = 0; i < sortedArray.length; ++i) {
		if (binarySearch(sortedArray, target - sortedArray[i]) {
			return true;
		}
	}
	return false;
}

```
Because both sorting the original array and doing a O(logn) binary search for each of n elements are O(nlogn) operations, the total runtime is O(nlogn). This is an improvement but we’ve most likely had to trade speed for memory, as if often the case. Assuming we need to store a copy of the array that is sorted, the space complexity is O(n);

The best solution that I’ve been able to come up with, with some hints from an interviewer, runs in O(n) time, which is a huge improvement from the brute force runtime. The trade off again here is that we need to use additional memory. 

The O(n) solution involves iterating through the array once while maintaining a hashtable of values that have been iterated through. For each element, the missing addend is found, as before, by subtraction from the target. The change is that the missing addend is looked up in the hashtable, a constant time operation. If the missing addend is in the table, true is returned. If not, the element value is inserted into the hashtable so that it can be found in constant time if its partner exists later in the array. If you’re using javascript, a hashtable the same as an object.

```
const findSum = (array, target) => {
	const hashTable = {};
	for (let i = 0; i < array.length; ++i) {
		
		if (hashTable[target - array[i]]) {
			return true;
		} else {
			hashTable[array[i]] = true;
		}
	}
	return false;
}
```
Again, the array is iterated through once and each iteration performs an O(1) hashtable lookup or an O(1) insertion, bring the overall runtime to O(n). The space used is whatever an object with at most n key:value pairs needs to do its thing: memory for n integers, n booleans and Object class overhead.

When facing this problem, I was given the advice that even if an interviewee knows the best solution, they should at least mention the less optimal solutions so that the interviewer knows they have thought through alternatives.
