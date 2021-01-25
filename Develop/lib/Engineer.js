// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
/// Define engineer class that extends through Employee class
class Engineer extends Employee {
    constructor(name, id , email, username) {
        super(name, id, email);
        this.github = username;    
    }
    getRole() {
        return "Engineer"
    }
    getGithub() {
        return this.github;
    }

}

module.exports = Engineer;