const bcrypt = require("bcrypt");

const hash =
"$2b$10$pbavA3wfatKTIOycK8/nfOEHh6B4VpPxYTjUMP/0y0gbFaceFUdJu";

bcrypt.compare(
  "jeevan@5322026",
  hash
).then(result => {
  console.log(result);
});