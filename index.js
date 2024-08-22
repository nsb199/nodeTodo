const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tasksFilePath = path.join(__dirname, 'tasks.txt');

// Function to add a new task
function addTask(task) {
    fs.appendFile(tasksFilePath, `${task}\n`, (err) => {
        if (err) throw err;
        console.log('Task added successfully!');
    });
}

// Function to view the list of tasks
function viewTasks() {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task !== '');
        console.log('Tasks:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    });
}

// Function to mark a task as complete
function completeTask(taskNumber) {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task !== '');
        if (taskNumber > tasks.length || taskNumber <= 0) {
            console.log('Invalid task number!');
            return;
        }
        tasks[taskNumber - 1] = `✔️ ${tasks[taskNumber - 1]}`;
        fs.writeFile(tasksFilePath, tasks.join('\n'), (err) => {
            if (err) throw err;
            console.log('Task marked as complete!');
        });
    });
}

// Function to remove a task
function removeTask(taskNumber) {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        let tasks = data.split('\n').filter(task => task !== '');
        if (taskNumber > tasks.length || taskNumber <= 0) {
            console.log('Invalid task number!');
            return;
        }
        tasks.splice(taskNumber - 1, 1);
        fs.writeFile(tasksFilePath, tasks.join('\n'), (err) => {
            if (err) throw err;
            console.log('Task removed successfully!');
        });
    });
}

// CLI Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\nTask Manager');
    console.log('1. Add a new task');
    console.log('2. View list of tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');
}

function handleUserInput() {
    rl.question('\nSelect an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter the task: ', (task) => {
                    addTask(task);
                    handleUserInput(); // Show the menu again after adding
                });
                break;
            case '2':
                viewTasks();
                handleUserInput(); // Show the menu again after viewing
                break;
            case '3':
                rl.question('Enter the task number to mark as complete: ', (number) => {
                    completeTask(parseInt(number));
                    handleUserInput(); // Show the menu again after completing
                });
                break;
            case '4':
                rl.question('Enter the task number to remove: ', (number) => {
                    removeTask(parseInt(number));
                    handleUserInput(); // Show the menu again after removing
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option, please try again.');
                handleUserInput(); // Show the menu again if invalid option
                break;
        }
    });
}

showMenu();
handleUserInput();
