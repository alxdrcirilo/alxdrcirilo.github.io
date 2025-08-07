# Personal blog

This is the source code for my personal blog, which is built using [Nuxt 4](https://nuxt.com) and hosted on GitHub Pages. The content is written in Markdown and handled by [Nuxt Content](https://content.nuxt.com).

Feel free to visit [alxdrcirilo.dev](https://alxdrcirilo.dev) to see the live version of the blog. I try to keep the content updated with my latest projects and thoughts on various topics 🌻

## Structure

The blog is structured as follows:

```yaml
.
├── CNAME                # Domain configuration for GitHub Pages
├── LICENSE              # Project license
├── README.md            # Project documentation
└── src                  # Main source code
    ├── app              # Nuxt app source
    │   ├── app.vue      # Main Vue app component
    │   ├── assets/      # Static assets (CSS, images)
    │   ├── components/  # Vue components
    │   ├── layouts/     # App layouts
    │   ├── pages/       # Route pages
    │   └── plugins/     # Nuxt plugins
    ├── content          # Blog posts in Markdown
    │   └── blog/
    ├── content.config.ts # Nuxt Content configuration
    ├── nuxt.config.ts   # Nuxt configuration
    ├── package.json     # Project dependencies and scripts
    └── public           # Static files served as-is
        └── images/      # Blog images
```

## Local development

I'm using [Bun](https://bun.sh) as my JavaScript runtime. To get started, you need to have Bun installed on your machine.

### Installation

After installing Bun, you can clone this repository and run the following commands:

```bash
bun install
bun run dev
```

This will install the dependencies, start the development server, and you can view the blog at `http://localhost:3000`.

### Formatting

To format the code, you can use the following command:

```bash
bun run format
```

Under the hood, this uses [Prettier](https://prettier.io) to ensure consistent code style across the project.

## Deployment

The blog is deployed using GitHub Actions. The deployment workflow is defined in `.github/workflows/deploy.yaml`. It builds the project and deploys it to the `gh-pages` branch, which is then served by GitHub Pages.
