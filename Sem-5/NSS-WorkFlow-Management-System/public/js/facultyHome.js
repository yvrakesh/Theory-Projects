// refreshFaculty();
refreshStudents();

async function updateFaculty() {
    console.log(document.getElementById('LastName').value);
}

async function refreshFaculty() {
    // root = document.querySelector('.faculty');

    faculty_table = document.querySelector(".faculty_table");
    faculty_table.querySelector("thead tr").innerHTML = "";
    faculty_table.querySelector("tbody tr").innerHTML = "";

    response = await fetch(document.URL.replace('home', 'api/faculty').replace('?type=Faculty', ''));
    data = await response.json();

    for(attr in data.relation)
        faculty_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${attr}</th>`);
    for(attr in data.relation){ 
        if(data.relation[attr] != null) {
            faculty_table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td>
                    <input id = ${attr} value = ${data.relation[attr]}></input>
                </td>
            `);
        }
        else {
            faculty_table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td> 
                    <input id = ${attr} value = ""}></input>
                </td>
            `);
        }
    }
        
}

async function refreshStudents() {
    // root = document.querySelector('.students');

    student_table = document.querySelector(".students_table");
    student_table.querySelector("thead tr").innerHTML = "";
    student_table.querySelector("tbody").innerHTML = "";

    response = await fetch(document.URL.replace('home', 'api/faculty').replace('?type=Faculty', '/students'));
    data = await response.json();

    if(data.students.length == 0)
        document.getElementById("zero_students").innerHTML = "No students under you";
    else
    {
        document.getElementById("zero_students").innerHTML = ""
        for(attr in data.headers)
            student_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${data.headers[attr]}</th>`);
        for(row in data.students)
            student_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(data.students[row]).map(col => `<td>${col}</td>`).join("")}
                </tr>
            `);
    }
}