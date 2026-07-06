# Contributing to MEAN Blog Platform

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests locally
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the DEPLOYMENT.md if you change deployment process
3. Ensure all tests pass locally
4. Link any related issues in your PR description
5. Request review from maintainers

## Code Style

### Backend (Node.js/Express)
- Use `const` for variables
- Use arrow functions where appropriate
- Use async/await instead of callbacks
- Follow ES6+ conventions
- Use meaningful variable names
- Add JSDoc comments for functions

```javascript
/**
 * Get user by ID
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} User object
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`User not found: ${error.message}`);
  }
};
```

### Frontend (Angular/TypeScript)
- Use TypeScript interfaces for all data
- Use OnPush change detection
- Lazy load routes
- Use RxJS operators properly
- Follow Angular style guide
- Use strong typing

```typescript
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  @Input() post!: BlogPost;
}
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style (formatting, missing semicolons, etc)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Build process, dependencies

### Examples
```
feat(auth): add JWT token refresh
fix(posts): prevent duplicate post creation
docs: update installation instructions
refactor(api): simplify error handling
test(auth): add login validation tests
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
ng test
```

Ensure all tests pass before submitting a PR.

## Reporting Bugs

Use the GitHub issue tracker to report bugs. Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, etc)

## Feature Requests

Use the GitHub issue tracker for feature requests. Include:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any related issues

## Questions?

- Open an issue with label `question`
- Check existing documentation in README.md
- Review deployment guide in DEPLOYMENT.md

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive.

### Our Standards

Examples of behavior that contributes to a positive environment:
- Using welcoming and inclusive language
- Being respectful of differing opinions and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior:
- Harassment or discrimination
- Insulting or derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information

---

Thank you for contributing to MEAN Blog Platform! 🎉
