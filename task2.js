// Task 2
// a) Provide line by line analysis of the performance of the below code in terms of Big O notation, as well as the overall performance of the function.
// b) Write a new solution that has better performance, explaining why it has higher performance and if there are any other improvements possible.

const domains = {  // Example to show data shape only.
 "one.com": { policy: "block" },
 "two.com": { policy: "none" },
 "three.com": { policy: "none" },
}

const getBlockPolicyState = (domains) => {
 const policyArr = [];
 const numDomains = Object.keys(domains).length;                  // O(1)
 for (let i = 0; i < numDomains; i++) {                           // O(n)
   policyArr.push(Object.entries(domains)[i][1].policy);          // O(1)
 }
 const oneDomain = policyArr.some((item) => item === "block");    // O(n)
 const allDomains = policyArr.every((item) => item === "block");  // O(n)
 return { oneDomain, allDomains };
};

console.log(getBlockPolicyState(domains));

/*
  Overall, the function has a time complexity of O(n) for the loop and
  O(n) for the some and every operations, resulting in a total time complexity of O(n)
  in the worst-case scenario.
  The function has a space complexity of O(n) due to the policyArr array.
*/

// better performance solution
const getBlockPolicyState2 = (domains) => {
  let oneDomain = false;
  let allDomains = true;
  for (const key in domains) {
    if (domains[key].policy === "block") {
      oneDomain = true;
    } else {
      allDomains = false;
    }
    if (oneDomain === true && allDomains === false) {
      break;
    }
  }
  return { oneDomain, allDomains };
};

console.log(getBlockPolicyState2(domains));

/*
  1. It doesn't create a new array.
  2. It uses two boolean variables, oneDomain and allDomains, to keep track of
     whether it has found at least one domain with the "block" policy  or
     if all domains have the "block" policy.
  3. It can breaks out of the loop early.

  The solution has a time complexity of O(n) due to the for...in loop,
  and a space complexity of O(1) because it doesn't create any new arrays or objects.
*/
