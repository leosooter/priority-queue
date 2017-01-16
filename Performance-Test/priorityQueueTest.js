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

class LinkedListPriorityQueue{
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

/////////////// End of LinkedListPriorityQueue class

class SimplePriorityQueue{
  constructor(){
    this.queueArray = [];
    this.priorityHash = {};
  }
  count(){
    return this.queueArray.length;
  }

  priorityCount(){
    return this.priorityHash.length;
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
    var array = this.queueArray;
    var priorityHash = this.priorityHash;
    var queueLength = array.length;
    var current = queueLength;
    var parent = Math.floor((current - 1) / 2);

    if(priorityHash[pri] === undefined){
      priorityHash[pri] = 0;
    }
    else{
      priorityHash[pri] ++;
    }

    array[queueLength] = { 'pri' : pri, 'fifoOrder' : priorityHash[pri], 'data' : data}

    //Bubble the new priority level up through the heap until it's parent larger
    while(current > 0 && array[current].pri >= array[parent].pri){
      if(array[current].pri === array[parent].pri && array[current].fifoOrder > array[parent].fifoOrder){
        break;
      }
      //swap the current priority level with it's parent
      [ array[current], array[parent] ] = [ array[parent], array[current] ];

      //Re-set the current index to the new index and perform the check again
      current = parent;
      parent = Math.floor((current - 1) / 2);
    }

    return this;
  }

  dequeue(){
    var array = this.queueArray;

    if( array.length === 0 ){
      console.warn("Priority Queue is Empty");
      return undefined;
    }

    var priorityHash = this.priorityHash;
    var queueLength = array.length;
    var returnData = array[0].data;

    priorityHash[array[0].pri] --;
    if(priorityHash[array[0].pri] === 0){
      priorityHash[array[0].pri] = null;
      delete priorityHash[array[0].pri];
    }
    array[0] = array.pop();

    var current = 0;
    var highest = current;
    var left = 1;
    var right = 2;
    var done = false;
    while(!done){
      //Check to see if either child has a higher priority
      if (left < array.length && array[left].pri >= array[current].pri){
        if(array[current].pri === array[left].pri && array[current].fifoOrder > array[left].fifoOrder){
          highest = left;
        }
        else if(array[left].pri > array[current].pri){
          highest = left;
        }
      }
      if (right < array.length && array[right].pri >= array[highest].pri){
        if(array[highest].pri === array[right].pri && array[highest].fifoOrder > array[right].fifoOrder){
          highest = right;
        }
        else if(array[right].pri > array[highest].pri){
          highest = right;
        }
      }

      //If either child has a higher priority-
      if(highest !== current){
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

    return returnData;
  }
}

//Enqueues and dequeues an array of randomly generated priority levels
function queueTester(arrayLength, priMax){
  console.log("Generating array");
  var testArray = arrayMaker(priMax, arrayLength);
  console.log("Testing Linked-list Version");
  console.time('Linked-list Version time....');
  var answer1 = loadUnLoadQueue(testArray, new LinkedListPriorityQueue());
  console.timeEnd('Linked-list Version time....');
  //console.log("loadLinkedListVersion answer = ", answer1);
  console.log("................................................................");
  console.log("Testing Simple Version");
  console.time('Simple Version time....');
  var answer2 = loadUnLoadQueue(testArray, new SimplePriorityQueue());
  console.timeEnd('Simple Version time....');
  console.log("................................................................");

  //Array generating function
  function arrayMaker(priMax, length){
    returnArray = [];
    for (var i = 0; i < length; i++) {
      var rand = Math.floor(Math.random() * (priMax + 1));
      returnArray.push([rand, "A"]);
    }
    return returnArray;
  }

  function loadUnLoadQueue(qArray, priQ){
    outputArray = [];
    for (var i = 0; i < qArray.length; i++) {
      priQ.enqueue(qArray[i][0], qArray[i][1]);
    }

    for (var i = 0; i < qArray.length; i++) {
      outputArray.push(priQ.dequeue());
    }
    return outputArray;
  }

}



/*Results for 100 priority levels and 100,000 values:
  Linked-list version- aprox 70ms
  Simple version-      aprox 700ms
*/

queueTester(100000, 100);

/*Results for 5000 priority levels and 100,000 values:
  Linked-list version- aprox 500ms
  Simple version-      aprox 800ms
*/

//queueTester(100000, 5000);

/*Results for 10000 priority levels and 100,000 values:
  Linked-list version- aprox 1700ms
  Simple version-      aprox 600ms
*/

//queueTester(100000, 10000);
