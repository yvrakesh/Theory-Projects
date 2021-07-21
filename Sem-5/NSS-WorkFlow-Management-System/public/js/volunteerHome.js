refreshVolunteer();
refreshPastActivities();
refreshCurrentActivities();
refreshUpcomingActivities();

async function updateVolunteer() {
    console.log(document.getElementById('LastName').value);
}

async function refreshVolunteer() {

    volunteer_table = document.querySelector(".volunteer_table");
    volunteer_table.querySelector("thead tr").innerHTML = "";
    volunteer_table.querySelector("tbody tr").innerHTML = "";

    response = await fetch(document.URL.replace('home', 'api/volunteer').replace('?type=volunteer', ''));
    data = await response.json();

    for(attr in data.relation)
        volunteer_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${attr}</th>`);
    for(attr in data.relation) {
        if(data.relation[attr] != null) {
            volunteer_table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td>
                    <input id = ${attr} value = ${data.relation[attr]}></input>
                </td>
            `);
        }
        else {
            volunteer_table.querySelector("tbody tr").insertAdjacentHTML("beforeend", `
                <td>
                    <input id = ${attr} value = ""}></input>
                </td>
            `);
        }
    }
        
}

async function refreshPastActivities() {

    past_farm_table = document.querySelector('.past_farm_table');
    past_social_table = document.querySelector('.past_social_table');

    past_farm_table.querySelector("thead tr").innerHTML = "";
    past_farm_table.querySelector("tbody").innerHTML = "";
    past_social_table.querySelector("thead tr").innerHTML = "";
    past_social_table.querySelector("tbody").innerHTML = "";

    response = await fetch(document.URL.replace('home','api/volunteer').replace('?type=Volunteer','/past_activities'));
    past_data = await response.json();

    if(past_data.farmWork.length == 0 && past_data.socialWork.length == 0)
        document.getElementById("zero_past_activities").innerHTML = "You haven't participated in any activity";
    else
        document.getElementById("zero_past_activities").innerHTML = "";
    if(past_data.farmWork.length == 0)
        document.getElementById("past_farm").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("past_farm").innerHTML = "";
        for(attr in past_data.headers)
            past_farm_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${past_data.headers[attr]}</th>`);
        for(row in past_data.farmWork)
            past_farm_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(past_data.farmWork[row]).map(col => `<td>${col}</td>`).join("")}
                </tr>
            `);
    }

    if(data.socialWork.length == 0)
        document.getElementById("past_social").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("past_social").innerHTML = ""
        for(attr in past_data.headers)
            past_social_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${past_data.headers[attr]}</th>`);
        for(row in past_data.socialWork)
            past_social_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(past_data.socialWork[row]).map(col => `<td>${col}</td>`).join("")}
                </tr>
            `);
    }  
}

async function refreshCurrentActivities() {

    current_farm_table = document.querySelector('.current_farm_table');
    current_social_table = document.querySelector('.current_social_table');

    current_farm_table.querySelector("thead tr").innerHTML = "";
    current_farm_table.querySelector("tbody").innerHTML = "";
    current_social_table.querySelector("thead tr").innerHTML = "";
    current_social_table.querySelector("tbody").innerHTML = "";

    response = await fetch(document.URL.replace('home','api/volunteer').replace('?type=Volunteer','/current_activities'));
    current_data = await response.json();

    if(current_data.farmWork.length == 0 && current_data.socialWork.length == 0)
        document.getElementById("zero_current_activities").innerHTML = "You haven't participated in any activity";
    else
        document.getElementById("zero_current_activities").innerHTML = "";
    if(current_data.farmWork.length == 0)
        document.getElementById("current_farm").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("current_farm").innerHTML = "";
        for(attr in current_data.headers)
            current_farm_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${current_data.headers[attr]}</th>`);
        for(row in current_data.farmWork)
            current_farm_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(current_data.farmWork[row]).map(col => `<td>${col}</td>`).join("")}
                    <td>
                        <button id = "attendance_${current_data.farmWork[row]['ID']}" onClick = "attendance(this)">Give Attendance</button>
                    </td>
                    <td>
                        <button id = "submit_${current_data.farmWork[row]['ID']}" onClick = "submit(this)">Submit</button>
                    </td>  
                </tr>
                
            `);
    }

    //Make it same as farmwork

    // if(data.socialWork.length == 0)
    //     document.getElementById("current_social").innerHTML = "No upcoming activities";
    // else
    // {
    //     document.getElementById("current_social").innerHTML = ""
    //     for(attr in data.headers)
    //         current_social_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${data.headers[attr]}</th>`);
    //     for(row in data.socialWork)
    //         current_social_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
    //             <tr>
    //                 ${Object.values(data.socialWork[row]).map(col => `<td>${col}</td>`).join("")}
    //             </tr>
    //         `);
    // }  
}

async function refreshUpcomingActivities() {

    upcoming_farm_table = document.querySelector('.upcoming_farm_table');
    upcoming_social_table = document.querySelector('.upcoming_social_table');

    upcoming_farm_table.querySelector("thead tr").innerHTML = "";
    upcoming_farm_table.querySelector("tbody").innerHTML = "";
    upcoming_social_table.querySelector("thead tr").innerHTML = "";
    upcoming_social_table.querySelector("tbody").innerHTML = "";

    response = await fetch(document.URL.replace('home','api/volunteer').replace('?type=Volunteer','/upcoming_activities'));
    upcoming_data = await response.json();

    if(upcoming_data.farmWork.length == 0 && upcoming_data.socialWork.length == 0)
        document.getElementById("zero_upcoming_activities").innerHTML = "You haven't participated in any activity";
    else
        document.getElementById("zero_upcoming_activities").innerHTML = "";
    if(upcoming_data.farmWork.length == 0)
        document.getElementById("upcoming_farm").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("upcoming_farm").innerHTML = "";
        for(attr in upcoming_data.headers)
            upcoming_farm_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${upcoming_data.headers[attr]}</th>`);
        for(row in upcoming_data.farmWork)
            upcoming_farm_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(upcoming_data.farmWork[row]).map(col => `<td>${col}</td>`).join("")}
                </tr>
            `);
    }

    if(upcoming_data.socialWork.length == 0)
        document.getElementById("upcoming_social").innerHTML = "No upcoming activities";
    else
    {
        document.getElementById("upcoming_social").innerHTML = ""
        for(attr in upcoming_data.headers)
            upcoming_social_table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th>${upcoming_data.headers[attr]}</th>`);
        for(row in upcoming_data.socialWork)
            upcoming_social_table.querySelector("tbody").insertAdjacentHTML("beforeend", `
                <tr>
                    ${Object.values(upcoming_data.socialWork[row]).map(col => `<td>${col}</td>`).join("")}
                </tr>
            `);
    }  
}

async function attendance(foo_1) {
    console.log(foo_1);
}

async function submit(foo_2) {
    console.log(foo_2);
}
