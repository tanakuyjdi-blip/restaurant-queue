let queue = JSON.parse(localStorage.getItem("queue")) || [];
let currentQueue = localStorage.getItem("currentQueue") || "A000";
let lastNumber = parseInt(localStorage.getItem("lastNumber")) || 0;

document.getElementById("currentQueue").innerText = currentQueue;

showQueue();

function bookQueue() {

    const name = document.getElementById("name").value.trim();
    const people = document.getElementById("people").value;

    if (name === "" || people === "") {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    lastNumber++;

    let queueNumber = "A" + String(lastNumber).padStart(3, "0");

    queue.push({
        number: queueNumber,
        name: name,
        people: people
    });

    // บันทึกข้อมูลทั้งหมด
    localStorage.setItem("queue", JSON.stringify(queue));
    localStorage.setItem("lastNumber", lastNumber);

    // บันทึกข้อมูลลูกค้าคนล่าสุดไว้สำหรับหน้ารอคิว
    localStorage.setItem("myQueue", queueNumber);
    localStorage.setItem("myName", name);
    localStorage.setItem("myPeople", people);

    showQueue();

    // ไปหน้ารอคิว
    window.location.href = "ticket.html";
}

function showQueue() {

    let table = document.getElementById("queueTable");

    table.innerHTML = "";

    queue.forEach(function(item) {

        table.innerHTML += `
        <tr>
            <td>${item.number}</td>
            <td>${item.name}</td>
            <td>${item.people}</td>
        </tr>
        `;

    });

}

function nextQueue() {

    if (queue.length == 0) {
        alert("ไม่มีคิว");
        return;
    }

    let next = queue.shift();

    currentQueue = next.number;

    document.getElementById("currentQueue").innerText = currentQueue;

    localStorage.setItem("currentQueue", currentQueue);
    localStorage.setItem("queue", JSON.stringify(queue));

    showQueue();

}

function resetQueue() {

    if (confirm("ต้องการรีเซ็ตคิวทั้งหมดหรือไม่?")) {

        queue = [];
        currentQueue = "A000";
        lastNumber = 0;

        localStorage.removeItem("queue");
        localStorage.removeItem("currentQueue");
        localStorage.removeItem("lastNumber");
        localStorage.removeItem("myQueue");
        localStorage.removeItem("myName");
        localStorage.removeItem("myPeople");

        document.getElementById("currentQueue").innerText = currentQueue;

        showQueue();

    }

}