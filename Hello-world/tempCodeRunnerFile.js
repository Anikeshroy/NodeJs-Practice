fs.writeFileSync("./text.txt", "File is created dynamically");

fs.writeFile("./text.txt", "File is overwrited", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File Edited Successfuly");
    }
});