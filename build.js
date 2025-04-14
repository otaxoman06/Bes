// This file is a build script helper for Vercel
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

// Run the build process
console.log('🏗️ Building client and server...');
execSync('npm run build', { stdio: 'inherit' });

console.log('✅ Build complete!');