//Single linked list for holding values in FIFO order
class QueueNode{
  constructor(val){
    this.val = val;
    this.next = null;
  }
}

class FifoQueue{
  constructor(pri){
    this.pri = pri;
    this.head = null;
    this.tail = null;
  }

  enqueue(val){
    if(this.head === null){
      this.head = new QueueNode(val);
      this.tail = this.head;
    }
    else{
      this.tail.next = new QueueNode(val);
      this.tail = this.tail.next;
    }
    return this;
  }
  dequeue(){
    if(this.head === null){
      return null;
    }
    var returnVal = this.head.val;
    if(this.head === this.tail){
      this.head = null;
      this.tail = null;
    }
    else{
      this.head = this.head.next;
    }
    return returnVal;
  }
}

///////// End of FIFO Queue class

class PriorityQueue{
  constructor(){
    this.qCount = 0;
    this.queueArray = [];
    this.pCount = 0;
    this.indexMap = {};
  }
  count(){
    return this.qCount;
  }

  priorityCount(){
    return this.pCount;
  }


  enqueue(pri, data){
    if(arguments.length !== 2){
      throw {
        name : "Error",
        message : "Enqueue method accepts two arguments- (priority-level, data)",
      }
    }
    if(!Number.isInteger(pri) || pri < 0){
      throw {
        name : "Error",
        message : "Priority level must be a positive integer",
      }
    }
    this.qCount ++;
    var array = this.queueArray;
    var indexMap = this.indexMap;
    var queueLength = array.length;
    var current = queueLength;
    var parent = Math.floor((current - 1) / 2);

    //Check to see if a queue at this priority level has already been created
    if(indexMap[pri] === undefined){
      //If not- create a new FIFO queue and record its position in the indexMap
      this.pCount ++;
      array[queueLength] = new FifoQueue(pri).enqueue(data);
      indexMap[pri] = queueLength;

      //Bubble the new priority level up through the heap until it's parent larger
      while(current > 0 && array[current].pri > array[parent].pri){

        //Update the priorityQueue with the new index of each priority level
        indexMap[array[current].pri] = parent;
        indexMap[array[parent].pri] = current;

        //swap the current priority level with it's parent
        [ array[current], array[parent] ] = [ array[parent], array[current] ];

        //Re-set the current index to the new index and perform the check again
        current = parent;
        parent = Math.floor((current - 1) / 2);
      }
    }
    else{
      array[indexMap[pri]].enqueue(data);
    }
    return this;
  }

  dequeue(){
    var array = this.queueArray;

    if( array.length === 0 ){
      console.warn("Priority Queue is Empty");
      return undefined;
    }

    this.qCount --;
    var indexMap = this.indexMap;
    var queueLength = array.length;
    var returnData = array[0].dequeue();

    if(array[0].head === null){
      //If the queue at the top of the heap is empty, delete it's key from the indexMap and
      //decrement the priority count.
      this.pCount --;
      indexMap[array[0].pri] = null;
      delete indexMap[array[0].pri];
      if(Object.keys(indexMap).length === 0){
        //If the indexMap is empty our data structure is empty- return the last data;
        array.pop();
        return returnData;
      }
      //If the indexMap is not empty, move the last queue to the top
      indexMap[array[queueLength - 1].pri] = 0;
      array[0] = array.pop();

      var current = 0;
      var highest = current;
      var left = 1;
      var right = 2;
      var done = false;
      while(!done){
        //Check to see if either child has a higher priority
        if (left < array.length && array[left].pri > array[current].pri){
          highest = left;
        }
        if(right < array.length && array[right].pri > array[highest].pri){
          highest = right;
        }

        //If either child has a higher priority-
        if(highest !== current){
          //Update the priorityQueue with the new index of each priority level
          indexMap[array[current].pri] = highest;
          indexMap[array[highest].pri] = current;

          //Swap the current queue with whichever child has a higher priority level
          [ array[current], array[highest] ] = [ array[highest] , array[current] ];
        }
        //If neither child is larger than the current- the queue has reached it's correct position
        else{
          done = true;
        }

        //Reset the index markers and repeat
        current = highest;
        left = current * 2 + 1;
        right = current * 2 + 2;
      }
    }
    return returnData;
  }
}
