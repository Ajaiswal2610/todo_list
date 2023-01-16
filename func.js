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
                let entry = {};
                entry['title'] = tit;
                entry['description'] = desc;
                entry['status'] = 'UnDone';
                entry['e_date'] = today;
                entry['deadl'] = deadl;

                itemJsonArray.push(entry);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson')
                itemJsonArray = JSON.parse(itemJsonArrayStr);
                let entry = {};
                entry['title'] = tit;
                entry['description'] = desc;
                entry['status'] = 'UnDone';
                entry['e_date'] = today;
                entry['deadl'] = deadl;
                itemJsonArray.push(entry);
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
            class_name = "btn btn-warning"
            if (element['status']== 'Done'){
                class_name = "btn btn-success"
            }
            else{
                class_name = "btn btn-warning"
            }

            str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element['title']}</td>
                <td>${element['description']}</td> 
                <td>${element['e_date']}</td>
                <td>${element['deadl']}</td> 
                <td><button class="btn btn-sm btn-primary" style = background-color:rgb(70,18,18) onclick="deleted(${index})">Delete</button></td> 
                
                <td><button id = "status" class="${class_name}" onclick="undone_done(${index})">${element['status']}</button></td> 
                <td><button id = "edit" class="btn btn-sm btn-primary" onclick="edit(${index})">Edit</button></td> 
                
                
                </tr>`; 
            });
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

    // function delete_no_fresh(itemindex){
    //     itemJsonArrayStr = localStorage.getItem('itemsJson')
    //     itemJsonArray = JSON.parse(itemJsonArrayStr);
    //     // delete item index element 
    //     itemJsonArray.splice(itemindex,1)
    //     localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))

    // }

    function undone_done(itemindex){
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        if (itemJsonArray[itemindex]['status'] == 'Done'){
            itemJsonArray[itemindex]['status'] = 'Undone'


        }
        else{
            itemJsonArray[itemindex]['status'] = 'Done'



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
    function edit_entry(itemindex){
        // deleted(itemindex)
        newdesc = document.getElementById('desc').value;
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        itemJsonArray[itemindex]['description'] = newdesc
        itemJsonArray[itemindex]['title'] = document.getElementById('title').value;
        itemJsonArray[itemindex]['deadl'] = document.getElementById('deadline').value;
        // console.log(itemJsonArray)
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        update();
        // // document.getElementById('add').innerHTML = 'ADD';

    }
  

    function edit(itemindex){

        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        document.getElementById('add').innerHTML = 'Update List';
        title = itemJsonArray[itemindex]['title']
        desc = itemJsonArray[itemindex]['description']
        deadline = itemJsonArray[itemindex]['deadl']
        document.getElementById('deadline').value  = deadline
        document.getElementById('title').value = title
        document.getElementById('desc').value = desc
        upd = document.getElementById('add')
        upd.removeEventListener("click",getAndupdate)
        upd.addEventListener("click", entry_call);
        function entry_call(){
        edit_entry(itemindex)
        }

        // localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        // update();

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