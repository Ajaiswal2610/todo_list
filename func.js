var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (yyyy+sp+mm+sp+dd);
    };


    function getAndupdate(){
        tit = document.getElementById('title').value;
        desc = document.getElementById('desc').value;
        deadl = document.getElementById('deadline').value;
        today = curday('-')
        if (tit.length>2){
            getAndupdate2();
        }

    }

    function getAndupdate2(){

        
        // document.getElementById('title').reset();
        // document.getElementById('desc').reset();
        if (localStorage.getItem('itemsJson')==null){
                itemJsonArray = [];
                itemJsonArray.push([tit, desc,'UnDone',today,deadl,'btn btn-warning']);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson')
                console.log(itemJsonArrayStr)
                itemJsonArray = JSON.parse(itemJsonArrayStr);
                itemJsonArray.push([tit, desc,'UnDone',today, deadl,'btn btn-warning']);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
        update();

    //populate the table 
        }

    

    function update(){
        if (localStorage.getItem('itemsJson')==null){
                itemJsonArray = [];
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
        else{
            itemJsonArrayStr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr);
           
        }
            
        let tableBody = document.getElementById("tableBody");
    let str = "";
  

    itemJsonArray.forEach((element, index) => {
     
            str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td> 
                <td>${element[3]}</td>
                <td>${element[4]}</td> 
                <td><button class="btn btn-sm btn-primary" style = background-color:rgb(70,18,18) onclick="deleted(${index})">Delete</button></td> 
                <td><button id = "status" class="${element[5]}" onclick="undone_done(${index})">${element[2]}</button></td> 
                <td><button id = "edit" class="btn btn-sm btn-primary" onclick="edit(${index})">Edit</button></td> 
                
                
                </tr>`; 
            });
            console.log(str)
            tableBody.innerHTML = str;
    }


    
    add = document.getElementById('add')
    add.addEventListener("click",getAndupdate);
    update()
    function deleted(itemindex){
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        // delete item index element 
        itemJsonArray.splice(itemindex,1)
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        update();
    };

    function undone_done(itemindex){
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        if (itemJsonArray[itemindex][2] == 'Done'){
            itemJsonArray[itemindex][2] = 'Undone'
            itemJsonArray[itemindex][5] = 'btn btn-warning'


        }
        else{
            itemJsonArray[itemindex][2] = 'Done'
            itemJsonArray[itemindex][5] = 'btn btn-success'



        }
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))

        update();
    }
    function clearstor(){
        if (confirm("Do you want to clear list?")){
            localStorage.clear();
        update();
        }
       
    }

    function edit(itemindex){
        var newdesc;
        var newdesc = prompt("Enter the new description");

        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        itemJsonArray[itemindex][1] = newdesc
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        update();

    }
   

    $(function(){
        var dtToday = new Date();
        
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var maxDate = year + '-' + month + '-' + day;
    
        // or instead:
        // var maxDate = dtToday.toISOString().substr(0, 10);
    
        $('#deadline').attr('min', maxDate);
    });