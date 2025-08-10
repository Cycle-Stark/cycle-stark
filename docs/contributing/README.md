# Contributing to CycleStark

Thank you for your interest in contributing to CycleStark! This guide will help you get started with contributing to our decentralized cyclical funding platform.

## 🎯 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **🐛 Bug Reports**: Report bugs and issues
- **💡 Feature Requests**: Suggest new features
- **📝 Documentation**: Improve documentation
- **🔧 Code Contributions**: Submit code changes
- **🧪 Testing**: Help with testing and quality assurance
- **🌐 Translations**: Help translate the platform
- **📢 Community**: Help grow the community

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

1. **Development Environment**
   - Node.js (v18+)
   - Rust (latest stable)
   - Cairo toolchain
   - Git

2. **Knowledge**
   - Basic understanding of React/TypeScript
   - Familiarity with Cairo smart contracts
   - Understanding of Starknet ecosystem

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub
   # Then clone your fork
   git clone https://github.com/your-username/cycle-stark.git
   cd cycle-stark
   ```

2. **Install Dependencies**
   ```bash
   # Frontend dependencies
   cd frontend && npm install
   
   # Contract dependencies
   cd ../contract && scarb build
   ```

3. **Set Up Environment**
   ```bash
   # Copy environment file
   cd ../frontend
   cp .env.example .env.local
   
   # Edit with your configuration
   nano .env.local
   ```

4. **Start Development**
   ```bash
   # Start frontend
   npm run dev
   
   # In another terminal, start blockchain (optional)
   cd ../madara-app-chain-template
   cargo build --release
   ./target/release/app-chain-node --dev
   ```

## 📋 Contribution Guidelines

### Code Standards

#### Smart Contracts (Cairo)

- **Style Guide**: Follow Cairo style conventions
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comprehensive comments for complex logic
- **Error Handling**: Implement proper error handling
- **Testing**: Write tests for all new functionality

```cairo
// Good example
fn calculate_cycle_amount(
    base_amount: u256,
    hero_count: u32
) -> u256 {
    // Calculate total cycle amount based on hero count
    // This ensures fair distribution among all heroes
    base_amount * hero_count.into()
}
```

#### Frontend (React/TypeScript)

- **TypeScript**: Use TypeScript for all new code
- **Components**: Follow React best practices
- **Styling**: Use Mantine components and theme
- **State Management**: Use React Context appropriately
- **Testing**: Write unit tests for components

```typescript
// Good example
interface CollectiveProps {
  collective: Collective;
  onJoin: (id: string) => void;
}

const Collective: React.FC<CollectiveProps> = ({ 
  collective, 
  onJoin 
}) => {
  const handleJoin = () => {
    onJoin(collective.id);
  };

  return (
    <Card>
      <Title>{collective.name}</Title>
      <Button onClick={handleJoin}>Join Collective</Button>
    </Card>
  );
};
```

### Git Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following standards
   - Add tests for new functionality
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
type(scope): description

feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

Examples:
- `feat(contracts): add collective creation function`
- `fix(frontend): resolve wallet connection issue`
- `docs(readme): update installation instructions`
- `test(contracts): add tests for cycle management`

## 🧪 Testing

### Smart Contract Testing

```bash
cd contract

# Run all tests
scarb test

# Run specific test
scarb test test_function_name

# Run with coverage
scarb test --coverage
```

### Frontend Testing

```bash
cd frontend

# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Testing Guidelines

- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Coverage**: Aim for >80% test coverage

## 📝 Documentation

### Documentation Standards

- **Clear and Concise**: Write clear, easy-to-understand documentation
- **Examples**: Include code examples where appropriate
- **Structure**: Follow consistent documentation structure
- **Updates**: Keep documentation up-to-date with code changes

### Documentation Types

1. **Code Documentation**
   - Function comments
   - Class documentation
   - API documentation

2. **User Documentation**
   - User guides
   - Tutorials
   - FAQ

3. **Developer Documentation**
   - Architecture docs
   - Setup guides
   - API references

## 🔍 Review Process

### Pull Request Process

