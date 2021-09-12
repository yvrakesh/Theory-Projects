var data = [
    {title : "Introduction to CSS", id : 1, src : "https://www.youtube.com/embed/1PnVor36_40", category : "short", duration : "20min"},
    {title : "CSS in 30min", id : 2, src:"https://www.youtube.com/embed/3sKOM9_qy2U", category : "short", duration : "30min"},
    {title : "CSS Full Course", id : 3, src:"https://www.youtube.com/embed/3_9znKVNe5g",category : "medium", duration : "1hour 5min"},
    {title : "CSS Bootcamp", id : 4, src : "https://www.youtube.com/embed/1Rs2ND1ryYc", category : "long", duration : "6hours 15min"},
    {title : "CSS for Beginners", id : 5, src : "https://www.youtube.com/embed/yfoY53QXEnI", category : "medium", duration : "1hours 25min"},
    {title : "HTML CSS for Beginners", id : 6, src : "https://www.youtube.com/embed/QMnv3QrjZoU", category : "short", duration : "36min"},
    {title : "CSS Crash Course", id : 7, src : "https://www.youtube.com/embed/KN6oBEOz2ZI", category : "long", duration : "3hours 20min"},
    {title : "Web Development Full Course", id : 8, src : "https://www.youtube.com/embed/TdqQqyc7pfU", category : "long", duration : "3hours 20min"},
    {title : "HTML CSS Full Course", id : 9, src : "https://www.youtube.com/embed/mU6anWqZJcc", category : "long", duration : "11hours 31min"},
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