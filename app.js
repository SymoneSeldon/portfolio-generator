const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const promptUser = () => {
return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name? (Required)',
          validate: nameInput => {
              if (nameInput) {
                  return true;
              } else {
                  console.log('Please enter your name!');
                  return false;
              }
          }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: gitInput => {
                if (gitInput) {
                    return true;
                } else {
                    console.log('Please enter github username!');
                }
            }
        },
        {
            type:'input',
            name:'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};  

  //add a new project
  const promptProject = portfolioData => {
      portfolioData.projects = [];
      console.log(`
      add a new Project
      `);
      if (!portfolioData.projects) {
          portfolioData.projects = [];
      }
      return inquirer
      .prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the name of your Project',
              validate: projectName => {
                  if (projectName) {
                      return true;
                  } else {
                      console.log('Please enter project name!');
                  }
              }
          },
          {
              type: 'input',
              name: 'description',
              message: 'Provide a description of the project (Required)',
              validate: projectInfo => {
                  if (projectInfo) {
                      return true;
                  } else {
                      console.log('Plase enter description!');
                  }
              }
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
            message: 'Enter the GitHub link to your project. (Required)',
            validate: gitLink => {
                if (gitLink) {
                    return true;
                } else {
                    console.log('Please provide link');
                }
            }
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
