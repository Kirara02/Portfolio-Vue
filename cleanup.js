import fs from 'fs';

// Files to clean up
const filesToRemove = [
    'cv-template.html',
    'cv-generator.mjs',
    'generate-cv.js'
];

console.log('🧹 Cleaning up temporary files...');

filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`✅ Removed: ${file}`);
    }
});

console.log('✅ Cleanup completed!');
console.log('📄 Your CV is ready: Fathul_Hidayat_CV.pdf');
