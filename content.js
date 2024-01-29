let focusElement = null;

function hideSiblingsAndAncestors(element) {
  // hide everything except the element and its ancestors
  // make the elements visibility hidden
  $(element).parentsUntil("body").siblings().css("visibility", "hidden");
}

function showSiblingsAndAncestors(element) {
  // show everything except the element and its ancestors
  // make the elements visibility visible
  $(element).parentsUntil("body").siblings().css("visibility", "visible");
}

function toggleFocus(element) {
  if (focusElement) {
    focusElement = null;
    showSiblingsAndAncestors(element);
    return;
  }

  hideSiblingsAndAncestors(element);
  focusElement = element;
}

document.addEventListener("click", (event) => {
  let targetElement = event.target;
  while (
    targetElement &&
    targetElement.nodeName !== "DIV" &&
    targetElement.nodeName !== "SPAN"
  ) {
    targetElement = targetElement.parentNode;
  }

  chrome.storage.sync.get("focusMode", function (data) {
    const isFocusModeOn = data.focusMode;
    if (isFocusModeOn) {
      toggleFocus(targetElement);
    }
  });
});
