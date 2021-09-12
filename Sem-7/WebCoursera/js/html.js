var data = [
    {title : "HTML Crash Course", id : 1, src : "https://www.youtube.com/embed/UB1O30fR-EE", category : "medium", duration : "1 hour"},
    {title : "HTML Tutorial for Beginners", id : 2, src : "https://www.youtube.com/embed/qz0aGYrrlhU", category : "medium", duration : "1 hours 10min"},
    {title : "HTML Full Course", id : 3, src : "https://www.youtube.com/embed/pQN-pnXPaVg", category : "medium", duration : "2hours 3min"},
    {title : "Learn HTML", id : 4, src : "https://www.youtube.com/embed/DPnqb74Smug", category : "short", duration : "53min"},
    {title : "HTML in 12 min", id : 5, src : "https://www.youtube.com/embed/bWPMSSsVdPk", category : "short", duration : "12min"},
    {title : "HTML CSS for Beginners", id : 6, src : "https://www.youtube.com/embed/QMnv3QrjZoU", category : "short", duration : "36min"},
    {title : "Web Development Full Course", id : 7, src : "https://www.youtube.com/embed/TdqQqyc7pfU", category : "long", duration : "3hours 20min"},
    {title : "HTML CSS Full Course", id : 8, src : "https://www.youtube.com/embed/mU6anWqZJcc", category : "long", duration : "11hours 31min"},
    {title : "Free HTML CSS Course", id : 9, src : "https://www.youtube.com/embed/cyuzt1Dp8X8", category : "long", duration : "4hours 55min"}
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