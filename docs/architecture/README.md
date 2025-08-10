# Architecture Overview

This section provides a comprehensive overview of CycleStark's system architecture, including the smart contracts, frontend application, and blockchain infrastructure.

## 🏗️ System Architecture

CycleStark is built as a decentralized application (dApp) with three main components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Smart         │    │   Blockchain    │
│   Application   │◄──►│   Contracts     │◄──►│   Infrastructure │
│   (React)       │    │   (Cairo)       │    │   (Madara)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Core Components

### 1. Smart Contracts (Cairo)
- **Location**: `/contract/src/`
- **Language**: Cairo 2.0
- **Network**: Starknet
- **Purpose**: Core business logic and state management

### 2. Frontend Application (React)
- **Location**: `/frontend/src/`
- **Framework**: React 18 + TypeScript
- **UI Library**: Mantine 7
- **Purpose**: User interface and interaction layer

### 3. Blockchain Infrastructure (Madara)
- **Location**: `/madara-app-chain-template/`
- **Framework**: Madara (Starknet-compatible)
- **Language**: Rust
- **Purpose**: Local development and testing environment

## 🔄 Data Flow

```
User Action → Frontend → Wallet → Smart Contract → Blockchain
     ↑                                                      ↓
     └─────────────── State Update ← Events ←──────────────┘
```

### Detailed Flow:

1. **User Interaction**: User performs action in frontend
2. **Transaction Creation**: Frontend creates transaction data
3. **Wallet Signing**: User approves transaction in wallet
4. **Contract Execution**: Smart contract processes the action
5. **State Update**: Blockchain state is updated
6. **Event Emission**: Contract emits events
7. **UI Update**: Frontend updates based on new state

## 🏛️ Smart Contract Architecture

### Core Contracts

```
CycleStark.sol (Main Contract)
├── Storage
│   ├── stark_heroes: Map<HeroID, StarkHero>
│   ├── stark_collectives: Map<CollectiveID, StarkCollective>
│   ├── collective_cycles: Map<(CollectiveID, u32), CollectiveCycle>
│   └── cycle_contributions: Map<(CollectiveID, CycleID, u32), CycleContribution>
├── Interfaces
│   ├── ICycleStark: Main contract interface
│   └── IHelperFunctions: Helper functions interface
└── Events
    ├── Hero: Hero registration events
    ├── Collective: Collective creation events
    ├── Cycle: Cycle management events
    └── Contribute: Contribution events
```

### Data Structures

#### StarkHero
```cairo
struct StarkHero {
    id: ContractAddress,
    escrow: u256,
    is_active: bool,
    collectives_count: u32,
}
```

#### StarkCollective
```cairo
struct StarkCollective {
    id: CollectiveID,
    name: felt252,
    rule_1: felt252,
    rule_2: felt252,
    rule_3: felt252,
    hero_count: u32,
    cycle_amount: u256,
    fine: u256,
    cycles_count: u32,
    token: TokenAddress,
    start_date: u64,
    owner: HeroID,
    active_cycle: u32,
    has_started: bool,
    has_ended: bool,
    current_hero: HeroID,
    next_hero: HeroID,
    aim: felt252,
    decimals: u32,
    symbol: felt252,
}
```

## 🎨 Frontend Architecture

### Component Structure

```
App.tsx
├── MainLayout
│   ├── TopBarNavigation
│   │   ├── ConnectWalletBtn
│   │   └── CustomNavLink
│   └── CustomAppShell
├── Pages
│   ├── Home
│   ├── Collectives
│   ├── CreateCollective
│   ├── SingleCollective
│   │   ├── Heroes
│   │   ├── Cycles
│   │   ├── CollectiveInfo
│   │   └── Chat
│   └── MyCollectives
└── Providers
    ├── AppProvider
    └── CollectiveProvider
```

### State Management

- **React Context**: For global state management
- **Local State**: Component-specific state
- **Contract State**: Real-time blockchain state
- **Wallet State**: Connection and account information

### Key Libraries

- **StarknetKit**: Wallet integration
- **Mantine**: UI components and theming
- **React Router**: Navigation
- **Firebase**: Chat functionality

