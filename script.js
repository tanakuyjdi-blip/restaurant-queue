window.bookQueue = async function () {

    const name = document
        .getElementById("name")
        .value
        .trim();

    const people = Number(
        document
            .getElementById("people")
            .value
    );

    if (name === "") {
        alert("กรุณากรอกชื่อลูกค้า");
        return;
    }

    if (!people || people <= 0) {
        alert("กรุณากรอกจำนวนคน");
        return;
    }

    // =================================
    // สร้างเลขคิวจากเวลาปัจจุบัน
    // =================================

    const queueNumber =
        selectedShop +
        String(
            Date.now() % 1000
        ).padStart(3, "0");


    // =================================
    // เก็บข้อมูลลูกค้า
    // =================================

    localStorage.setItem(
        "myQueueNumber",
        queueNumber
    );

    localStorage.setItem(
        "myQueueShop",
        selectedShop
    );

    localStorage.setItem(
        "myName",
        name
    );

    localStorage.setItem(
        "myPeople",
        people
    );


    // =================================
    // ⭐ ไปหน้ารอคิวทันที
    // =================================

    window.location.href = "waiting.html";
};