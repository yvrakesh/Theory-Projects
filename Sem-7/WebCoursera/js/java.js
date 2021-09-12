var data = [
    {title : "Java Tutorial in 2 Hours", id : 1, src : "https://www.youtube.com/embed/rV_3Lewxx6o", category : "medium", duration : "2hours 30min"},
    {title : "Learn Java in 2 Hours", id : 2, src : "https://www.youtube.com/embed/UmnCZ7-9yDY", category : "medium", duration : "2hours 5min"},
    {title : "Java in 14 min", id : 3, src : "https://www.youtube.com/embed/RRubcjpTkks", category : "short", duration : "14min"},
    {title : "Learn Java", id : 4, src : "https://www.youtube.com/embed/grEKMHGYyns", category : "long", duration : "9hours 32min"},
    {title : "Java Tutorial for Beginners", id : 5, src : "https://www.youtube.com/embed/8cm1x4bC610", category : "long", duration : "6hour 48min"},
    {title : "Java for Beginners", id : 6, src : "https://www.youtube.com/embed/eIrMbAQSU34", category : "medium", duration : "2hour 31min"},
    {title : "Free Java Course", id : 7, src : "https://www.youtube.com/embed/xk4_1vDrzzo", category : "long", duration : "12hours"}
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