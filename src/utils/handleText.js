function keyGenerator(len) {
  let randomPass = "";
  let wordChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  for (let i = 0; i < len; i++) {
    randomPass += wordChars.charAt(
      Math.floor(Math.random() * wordChars.length)
    );
  }
  return randomPass;
}

module.exports = { keyGenerator };
