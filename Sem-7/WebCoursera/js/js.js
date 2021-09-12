var data = [
    {title : "Learn JavaScript", id : 1, src : "https://www.youtube.com/embed/PkZNo7MFNFg", category : "long", duration : "3hours 26 min"},
    {title : "JavaScript in 1 Hour", id : 2, src : "https://www.youtube.com/embed/W6NZfCO5SIk", category : "short", duration : "49min"},
    {title : "Free JavaScript", id : 3, src : "https://www.youtube.com/embed/t9dEgHpCNJE", category : "long", duration : "4hours 30min"},
    {title : "JavaScript Crash Course", id : 4, src : "https://www.youtube.com/embed/hdI2bqOjy3c", category : "medium", duration : "1hours 10min"},
    {title : "JavaScript Programming", id : 5, src : "https://www.youtube.com/embed/jS4aFq5-91M", category : "long", duration : "7hours 44m in"},
    {title : "Learn JS in 60 min", id : 6, src : "https://www.youtube.com/embed/DFs-du7Uc2w", category : "short", duration : "51min"},
    {title : "Web Development Full Course", id : 7, src : "https://www.youtube.com/embed/TdqQqyc7pfU", category : "long", duration : "3hours 20min"},
    {title : "JavaScript Crash Course 2021", id : 8, src : "https://www.youtube.com/embed/g7T23Xzys-A", category : "medium", duration : "2hours 9min"},
    {title : "What is JS?", id : 9, src : "https://www.youtube.com/embed/Ia0FSogTRaw", category : "short", duration : "18min"}
];

function re_render(){
    var e = document.getElementById("category");
    var cur_cat = e.value;
    var table = document.getElementById("cat-table");
    
    table.innerHTML = "";
    var k = 0;
    
    for(var i = 0; i < data.length; i++){
        if(cur_cat == "all") {
            var row = table.insertRow(i);
            row.className = "vid-row";
            
            var c1 = row.insertCell(0);
            c1.className = "vid-frame";
            c1.innerHTML = "<iframe  src = "+data[i].src+" allowfullscreen></iframe>";
            
            var c2 = row.insertCell(1);
            c2.className = "vid-content";
            c2.innerHTML = `
            <div class='content-div'> 
                <div class="line-row"><h2> ${data[i].title} </h2><input class="check" type="checkbox">  </div>
                <h3 class="duration">Duration : ${data[i].duration} </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>              
            </div>`;    
        }

        else if(data[i].category == cur_cat) {
            var row = table.insertRow(k);
            row.className = "vid-row";
            
            var c1 = row.insertCell(0);
            c1.className = "vid-frame";
            c1.innerHTML = "<iframe  src = "+data[i].src+" allowfullscreen></iframe>";
            
            var c2 = row.insertCell(1);
            c2.className = "vid-content";
            c2.innerHTML = `
            <div class = 'content-div'> 
                <div class = "line-row"><h2> ${data[i].title} </h2> <input class = "check"type="checkbox">  </div>
                <h3 class = "duration">Duration : ${data[i].duration} </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>             
            </div>`; 
            
            k += 1;
        }
    }
}