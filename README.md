# Portfolio Project Documentation

## Critical Components

### 1. Work Section Thumbnails
The Work section MUST always display three case studies. These are essential for the portfolio showcase:
- Affinity Canvas
- Smart Home App
- Tax Credit Platform

**IMPORTANT:** Never remove or modify these default case studies as they serve as the foundation for the portfolio showcase.

### 2. Data Storage Structure

#### Case Studies
- Location: `src/data/caseStudies.ts`
- Contains default case studies that must be preserved
- User modifications are stored in localStorage and overlay the defaults
- The `defaultCaseStudies` object should never be modified

#### Projects (Work Section)
- Location: `src/data/projects.ts`
- Automatically generates project previews from case studies
- Always maintains the three main case studies in the Work section
- Uses `getProjects()` to ensure fresh data

### 3. Form Handling
- Location: `src/components/admin/CaseStudyForm.tsx`
- Handles all case study edits
- Saves changes to localStorage
- Never modifies the original default case studies

### 4. Image Handling
- Location: `src/lib/imageStorage.ts`
- Handles image uploads and storage
- Compresses images before storage
- Maintains a cache cleanup system

## Key Files and Their Purposes

### Data Layer
```typescript
src/data/
├── caseStudies.ts    # Core case study data - DO NOT MODIFY DEFAULTS
├── projects.ts       # Work section display logic
└── education.ts      # Education information
```

### Components
```typescript
src/components/
├── admin/
│   ├── CaseStudyForm.tsx     # Edit form for case studies
│   ├── CaseStudyPreview.tsx  # Live preview of edits
│   └── ImageUpload.tsx       # Image handling component
└── sections/
    └── Work.tsx              # Displays the three main case studies
```

### Storage Layer
```typescript
src/lib/
├── storage.ts       # localStorage management
└── imageStorage.ts  # Image compression and storage
```

## Development Guidelines

1. **Preserving Default Case Studies**
   - Never modify the `defaultCaseStudies` object
   - All user changes should be stored in localStorage
   - The three main case studies must always be available

2. **Image Handling**
   - Images are automatically compressed
   - Maximum file size: 2MB
   - Supported formats: JPEG, PNG, GIF, WebP
   - Images are stored in localStorage with cleanup

3. **Form Handling**
   - All form fields should have proper null checks
   - Use the `handleChange` function for updates
   - Always preserve the case study structure

4. **Work Section**
   - Must always show three case studies
   - Automatically updates when case studies change
   - Maintains consistent layout and design

## Common Issues and Solutions

1. **Missing Thumbnails**
   - Check `projects.ts` is using `getProjects()`
   - Verify default case studies are intact
   - Ensure Work component is updating properly

2. **Form Reset**
   - Use `resetToOriginal` function
   - Confirm with user before reset
   - Maintains default case study data

3. **Image Upload Issues**
   - Check file size (max 2MB)
   - Verify supported format
   - Ensure localStorage has space

## Testing Changes

Before making any changes:
1. Verify default case studies are preserved
2. Test form functionality
3. Check Work section displays correctly
4. Verify image uploads work
5. Test storage and retrieval

## Deployment

The project uses localStorage for data persistence. Ensure all required data is properly saved before deployment.