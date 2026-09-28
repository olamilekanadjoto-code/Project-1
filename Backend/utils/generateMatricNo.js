function generateMatricNo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";

  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return "KSC-" + suffix;
}

async function generateUniqueMatricNo(Student) {
  let matricNo;
  let exists = true;

  while (exists) {
    matricNo = generateMatricNo();
    exists = await Student.findOne({ matricNo });
  }
  return matricNo;
}

module.exports = { generateMatricNo, generateUniqueMatricNo };
