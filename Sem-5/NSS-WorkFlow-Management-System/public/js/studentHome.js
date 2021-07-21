refreshStudent();
refreshWork();

async function refreshStudent() {

    // root = document.querySelector(".student");

    table = document.querySelector(".student_table");
    table.querySelector("thead tr").innerHTML = "";
    table.querySelector("tbody tr").innerHTML = "";
    
    student_response = await fetch(document.URL.replace('home','api/student').replace('?type=Student',''))
    data = await student_response.json();
    
    for(attr in data.relation)
        table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${attr}</th>`);
    for(attr in data.relation) {
        if(data.relation[attr] != null) {
            table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td>
                    <!-- <input id = ${attr} value = ${data.relation[attr]}></input> -->
                    ${data.relation[attr]}
                </td>
            `);
        }
        else {
            table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td>
                    <!-- <input id = ${attr} value = ""}></input> -->
                </td>
            `);
        }
    }
        
}

async function refreshWork() {

    // root = document.querySelector('.work');
   
    farm_table = document.querySelector('.farm_table');
    social_table = document.querySelector('.social_table');

    farm_table.querySelector("thead tr").innerHTML = "";
    farm_table.querySelector("tbody").innerHTML = "";
    social_table.querySelector("thead tr").innerHTML = "";
    social_table.querySelector("tbody").innerHTML = "";

    activities_response = await fetch('http://localhost:3000/api/student/upcoming_activities');
    data = await activities_response.json();

    console.log(data);

    if(data.farmWork.length == 0)
        document.getElementById("farm").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("farm").innerHTML = "";
        for(attr in data.headers)
            farm_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${data.headers[attr]}</th>`);
        for(row in data.farmWork)
            farm_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(data.farmWork[row]).map(col => `<td>${col}</td>`).join("")}
                    <td><button onclick = "join()">Join</button></td>
                </tr>
            `);
    }

    if(data.socialWork.length == 0)
        document.getElementById("social").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("social").innerHTML = ""
        for(attr in data.headers)
            social_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${data.headers[attr]}</th>`);
        for(row in data.socialWork)
            social_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(data.socialWork[row]).map(col => `<td>${col}</td>`).join("")}
                    <td><button onclick = "join()">Join</button></td>
                </tr>
            `);
    }  
}

async function join() {
    console.log("Joining.....")
}

function updateStudent() {
    window.location = document.URL.replace("?type=Student", "/update?type=Student")
}
