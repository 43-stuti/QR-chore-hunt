var db = firebase.firestore();
import tasks from './tasksmaster.js'
let today = new Date('2017-01-01');
let users = ['Stuti','Rajshree'];
let removedTasks = []
let finalTasks = []
db.collection("chores").get().then((querySnapshot) => {
    tasks.forEach((task) => {
        querySnapshot.forEach((doc,index) => {
            if(task.id == doc.data().Task) {
                console.log('HMMM')
                removedTasks.push(task.id);
            }
        });
    })
    tasks.forEach((tasks,index) => {
        if(removedTasks.indexOf(tasks.id) < 0) {
            finalTasks.push(tasks)
        }
    })
    let pickedIndex = Math.floor(Math.random()*(finalTasks.length));
    let pickedUser = Math.floor(Math.random()*(users.length));
    let textcontainer = document.getElementById('task')
    textcontainer.innerHTML =  users[pickedUser] + ' ' + finalTasks[pickedIndex].taskText;
    db.collection("chores").add({
        AssignedOn: new Date(),
        AssignedTo: users[pickedUser],
        Task: tasks[pickedIndex].id
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});