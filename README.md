# Summit Creative Studio

A polished, responsive one-page website for **Summit Creative Studio** — an independent creative studio focused on brand strategy, visual identity, and digital experiences.

The project began as a simple HTML/CSS landing page and has been rebuilt with a clearer visual system, semantic markup, responsive navigation, accessible interactions, and a stronger studio narrative.

## Preview

The page is structured as a modern creative-studio landing experience with:

- A cinematic hero section with a focused call to action.
- A concise studio statement that establishes the brand point of view.
- Service cards for brand strategy, visual identity, and digital experiences.
- A selected-work grid with responsive image treatments and hover states.
- Three linked case-study pages for Northstar, Meridian, and Field Notes.
- A Journal section on the home page, a dedicated journal archive, and three long-form articles.
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
├── projects/
│   ├── northstar.html
│   ├── meridian.html
│   └── field-notes.html
├── journal/
│   ├── index.html
│   ├── clarity-is-a-design-decision.html
│   ├── systems-that-leave-room.html
│   └── the-case-for-a-point-of-view.html
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

To adapt the site for a real studio or portfolio, update the content in `index.html`, replace the images inside `image/`, and adjust the design tokens at the top of `styles/style.css`. Each project card now links to a standalone case-study page inside `projects/`. Those pages share the global design system and include a challenge, approach, outcome, and next-project navigation pattern. Duplicate one of the existing case-study files when adding a new project, then update its metadata, copy, imagery, and links.

The Journal lives in `journal/`. Its archive page is `journal/index.html`, while each article uses the same reading-page structure, including metadata, a feature image, long-form content, and a next-article link. Duplicate an existing article page to publish a new note, then update its title, description, date, reading time, content, imagery, and archive link.

## Contact form

The contact form in `index.html` uses [FormSubmit](https://formsubmit.co/) because GitHub Pages serves static files and does not provide a private server endpoint for sending email. The form uses FormSubmit’s AJAX endpoint through `scripts/contact.js`, while the HTML `action` remains available as a progressive-enhancement fallback.

The first submission to the configured recipient may require a one-time confirmation from FormSubmit. After that confirmation, future enquiries will arrive at `mahmoudAlmoudalal@gmail.com`. The form includes browser-native required-field and email validation, a message minimum length, a hidden honeypot field, loading feedback, success feedback, an error fallback, and a direct `mailto:` alternative.

## Journal comments

Each Journal article includes an interactive comments area powered by `scripts/comments.js`. Visitors can add a name and comment, see the comment count update, remove comments from the same browser, and receive clear success or error feedback. Because the site is deployed on GitHub Pages without a database or server, comments are stored in the visitor’s local browser using `localStorage`; they are not shared between visitors or devices. A hosted database or comments provider can be connected later if public cross-device discussion is required.

## License

This project is released under the license included in the repository.
