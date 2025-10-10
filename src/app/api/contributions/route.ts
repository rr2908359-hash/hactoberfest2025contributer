import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ButtonMetadata {
  name: string;
  author: string;
  description: string;
  type: 'react' | 'html' | 'vanilla';
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface ButtonContribution {
  metadata: ButtonMetadata;
  html?: string;
  css?: string;
  js?: string;
  reactCode?: string;
  folderPath: string;
  importPath?: string;
}

async function loadContributions(): Promise<ButtonContribution[]> {
  const contributions: ButtonContribution[] = [];
  const contributionsDir = path.join(process.cwd(), 'contributions');

  if (!fs.existsSync(contributionsDir)) {
    return contributions;
  }

  const contributors = fs.readdirSync(contributionsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const contributor of contributors) {
    const contributorPath = path.join(contributionsDir, contributor);
    const items = fs.readdirSync(contributorPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        // Multi-button structure: contributor/button-name/
        await loadSingleButton(
          path.join(contributorPath, item.name),
          contributor,
          contributions,
          `${contributor}/${item.name}`
        );
      } else if (item.name === 'index.js') {
        // Single button structure: contributor/index.js
        await loadSingleButton(contributorPath, contributor, contributions, contributor);
      }
    }
  }

  return contributions;
}

async function loadSingleButton(
  buttonPath: string, 
  contributor: string, 
  contributions: ButtonContribution[],
  importPath: string
) {
  try {
    const indexPath = path.join(buttonPath, 'index.js');
    
    if (!fs.existsSync(indexPath)) {
      return;
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    let metadata: ButtonMetadata | null = null;
    
    try {
      // Extract metadata using regex
      const nameMatch = indexContent.match(/name:\s*["']([^"']+)["']/);
      const authorMatch = indexContent.match(/author:\s*["']([^"']+)["']/);
      const descriptionMatch = indexContent.match(/description:\s*["']([^"']+)["']/);
      const typeMatch = indexContent.match(/type:\s*["']([^"']+)["']/);
      const difficultyMatch = indexContent.match(/difficulty:\s*["']([^"']+)["']/);
      const tagsMatch = indexContent.match(/tags:\s*\[([^\]]+)\]/);
      
      if (nameMatch) {
        metadata = {
          name: nameMatch[1],
          author: authorMatch?.[1] || contributor,
          description: descriptionMatch?.[1] || '',
          type: (typeMatch?.[1] as 'react' | 'html' | 'vanilla') || 'html',
          difficulty: (difficultyMatch?.[1] as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
          tags: tagsMatch?.[1] ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/["']/g, '')) : []
        };
      }
    } catch (error) {
      console.error(`Error parsing metadata for ${buttonPath}:`, error);
      return;
    }

    if (!metadata) return;

    const contribution: ButtonContribution = {
      metadata,
      folderPath: buttonPath,
      importPath
    };

    // Load HTML, CSS, JS files if they exist
    const htmlPath = path.join(buttonPath, 'button.html');
    const cssPath = path.join(buttonPath, 'button.css');
    const jsPath = path.join(buttonPath, 'button.js');
    const reactPath = path.join(buttonPath, 'button.jsx');
    const reactTsPath = path.join(buttonPath, 'button.tsx');

    if (fs.existsSync(htmlPath)) {
      contribution.html = fs.readFileSync(htmlPath, 'utf-8');
    }

    if (fs.existsSync(cssPath)) {
      contribution.css = fs.readFileSync(cssPath, 'utf-8');
    }

    if (fs.existsSync(jsPath)) {
      contribution.js = fs.readFileSync(jsPath, 'utf-8');
    }

    if (fs.existsSync(reactPath)) {
      contribution.reactCode = fs.readFileSync(reactPath, 'utf-8');
    } else if (fs.existsSync(reactTsPath)) {
      contribution.reactCode = fs.readFileSync(reactTsPath, 'utf-8');
    }

    contributions.push(contribution);
  } catch (error) {
    console.error(`Error loading button from ${buttonPath}:`, error);
  }
}

export async function GET() {
  try {
    const contributions = await loadContributions();
    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error loading contributions:', error);
    return NextResponse.json([], { status: 500 });
  }
}