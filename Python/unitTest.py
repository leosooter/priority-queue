import unittest
from priorityQueue import PriorityQueue



class PriorityQueueReturnTest(unittest.TestCase):
    #Takes list- returns list of values in order dequeued
    def checkList(self, q_list):
        pri_q = PriorityQueue()
        output_list = []
        for i in range(len(q_list)):
            pri_q.enqueue(q_list[i][0], q_list[i][1])

        for i in range(len(q_list)):
            output_list.append(pri_q.dequeue())
        return output_list

    def setUp(self):
        self.Q = PriorityQueue()
        self.Q1 = self.checkList([ [9,0],[8,1],[7,2],[6,3],[5,4],[4,5],[3,6],[2,7],[1,8] ])
        self.Q2 = self.checkList([ [1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0] ])
        self.Q3 = self.checkList([ [3,6],[7,2],[1,8],[9,0],[2,7],[5,4],[6,3],[8,1],[4,5] ])
        self.Q4 = self.checkList([ [7,"A1"],[6,"A2"],[5,"A3"],[4,"A4"],[3,"A5"],[2,"A6"],[1,"A7"] ])
        self.Q5 = self.checkList([ [1,"A7"],[2,"A6"],[3,"A5"],[4,"A4"],[5,"A3"],[6,"A2"],[7,"A1"] ])
        self.Q6 = self.checkList([ [2,"A6"],[3,"A5"],[7,"A1"],[1,"A7"],[6,"A2"],[4,"A4"],[5,"A3"] ])
        self.Q7 = self.checkList([ [3,"A1"],[3,"A2"],[3,"A3"],[2,"B1"],[2,"B2"],[2,"B3"],[1,"C1"],[1,"C2"],[1,"C3"] ])
        self.Q8 = self.checkList([ [1,"C1"],[1,"C2"],[1,"C3"],[2,"B1"],[2,"B2"],[2,"B3"],[3,"A1"],[3,"A2"],[3,"A3"] ])
        self.Q9 = self.checkList([ [2,"B1"],[2,"B2"],[3,"A1"],[1,"C1"],[1,"C2"],[3,"A2"],[3,"A3"],[2,"B3"],[1,"C3"] ])

    def testEnqueueValidation(self):
        with self.assertRaises(ValueError):
            self.Q.enqueue(1.1,2)
        with self.assertRaises(ValueError):
            self.Q.enqueue(-1,2)

    def testInOrder(self):
        return self.assertEqual(self.Q1, [0,1,2,3,4,5,6,7,8])

    def testReverseOrder(self):
        return self.assertEqual(self.Q2, [0,1,2,3,4,5,6,7,8])

    def testRandOrder(self):
        return self.assertEqual(self.Q3, [0,1,2,3,4,5,6,7,8])

    def testInOrderSamePri(self):
        return self.assertEqual(self.Q4, ["A1","A2","A3","A4","A5","A6","A7"])

    def testReverseOrderSamePri(self):
        return self.assertEqual(self.Q5, ["A1","A2","A3","A4","A5","A6","A7"])

    def testRandOrderSamePri(self):
        return self.assertEqual(self.Q6, ["A1","A2","A3","A4","A5","A6","A7"])

    def testInOrderDuplicatePri(self):
        return self.assertEqual(self.Q7, ["A1","A2","A3","B1","B2","B3","C1","C2","C3"])

    def testReverseOrderDuplicatePri(self):
        return self.assertEqual(self.Q8, ["A1","A2","A3","B1","B2","B3","C1","C2","C3"])

    def testRandOrderDuplicatePri(self):
        return self.assertEqual(self.Q9, ["A1","A2","A3","B1","B2","B3","C1","C2","C3"])


class PriorityQueueCountTest(unittest.TestCase):
    #Enqueues list- dequeues number of times passed in dq_count- returns [count, priority_count]
    def checkCount(self, q_list, dq_count):
        pri_q = PriorityQueue()
        count_list = []
        for i in range(len(q_list)):
            pri_q.enqueue(q_list[i][0], q_list[i][1])

        for i in range(dq_count):
            pri_q.dequeue()

        count_list.append(pri_q.count())
        count_list.append(pri_q.priority_count())
        return count_list

    def setUp(self):
        self.Qc1 = self.checkCount([ [1,"A"],[2,"A"],[3,"A"],[4,"A"],[5,"A"],[6,"A"],[7,"A"],[8,"A"] ], 0)
        self.Qc2 = self.checkCount([ [1,"A"],[2,"A"],[3,"A"],[4,"A"],[5,"A"],[6,"A"],[7,"A"],[8,"A"] ], 8)
        self.Qc3 = self.checkCount([ [1,"A"],[2,"A"],[3,"A"],[4,"A"],[5,"A"],[6,"A"],[7,"A"],[8,"A"] ], 4)
        self.Qc4 = self.checkCount([ [1,"A"],[1,"A"],[2,"A"],[2,"A"],[3,"A"],[3,"A"],[4,"A"],[4,"A"] ], 0)
        self.Qc5 = self.checkCount([ [1,"A"],[1,"A"],[2,"A"],[2,"A"],[3,"A"],[3,"A"],[4,"A"],[4,"A"] ], 8)
        self.Qc6 = self.checkCount([ [1,"A"],[1,"A"],[2,"A"],[2,"A"],[3,"A"],[3,"A"],[4,"A"],[4,"A"] ], 4)

    def testNoDuplicateCountLoad(self):
        return self.assertEqual(self.Qc1, [8,8])

    def testNoDuplicateCountUnLoad(self):
        return self.assertEqual(self.Qc2, [0,0])

    def testNoDuplicateCountHalfUnLoad(self):
        return self.assertEqual(self.Qc3, [4,4])

    def testDuplicateCountLoad(self):
        return self.assertEqual(self.Qc4, [8,4])

    def testDuplicateCountUnLoad(self):
        return self.assertEqual(self.Qc5, [0,0])

    def testDuplicateCountHalfUnLoad(self):
        return self.assertEqual(self.Qc6, [4,2])

if __name__ == "__main__":
    unittest.main()
