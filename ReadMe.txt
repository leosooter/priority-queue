I have not worked with Priority Queues or Heap data structures before so this was a fun
learning experience for me.  I have included two implementations, one in Python and
one in Javascript.

The Python implementation is the simpler and in most cases, probably
the more practical of the two.  It uses a maxHeap list as the main data structure.
In order to ensure FIFO it does a secondary check of fifo_order to arrange duplicate
priority levels in the heap.  It also uses a hash object to track priority count.

I did my best to ensure thread safety but this is also a new area for me. I used the
threading module and put locks on any operations that did not look thread safe to me,
but I do not know enough about thread safety or testing for it to guarantee that this
is thread safe.

I did a second implementation in Javascript and I wanted to try to create a data structure
that would work better for cases with a lot of duplicate priority levels.
I was imagining a case where you are inputting a million values, but only 100 different
priority levels.  In this case I thought the extra operations required to maintain
FIFO order in the heap might hurt performance.  Instead I used a maxHeap array to hold
linked-list FIFO queues for each priority level.
I choose linked-lists because they allow for very efficient enqueue and dequeue.
This also uses a hash object to record the index location of each priority-level queue
to track priority-count and to make enqueueing faster.
Creating a new linked-list class instance for each priority-level probably does not make
sense in most cases, but it should perform better in situations with more values
packed into fewer priority-levels. Plus it was very fun to build.

My understanding of Javascript is that being single-threaded it is inherently thread-safe
so I did not take any special precautions.

After I created these two I was curious about how their performance differed so I
re-created the simpler python version in Javascript and built a testing function.
The linked-list version does seem to perform much better with fewer priority levels
and the simple version does much better with more priority levels.
With 100,000 values, the tipping point appears to be around 6000 priority levels.

If you are interested in looking at the difference in performance you can play with
the queueTester function at the bottom of the priorityQueueTest.js file.

Thanks for the assignment and please let me know if you have any suggestions for improvements.
