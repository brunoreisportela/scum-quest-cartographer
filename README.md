# SCUM Quest Cartographer

An interactive quest tree visualizer for the SCUM survival game, featuring a beautiful tier-based quest progression system and comprehensive server information.

## 🎮 Features

- **Interactive Quest Tree**: Navigate through tier-based quest progression with visual dependencies
- **Quest Categories**: Organized by NPCs (Armorer, Doctor, Bartender, General Goods, etc.)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Quest Details Modal**: Detailed information about requirements, rewards, and quest types
- **Server Information**: Integrated server IP, Discord community, and server rules
- **Real Quest Data**: Loads actual SCUM quest data from JSON files
- **🌍 Multi-language Support**: Available in English and Portuguese (Brazilian) with automatic browser language detection
- **🇧🇷 Brazilian Flag Toggle**: Easy language switching with Brazilian flag icon

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd scum-quest-cartographer
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components
│   ├── CategorySelector.tsx
│   ├── QuestTreeVisualization.tsx
│   ├── QuestNode.tsx
│   ├── QuestModal.tsx
│   └── QuestDetails.tsx
├── data/               # Quest data and utilities
│   ├── questData.ts    # Main quest data export
│   └── processedQuests.json # Generated quest data
├── pages/              # Page components
│   ├── Index.tsx       # Main quest tree page
│   └── ServerRules.tsx # Server rules page
├── types/              # TypeScript type definitions
│   └── quest.ts        # Quest-related types
├── utils/              # Utility functions
│   ├── questLoader.ts  # Quest data transformation
│   └── questFileLoader.ts # Advanced quest loading
└── hooks/              # Custom React hooks
```

## 📊 Quest Data Management

### Processing Quest Files

The application includes a quest processing system that converts raw SCUM quest JSON files into a format optimized for the web interface.

#### Adding New Quests

1. **Add quest JSON files** to any folder in the `quests/` directory:
   ```
   quests/
   ├── Armory/                    # Automatically detected
   ├── Bartender/                 # Automatically detected
   ├── Doctor/                    # Automatically detected
   ├── General Goods/             # Automatically detected
   ├── Harbor/                    # Automatically detected
   ├── Mechanic Car Quests/       # Automatically detected
   ├── Your New Category/         # Any new folder works!
   └── Custom Quest Type/         # Flexible structure
   ```

2. **Run the quest processor** to update the application data:
   ```sh
   node scripts/processQuests.cjs
   ```

3. **Restart the development server** to see your changes:
   ```sh
   npm run dev
   ```

#### Quest Processing Script

The `scripts/processQuests.cjs` script automatically:
- **Discovers all folders** in the `quests/` directory
- **Categorizes quests** based on folder names (Armory, Doctor, Mechanic, etc.)
- **Transforms raw quest data** into frontend-friendly format
- **Extracts requirements, rewards, and quest metadata**
- **Groups similar quest types** under appropriate categories
- **Outputs processed data** to `src/data/processedQuests.json`

#### Automatic Categorization

The script intelligently categorizes quest folders:
- **Armory**: Folders containing "armory" or "armor"
- **Banking**: Folders containing "bank"
- **Hospitality**: Folders containing "bartender" or "bar"
- **Medical**: Folders containing "doctor" or "medical"
- **General Goods**: Folders containing "general" or "goods"
- **Harbor**: Folders containing "harbor" or "fishing"
- **Mechanic**: Folders containing "mechanic", "vehicle", or "car"
- **Custom**: Any other folder gets its own category with a ❓ icon

#### Quest File Format

The application expects SCUM quest JSON files with this structure:
```json
{
  "AssociatedNpc": "Armorer",
  "Tier": 1,
  "Title": "Quest Name",
  "Description": "Quest description",
  "TimeLimitHours": 24.0,
  "RewardPool": [...],
  "Conditions": [...]
}
```

### Customizing Quest Categories

Edit `scripts/processQuests.cjs` to modify quest categories:
- Add new NPC categories
- Change category icons and descriptions
- Adjust quest organization logic

## 🎨 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing
- **React i18next** - Internationalization framework
- **i18next-browser-languagedetector** - Automatic browser language detection

## 🌐 Deployment

### Static Hosting Configuration

The application includes configuration files for various hosting platforms to ensure direct URLs work correctly:

- **`public/_redirects`** - Netlify redirects (fallback)
- **`public/.htaccess`** - Apache server configuration
- **`vercel.json`** - Vercel hosting configuration
- **`netlify.toml`** - Comprehensive Netlify configuration

These files ensure that direct URLs like `https://yoursite.com/server-rules` work properly by redirecting all routes to `index.html` for client-side routing.

### DigitalOcean App Platform

1. **Push your code** to a GitHub repository
2. **Create a new app** on DigitalOcean App Platform
3. **Connect your repository** and configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Node Version**: 18+
4. **Deploy** and configure your custom domain

### Other Platforms

The application can be deployed to any static hosting service:
- **Vercel** - Uses `vercel.json` for routing
- **Netlify** - Uses `netlify.toml` and `_redirects` for routing
- **GitHub Pages** - Requires custom 404.html redirect
- **AWS S3 + CloudFront** - Requires custom error page configuration
- **Apache Servers** - Uses `.htaccess` for routing

## 🎯 Server Information

- **Server IP**: 70.53.182.54:7779
- **Discord**: https://discord.gg/7xY9s6HH7J
- **Ruleset**: Hardcore PvE

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🤝 Collaboration & Forking

If you fork this project or create improvements, **please let me know!** I'd love to:
- **Collaborate** on new features and enhancements
- **Reference your work** and give proper credit
- **Learn** from your improvements and potentially merge them back
- **Build a community** around SCUM quest tooling

Feel free to:
- Open an issue to discuss your ideas
- Submit pull requests with improvements
- Reach out via Discord or GitHub
- Share your fork so others can benefit

**When forking or building upon this project, please:**
- Reference this original repository in your README
- Consider contributing improvements back to the main project
- Let me know about your version so I can showcase community contributions

Together we can make the best SCUM quest tools for the community! 🎮

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built for the SCUM gaming community
- Developed by Bruno Portela
- Quest data sourced from SCUM game files
