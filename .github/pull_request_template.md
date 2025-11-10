# Pull Request

## 📋 Description

### What does this PR do?
<!-- Provide a brief summary of the changes -->

### Why is this change needed?
<!-- Explain the motivation or link to an issue -->

### How was this implemented?
<!-- Brief technical overview of your approach -->

---

## 🎫 Implemented Ticket

<!-- Link to the ticket/issue this PR implements -->
**Ticket:** #[ticket-number] - [Brief ticket title]

---

## 📁 Files Changed

### New Files
<!-- List any new files created -->
- [ ] Components: 
- [ ] Types: 
- [ ] Services: 
- [ ] Utils/Lib: 
- [ ] Tests: 

### Modified Files
<!-- List key files modified -->
- [ ] Components: 
- [ ] API Routes: 
- [ ] Pages: 
- [ ] Other: 

---

## ✅ Checklist

### Code Quality
- [ ] All new code is written in **TypeScript**
- [ ] Components follow **PascalCase** naming convention
- [ ] Functions/variables use **descriptive names**
- [ ] Code follows **DRY principles** (no duplicated logic)
- [ ] Components are **small and focused** (single responsibility)

### Architecture & Structure
- [ ] Types are placed in `types/` folder with descriptive filenames
- [ ] Utilities are placed in `lib/` folder
- [ ] No barrel files used (direct imports only)
- [ ] Feature-based organization maintained
- [ ] Proper separation of UI, logic, and data fetching

### React/Next.js Best Practices
- [ ] Uses **functional components** with hooks
- [ ] Server Components used where appropriate
- [ ] App Router patterns followed
- [ ] Proper `key` props for lists (not array index)
- [ ] Uses `next/image` for images
- [ ] Uses `next/font` for fonts if applicable

### TypeScript
- [ ] No `any` types used (unless explicitly justified)
- [ ] Props properly typed with interfaces
- [ ] API responses have type definitions
- [ ] Event handlers properly typed

### Security
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables referenced properly (`process.env.VAR_NAME`)
- [ ] Input validation implemented (using Zod)
- [ ] No sensitive data in logs or client-side storage

### Testing
- [ ] Unit tests added for new functionality
- [ ] Tests follow AAA pattern (Arrange-Act-Assert)
- [ ] Mock data placed in `src/__mock__` directory
- [ ] Tests are isolated and independent

### Performance
- [ ] Code splitting used where beneficial (`React.lazy`, `next/dynamic`)
- [ ] Parallel data fetching implemented where applicable
- [ ] Images optimized with `next/image`

---

## 🧪 Testing

### Test Coverage
- [ ] Unit tests written
- [ ] Integration tests written (if applicable)
- [ ] All tests passing locally
- [ ] No existing tests broken

### Manual Testing
- [ ] Tested in development environment
- [ ] Tested edge cases and error scenarios
- [ ] Responsive design verified (if UI changes)
- [ ] Accessibility considerations addressed

---

## 📸 Screenshots/Videos (if applicable)

### Before
<!-- Add screenshots of the current state -->

### After
<!-- Add screenshots of the changes -->

---

## Reviewer Checklist (for reviewers)
This section will be used by code reviewers:

### Code Review
- [ ] Code follows all project guidelines
- [ ] TypeScript usage is appropriate
- [ ] Security best practices followed
- [ ] Performance considerations addressed
- [ ] Tests are comprehensive and passing
- [ ] Documentation updated if needed

### Ticket Validation
- [ ] All ticket requirements are implemented
- [ ] Acceptance criteria are met
- [ ] Implementation matches ticket specifications
- [ ] No scope creep beyond ticket requirements

### Final Review
- [ ] All conversations resolved
- [ ] CI/CD checks passing
- [ ] Ready for merge
