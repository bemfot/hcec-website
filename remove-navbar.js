const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('/Users/tobiadedoyin/Desktop/bemfot/hcec-website/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Remove import Navbar
  content = content.replace(/import Navbar from ["'][^"']+["'];?\n?/g, '');
  
  // Remove <Navbar />
  content = content.replace(/<Navbar \/>\n?/g, '');
  
  // Remove import Footer
  content = content.replace(/import Footer from ["'][^"']+["'];?\n?/g, '');
  
  // Remove <Footer />
  content = content.replace(/<Footer \/>\n?/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log("Done");
