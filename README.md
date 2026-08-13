# Summit Creative Studio

A polished, responsive one-page website for **Summit Creative Studio** — an independent creative studio focused on brand strategy, visual identity, and digital experiences.

The project began as a simple HTML/CSS landing page and has been rebuilt with a clearer visual system, semantic markup, responsive navigation, accessible interactions, and a stronger studio narrative.

## Preview

The page is structured as a modern creative-studio landing experience with:

- A cinematic hero section with a focused call to action.
- A concise studio statement that establishes the brand point of view.
- Service cards for brand strategy, visual identity, and digital experiences.
- A selected-work grid with responsive image treatments and hover states.
- An about section that combines studio positioning with a visual story.
- A high-contrast contact section with direct email and social links.

## Built with

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic structure, navigation, content hierarchy, and accessibility attributes. |
| CSS3 | Responsive layout, design tokens, motion, hover states, and adaptive navigation. |
| Font Awesome | Interface icons and social icons. |
| Google Fonts | Space Grotesk for display typography and DM Sans for readable body copy. |

## Project structure

```text
.
├── index.html
├── image/
│   ├── landing.jpg
│   ├── logo.jpg
│   ├── main.png
│   └── photo1.png
├── styles/
│   ├── Normalize.css
│   ├── all.min.css
│   └── style.css
├── LICENSE
└── README.md
```

## Run locally

This is a static website, so no package manager or build step is required.

### Option 1: Open directly

Open `index.html` in a modern browser.

### Option 2: Use a local server

From the project directory, run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Design direction

The visual language uses a dark evergreen foundation, an electric lime accent, warm paper surfaces, and restrained editorial typography. The combination creates a studio identity that feels confident, modern, and connected to the existing mountain imagery without becoming visually generic.

The CSS includes a reduced-motion preference to keep non-essential transitions respectful for visitors who have enabled that accessibility setting.

## Customization

To adapt the page for a real studio or portfolio, update the content in `index.html`, replace the images inside `image/`, and adjust the design tokens at the top of `styles/style.css`. The navigation links currently point to sections on the same page, while portfolio cards use the contact section as a clear placeholder for future case-study pages.

## License

This project is released under the license included in the repository.
