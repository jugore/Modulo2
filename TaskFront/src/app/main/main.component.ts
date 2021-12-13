import { Component, OnInit,Output, } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  router:Router
  taskInput=""
  taskService:TaskService
  constructor(taskService:TaskService,router:Router) { 
    this.taskService=taskService
    this.router=router
  }

  ngOnInit(): void {
    this.taskService.getAllTasks()
  }

  async deleteTask(id:string){
    const deleteTask= await this.taskService.deleteTaskRequest(id)
    if(deleteTask.status==true){
      alert("Eliminado exitosamente")
      location.reload()
    }else{
      alert("Error al eliminar")
    }
    

  }

  async addTask(){
    if(this.taskInput==""){
      alert("Ingrese datos")
    }

    const addtask = await this.taskService.addTask(this.taskInput)
    if(addtask.status==true){
      alert("Agregado exitosamente")
      location.reload()
    }else{
      alert("Error al agregar")
    }

  }

}
