const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const promptUser = () => {
return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type:'input',
            name:'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};  

  //add a new project
  const promptProject = portfolioData => {
      portfolioData.projects = [];
      console.log(`
      add a new Project
      `);
      return inquirer.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the name of your Project'
          },
          {
              type: 'input',
              name: 'description',
              message: 'Provide a description of the project (Required)'
          },
          {
              type: 'checkbox',
              name:'language',
              message: 'What did you build this project with? (check all that apply)',
              choices:['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }
      ])
      .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else {
         return portfolioData;
        }
     });
  };
  promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

//const fs = require("fs");

//const generatePage = require('./src/page-template.js')

//const pageHTML = generatePage(name, github);


//fs.writeFile('./index.html', pageHTML, err => {
//    if(err) throw err;

//    console.log('Portfolio complete! Check out index.html to see the output!');
//});
