# Data Directory Guide

## Adding Work Experience

Edit `workData.ts` and add to the top of the array:

```typescript
{
  company: 'Company Name',
  role: 'Your Job Title',
  year: '2025',
  location: 'City, State',
  description: 'What you did and achieved.',
  tech: ['React', 'Node.js', 'Python'],
  icon: 'https://example.com/logo.png'
}
```

## Adding Projects

Edit `projectData.ts` and add to the top of the array:

```typescript
{
  company: 'Project Name',
  role: 'Personal Project',
  year: '2025',
  location: 'Personal',
  description: 'What the project does.',
  tech: ['React', 'Firebase', 'TypeScript'],
  icon: 'https://example.com/image.png'
}
```

## Rules

- **New items go at the top** (they show first)
- **Icons**: Use 40x40px images
- **Tech**: List 3-8 main technologies
- **Description**: 1-2 sentences max
- **Year**: Use format like "2025" or "2024-2025"

## For images without a logo
Use Unsplash: `https://images.unsplash.com/photo-{id}?w=40&h=40&fit=crop`