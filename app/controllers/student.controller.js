const connection = require("../config/db.config")
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const getAllStudents = (req, res) => {
    let q = "SELECT * FROM students;"
    connection.query(q, function (err, results) {
        if (err) return console.log(err)
        const finalResults = results.map((value) => ({
            ...value,
            photoUrl: `${req.protocol}://${req.get("host")}/uploads/${value.photo}`
        }))
        
        return res.status(200).send(finalResults)
    })
}

const addStudent = (req, res) => {
    const { name, photo, age, address } = req.body
    const file = req.file
    let q = "INSERT INTO students (name,photo,age,address) VALUES (?,?,?,?);"
    connection.query(q, [name, file.filename, age, address], function (err, results) {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(404).json({
                "message": "error occur"
            })
        }
        return res.status(200).json({
            "message": "student added successfully !",
            "results": results
        })
    })
}

const deleteStudent = (req, res) => {
    const id = req.params.id
    console.log(id)
    let q = "DELETE FROM students WHERE id = ?"
    connection.query(q, [id], function (err, results) {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(404).json({
                "message": "error occur"
            })
        }
        return res.status(200).json({
            "message": "student deleted successfully !",
            "results": results
        })
    })
}

const updateStudent = (req, res) => {
    const id = req.params.id
    const { name, age, address } = req.body
    console.log(id)
    let q = "UPDATE students SET name=? , age=? , address=? "
    connection.query(q, [name, age, address], function (err, results) {
        if (err) {
            console.log(err.sqlMessage)
            return res.status(404).json({
                "message": "error occur"
            })
        }
        return res.status(200).json({
            "message": `student with id : ${id} updated successfully !`,
            "results": results
        })
    })
}

const getSingleStudent = (req, res) => {
    const id = req.params.id
    let q = "SELECT * FROM students WHERE id = ?;"
    connection.query(q, [id], function (err, results) {
        if (err) return console.log(err)
        console.log(results.photo)
        return res.status(200).send(results)
    })
}

module.exports = {
    getAllStudents,
    addStudent,
    deleteStudent,
    updateStudent,
    getSingleStudent
}