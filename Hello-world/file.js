const { error } = require("console");
const fs = require("fs");

fs.writeFileSync("./text.txt", "File is created dynamically");

fs.writeFile("./text.txt", "File is overwrited", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File Edited Successfuly");
    }
});

// fs.appendFileSync("./text.txt", `Ani\n`)

const contact = fs.readFileSync("./contact.txt", "utf-8");
console.log(contact);

fs.readFile("./contact.txt", "utf-8", (err, result) => {
    if (err) {
        console.log("Error in reding file", err);
    }

    else {
        console.log("File Reding completed", result);
    }
})