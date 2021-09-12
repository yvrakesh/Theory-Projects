var data = [
    {title : "Free Python Course", id : 1, src : "https://www.youtube.com/embed/XKHEtdqhLK8", category : "long", duration : "12hours"},
    {title : "Pyhton for Beginners", id : 2, src : "https://www.youtube.com/embed/_uQrJ0TkZlc", category : "long", duration : "6hours 14min"},
    {title : "Python Full Course", id : 3, src : "https://www.youtube.com/embed/rfscVS0vtbw", category : "long", duration : "4hours 26min"},
    {title : "What is Python?", id : 4, src : "https://www.youtube.com/embed/WvhQhj4n6b8", category : "short", duration : "10min"},
    {title : "Python Basics", id : 5, src : "https://www.youtube.com/embed/woVJ4N5nl_s", category : "medium", duration : "1hour 32min"},
    {title : "Python for Beginners", id : 6, src : "https://www.youtube.com/embed/b093aqAZiPU", category : "medium", duration : "1hour 4min"},
    {title : "Python Roadmap", id : 7, src : "https://www.youtube.com/embed/27u8xHqLMZE", category : "short", duration : "13min"}
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