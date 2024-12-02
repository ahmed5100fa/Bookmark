"use strict";
let siteNameInput = document.querySelector("#siteName");
let siteURLInput = document.querySelector("#siteURL");
let SubmitBtn = document.querySelector("#SubmitBtn");

// General list for saving items
let generalList;
if (localStorage.getItem("items") == null) {
    generalList = [];
} else {
    generalList = JSON.parse(localStorage.getItem("items"));
    display(generalList);
}

function addItem() {
    let SiteName = siteNameInput.value.trim();
    let siteUrl = siteURLInput.value.trim();

    if (SiteName === "" || siteUrl === "") {
        alert("Please fill all fields");
        return;
    }

    if (!validateInput(siteNameInput, "siteName") || !validateInput(siteURLInput, "siteURL")) {
        return;
    }

    let isDuplicate = generalList.some(item => item.Url === siteUrl);

    if (isDuplicate) {
        alert("This URL already exists!");
        return;
    }

    let items = {
        Name: SiteName,
        Url: siteUrl,
    };

    generalList.push(items);
    localStorage.setItem("items", JSON.stringify(generalList));
    display(generalList);
    clear(); 
}


function display(arr) {
    let container = "";
    for (let i = 0; i < arr.length; i++) {
        container += `
        <tr class="text-center">
            <th scope="row">${i + 1}</th>
            <td>${arr[i].Name}</td>
            <td><button class="btn btn-success" onclick="viewURL(${i})"><i class="fa-solid fa-eye pe-2"></i>View</button></td>
            <td><button class="btn btn-danger" onclick="RemoveElement(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        </tr>
        `;
    }
    document.querySelector("tbody").innerHTML = container;
}

function clear() {
    siteNameInput.value = "";
    siteURLInput.value = "";
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteURLInput.classList.remove("is-valid", "is-invalid");
}

function RemoveElement(Index) {
    generalList.splice(Index, 1);
    localStorage.setItem("items", JSON.stringify(generalList));
    display(generalList);
}

function validateInput(element, type) {
    let regex = {
        siteName: /^\w{3,100}$/,
        siteURL: /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+(com|org|net|edu|gov|mil|info|io|biz|co|uk|eg|ly|us))((\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?)?$/i,
    };
    

    let alertMessage = element.nextElementSibling;

    if (regex[type]?.test(element.value)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        alertMessage.classList.add("d-none"); // إخفاء الرسالة
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        alertMessage.classList.remove("d-none");
        return false;
    }
}
function viewURL(Index) {
    var URL = generalList[Index].Url;
    window.open(URL, "_blank");
}

siteURLInput.addEventListener("input", () => validateInput(siteURLInput, "siteURL"));
siteNameInput.addEventListener("input", () => validateInput(siteNameInput, "siteName"));
SubmitBtn.addEventListener("click", () => addItem());
