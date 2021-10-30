var listask=document.getElementById("listasks");



function callApi2(){

    listask.replaceChildren();
    $.get("https://immense-plateau-68535.herokuapp.com/list",function(data){
        console.log(data)
    for (let index = 0; index < data.data.length; index++) {
        var btndelete= document.createElement("span")
        btndelete.classList.add("material-icons")
        btndelete.innerHTML="delete";
        btndelete.onclick= ()=> deleteToDo(data.data[index].id,data.data[index].value)
        var task = document.createElement("div");
        task.classList.add("task")
        task.innerHTML=data.data[index].value;
        task.append(btndelete)
        task.appendChild(document.createElement("hr"))
        console.log(data.data[index].id)
        listask.appendChild(task)
    }

    });

}

function addTask(){
    listask.replaceChildren();
    let task=document.getElementById("task-item").value;

    $.post("https://immense-plateau-68535.herokuapp.com/add",
    {
        todoitem: task+"- Junior"
    },
    function(data){
        console.log(data)
    });
    callApi2();
}
callApi2();

function deleteToDo(id,userName){
    listask.replaceChildren();
    nameJunior= "-"+userName.split("-").pop();

    if(nameJunior == "- Junior"){

        $.post("https://immense-plateau-68535.herokuapp.com/remove",
        {
            todoitemId:id,
            userName:userName
        },
        function(data){
            console.log(data)
        });
        callApi2();
    }else{
        alert("No se puede eliminar, no es tu tarea")
        callApi2();
    }

}

