var express = require('express');
var router = express.Router();
var userModel = require('./users')
var taskModel  = require('./task')
const excelJS = require("exceljs");
const { download } = require("express/lib/response");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/addtask', function(req, res, next) {
  userModel.find()
  .then(function(Users){
    res.render('createTask',{showData:Users})
  })
});



router.post('/createUser',function(req,res,next){
  var {name,email,mobile,id} = req.body
  userModel.create({
    name:name,
    email:email,
    mobile:mobile,
    id:id
  })
  .then(function(data){
    res.redirect('/')
  })
})

router.post('/AddTask',function(req,res,next){
  var {userid,taskName,taskType} = req.body
  userModel.findOne({id:userid})
  .then(function(founduser){
    taskModel.create({
      user:founduser._id,
      taskName:taskName,
      taskStatus:taskType
    })
    .then(function(task){
      founduser.task.push(task._id)
      founduser.save()
      .then(function(){
        res.redirect('/')
      })
    })
  })
})
router.get("/user_excel_file", function (req, res, next) {

  taskModel.find()
  .then((userTask) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet(" Users");
    const worksheet2 = workbook.addWorksheet(" Tasks");
    const path = "./files"; // Path to download excel
    worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "id", key: "id", width: 10 },
     
    ];
    worksheet2.columns=[
      { header: "id", key: "id", width: 10 },
      { header: "Task Name", key: "taskName", width: 10 },
      { header: "Task Type", key: "taskStatus", width: 10 },
    ]
    let count = 1;
    userTask.forEach((tasks) => {
      tasks.s_no = count;
      worksheet.addRow(tasks);
      worksheet2.addRow(tasks);
      count += 1;
    });

    const data = workbook.xlsx.writeFile(`${path}/Tasks-${Math.floor(Math.random()*1000)}.xlsx`);
    res.redirect("/");
  })
});


module.exports = router;