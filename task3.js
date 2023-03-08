// Task 3
// Analyse the following code, explain what it is doing, what problems you can find / suggestions for improvement.

import expensiveOperation from "./libs";

const input = {
  // Example to provide data shape only
  request: {
    url: "/api/domain_analyzer",
    method: "POST",
    body: {
      domains: [
        "microsoft.com",
        "outlook.com",
        "three.com",
        "four.com",
        "redsift.com",
      ],
    },
  },
  db_data: [
    {
      domains: [
        {
          key: "b25lLmNvbQ==",
          value: '{"dom":"microsoft.com","dt":"10-11-2021","org":"ms"}',
        },
        {
          key: "Zml2ZS5jb20=",
          value: '{"dom":"redsift.com","dt":"12-11-2021","org":"redsift"}',
        },
      ],
    },
    {
      users: [
        {
          key: "b25lLmNvbQ==/dHdvLmNvbQ==",
          value: '{"u":"jane@microsoft.com"}',
        },
        { key: "Zml2ZS5jb20=/dHdvLmNvbQ==", value: '{"u":"john@redsift.com"}' },
      ],
    },
  ],
};

const PREVIOUS = {};

const compute = async (input, apiResponse) => {
  const { url, body } = input.request;
  if (url === "/api/domain_analyzer") {
    const r = {};
    body.domains.forEach(async (d) => {
      const db_d = input.db_data.find((d) => "domains" in d);
      const db_dd = {};
      db_d["domains"].forEach((i) => {
        const v = JSON.parse(i.value);
        db_dd[v["dom"]] = v;
      });
      if (PREVIOUS[d]) {
        r[d] = PREVIOUS[d];
      }
      else {
        r[d] = await expensiveOperation(d, db_dd[d]);
        PREVIOUS[d] = r[d];
      }
    });
    return apiResponse(204, r);
  }
};

/*
  The compute function takes two input parameters, input and apiResponse, and performs some operations on the input object.
  The apiResponse function is a callback function that returns a response object with a status code and a response body.

  The function checks if the URL in the request object is "/api/domain_analyzer".
  If it is, it loops through each domain in the domains array and performs the following steps:
  It finds the object in the db_data array that contains the domains property.
  It creates an empty object db_dd and loops through the domains array in the db_d object.
  For each domain, it extracts the domain name, date, and organisation name, parsing the string into a JSON object.
  Then it adds the object to the db_dd object using the domain name as the key.

  It checks if the domain name exists in the PREVIOUS object.
  If it does, it retrieves the previously computed value for the domain and assigns it to r[d].
  If the domain name does not exist in the PREVIOUS object,
  it calls an expensive operation function called expensiveOperation with the domain name
  and the associated information from the db_dd object as input parameters.
  It assigns the result to r[d] and also stores it in the PREVIOUS object for future use.
  After looping through all the domains, it returns a response object using the apiResponse function with a status code of 204 and the r object as the response body.

  * forEach method is being used with an async function inside, which may not behave as expected.
    The async function inside the forEach method may not wait for the completion of
    the expensiveOperation function before moving on to the next iteration of the loop.
    This could result in incorrect data being returned or errors being thrown.
    You can use a for await loop instead.
  * The function doesn't return anything if the url doesn't match the given condition.
  * I would use constant for "/api/domain_analyzer", "domains", and "dom" to avoid typos.
  * I would avoid using single letter variable names such as "r" and "v", as they are not descriptive.
  * I would use a more descriptive name for the "db_d" variable.
  * I would avoid using temporary variables such as "v"
  * The function doesn't handle the case where the input domain is not found in the db_data array.
  * The apiResponse function seems to be a helper function. I'd rather import it from a separate file, rather than receiving it as a parameter.
  * It returns 204 No Content but seems to return a body as apiResponse function accepts a second parameter. It should return 200 OK instead.
  * db_data returns an array of two different objects. I would rather make it an object that contains two arrays, one for domains and one for users.
*/
