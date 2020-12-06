//UI Vars

const form = document.querySelector("form");

const input = document.querySelector("#txtTaskName");

const btnDeleteAll = document.querySelector("#btnDeleteAll");

const tasklList = document.querySelector("#task-list");

let items;

loadItems();
eventListeners();


//Event Listener List
function eventListeners() {

    //Add New Item
    form.addEventListener("submit", addNewItem);

    //Delete an Item
    tasklList.addEventListener("click", deleteAnItem);

    //Delete All Items
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

//load Items
function loadItems(){
   items=getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}

//Gets items from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem("items")===null){
        items = [];
    }else{
        items=JSON.parse(localStorage.getItem("items"));
    }

    return items;
}
//Sets item to local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("items",JSON.stringify(items));
}
//delete item from local storage
function deleteFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
            items.splice(index,1);
        }
    })
    localStorage.setItem("items",JSON.stringify(items));
}
//Delete all items From Local Storage
function deleteAllFromLS(){
    localStorage.clear();
}

//Create a New Item
function createItem(text){
     //create li
     const li = document.createElement("li");
     li.classList = "list-group-item list-group-item-secondary";
     li.appendChild(document.createTextNode(text));

     //create a
     const a = document.createElement("a");
     a.classList = "delete-item float-right";
     a.setAttribute("href", "#");
     a.innerHTML = '<i class="fas fa-times"></i>';

     //Add a to in li
     li.appendChild(a);

     //Add li to in ul
     tasklList.appendChild(li);

}

//Adds New Item
function addNewItem(e) {

    if (input.value === "") {
        alert("Write something");
    } else {
        createItem(input.value);
    }
    //save to local storage
    setItemToLS(input.value);

    input.focus();


    input.value = "";
    e.preventDefault();
}

//Delete An Item
function deleteAnItem(e) {

    if (e.target.classList == "fas fa-times") {
        if (confirm("Are You Sure")) {
            e.target.parentNode.parentNode.remove();
        }

        //delete from Local Storage
        deleteFromLS(e.target.parentElement.parentElement.textContent);
       
    }



    e.preventDefault();
}

//Delete All Items
function deleteAllItems(e) {

    while(tasklList.firstChild){
        tasklList.removeChild(tasklList.firstChild);
    }
    deleteAllFromLS();
    
   // tasklList.innerHTML="";

   /* if (confirm("Are You Sure")) {


        tasklList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();
            }
        });
    }
    */

    e.preventDefault();
}