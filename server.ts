import express from 'express';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Allow CORS from Vite dev server (port 3000)
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const TEAM_FILE = path.join(__dirname, 'src', 'data', 'team.ts');
const CONTACT_FILE = path.join(__dirname, 'src', 'data', 'contact.ts');
const REPO_ROOT = __dirname;

/**
 * POST /api/commit-team
 * Body: { team: TeamCategory[], commitMessage?: string }
 *
 * Writes admin-updated team data to src/data/team.ts and commits to Git.
 * NOTE: Contact info is intentionally NOT committed to Git — it lives in
 *       localStorage only and is NOT sent to this endpoint.
 */
app.post('/api/commit-team', (req, res) => {
  const { team, commitMessage } = req.body as {
    team: any[];
    commitMessage?: string;
  };

  if (!team || !Array.isArray(team)) {
    return res.status(400).json({ success: false, error: 'Invalid team payload' });
  }

  try {
    // Strip runtime-generated `id` fields to keep the file clean
    const cleanTeam = team.map((group) => {
      if (group.members) {
        return {
          ...group,
          members: group.members.map(({ id: _id, ...rest }: any) => rest),
        };
      }
      // Faculty advisor (no members array) — strip id too
      const { id: _id, ...rest } = group;
      return rest;
    });

    const fileContent = `export const teamMembers = ${JSON.stringify(cleanTeam, null, 2)};\n`;
    writeFileSync(TEAM_FILE, fileContent, 'utf8');

    const msg = commitMessage || 'admin: update team data [auto]';
    execSync(`git -C "${REPO_ROOT}" add src/data/team.ts`, { stdio: 'pipe' });
    execSync(`git -C "${REPO_ROOT}" commit -m "${msg}"`, { stdio: 'pipe' });

    return res.json({ success: true, message: 'Team data saved & committed to Git!' });
  } catch (err: any) {
    // If nothing changed git commit returns exit code 1 — treat as success
    if (err.message?.includes('nothing to commit')) {
      return res.json({ success: true, message: 'No changes detected — team data is already up to date.' });
    }
    console.error('[CMS Server] Commit error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/commit-contact
 * Body: { contact: ContactInfo, commitMessage?: string }
 *
 * Writes admin-updated contact info to src/data/contact.ts and commits to Git.
 */
app.post('/api/commit-contact', (req, res) => {
  const { contact, commitMessage } = req.body as {
    contact: any;
    commitMessage?: string;
  };

  if (!contact || typeof contact !== 'object') {
    return res.status(400).json({ success: false, error: 'Invalid contact payload' });
  }

  try {
    const fileContent =
      `import type { ContactInfo } from '../context/CMSContext';\n\n` +
      `export const defaultContact: ContactInfo = ${JSON.stringify(contact, null, 2)};\n`;
    writeFileSync(CONTACT_FILE, fileContent, 'utf8');

    const msg = commitMessage || 'admin: update contact info [auto]';
    execSync(`git -C "${REPO_ROOT}" add src/data/contact.ts`, { stdio: 'pipe' });
    execSync(`git -C "${REPO_ROOT}" commit -m "${msg}"`, { stdio: 'pipe' });

    return res.json({ success: true, message: 'Contact info saved & committed to Git!' });
  } catch (err: any) {
    if (err.message?.includes('nothing to commit')) {
      return res.json({ success: true, message: 'No changes detected — contact info is already up to date.' });
    }
    console.error('[CMS Server] Commit error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n  📡 Endeavour CMS API → http://localhost:${PORT}\n`);
  console.log('  Team saves    → commits to Git ✓');
  console.log('  Contact saves → commits to Git ✓\n');
});
