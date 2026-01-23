# <a href="https://modrinth-embeds.creeperkatze.de"><img src=".github/assets/logo.png" alt="Logo" width="600"></a>

Generate beautiful, customizable and fast embeddable cards and badges for Modrinth projects, users, organizations, and collections.

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/2d89t.svg)](https://status.creeperkatze.de)
![GitHub Issues](https://img.shields.io/github/issues/creeperkatze/modrinth-embeds?labelColor=0d143c)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/creeperkatze/modrinth-embeds?labelColor=0d143c)
![GitHub Repo stars](https://img.shields.io/github/stars/creeperkatze/modrinth-embeds?style=flat&labelColor=0d143c)

## Quick Start

Use the **[Website](modrinth-embeds.creeperkatze.de)** to visually configure and preview your embeds.

Examples:

[![Prospector](https://modrinth-embeds.creeperkatze.de/user/prospector)](https://modrinth.com/user/prospector)
[![Mod Menu](https://modrinth-embeds.creeperkatze.de/project/modmenu)](https://modrinth.com/project/modmenu)
[![CaffeineMC](https://modrinth-embeds.creeperkatze.de/organization/caffeinemc)](https://modrinth.com/organization/caffeinemc)
[![Featured - Vol. 38](https://modrinth-embeds.creeperkatze.de/collection/VEgGDFFE)](https://modrinth.com/collection/VEgGDFFE)

## Endpoints

Base URL: `https://modrinth-embeds.creeperkatze.de`

### Cards

Pattern: `/<type>/<slug-or-id>`

Rich cards showing stats, versions, projects, and activity sparklines.

| Type | Pattern |
|------|---------|
| Project | `/project/{slug}` |
| User | `/user/{username}` |
| Organization | `/organization/{id}` |
| Collection | `/collection/{id}` |

```
https://modrinth-embeds.creeperkatze.de/project/modmenu
https://modrinth-embeds.creeperkatze.de/user/prospector
https://modrinth-embeds.creeperkatze.de/organization/caffeinemc
```

#### Card Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `color` | Accent color (hex) | `#1bd96a` |
| `backgroundColor` | Background color (hex) | `transparent` |
| `showProjects` | Show top projects section | `true` |
| `showVersions` | Show versions section | `true` |
| `maxProjects` | Max projects to display (1-50) | `5` |
| `maxVersions` | Max versions to display (1-50) | `5` |
| `relativeTime` | Show relative time for dates | `true` |
| `showSparklines` | Display activity sparklines | `true` |

### Badges

Pattern: `/<type>/<slug-or-id>/<metric>`

Compact badges showing a single metric.

| Type | Available Metrics |
|------|-------------------|
| Project | `downloads`, `followers`, `versions` |
| User | `downloads`, `projects`, `followers` |
| Organization | `downloads`, `projects`, `followers` |
| Collection | `downloads`, `projects`, `followers` |

| Badge Type | Example |
|------------|---------|
| Downloads | ![Downloads](https://modrinth-embeds.creeperkatze.de/project/modmenu/downloads) |
| Followers | ![Followers](https://modrinth-embeds.creeperkatze.de/project/modmenu/followers) |
| Versions | ![Versions](https://modrinth-embeds.creeperkatze.de/project/modmenu/versions) |

#### Badge Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `color` | Accent color (hex) | `#1bd96a` |
| `backgroundColor` | Background color (hex) | `transparent` |
| `format` | Output format (`svg` / `png`) | `svg` |

## Development

### Prequisites

- Node.js
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/modrinth-embeds.git
cd modrinth-embeds

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Variables

Copy the `.env.example` file and rename it to `.env`.

## Contributing

Contributions are always welcome!

Please ensure you run pnpm lint before opening a pull request.

## License

AGPL-3.0
