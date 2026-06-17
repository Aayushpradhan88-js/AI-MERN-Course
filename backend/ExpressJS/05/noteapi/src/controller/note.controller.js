const fs = require("fs")
const path = require("path")

const NOTE_DIR = path.join(__dirname, "../../notes")

const getAllNotes = (req, res) => {
    // /api/notes?search=diet

    const { search } = req.query

    fs.readdir(NOTE_DIR, (err, files) => {
        if (err) return res
            .status(500)
            .json({ error: "Failed to read notes directory" })

        let notes = files.filter(file => file.endsWith('.txt')) //.pdf  ,.md, .txt
        if (search) {
            notes = notes.filter(note => note.includes(search))
        }

        res.json({
            success: true,
            data: notes,
            total: notes.length
        })
    })
}
//POST- CREATE NOTE

const createNote = (req, res) => {
    //step1: Invoke/Retrive the data
    const { fileName, content } = req.body

    //step2: Validating the incomming data
    if (!fileName || !fileName.trim()) {
        return res.status(400).json({
            message: "filename is required"
        })
    }
    if (!content || !content.trim()) {
        return res.status(400).json({
            message: "content is required"
        })
    }

    //step3: Validation only .txt format is exceptable not (.js, .css, .pdf)
    if (!fileName.endsWith(".txt")) {
        return res.status(400).json({
            message: "Filename must end with .txt"
        })
    }

    //step4: Defining file path
    const filePath = path.join(NOTE_DIR, fileName)

    //step5: File should be created by server
    fs.writeFile(filePath, content.trim(), "utf-8", (err) => {
        if (err) {
            return res.status(500).json({
                message: "Couldn't save the file"
            })
        }

        //json data should be send as a response
        res.status(201).json({
            success: true,
            message: `Note created successfully ${fileName}`,
            createdAt: new Date().toISOString()
        })
    })

}

//deleting specific note
const deleteSpecificNote = (req, res) => {
    //step1
    const fileName = path.basename(req.params.fileName)
    console.log("data of file", req.params.fileName)
    console.log("req", fileName)
    const filePath = path.join(NOTE_DIR, fileName)

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({
                message: "Couldn't delete the file"
            })
        }

        res.json({
            success: true,
            message: `Note delete successfully`,
            data: {
                fileName
            },
            deletedAt: new Date().toISOString()
        })
    })


}

//Getting specific note
const getSpecificNotes = (req, res) => {
    const fileName = path.basename(req.params.fileName)
    console.log("data of file", req.params.fileName)
    console.log("req", fileName)
    const filePath = path.join(NOTE_DIR, fileName)

    fs.readFile(filePath, "utf-8", (err, data) => {
        if(err) {
            return res.status(500).json({
                message: "No file ",
            })
        }

        res.status(200).json({
            success: true,
            filename: fileName,
            content: data
        })
    })
}

//TODO: Update garnee kaam

module.exports = {
    getAllNotes,
    createNote,
    deleteSpecificNote,
    getSpecificNotes
}