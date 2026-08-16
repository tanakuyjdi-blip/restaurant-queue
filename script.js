/* =================================
   ระบบจองคิวร้านอาหาร 2 ร้าน
================================= */


/* =================================
   ร้านที่กำลังเลือก
================================= */

let selectedShop = "A";


/* =================================
   โหลดข้อมูลจาก LocalStorage
================================= */

let queueA =
    JSON.parse(localStorage.getItem("queueA")) || [];

let queueB =
    JSON.parse(localStorage.getItem("queueB")) || [];


let currentA =
    parseInt(localStorage.getItem("currentA")) || 0;

let currentB =
    parseInt(localStorage.getItem("currentB")) || 0;


let lastA =
    parseInt(localStorage.getItem("lastA")) || 0;

let lastB =
    parseInt(localStorage.getItem("lastB")) || 0;


/* =================================
   เลือกร้าน
================================= */

function selectShop(shop) {

    selectedShop = shop;

    const shopA =
        document.getElementById("shopA");

    const shopB =
        document.getElementById("shopB");


    shopA.classList.remove("active");

    shopB.classList.remove("active");


    if (shop === "A") {

        shopA.classList.add("active");

        document.getElementById(
            "selectedShop"
        ).innerText =
            "กำลังจองคิวร้านอาหาร A";

        updateCurrentQueue();

    } else {

        shopB.classList.add("active");

        document.getElementById(
            "selectedShop"
        ).innerText =
            "กำลังจองคิวร้านอาหาร B";

        updateCurrentQueue();

    }


    showQueue();

}


/* =================================
   สร้างเลขคิว
================================= */

function createQueueNumber(shop, number) {

    return shop + String(number).padStart(3, "0");

}


/* =================================
   รับบัตรคิว
================================= */

function bookQueue() {

    const name =
        document.getElementById("name")
            .value.trim();


    const people =
        document.getElementById("people")
            .value;


    /* ตรวจชื่อ */

    if (name === "") {

        alert("กรุณากรอกชื่อลูกค้า");

        return;
    }


    /* ตรวจจำนวนคน */

    if (
        people === "" ||
        parseInt(people) <= 0
    ) {

        alert("กรุณากรอกจำนวนคน");

        return;
    }


    let queueNumber;


    /* =================================
       ร้าน A
    ================================= */

    if (selectedShop === "A") {

        lastA++;

        queueNumber =
            createQueueNumber(
                "A",
                lastA
            );


        queueA.push({

            number: queueNumber,

            name: name,

            people: people

        });


        localStorage.setItem(
            "queueA",
            JSON.stringify(queueA)
        );


        localStorage.setItem(
            "lastA",
            lastA
        );

    }


    /* =================================
       ร้าน B
    ================================= */

    else {

        lastB++;

        queueNumber =
            createQueueNumber(
                "B",
                lastB
            );


        queueB.push({

            number: queueNumber,

            name: name,

            people: people

        });


        localStorage.setItem(
            "queueB",
            JSON.stringify(queueB)
        );


        localStorage.setItem(
            "lastB",
            lastB
        );

    }


    /* แจ้งเลขคิว */

    alert(
        "รับบัตรคิวเรียบร้อยแล้ว\n\n" +
        "ร้าน: ร้านอาหาร " +
        selectedShop +
        "\n" +
        "หมายเลขคิว: " +
        queueNumber +
        "\n" +
        "ชื่อ: " +
        name +
        "\n" +
        "จำนวน: " +
        people +
        " คน"
    );


    /* ล้างช่องกรอก */

    document.getElementById(
        "name"
    ).value = "";


    document.getElementById(
        "people"
    ).value = "";


    /* อัปเดตหน้าจอ */

    showQueue();

    updateCurrentQueue();

    updateStatus();

}


/* =================================
   แสดงรายการคิว
================================= */

