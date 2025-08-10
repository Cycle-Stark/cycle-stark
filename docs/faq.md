# Frequently Asked Questions (FAQ)

This FAQ section addresses the most common questions about CycleStark. If you don't find your answer here, please check our [documentation](../README.md) or join our [Discord community](https://discord.gg/cycle-stark).

## 🎯 General Questions

### What is CycleStark?

CycleStark is a decentralized platform built on Starknet that enables cyclical funding through collectives. It's a modern implementation of rotating savings and credit associations (ROSCAs) using blockchain technology.

### How does CycleStark work?

1. **Heroes** (users) join **collectives** (funding groups)
2. Each collective has a fixed **cycle amount** and **hero count**
3. Heroes contribute the cycle amount each cycle
4. One hero receives the entire pool each cycle
5. The process rotates until all heroes receive funding

### What is a ROSCA?

A ROSCA (Rotating Savings and Credit Association) is a traditional financial system where a group of people contribute money regularly, and each member receives the entire pool once during the cycle. CycleStark modernizes this concept using blockchain technology.

### Is CycleStark safe?

Yes, CycleStark prioritizes security through:
- Smart contract audits and formal verification
- Secure wallet integration
- Transparent and immutable operations
- Community-driven development

## 💰 Financial Questions

### How much does it cost to use CycleStark?

- **No platform fees**: CycleStark is free to use
- **Starknet gas fees**: Standard transaction fees apply
- **No hidden costs**: All costs are transparent

### What tokens are supported?

CycleStark supports various ERC-20 tokens including:
- ETH (Ethereum)
- USDC (USD Coin)
- USDT (Tether)
- And other Starknet-compatible tokens

### How are token prices determined?

Token prices are provided by Pragma Oracle, ensuring real-time and accurate pricing for all supported tokens.

### What happens if I miss a contribution?

Missing contributions may result in:
- Fines as defined by the collective
- Potential removal from the collective
- Loss of locked collateral

### Can I withdraw my funds early?

Early withdrawal depends on the collective's rules. Generally, you can withdraw your locked funds if the collective hasn't started yet.

## 🏗️ Technical Questions

### What blockchain does CycleStark use?

CycleStark is built on **Starknet**, a Layer 2 scaling solution for Ethereum that provides:
- High transaction throughput
- Low gas fees
- Ethereum-level security
- ZK-proof technology

### What wallets are supported?

CycleStark supports all Starknet-compatible wallets:
- **ArgentX** (Recommended)
- **Braavos**
- **OKX Wallet**
- Other Starknet wallets

### How do I connect my wallet?

1. Click "Connect Wallet" in the top navigation
2. Select your preferred wallet
3. Approve the connection request
4. Ensure you're connected to Starknet Testnet/Mainnet

### What if my transaction fails?

Common reasons for failed transactions:
- **Insufficient balance**: Ensure you have enough tokens
- **Network issues**: Check your internet connection
- **Gas fees**: Ensure you have enough ETH for gas
- **Wallet issues**: Try reconnecting your wallet

### How do I get testnet tokens?