## ⛓️ Blockchain Infrastructure

### Madara App Chain

Madara provides a Starknet-compatible development environment with:

- **Full RPC Compatibility**: Works with all Starknet tooling
- **Customizable Parameters**: Adjustable transaction fees, step limits
- **Local Development**: Fast iteration and testing
- **Genesis Configuration**: Pre-configured accounts and contracts

### Network Configuration

```toml
# Development Network
url = "http://localhost:5050/rpc"

# Testnet Configuration
url = "https://starknet-goerli.infura.io/v3/YOUR_KEY"

# Mainnet Configuration
url = "https://starknet-mainnet.infura.io/v3/YOUR_KEY"
```

## 🔐 Security Architecture

### Smart Contract Security

1. **Access Control**: Owner-only functions for critical operations
2. **Input Validation**: Comprehensive parameter checking
3. **Reentrancy Protection**: Safe external calls
4. **State Consistency**: Atomic operations
5. **Event Logging**: Complete audit trail

### Frontend Security

1. **Wallet Integration**: Secure wallet connection
2. **Transaction Validation**: Client-side validation
3. **Error Handling**: Graceful error management
4. **Input Sanitization**: XSS prevention

### Network Security

1. **HTTPS**: Secure communication
2. **RPC Security**: Authenticated API endpoints
3. **Rate Limiting**: DDoS protection
4. **Monitoring**: Real-time security monitoring

## 📊 Performance Considerations

### Smart Contract Optimization

- **Gas Efficiency**: Optimized Cairo code
- **Storage Optimization**: Efficient data structures
- **Batch Operations**: Multiple operations in single transaction
- **Event Optimization**: Minimal event data

### Frontend Performance

- **Lazy Loading**: Component and route lazy loading
- **Caching**: API response caching
- **Optimization**: Bundle size optimization
- **CDN**: Static asset delivery

### Network Performance

- **Layer 2**: Starknet's L2 scaling
- **Batching**: Transaction batching
- **Caching**: RPC response caching
- **Load Balancing**: Multiple RPC endpoints

## 🔧 Development Workflow

### Local Development

1. **Start Madara**: Local blockchain
2. **Deploy Contracts**: Deploy to local network
3. **Start Frontend**: Development server
4. **Connect Wallet**: Connect to local network
5. **Test**: Full integration testing

### Testing Strategy

- **Unit Tests**: Individual component testing
- **Integration Tests**: Contract interaction testing
- **E2E Tests**: Full user flow testing
- **Security Tests**: Vulnerability assessment

### Deployment Pipeline

1. **Contract Deployment**: Deploy to testnet/mainnet
2. **Frontend Build**: Production build
3. **Environment Configuration**: Set environment variables
4. **Deployment**: Deploy to hosting platform
5. **Verification**: Post-deployment verification

## 📈 Scalability Considerations

### Horizontal Scaling

- **Multiple RPC Endpoints**: Load balancing
- **CDN**: Global content delivery
- **Database Sharding**: Data distribution
- **Microservices**: Service decomposition

### Vertical Scaling

- **Contract Optimization**: Gas efficiency
- **Frontend Optimization**: Performance improvements
- **Infrastructure Upgrades**: Hardware improvements

## 🔮 Future Architecture

### Planned Improvements

1. **Layer 3 Solutions**: Additional scaling
2. **Cross-Chain Integration**: Multi-chain support
3. **Advanced Analytics**: Real-time analytics
4. **Mobile App**: Native mobile application
5. **API Gateway**: Public API access

### Technology Roadmap

- **Cairo 2.0**: Latest language features
- **Starknet 2.0**: Protocol upgrades
- **Advanced UI**: Enhanced user experience
- **AI Integration**: Smart recommendations

## 📚 Related Documentation

- **[Smart Contract Architecture](./smart-contracts.md)** - Detailed contract design
- **[Frontend Architecture](./frontend.md)** - Frontend system design
- **[Blockchain Infrastructure](./blockchain.md)** - Infrastructure details
- **[API Reference](../api-reference/README.md)** - Interface documentation 