# React + TypeScript + Vite

Honestly, no. It's a chatbot — it sends messages and receives replies. A true agent would have tools (search the web, look up grammar rules, execute actions), maintain context across sessions, and take initiative. What you have is a well-prompted Claude chat window embedded in the app, which is useful but not really an "agent" in the technical sense.

A few concrete options, roughly in order of complexity:

Tool use — give Claude tools it can call: look up a word in a dictionary API, fetch conjugation tables, check grammar rules. The Lambda would need to handle tool calls and return results back to Claude before responding.

Persistent memory — store conversation history (e.g., in DynamoDB) so it remembers what the user has studied, what mistakes they've made, and can refer back across sessions.

Proactive behavior — instead of just answering questions, it tracks what the user is studying (current unit) and surfaces relevant tips, quizzes them, or flags gaps without being asked.

The most impactful near-term upgrade would be tool use + unit awareness — pass the current unit/page as context so it can give answers grounded in exactly what you're looking at. That requires only a small Lambda change and a small frontend change.

**Want to start there?**

# Login
[Amplify](https://us-east-2.signin.aws.amazon.com/oauth?response_type=code&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&redirect_uri=https%3A%2F%2Fus-east-2.console.aws.amazon.com%2Fconsole%2Fhome%3Fca-oauth-flow-id%3D883d%26hashArgs%3D%2523%26isauthcode%3Dtrue%26region%3Dus-east-2%26state%3DhashArgsFromTB_us-east-2_61ac8f8f8ef6b417&forceMobileLayout=0&forceMobileApp=0&code_challenge=vZ-3B9gfgj-kfmsGVwL7Eg0ypc7pWsZJS7c68VXsJGo&code_challenge_method=SHA-256): 
'Sign in using root user email' > Root user > email > password > continue.
* Make sure region is: us-east-1 (switch to us-east-1 in the AWS Console (top-right region dropdown).
* Lambda: https://r45rvnktkxozmxltletq73zmg40fpoju.lambda-url.us-east-1.on.aws/).

## AI Agent

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
api key: log into https://platform.claude.com/login?returnTo=%2F%3F
Key name: understandingfrench 
Workspace: default.
Github: https://github.com/epeterssen/lang-en-fr

Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

---

## Architecture

### Hosting & Backend
- **Frontend**: Deployed on AWS Amplify (auto-deploys from GitHub `main`)
- **AI Backend**: AWS Lambda function (function URL) — holds the Anthropic API key server-side
- **API Key**: Stored in Lambda environment variables (never in the frontend bundle)
- **Frontend → Lambda**: `VITE_CHAT_API_URL` in `.env` / `.env.production`

### Frontend Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Phosphor Icons v2 (`Icon` suffix naming)
- Zustand (settings store)
- React Router v6

---

## Component Map

- `App.tsx` — router, top-level layout
  - `Layout.tsx` — shell with sticky header and drawer trigger
    - `FlagBanner.tsx` — French flag accent bar
    - `HamburgerMenu.tsx` — settings toggles (background, copy-paste, rolodex)
    - `AIAgentDrawer.tsx` — slide-up AI chat drawer (connects to Lambda via `VITE_CHAT_API_URL`)
  - `pages/Home.tsx` — landing page
  - `pages/MainMenu.tsx` — 8-unit accordion menu
  - `pages/Unit1.tsx` — Foundations
  - `pages/Unit2.tsx` — Nouns and Articles
  - `pages/Unit3.tsx` — Pronouns
  - `pages/Unit4.tsx` — Present Tense Verbs
- `components/SectionCard.tsx` — shared card renderer (blue/red variant, badge color auto-matched)
- `components/ConjugationTable.tsx` — verb conjugation table with test/reveal mode and toggle
- `components/RolodexView.tsx` — card carousel (swipe/scroll/drag)
- `components/UnitHeader.tsx` — sticky unit title with key-entry badges
- `utils/txt.tsx` — `TXT.ttip()` hover tooltip utility (supports toggle/reverse)
- `types.ts` — shared `Section` and `ContentItem` interfaces
- `store/settings.ts` — Zustand store (showBackground, allowCopyPaste, rolodex)

---

## Configuration

### Updating the Lambda Function Code
The Lambda source is at `lambda/handler.mjs` in this repo. To deploy changes:
1. Open the Lambda function in the AWS Console (us-east-1)
2. Click the **Code** tab
3. Paste the contents of `lambda/handler.mjs` into the editor
4. Click **Deploy**

### Updating the Lambda URL
Edit `.env` and `.env.production`:
```
VITE_CHAT_API_URL=https://<your-lambda-url>.lambda-url.<region>.on.aws/
```

### Updating the Anthropic API Key
1. Log in to the AWS Console
2. Navigate to Lambda → your function
3. Go to Configuration → Environment variables
4. Update `ANTHROPIC_API_KEY`

### Rotating the Anthropic API Key
1. Log in to https://platform.claude.com
2. Workspace: Default — Key name: `understandingfrench`
3. Create a new key, update Lambda env var, then revoke the old key

### Deploying
Push to `main` on GitHub — Amplify auto-deploys.
Manual deploy available in the AWS Amplify Console.