You can get testnet tokens from:
- [Starknet Faucet](https://faucet.goerli.starknet.io/)
- [ArgentX Faucet](https://www.argent.xyz/argent-x/)
- Community faucets

## 👥 Collective Questions

### How do I create a collective?

1. Connect your wallet
2. Click "Create Collective"
3. Fill in the required information:
   - Name and description
   - Cycle amount and hero count
   - Token type
   - Rules and requirements
4. Approve the transaction

### How do I join a collective?

1. Browse available collectives
2. Select a collective that fits your needs
3. Click "Join Collective"
4. Lock the required collateral
5. Wait for the collective to start

### What are the rules for collectives?

Each collective can have custom rules, but common rules include:
- Contribution schedule (weekly, monthly, etc.)
- Fine structure for missed payments
- Distribution order
- Communication requirements

### Can I leave a collective?

You can leave a collective if:
- The collective hasn't started yet
- You haven't received your funding yet
- The collective rules allow it

### What happens if a collective fails?

If a collective fails:
- Remaining funds are distributed fairly
- Locked collateral is returned
- The collective is marked as ended

## 🔒 Security Questions

### Is my money safe?

Yes, your funds are protected by:
- **Smart contract security**: Audited and verified contracts
- **Blockchain security**: Immutable and transparent operations
- **Escrow system**: Funds are locked until distribution
- **Community oversight**: Transparent operations

### What if someone doesn't contribute?

The collective's fine structure handles missed contributions:
- Automatic fines are applied
- Fines are distributed to other heroes
- Persistent non-payment may result in removal

### Can the smart contract be hacked?

The smart contracts are:
- **Audited**: Professional security audits
- **Tested**: Extensive testing and verification
- **Open source**: Community review
- **Gradually deployed**: Safe deployment practices

### How do I protect my wallet?

- **Use hardware wallets** for large amounts
- **Never share private keys**
- **Verify transaction details**
- **Use trusted networks**
- **Keep software updated**

## 🚀 Development Questions

### How can I contribute to CycleStark?

You can contribute in several ways:
- **Code contributions**: Submit pull requests
- **Bug reports**: Report issues on GitHub
- **Documentation**: Help improve docs
- **Testing**: Test new features
- **Community**: Help grow the community

### Is CycleStark open source?

Yes, CycleStark is completely open source:
- **Smart contracts**: Cairo source code available
- **Frontend**: React/TypeScript code available
- **Documentation**: Comprehensive docs
- **Community**: Open development process

### How do I run CycleStark locally?

1. Clone the repository
2. Install dependencies
3. Start the local blockchain
4. Deploy contracts
5. Start the frontend

See our [Development Setup](../getting-started/development-setup.md) guide for detailed instructions.

### What technologies does CycleStark use?

**Smart Contracts:**
- Cairo 2.0
- Starknet
- Scarb (package manager)

**Frontend:**
- React 18
- TypeScript
- Mantine UI
- StarknetKit

**Infrastructure:**
- Madara App Chain
- Rust
- Vite

## 🌐 Community Questions

### How do I join the community?

- **Discord**: [Join our Discord server](https://discord.gg/cycle-stark)
- **GitHub**: [Follow us on GitHub](https://github.com/your-org/cycle-stark)
- **Twitter**: [Follow us on Twitter](https://twitter.com/cycle_stark)
- **Blog**: [Read our blog](https://blog.cycle-stark.com)

### How can I get help?

- **Documentation**: Check our comprehensive docs
- **Discord**: Ask questions in our community
- **GitHub Issues**: Report bugs and issues
- **Email**: Contact us directly

### Are there community events?

Yes, we host various community events:
- **Office Hours**: Regular Q&A sessions
- **Hackathons**: Development competitions
- **Workshops**: Educational sessions
- **Meetups**: In-person and virtual events

### How do I report a bug?

1. Check if the bug is already reported
2. Create a new issue on GitHub
3. Include detailed information:
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## 📈 Future Questions

### What features are coming next?

Upcoming features include:
- **Mobile app**: Native mobile application
- **Advanced analytics**: Enhanced reporting
- **Cross-chain support**: Multi-chain functionality
- **AI integration**: Smart recommendations
- **Governance**: DAO governance system

### Will CycleStark support other blockchains?

We're exploring multi-chain support, but currently focus on Starknet for:
- **Performance**: High transaction throughput
- **Cost**: Low gas fees
- **Security**: Ethereum-level security
- **Innovation**: Latest blockchain technology

### How will CycleStark scale?

CycleStark scales through:
- **Layer 2**: Starknet's scaling solution
- **Optimization**: Gas-efficient contracts
- **Infrastructure**: Robust backend systems
- **Community**: Distributed development

### What's the roadmap?

Our roadmap includes:
- **Q1 2024**: Enhanced security and testing
- **Q2 2024**: Mobile app development
- **Q3 2024**: Advanced features and analytics
- **Q4 2024**: Cross-chain integration

## 🆘 Troubleshooting

### My wallet won't connect

Try these steps:
1. **Refresh the page**
2. **Reconnect your wallet**
3. **Check network**: Ensure you're on Starknet
4. **Update wallet**: Use the latest version
5. **Clear cache**: Clear browser cache

### Transaction stuck

If a transaction is stuck:
1. **Wait**: Some transactions take time
2. **Check explorer**: Verify on Starknet explorer
3. **Retry**: Try the transaction again
4. **Contact support**: If issues persist

### Can't see my collectives

If collectives aren't showing:
1. **Check wallet connection**
2. **Verify network**: Ensure correct network
3. **Refresh page**: Reload the application
4. **Check filters**: Verify search/filter settings

### Error messages

Common error messages:
- **"Insufficient balance"**: Add more tokens
- **"Network error"**: Check internet connection
- **"Wallet not connected"**: Reconnect wallet
- **"Invalid parameters"**: Check input values

## 📞 Contact Information

### Support Channels

- **Discord**: [Join our community](https://discord.gg/cycle-stark)
- **GitHub Issues**: [Report issues](https://github.com/your-org/cycle-stark/issues)
- **Email**: [Contact us](mailto:support@cycle-stark.com)
- **Documentation**: [Read the docs](../README.md)

### Emergency Contact

- **Security Issues**: [security@cycle-stark.com](mailto:security@cycle-stark.com)
- **Bug Bounty**: [Immunefi Program](https://immunefi.com/bounty/cycle-stark)
- **Emergency**: +1-XXX-XXX-XXXX

---

**Still have questions?** Join our [Discord community](https://discord.gg/cycle-stark) for real-time help and discussions with other users and developers! 