function showQueue() {

    const table =
        document.getElementById(
            "queueTable"
        );


    table.innerHTML = "";


    let queue;


    if (selectedShop === "A") {

        queue = queueA;

    } else {

        queue = queueB;

    }


    /* ถ้าไม่มีคิว */

    if (queue.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="3">
                    ยังไม่มีคิว
                </td>

            </tr>

        `;

        return;
    }


    /* แสดงคิว */

    queue.forEach(function(customer) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${customer.number}
                </strong>
            </td>

            <td>
                ${customer.name}
            </td>

            <td>
                ${customer.people} คน
            </td>

        `;


        table.appendChild(row);

    });

}


/* =================================
   อัปเดตคิวปัจจุบัน
================================= */

function updateCurrentQueue() {

    const currentQueue =
        document.getElementById(
            "currentQueue"
        );


    if (selectedShop === "A") {

        currentQueue.innerText =
            createQueueNumber(
                "A",
                currentA
            );

    } else {

        currentQueue.innerText =
            createQueueNumber(
                "B",
                currentB
            );

    }

}


/* =================================
   เรียกคิวถัดไป
================================= */

function nextQueue() {

    let customer;


    /* =================================
       ร้าน A
    ================================= */

    if (selectedShop === "A") {

        if (queueA.length === 0) {

            alert(
                "ร้านอาหาร A ไม่มีคิวรอ"
            );

            return;
        }


        customer =
            queueA.shift();


        currentA =
            parseInt(
                customer.number.substring(1)
            );


        localStorage.setItem(
            "queueA",
            JSON.stringify(queueA)
        );


        localStorage.setItem(
            "currentA",
            currentA
        );

    }


    /* =================================
       ร้าน B
    ================================= */

    else {

        if (queueB.length === 0) {

            alert(
                "ร้านอาหาร B ไม่มีคิวรอ"
            );

            return;
        }


        customer =
            queueB.shift();


        currentB =
            parseInt(
                customer.number.substring(1)
            );


        localStorage.setItem(
            "queueB",
            JSON.stringify(queueB)
        );


        localStorage.setItem(
            "currentB",
            currentB
        );

    }


    /* แจ้งคิว */

    alert(
        "📢 กำลังเรียกคิว\n\n" +
        "หมายเลข: " +
        customer.number +
        "\n" +
        "ชื่อลูกค้า: " +
        customer.name +
        "\n" +
        "จำนวน: " +
        customer.people +
        " คน"
    );


    showQueue();

    updateCurrentQueue();

    updateStatus();

}


/* =================================
   รีเซ็ตคิว
================================= */

function resetQueue() {

    const confirmReset =
        confirm(
            "คุณต้องการรีเซ็ตคิวของร้านอาหาร " +
            selectedShop +
            " ใช่หรือไม่?"
        );


    if (!confirmReset) {

        return;

    }


    if (selectedShop === "A") {

        queueA = [];

        currentA = 0;

        lastA = 0;


        localStorage.setItem(
            "queueA",
            JSON.stringify(queueA)
        );


        localStorage.setItem(
            "currentA",
            0
        );


        localStorage.setItem(
            "lastA",
            0
        );

    }


    else {

        queueB = [];

        currentB = 0;

        lastB = 0;


        localStorage.setItem(
            "queueB",
            JSON.stringify(queueB)
        );


        localStorage.setItem(
            "currentB",
            0
        );


        localStorage.setItem(
            "lastB",
            0
        );

    }


    showQueue();

    updateCurrentQueue();

    updateStatus();


    alert(
        "รีเซ็ตคิวร้านอาหาร " +
        selectedShop +
        " เรียบร้อยแล้ว"
    );

}


/* =================================
   แสดงสถานะทั้ง 2 ร้าน
================================= */

function updateStatus() {

    document.getElementById(
        "statusA"
    ).innerText =
        createQueueNumber(
            "A",
            currentA
        );


    document.getElementById(
        "statusB"
    ).innerText =
        createQueueNumber(
            "B",
            currentB
        );

}


/* =================================
   เริ่มต้นระบบ
================================= */

showQueue();

updateCurrentQueue();

updateStatus();