# Developer Guide

Welcome to the CycleStark Developer Guide! This comprehensive guide will help you understand the codebase, contribute to the project, and build upon the platform.

## 📚 Guide Sections

### 🏗️ [Smart Contract Development](./smart-contracts.md)
Learn about Cairo smart contract development:
- Contract architecture and design patterns
- Development environment setup
- Testing strategies and best practices
- Deployment and verification processes

### 🎨 [Frontend Development](./frontend.md)
Understand React frontend development:
- Component architecture and patterns
- State management and data flow
- UI/UX development with Mantine
- Integration with Starknet

### 🧪 [Testing](./testing.md)
Master testing methodologies:
- Unit testing for smart contracts
- Integration testing strategies
- Frontend testing with React Testing Library
- End-to-end testing approaches

### 🚀 [Deployment](./deployment.md)
Learn deployment processes:
- Contract deployment to different networks
- Frontend deployment and CI/CD
- Environment configuration
- Production deployment best practices

## 🎯 Project Overview

### Technology Stack

#### Smart Contracts
- **Language**: Cairo 2.0
- **Framework**: Starknet
- **Package Manager**: Scarb
- **Testing**: Starknet Foundry

#### Frontend
- **Framework**: React 18 + TypeScript
- **UI Library**: Mantine 7
- **Wallet Integration**: StarknetKit
- **Build Tool**: Vite

#### Infrastructure
- **Blockchain**: Madara App Chain
- **Language**: Rust
- **Development**: Local blockchain environment

### Project Structure

```
cycle-stark/
├── contract/                 # Smart contracts
│   ├── src/
│   │   ├── cyclestark.cairo  # Main contract
│   │   ├── interfaces.cairo  # Contract interfaces
│   │   ├── utils.cairo       # Utility functions
│   │   └── erc20.cairo       # ERC20 integration
│   ├── tests/                # Contract tests
│   └── Scarb.toml           # Cairo configuration
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── providers/       # Context providers
│   │   └── configs/         # Configuration files
│   ├── public/              # Static assets
│   └── package.json         # Node.js dependencies
└── madara-app-chain-template/ # Blockchain infrastructure
    ├── crates/              # Rust crates
    ├── configs/             # Chain configuration
    └── Cargo.toml           # Rust dependencies
```

## 🚀 Getting Started

### Prerequisites

1. **Development Environment**
   ```bash
   # Node.js (v18+)
   node --version
   
   # Rust (latest stable)
   rustc --version
   
   # Cairo toolchain
   scarb --version
   ```

2. **Development Tools**
   - Git
   - VS Code (recommended)
   - Starknet Foundry
   - Madara node

