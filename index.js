require("isomorphic-unfetch");
require("dotenv").config();
const path = require("path")

const { promises: fs } = require("fs");

const randomQuoteContent = async () => {
    const data = await fetch("https://zenquotes.io/api/random").then((res) => res.json())
    return data['0']['h']
}

const main = async () => {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const qouteContent = await randomQuoteContent();

    const dateUp = new Date().toLocaleString()

    const readme = readmeTemplate
        .replace("{random-quote-0001}", qouteContent)
        .replace("{val-lv}", dateUp)

    await fs.writeFile("README.md", readme);
}
main()