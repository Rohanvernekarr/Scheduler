# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Dark/light mode toggle
- Responsive design
- Anonymous message box with Upstash Redis storage
- Visitor count tracking
- Time spent tracker
- Background music player
- Social media links
- Modern UI with shadcn/ui components

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Upstash Redis
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Upstash Redis credentials:
```
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

4. Add your background music file:
- Place your background music file in the `public` directory
- Name it `background-music.mp3`

5. Update social links:
- Open `src/components/layout/Footer.tsx`
- Update the `socialLinks` array with your social media URLs

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── messages/
│   │   └── visitor-count/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── MessageBox.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── TimeSpent.tsx
│   │   └── VisitorCount.tsx
│   └── ui/
├── lib/
│   └── redis/
└── types/
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
