import * as readline from 'readline';

// Define interfaces for tasks and users
interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Define the CodePlanner class
class CodePlanner {
  private tasks: Task[];
  private users: User[];

  constructor() {
    this.tasks = [];
    this.users = [];
  }

  // Method to create a new task
  createTask(task: Task): void {
    this.tasks.push(task);
  }

  // Method to assign a task to a user
  assignTask(taskId: string, assigneeId: string): void {
    const task = this.tasks.find((t) => t.id === taskId);
    const user = this.users.find((u) => u.id === assigneeId);

    if (task && user) {
      task.assignee = user.name;
    }
  }

  // Method to update the status of a task
  updateTaskStatus(taskId: string, status: string): void {
    const task = this.tasks.find((t) => t.id === taskId);

    if (task) {
      task.status = status;
    }
  }

  // Method to get all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Method to add a new user
  addUser(user: User): void {
    this.users.push(user);
  }

  // Method to get all users
  getAllUsers(): User[] {
    return this.users;
  }
}

// Create an instance of CodePlanner
const codePlanner = new CodePlanner();

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user for task details
function promptForTaskDetails(): Promise<Task> {
  return new Promise((resolve) => {
    rl.question('Enter task details:\n', (answer) => {
      const [id, title, description, assignee, dueDateStr, status] = answer.split(',');
      const dueDate = new Date(dueDateStr.trim());
      const task: Task = {
        id: id.trim(),
        title: title.trim(),
        description: description.trim(),
        assignee: assignee.trim(),
        dueDate,
        status: status.trim()
      };
      resolve(task);
    });
  });
}

// Function to prompt the user for task assignment
function promptForTaskAssignment(): Promise<[string, string]> {
  return new Promise((resolve) => {
    rl.question('Enter task ID and assignee ID:\n', (answer) => {
      const [taskId, assigneeId] = answer.split(',');
      resolve([taskId.trim(), assigneeId.trim()]);
    });
  });
}

// Function to prompt the user for task status update
function promptForTaskStatusUpdate(): Promise<[string, string]> {
  return new Promise((resolve) => {
    rl.question('Enter task ID and new status:\n', (answer) => {
      const [taskId, status] = answer.split(',');
      resolve([taskId.trim(), status.trim()]);
    });
  });
}

// Usage example:
(async function() {
  // Add users
  codePlanner.addUser({ id: '1', name: 'John Doe', email: 'john@example.com' });
  codePlanner.addUser({ id: '2', name: 'Jane Smith', email: 'jane@example.com' });

  // Prompt the user for task details
  const task = await promptForTaskDetails();
  codePlanner.createTask(task);

  // Prompt the user for task assignment
  const [taskId, assigneeId] = await promptForTaskAssignment();
  codePlanner.assignTask(taskId, assigneeId);

  // Prompt the user for task status update
  const [taskIdToUpdate, newStatus] = await promptForTaskStatusUpdate();
  codePlanner.updateTaskStatus(taskIdToUpdate, newStatus);

  // Get all tasks
  const allTasks = codePlanner.getAllTasks();
  console.log('All Tasks:', allTasks);

  // Get all users
  const allUsers = codePlanner.getAllUsers();
  console.log('All Users:', allUsers);

  rl.close();
})();
