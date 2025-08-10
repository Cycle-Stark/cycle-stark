# Installation Guide

This guide will walk you through installing and setting up CycleStark for both users and developers.

## 🎯 For Users

### Prerequisites

1. **Starknet Wallet**: Install one of the following wallets:
   - [ArgentX](https://www.argent.xyz/argent-x/) (Recommended)
   - [Braavos](https://braavos.app/)
   - [OKX Wallet](https://www.okx.com/web3)

2. **Testnet Tokens**: Get testnet tokens for testing:
   - [Starknet Faucet](https://faucet.goerli.starknet.io/)
   - [ArgentX Faucet](https://www.argent.xyz/argent-x/)

### Installation Steps

1. **Access the Application**
   ```bash
   # Visit the live application
   https://cycle-stark.vercel.app
   ```

2. **Connect Your Wallet**
   - Click "Connect Wallet" in the top navigation
   - Select your preferred wallet
   - Approve the connection

3. **Switch to Testnet**
   - Ensure your wallet is connected to Starknet Testnet
   - The application will automatically detect the network

## 👨‍💻 For Developers

### Prerequisites

1. **Node.js** (v18 or higher)
   ```bash
   # Check your Node.js version
   node --version
   
   # Install Node.js if needed
   # Visit: https://nodejs.org/
   ```

2. **Rust** (latest stable)
   ```bash
   # Install Rust
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # Reload your shell
   source ~/.bashrc
   
   # Verify installation
   rustc --version
   ```

3. **Cairo Toolchain**
   ```bash
   # Install Scarb (Cairo package manager)
   curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
   
   # Verify installation
   scarb --version
   ```

4. **Git**
   ```bash
   # Install Git (if not already installed)
   # Ubuntu/Debian
   sudo apt-get install git
   
   # macOS
   brew install git
   
   # Windows
   # Download from: https://git-scm.com/
   ```

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/cycle-stark.git
   cd cycle-stark
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. **Install Contract Dependencies**
   ```bash
   cd ../contract
   scarb build
   ```

4. **Set Up Environment Variables**
   ```bash
   # In the frontend directory
   cp .env.example .env.local
   
   # Edit .env.local with your configuration
   nano .env.local
   ```

5. **Start Development Environment**
   ```bash
   # Start the frontend
   cd frontend
   npm run dev
   
   # In another terminal, start the blockchain (optional)
   cd madara-app-chain-template
   cargo build --release
   ./target/release/app-chain-node --dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Starknet Configuration
VITE_STARKNET_NETWORK=testnet
VITE_CONTRACT_ADDRESS=0x...

# Pragma Oracle Configuration
VITE_PRAGMA_CONTRACT_ADDRESS=0x...

# Firebase Configuration (for chat)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Contract Configuration

Update the contract configuration in `contract/Scarb.toml`:

```toml
[tool.sncast.account1]
account = "account1"
accounts-file = "~/.starknet_accounts/starknet_open_zeppelin_accounts.json"
url = "http://localhost:5050/rpc"
```

## 🚀 Quick Start Commands

### For Users
```bash
# Just visit the website and connect your wallet
open https://cycle-stark.vercel.app
```

### For Developers
```bash
# Clone and setup
git clone https://github.com/your-org/cycle-stark.git
cd cycle-stark

# Install dependencies
cd frontend && npm install
cd ../contract && scarb build

# Start development
cd ../frontend && npm run dev
```

## ✅ Verification

### For Users
- ✅ Wallet connected to Starknet Testnet
- ✅ Can view collectives on the platform
- ✅ Can connect wallet successfully

### For Developers
- ✅ Frontend runs on `http://localhost:5173`
- ✅ Contract builds without errors
- ✅ All tests pass
- ✅ Can interact with smart contracts

## 🐛 Troubleshooting

### Common Issues

1. **Node.js Version Issues**
   ```bash
   # Use nvm to manage Node.js versions
   nvm install 18
   nvm use 18
   ```

2. **Cairo Installation Issues**
   ```bash
   # Reinstall Cairo toolchain
   curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
   ```

3. **Contract Build Issues**
   ```bash
   # Clean and rebuild
   cd contract
   scarb clean
   scarb build
   ```

4. **Frontend Build Issues**
   ```bash
   # Clear cache and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

If you encounter issues:

1. Check the [FAQ](../faq.md)
2. Search [existing issues](https://github.com/your-org/cycle-stark/issues)
3. Join our [Discord community](https://discord.gg/cycle-stark)
4. Create a new issue with:
   - Your operating system
   - Node.js version
   - Error messages
   - Steps to reproduce

## 📚 Next Steps

After successful installation:

- **[Quick Start](./quick-start.md)** - Learn how to use CycleStark
- **[User Guide](../user-guide/README.md)** - Detailed usage instructions
- **[Developer Guide](../developer-guide/README.md)** - Contribute to the project 