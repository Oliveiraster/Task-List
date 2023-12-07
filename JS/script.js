const form = document.querySelector('form#task-form')
const inTaskTitle = document.querySelector('#task-title')
const taksListUl = document.querySelector('#task-list')

let tasks = []

form.addEventListener('submit', (e) => {
   e.preventDefault()

   const taskTitle = inTaskTitle.value

   if( taskTitle.length < 3){
       alert('Sua tarefa precisa conter 3 ou mais caracter')
       return
   }
   tasks.push({
       title: taskTitle,
       done: false,
   })
   localStorage.setItem('tasks', JSON.stringify(tasks))

   addTask(taskTitle)
   
   inTaskTitle.value = ' '
   
})


function addTask(taskTitle, done = false){
   const li = document.createElement('li')
   const iconAdd = document.createElement('ion-icon')
   
   iconAdd.classList.add('done-btn')
   iconAdd.setAttribute('name', 'checkmark-outline')
   iconAdd.setAttribute('type', 'checkbox')
   iconAdd.addEventListener('click', (e)=>{

       const toggleLi = e.target.parentElement
       const spanT = toggleLi.querySelector('span')
   
       tasks = tasks.map(t => {
           if(t.title === spanT.textContent){
               return {
                   title: t.title,
                   done: !t.done,
               }
           }
           return t
       })
       tasks.forEach(e => {
           if(e.title === spanT.textContent && e.done){
               li.classList.add('done') 
           }
           if (e.title === spanT.textContent && e.done === false){
               li.classList.remove('done') 
           }
       })
      
       localStorage.setItem('tasks', JSON.stringify(tasks))
   })
   iconAdd.checked = done
   const span = document.createElement('span')
   span.textContent = taskTitle
   if(done){
       li.classList.add('done')
   }
   const iconRemove = document.createElement('ion-icon')
   iconRemove.classList.add('remove-btn')
   iconRemove.setAttribute('name', 'close-outline')
   iconRemove.addEventListener('click',(e)=>{
    const removeLi = e.target.parentElement
           const removeTitle = removeLi.querySelector('span').textContent
           tasks = tasks.filter(t => t.title !== removeTitle)
    
           taksListUl.removeChild(removeLi)
           localStorage.setItem('tasks', JSON.stringify(tasks))


   } )
   li.appendChild(span)
   li.appendChild(iconRemove)
   li.appendChild(iconAdd)
   li.classList.add('task-box')
   li.classList.add('template')
   taksListUl.appendChild(li)

}


window.onload = () =>{
   const tasklocalStorage =localStorage.getItem('tasks')
   if(!tasklocalStorage) return
   tasks = JSON.parse(tasklocalStorage)
   
   tasks.forEach(e => {
       addTask(e.title, e.done)
   });
}



const backgroundColor = document.querySelector('#color-back')
backgroundColor.addEventListener('change', function(e){
    const body = document.querySelector('body')
    body.style.backgroundimage = `${backgroundColor.value}`
    body.style.backgroundColor = `${backgroundColor.value}`
    console.log(body)
    console.log(backgroundColor.value)
})