1. **Create PR**: Create a pull request with clear description
2. **Automated Checks**: Ensure all CI checks pass
3. **Code Review**: Address reviewer feedback
4. **Approval**: Get approval from maintainers
5. **Merge**: Merge after approval

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or documented)
- [ ] Security considerations addressed
- [ ] Performance impact considered

## 🐛 Bug Reports

### Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, wallet, etc.
6. **Screenshots**: Visual evidence if applicable

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Wallet: [e.g., ArgentX, Braavos]
- Network: [e.g., Testnet, Mainnet]

## Additional Information
Any other relevant information
```

## 💡 Feature Requests

### Suggesting Features

When suggesting features, please include:

1. **Problem**: What problem does this solve?
2. **Solution**: How should it work?
3. **Benefits**: What are the benefits?
4. **Implementation**: Any implementation ideas?
5. **Priority**: How important is this feature?

### Feature Request Template

```markdown
## Problem
Describe the problem this feature would solve

## Proposed Solution
Describe how this feature should work

## Benefits
What are the benefits of this feature?

## Implementation Ideas
Any thoughts on how to implement this?

## Priority
High/Medium/Low priority
```

## 🌐 Community Contributions

### Community Guidelines

- **Respect**: Treat all community members with respect
- **Inclusive**: Welcome contributors from all backgrounds
- **Helpful**: Be helpful and supportive to new contributors
- **Constructive**: Provide constructive feedback

### Ways to Help

1. **Answer Questions**: Help answer questions in Discord/GitHub
2. **Review Code**: Review pull requests and provide feedback
3. **Test**: Test new features and report issues
4. **Document**: Help improve documentation
5. **Promote**: Help spread the word about CycleStark

## 🏆 Recognition

### Contributor Recognition

We recognize contributors in several ways:

1. **Contributors List**: All contributors listed in README
2. **Special Thanks**: Special recognition for significant contributions
3. **Badges**: Contributor badges and recognition
4. **Community**: Recognition in community channels

### Contribution Levels

- **Bronze**: 1-5 contributions
- **Silver**: 6-15 contributions
- **Gold**: 16+ contributions
- **Platinum**: Major contributions and leadership

## 📚 Resources

### Learning Resources

- **[Cairo Book](https://book.cairo-lang.org/)**: Learn Cairo programming
- **[Starknet Book](https://book.starknet.io/)**: Starknet development
- **[React Documentation](https://react.dev/)**: React development
- **[Mantine Documentation](https://mantine.dev/)**: UI components

### Development Tools

- **[Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/)**: Testing framework
- **[Scarb](https://docs.swmansion.com/scarb/)**: Cairo package manager
- **[Madara](https://docs.madara.wtf/)**: Local blockchain
- **[StarknetKit](https://github.com/hashgraph/starknetkit)**: Wallet integration

## 🤝 Getting Help

### Support Channels

- **Discord**: [Join our community](https://discord.gg/cycle-stark)
- **GitHub Issues**: [Report issues](https://github.com/your-org/cycle-stark/issues)
- **Documentation**: [Read the docs](../README.md)
- **Email**: [Contact us](mailto:contact@cycle-stark.com)

### Mentorship

- **New Contributors**: We provide mentorship for new contributors
- **Code Reviews**: Detailed feedback on pull requests
- **Pair Programming**: Collaborative development sessions
- **Office Hours**: Regular Q&A sessions

## 📈 Roadmap

### Current Priorities

1. **Smart Contract Security**: Enhanced security audits
2. **Frontend Performance**: Performance optimizations
3. **Testing Coverage**: Improved test coverage
4. **Documentation**: Comprehensive documentation
5. **Community**: Growing the contributor community

### Future Goals

1. **Mobile App**: Native mobile application
2. **Advanced Analytics**: Enhanced analytics and reporting
3. **Cross-Chain**: Multi-chain support
4. **AI Integration**: Smart recommendations
5. **Governance**: DAO governance system

---

**Ready to contribute?** Start by reading the [Getting Started](../getting-started/README.md) guide and join our [Discord community](https://discord.gg/cycle-stark) to connect with other contributors!

Thank you for helping make CycleStark better! 🚀 