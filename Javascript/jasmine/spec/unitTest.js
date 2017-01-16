describe("PriorityQueue", function(){
  //Arrays for testing enqueue and dequeue
  var inOrder = [ [9,0],[8,1],[7,2],[6,3],[5,4],[4,5],[3,6],[2,7],[1,8] ];
  var reverseOrder = [ [1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0] ];
  var randOrder = [ [3,6],[7,2],[1,8],[9,0],[2,7],[5,4],[6,3],[8,1],[4,5] ];
  var answer1 = [0,1,2,3,4,5,6,7,8];

  var inOrderSamePri = [ [7,"A1"],[6,"A2"],[5,"A3"],[4,"A4"],[3,"A5"],[2,"A6"],[1,"A7"] ];
  var reverseOrderSamePri = [ [1,"A7"],[2,"A6"],[3,"A5"],[4,"A4"],[5,"A3"],[6,"A2"],[7,"A1"] ];
  var randOrderSamePri = [ [2,"A6"],[3,"A5"],[7,"A1"],[1,"A7"],[6,"A2"],[4,"A4"],[5,"A3"] ];
  var answer2 = ["A1","A2","A3","A4","A5","A6","A7"];

  var inOrderDuplicatePri = [ [3,"A1"],[3,"A2"],[3,"A3"],[2,"B1"],[2,"B2"],[2,"B3"],[1,"C1"],[1,"C2"],[1,"C3"] ];
  var reverseOrderDuplicatePri = [ [1,"C1"],[1,"C2"],[1,"C3"],[2,"B1"],[2,"B2"],[2,"B3"],[3,"A1"],[3,"A2"],[3,"A3"] ];
  var randOrderDuplicatePri = [ [2,"B1"],[2,"B2"],[3,"A1"],[1,"C1"],[1,"C2"],[3,"A2"],[3,"A3"],[2,"B3"],[1,"C3"] ];
  var answer3 = ["A1","A2","A3","B1","B2","B3","C1","C2","C3"];

  //Arrays for testing count and priority-count
  var noDuplicateCountArray = [ [1,"A"],[2,"A"],[3,"A"],[4,"A"],[5,"A"],[6,"A"],[7,"A"],[8,"A"] ];
  var DuplicateCountArray = [ [1,"A"],[1,"A"],[2,"A"],[2,"A"],[3,"A"],[3,"A"],[4,"A"],[4,"A"] ];

  var Q = new PriorityQueue();
  //Takes array- returns array of values in order dequeued
  function checkList(qArray){
    priQ = new PriorityQueue();
    outputArray = [];
    for (var i = 0; i < qArray.length; i++) {
      priQ.enqueue(qArray[i][0], qArray[i][1]);
    }

    for (var i = 0; i < qArray.length; i++) {
      outputArray.push(priQ.dequeue());
    }
    return outputArray;
  }

  //Enqueues array- dequeues number of times passed in dqCount- returns [count, priority-count]
  function checkCount(qArray, dqCount){
    priQ = new PriorityQueue();
    countArray = [];
    for (var i = 0; i < qArray.length; i++) {
      priQ.enqueue(qArray[i][0], qArray[i][1]);
    }

    for (var i = 0; i < dqCount; i++) {
      priQ.dequeue();
    }
    countArray.push(priQ.count())
    countArray.push(priQ.priorityCount())
    return countArray;
  }

  it("Should throw an error for too many or too few args in enqueue", function(){
    expect(function(){ Q.enqueue("A"); } ).toThrow();
    expect(function(){ Q.enqueue(1, 2, "A"); } ).toThrow();
  });

  it("Should throw an error for non-integer priority levels", function(){
    expect(function(){ Q.enqueue("A", "A"); } ).toThrow();
    expect(function(){ Q.enqueue(-1, "A"); } ).toThrow();
    expect(function(){ Q.enqueue(1.1 , "A"); } ).toThrow();
  });

  it("Should be able to enqueue values and dequeue based on priority level", function() {
    expect( checkList(inOrder) ).toEqual(answer1);
    expect( checkList(reverseOrder) ).toEqual(answer1);
    expect( checkList(randOrder) ).toEqual(answer1);
  });

  it("Should be able to enqueue values and dequeue based on FIFO order", function() {
    expect( checkList(inOrderSamePri) ).toEqual(answer2);
    expect( checkList(reverseOrderSamePri) ).toEqual(answer2);
    expect( checkList(randOrderSamePri) ).toEqual(answer2);
  });

  it("Should be able to enqueue values and dequeue based on priority level first and FIFO order second", function() {
    expect( checkList(inOrderDuplicatePri) ).toEqual(answer3);
    expect( checkList(reverseOrderDuplicatePri) ).toEqual(answer3);
    expect( checkList(randOrderDuplicatePri) ).toEqual(answer3);
  });

  it("Should be able to enqueue values and return an accurate count", function(){
    expect(checkCount(noDuplicateCountArray, 0)).toEqual([8,8]);
  });

  it("Should be able to enqueue values and dequeue all values and return an accurate count", function(){
    expect(checkCount(noDuplicateCountArray, 8)).toEqual([0,0]);
  });

  it("Should be able to enqueue values and dequeue some values and return an accurate count", function(){
    expect(checkCount(noDuplicateCountArray, 4)).toEqual([4,4]);
  });

  it("Should be able to enqueue values and return an accurate priority count", function(){
    expect(checkCount(DuplicateCountArray, 0)).toEqual([8,4]);
  });

  it("Should be able to enqueue values and dequeue all values and return an accurate priority count", function(){
    expect(checkCount(DuplicateCountArray, 8)).toEqual([0,0]);
  });

  it("Should be able to enqueue values and dequeue some values and return an accurate priority count", function(){
    expect(checkCount(DuplicateCountArray, 4)).toEqual([4,2]);
  });
});
