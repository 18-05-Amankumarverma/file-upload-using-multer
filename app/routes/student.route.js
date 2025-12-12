const express = require("express")
const router = express.Router()
const path = require("path")
const { v4: uuidv4 } = require("uuid");
const { getAllStudents, addStudent, deleteStudent, updateStudent, getSingleStudent } = require("../controllers/student.controller")
const multer = require('multer')


// multer file storing options
const storage = multer.diskStorage({
    limits:5,
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,"../../uploads"))
    },
    filename: function (req, file, cb) {
        let uploadFileName = uuidv4() + path.extname(file.originalname)
        cb(null,uploadFileName)
    }
})

const upload = multer({ storage: storage })

router.get("/", getAllStudents)
router.post("/", upload.single("photo"), addStudent)
router.delete('/delete/:id', deleteStudent)
router.put("/update/:id", updateStudent)
router.get("/:id", getSingleStudent)

module.exports = router