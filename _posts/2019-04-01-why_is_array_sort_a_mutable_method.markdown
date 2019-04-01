---
layout: post
title:      "Why Is Array.sort() a Mutable Method?"
date:       2019-04-01 23:50:30 +0000
permalink:  why_is_array_sort_a_mutable_method
---


While learning Javascript, I stumbled a few times when trying to remember which Array methods return a new array and which alter the original. This led me to wonder why the discrepancy exists, particularly for the .sort() method.

Sorting is a mutable operation in Javascript, but I could easily see it being immutable by copying the original array, sorting the copy and returning it instead of the original. So why is sorting mutable? My unresearched hypothesis is that it has to do with the underlying sorting algorithm. The two most efficient algorithms for sorting are merge sort and quick sort. Each has their advantages and disadvantages. Merge sort guarantees O(nlogn) time, but to do this it requires the array to be duplicated temporarily, resulting in O(n) space. Quick sort sorts in place, so it uses O(1) space. The catch? The worst case time is O(n^2). Based on this knowledge, I'm guessing that Array.sort() implements quicksort in order to save space. Because the sorting is done in place, the array must be altered. Again, just my hypothesis. 

Turns out the answer is not that simple. Apparently Array.sort() is implemented using different algorithms depending on the browser you are using. Some use mergesort, some quicksort, some more complicated offspring of standard implementations. So my hypothesis is blown. The fact that several browsers use mergesort completely contradicts my reasoning. Let me take a second shot at it. 

A quicksort implementation is a naturally mutable operation. Mergesort copies the array's elements into a new array, but in the implementation I learned, the sorted elements are copied back into the original array's indexes one by one. The entire array isn't copied as is. Pieces of it are copied inside of recursive function calls and then recopied into the original space as the smaller arrays are merged. 

```
function merge(arr, left, mid, right) {

  // get sizes
  const lSize = mid - left + 1;
  const rSize = right - mid;

  //fill partial arrays
  const lArr = [];
  const rArr = [];
  let i, j;
  for (i = 0; i < lSize; ++i) {
    lArr[i] = arr[left + i];
  }
  for (j = 0; j < rSize; ++j) {
    rArr[j] = arr[mid + 1 + j]
  }

  // sort and write over original array
  let k = left;
  i = 0;
  j = 0;
  while (i < lSize && j < rSize) {
    if (lArr[i] < rArr[j]) {
      arr[k] = lArr[i];
      i++;
      k++;
    } else {
      arr[k] = rArr[j];
      j++;
      k++;
    }
  }
  while (i < lSize) {
    arr[k] = lArr[i];
    i++;
    k++;
  }

  while (j < rSize) {
    arr[k] = rArr[j];
    j++;
    k++;
  }
}
```
The above code, which is executed in each recursive call, shows that the portion of the original array that is being sorted is copied into two separate arrays, each with length n/2 where n is the number of elements being addressed in that recursion. The original array is overwritten in the while loops, leading to a mutable operation.

Could it be that Array.sort() is mutable because both of the major implementations write over the original array's memory contents? This would allow for a browser to implement the sort using its choice of algorithm knowing that it can choose a destructive one because the prototype method doesn't require the array to remain intact. The more I think about it, the more it makes sense. The most efficient sorting algorithms are mutable, so in order to use them the method must be mutable. I would love to know if this is correct. Unfortunately I was unable to find a definitive answer on the web, so it will remain a hypothesis for now.
