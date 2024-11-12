import { ContributingGen } from "./index.js";
import { writeFile } from "./utils.js";
import fs from "fs";

// Update with your project's info
const specs = {
  project: {
    name: "Movement",
    defaultBranch: "main",
    repoUrl: "https://github.com/orgs/movementlabsxyz",
    docsUrl: "https://docs.movementnetwork.xyz/",
  },
  contributing: {
    generate: true,
    emailSensitiveBugs: "hello@movementlabs.xyz",
  },
  codeOfConduct: {
    generate: true,
    // enforcement email must not be omitted if 'generate' is true
    enforcementEmail: "hello@movementlabs.xyz",
    // additional info about how the code of conduct will be enforced
    enforcementGuidelines: false,
  },
};

const contributingTemplate = fs.readFileSync(
  "templates/contributing.dot",
  "utf8"
);
const codeOfConductTemplate = fs.readFileSync(
  "templates/codeOfConduct.dot",
  "utf8"
);
const contributingGen = new ContributingGen(
  contributingTemplate,
  codeOfConductTemplate
);

const contributingMd = contributingGen.generateContributing(specs);
const codeOfConductMd = contributingGen.generateCodeOfConduct(specs);

if (contributingMd) writeFile("out", contributingMd, "CONTRIBUTING.md");
if (codeOfConductMd) writeFile("out", codeOfConductMd, "CODE_OF_CONDUCT.md");
