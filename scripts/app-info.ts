import fs, { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
interface PackageJson {
   dependencies?: Record<string, string>;
   devDependencies?: Record<string, string>;
   engines?: { node?: string; yarn?: string };
   name?: string;
   version?: string;
}
interface AppInfo {
   defaultLanguage: string;
   languages: string[];
   name?: string;
   node?: string;
   react?: string;
   releaseDate: string;
   typescript?: string;
   version?: string;
   vite?: string;
   yarn?: string;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, '../package.json');
const packageInfo: PackageJson = JSON.parse(
   fs.readFileSync(packagePath, 'utf-8'),
);
const name = packageInfo?.name;
const node = packageInfo?.engines?.node;
const react = packageInfo?.dependencies?.react;
const typescript = packageInfo?.devDependencies?.typescript;
const version = packageInfo?.version;
const vite = packageInfo?.devDependencies?.vite;
const yarn = packageInfo?.engines?.yarn;
const appInfo: AppInfo = {
   defaultLanguage: 'uz',
   languages: ['uz', 'ru', 'en'],
   name,
   node,
   react,
   releaseDate: new Date().toISOString(),
   typescript,
   version,
   vite,
   yarn,
};
writeFileSync('public/app-info.json', JSON.stringify(appInfo, null, 2));
console.log('✅ app-info.json updated:', appInfo);
