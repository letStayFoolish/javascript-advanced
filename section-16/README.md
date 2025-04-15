# Asynchronous code

## SECTION 16

### Synchronous code

Synchronous code is **executed line by line**.

Thread of execution is part of execution context that actually executes the code in computer's CPU .

### Asynchronous code

* Asynchronous code is executed **after a task that runs in the "background" is finished**;
* Asynchronous code is **non-blocking**;
* Execution doesn't wait for an asynchronous task to finish its work;

```js
const firstName = "My Name"; // (1)
setTimeout(() => {
    console.log("Asynchronous code"); // (3) this code is asynchronous and will be executed after 4sec, but will not block the rest of the coming code.
}, 4000);

console.log(firstName); // (2)
```

### API Application Programming Interface

API is piece of software that can be used by another piece of software, in order to allow **applications to talk to each
other**; _DOM API, WEB (Online API) API, Geolocation API_.

Most popular **API data format** is JSON data format.

### Fetching data asynchronously - Old Way

```js
const request = new XMLHttpRequest();

console.log(request);

request.open("GET", "https://public-api-url");
request.send();

// load event - as soon as data is fetched
request.addEventListener("load", function () {
    console.log(this.responseText);

    const data = JSON.parse(this.responseText);

    console.log(data);
});
```

### How the WEB works regarding requests and responses

#### DNS: DNS lookup convert domain name to real domain address - IP address

#### TCP/IP socket connection: connection between client and web server (Transmission Connection Protocol / Internet Protocol)

#### HTTP Request: Requesting something (on the client side) from the server: Start Line, HTTP request headers, Request body
