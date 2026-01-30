chrome.storage.local.get(["timeData"], (result) => {
  const list = document.getElementById("list");
  const emptyMsg = document.getElementById("empty");
  const data = result.timeData || {};

  if (Object.keys(data).length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  for (let site in data) {
    const totalSeconds = Math.floor(data[site] / 1000);

    let displayTime = "";

    if (totalSeconds < 60) {
      // Seconds
      displayTime = `${totalSeconds} sec`;
    } else if (totalSeconds < 3600) {
      // Minutes + seconds
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      displayTime = `${minutes} min ${seconds} sec`;
    } else {
      // Hours + minutes
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      displayTime = `${hours} hr ${minutes} min`;
    }

    const li = document.createElement("li");
    li.textContent = `${site} : ${displayTime}`;
    list.appendChild(li);
  }
});