### Quick Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-org/cycle-stark.git
   cd cycle-stark
   ```

2. **Install Dependencies**
   ```bash
   # Frontend dependencies
   cd frontend && npm install
   
   # Contract dependencies
   cd ../contract && scarb build
   ```

3. **Start Development Environment**
   ```bash
   # Start Madara node
   cd ../madara-app-chain-template
   cargo build --release
   ./target/release/app-chain-node --dev
   
   # Start frontend (in new terminal)
   cd ../frontend && npm run dev
   ```

## 🔧 Development Workflow

### Smart Contract Development

1. **Local Development**
   ```bash
   cd contract
   scarb build
   scarb test
   ```

2. **Testing**
   ```bash
   # Run all tests
   scarb test
   
   # Run specific test
   scarb test test_name
   ```

3. **Deployment**
   ```bash
   # Deploy to local network
   scarb deploy
   
   # Deploy to testnet
   scarb deploy --network testnet
   ```

### Frontend Development

1. **Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Building**
   ```bash
   npm run build
   npm run preview
   ```

3. **Testing**
   ```bash
   npm run test
   npm run test:coverage
   ```

## 📋 Contribution Guidelines

### Code Standards

#### Smart Contracts (Cairo)
- Follow Cairo style guide
- Use meaningful variable names
- Add comprehensive comments
- Implement proper error handling
- Write extensive tests

#### Frontend (React/TypeScript)
- Follow React best practices
- Use TypeScript for type safety
- Follow component naming conventions
- Implement proper error boundaries
- Write unit tests for components

### Git Workflow

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone
   git clone https://github.com/your-username/cycle-stark.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write code following standards
   - Add tests for new functionality
   - Update documentation

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### Commit Message Convention

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

## 🧪 Testing Strategy

### Smart Contract Testing

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test contract interactions
- **Fuzz Tests**: Test with random inputs
- **Invariant Tests**: Test system properties

### Frontend Testing

- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test user workflows
- **Visual Tests**: Test UI consistency

### Testing Tools

- **Starknet Foundry**: Smart contract testing
- **React Testing Library**: Frontend testing
- **Playwright**: E2E testing
- **Storybook**: Component testing

## 🔐 Security Considerations

### Smart Contract Security

1. **Access Control**
   - Implement proper access modifiers
   - Use role-based permissions
   - Validate function parameters

2. **Reentrancy Protection**
   - Use reentrancy guards
   - Follow checks-effects-interactions pattern
   - Validate external calls

3. **Input Validation**
   - Validate all user inputs
   - Check for overflow/underflow
   - Sanitize data

### Frontend Security

1. **Wallet Integration**
   - Secure wallet connection
   - Validate transaction data
   - Handle connection errors

2. **Data Validation**
   - Client-side validation
   - Server-side validation
   - Input sanitization

## 📊 Performance Optimization

### Smart Contract Optimization

- **Gas Efficiency**: Optimize for gas usage
- **Storage Optimization**: Minimize storage costs
- **Batch Operations**: Combine multiple operations
- **Event Optimization**: Minimize event data

### Frontend Optimization

- **Bundle Size**: Minimize JavaScript bundle
- **Lazy Loading**: Load components on demand
- **Caching**: Implement proper caching strategies
- **Code Splitting**: Split code into chunks

## 🚀 Deployment

### Smart Contract Deployment

1. **Local Deployment**
   ```bash
   cd contract
   scarb deploy --network local
   ```

2. **Testnet Deployment**
   ```bash
   scarb deploy --network testnet
   ```

3. **Mainnet Deployment**
   ```bash
   scarb deploy --network mainnet
   ```

### Frontend Deployment

1. **Build Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Environment Configuration**
   - Set environment variables
   - Configure domain
   - Set up monitoring

## 🔍 Debugging

### Smart Contract Debugging

- **Logs**: Use Cairo's print statements
- **Events**: Emit events for debugging
- **Testing**: Write comprehensive tests
- **Tools**: Use Starknet Foundry tools

### Frontend Debugging

- **Console**: Use browser developer tools
- **React DevTools**: Debug React components
- **Network**: Monitor network requests
- **State**: Debug state management

## 📚 Learning Resources

### Cairo Development
- [Cairo Book](https://book.cairo-lang.org/)
- [Starknet Book](https://book.starknet.io/)
- [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/)

### React Development
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mantine Documentation](https://mantine.dev/)

### Starknet Development
- [Starknet Documentation](https://docs.starknet.io/)
- [StarknetKit](https://github.com/hashgraph/starknetkit)
- [Madara Documentation](https://docs.madara.wtf/)

## 🤝 Community

### Getting Help
- **Discord**: Join our developer community
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and tutorials
- **Code Reviews**: Get feedback on your contributions

### Contributing Areas
- **Smart Contracts**: Cairo contract development
- **Frontend**: React/TypeScript development
- **Testing**: Test development and automation
- **Documentation**: Documentation improvements
- **Infrastructure**: DevOps and deployment

## 📈 Roadmap

### Short Term
- Enhanced testing coverage
- Performance optimizations
- Security audits
- Documentation improvements

### Long Term
- Mobile application
- Advanced analytics
- Cross-chain integration
- AI-powered features

---

**Ready to contribute?** Start by reading the specific guides above and join our [Discord community](https://discord.gg/cycle-stark) to connect with other developers! 