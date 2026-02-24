
# Difference Between getElementById, getElementsByClassName, and querySelector / querySelectorAll
- **getElementById()**  
  This method is used when we want to select one specific element using its `id`. Since IDs are unique, it always returns a single element.

- **getElementsByClassName()**  
 Selects all elements with a given class and returns a live HTMLCollection that updates if the page changes.

- **querySelector()**  
  This method returns the first element that matches a CSS selector. we can use `#id`, `.class`, element names, to accass.

- **querySelectorAll()**  
  This method returns all elements that match a CSS selector.it return a nodelist, where we can five foreach loop

## 2. How do you create and insert a new element into the DOM?
We use `document.createElement()` to create a new element.

We use `document.body.appendChild();` to insert the new element into dom

## 3. What is Event Bubbling? And how does it work?

Event bubbling is a behavior in JavaScript where an event starts from the element that was clicked and then moves upward to its parent elements.

## 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where we attach a single event listener to a parent element instead of adding event listeners to multiple child elements.and then we can retrieve our information from immediete parent by `event.target` using.

## 5. What is the difference between preventDefault() and stopPropagation() methods?


- **preventDefault()**  
  This method stops the browser’s default behavior for an event.  
  For example, if we click a link, it normally navigates to another page.  
 but if we use `event.preventDefault()`, the link will not open.

- **stopPropagation()**  
  This method stops the event from moving or we can say bubbling up to parent elements.  
