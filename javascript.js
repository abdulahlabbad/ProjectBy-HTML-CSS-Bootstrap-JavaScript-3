let studentName = document.getElementById('studentName');
let studentStatus = document.getElementById('studentStatus');
let present = document.getElementById('present');
let absent = document.getElementById('absent');
let submit = document.getElementById('submit');

let mood = 'Add Student';

let temp;
// creat note
let dataStu;
if (localStorage.student != null) {
    dataStu = JSON.parse(localStorage.student);
}
else {
    dataStu = [];
}

submit.onclick = function() {
    let newStu = {
        studentName: studentName.value,
        studentStatus: document.getElementById('present').checked ? 'present' : 'absent',
    };

    if (studentName.value != '' && studentStatus.value != '') {
        if (mood === 'Add Student') {
            dataStu.push(newStu);
        }
        else {
            dataStu[temp] = newStu;
            submit.innerHTML = 'Add Student';
            mood = 'Add Student'
        }
        clearData();
    }

    // save localstorage
    localStorage.setItem('student' , JSON.stringify(dataStu));
    showData();
} 
showData();

// clear inputs
function clearData() {
    studentName.value = '';
    present.checked = false;
    absent.checked = false;
}

// read
function showData() {
    let table = '';
    for (let i = 0 ; i < dataStu.length ; i++) {
        table += `
        <tr class="fs-5">
            <td class="p-1">${i + 1}</td>
            <td class="p-1">${dataStu[i].studentName}</td>
            <td class="p-1">${dataStu[i].studentStatus}</td>
            <td class="p-1"><button onclick="updateData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Update</button></td>
            <td class="p-1"><button onclick="deleteData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    countData();
}

// delete 
function deleteData(i) {
    dataStu.splice(i , 1);
    localStorage.student = JSON.stringify(dataStu);
    showData();
} 

// update
function updateData(i) {
    studentName.value = dataStu[i].studentName;
    if(dataStu[i].studentStatus === 'present') {
        present.checked = true;
        absent.checked = false;
    }
    else {
        present.checked = false;
        absent.checked = true;
    }
    submit.innerHTML = 'Update';
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// Present Button
function showPresent() {
    let table = '';
    for (let i = 0 ; i < dataStu.length ; i++) {
        if (dataStu[i].studentStatus === 'present'){
            table += `
            <tr class="fs-5">
                <td class="p-1">${i + 1}</td>
                <td class="p-1">${dataStu[i].studentName}</td>
                <td class="p-1">${dataStu[i].studentStatus}</td>
                <td class="p-1"><button onclick="updateData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Update</button></td>
                <td class="p-1"><button onclick="deleteData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Absent Button
function showAbsent() {
    let table = ''
    for (let i = 0 ; i < dataStu.length ; i++) {
        if (dataStu[i].studentStatus === 'absent'){
            table += `
            <tr class="fs-5">
                <td class="p-1">${i + 1}</td>
                <td class="p-1">${dataStu[i].studentName}</td>
                <td class="p-1">${dataStu[i].studentStatus}</td>
                <td class="p-1"><button onclick="updateData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Update</button></td>
                <td class="p-1"><button onclick="deleteData(${i})" type="button" class="border-0 text-white rounded-pill btn-three px-3">Delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// Badge 
function countData() {
    let total = dataStu.length;
    let present = 0;
    let absent = 0;

    for (let i = 0 ; i < dataStu.length ; i++) {
        if (dataStu[i].studentStatus === 'present') {
            present++;
        }
        else if (dataStu[i].studentStatus === 'absent') {
            absent++;
        }
    }
    document.getElementById('totalCount').innerHTML = (`Total Student ${total}`);
    document.getElementById('presentCount').innerHTML = (`Present Student ${present}`);
    document.getElementById('absentCount').innerHTML = (`Absent Student ${absent}`);
}
