// Task 1
// Find the first recurring character of the following lists and analyze the runtime vs space trade-off of your solution

const task1 = [
 [2,5,1,2,3,5,1,2,4], // Should return 2
 [2,1,1,2,3,5,1,2,4], // Should return 1
 [2,3,4,5], // Should return undefined
 [2,5,5,2,3,5,1,2,4] // Should return 5
]

function firstRecurringCharacter(numbers) {
  const hashTable = {}
  for (let i = 0; i < numbers.length; i++) {
    if (hashTable[numbers[i]]) {
      return numbers[i]
    } else {
      hashTable[numbers[i]] = 1
    }
  }
  return undefined
}

function logResult(result, expected, message) {
  console.log(result, expected, result === expected ? 'PASS' : 'FAIL')
}

logResult(firstRecurringCharacter(task1[0]), 2)
logResult(firstRecurringCharacter(task1[1]), 1)
logResult(firstRecurringCharacter(task1[2]), undefined)
logResult(firstRecurringCharacter(task1[3]), 5)

/*
  This approach has a time complexity of O(n) since we only need to iterate through the array once,
  and a space complexity of O(n) since we need to store each element in the hash table.
*/
