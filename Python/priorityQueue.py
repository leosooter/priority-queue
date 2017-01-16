from __future__ import with_statement #requies 2.5or above
from sys import argv
from threading import Lock
import math


class PriorityQueue:
    def __init__(self):
        self.queue_list = []
        self.pri_hash = {}

    def show(self):
        print self.queue_list

    def count(self):
        return len(self.queue_list)

    def priority_count(self):
        return len(self.pri_hash)

    def enqueue(self, pri, data):
        #Validate priority level to make sure it is positive integer
        if type(pri) is not int:
            raise ValueError("priority level must be a positive integer (non-integer given)")
        elif pri < 0:
            raise ValueError("priority level must be a positive integer (negative value given)")

        lock = Lock()
        queue_len = int(len(self.queue_list))
        current = queue_len
        parent = int(math.floor((current - 1) / 2))

        #Check to see if key for priority-level already exists in pri_hash dict
        #- if not- add one
        try:
            with lock:
                self.pri_hash[pri] += 1
        except KeyError:
            self.pri_hash[pri] = 1;

        with lock:
            self.queue_list.append({ 'pri' : pri, 'fifo_order' : self.pri_hash[pri], 'data' : data})

        #Bubble the new priority level up through the heap until it's parent is larger
        #or it's parent is equal but has a lower fifo_order
        while current > 0 and self.queue_list[current]['pri'] >= self.queue_list[parent]['pri']:
            if self.queue_list[current]['pri'] == self.queue_list[parent]['pri'] and self.queue_list[current]['fifo_order'] > self.queue_list[parent]['fifo_order']:
                break

            with lock:
                [ self.queue_list[current], self.queue_list[parent] ] = [ self.queue_list[parent], self.queue_list[current] ]
            current = parent
            parent = int(math.floor((current - 1) / 2))
        return self


    def dequeue(self):
        lock = Lock()
        q_length = len(self.queue_list)
        if q_length is 0:
            print "Queue is empty"
            return None

        returnData = self.queue_list[0]['data']
        #Decrement count for dequeued priority level in pri_hash dict
        with lock:
            self.pri_hash[ self.queue_list[0]['pri'] ] -= 1

        #If count reaches 0 delete the key for the priority-level
        if self.pri_hash[ self.queue_list[0]['pri'] ] == 0:
            self.pri_hash.pop( self.queue_list[0]['pri'], None )

        self.queue_list[0] = self.queue_list[q_length - 1]
        self.queue_list.pop()

        #Heapify list by priority-level first, then by fifo-order
        current = 0
        highest = 0
        left = 1
        right = 2
        in_position = False
        while current < q_length - 1 and not in_position:
            #Check to see whether current should swap with left or right child in heap
            try:
                if self.queue_list[current]['pri'] <= self.queue_list[left]['pri']:
                    if self.queue_list[current]['pri'] == self.queue_list[left]['pri'] and self.queue_list[current]['fifo_order'] > self.queue_list[left]['fifo_order']:
                        highest = left
                    if self.queue_list[current]['pri'] < self.queue_list[left]['pri']:
                        highest = left
            except IndexError:
                pass
            try:
                if self.queue_list[highest]['pri'] <= self.queue_list[right]['pri']:
                    if self.queue_list[highest]['pri'] == self.queue_list[right]['pri'] and self.queue_list[highest]['fifo_order'] > self.queue_list[right]['fifo_order']:
                        highest = right
                    if self.queue_list[highest]['pri'] < self.queue_list[right]['pri']:
                        highest = right
            except IndexError:
                pass

            if highest != current:
                with lock:
                    [ self.queue_list[current], self.queue_list[highest] ] = [ self.queue_list[highest], self.queue_list[current] ]
            else:
                in_position = True

            current = highest;
            left = current * 2 + 1
            right = current * 2 + 2

        return returnData
