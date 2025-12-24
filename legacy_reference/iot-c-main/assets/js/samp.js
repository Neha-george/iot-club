document.addEventListener("DOMContentLoaded", function () {
  var tabs = [
    document.querySelector("#pills-project"),
    document.querySelector("#pills-tech"),
    document.querySelector("#pills-op"),
    document.querySelector("#pills-design"),
    document.querySelector("#pills-doc"),
  ];
  var tabLinks = [
    document.querySelector("#pills-project-tab"),
    document.querySelector("#pills-tech-tab"),
    document.querySelector("#pills-op-tab"),
    document.querySelector("#pills-design-tab"),
    document.querySelector("#pills-doc-tab"),
  ];
  var currentTab = 0;

  function switchTab() {
    tabs[currentTab].classList.remove("show", "active");
    tabLinks[currentTab].classList.remove("active");
    currentTab = (currentTab + 1) % tabs.length;
    tabs[currentTab].classList.add("show", "active");
    tabLinks[currentTab].classList.add("active");
  }

  setInterval(switchTab, 2000);
});
