# API Reference

Welcome to the CycleStark API Reference! This comprehensive guide provides detailed information about all interfaces, functions, and events in the CycleStark ecosystem.

## 📚 API Sections

### 🏗️ [Smart Contract Interface](./contract-interface.md)
Complete smart contract API documentation:
- Core contract functions
- Helper functions
- Data structures and types
- Error codes and messages

### 🎨 [Frontend API](./frontend-api.md)
Frontend integration and utilities:
- React hooks and components
- Configuration interfaces
- Utility functions
- Type definitions

### 📡 [Events](./events.md)
Event system documentation:
- Smart contract events
- Event parsing and handling
- Event subscription methods
- Event data structures

## 🎯 Overview

### Smart Contract APIs

The CycleStark smart contract provides two main interfaces:

#### ICycleStark Interface
Core business logic functions for:
- Hero registration and management
- Collective creation and management
- Cycle participation and funding
- Fund distribution and remittance

#### IHelperFunctions Interface
Utility functions for:
- Data retrieval and queries
- State inspection
- Address management
- Collective information

### Frontend APIs

The frontend provides several APIs for:
- Wallet integration and management
- Contract interaction
- State management
- UI components and utilities

## 🔧 Quick Reference

### Core Functions

#### Hero Management
```cairo
fn register_account(ref self: ContractState)
fn get_hero(self: @ContractState, hero_id: HeroID) -> StarkHero
fn get_heroes_count(self: @ContractState) -> u256
```

#### Collective Management
```cairo
fn register_collective(
    ref self: ContractState,
    name: felt252,
    rule_1: felt252,
    rule_2: felt252,
    rule_3: felt252,
    cycle_amount: u256,
    fine: u256,
    token: TokenAddress,
    start_date: u64,
    aim: felt252,
    decimals: u32,
    symbol: felt252,
)
fn join_collective(ref self: ContractState, collective_id: CollectiveID)
fn close_registrations(ref self: ContractState, collective_id: CollectiveID)
```

#### Cycle Management
```cairo
fn start_cycle(ref self: ContractState, collective_id: CollectiveID)
fn contribute(ref self: ContractState, collective_id: CollectiveID, amount: u256)
fn remit(ref self: ContractState, collective_id: CollectiveID)
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

## 📡 Events

### Core Events
- `Hero`: Hero registration events
- `Collective`: Collective creation and management events
- `Cycle`: Cycle lifecycle events
- `Contribute`: Contribution events
- `Remitance`: Fund distribution events

### Event Structure
```cairo
#[derive(Drop, starknet::Event)]
struct Hero {
    #[key]
    id: ContractAddress,
}

#[derive(Drop, starknet::Event)]
struct Collective {
    #[key]
    id: CollectiveID,
    name: felt252,
    cycle_amount: u256,
    fine: u256,
    token: TokenAddress,
    start_date: u64,
    owner: HeroID,
    has_started: bool,
    has_ended: bool
}
```

## 🔌 Integration Examples

### Smart Contract Integration

#### Basic Contract Interaction
```typescript
import { Contract, uint256 } from "starknet";

const contract = new Contract(ABI, CONTRACT_ADDRESS, provider);

// Register as hero
await contract.register_account();

// Get hero information
const hero = await contract.get_hero(heroAddress);

// Join collective
await contract.join_collective(collectiveId);
```

#### Event Listening
```typescript
// Listen for collective creation events
contract.on('Collective', (event) => {
    console.log('New collective created:', event);
});

// Listen for contribution events
contract.on('Contribute', (event) => {
    console.log('Contribution made:', event);
});
```

### Frontend Integration

#### Wallet Connection
```typescript
import { connect, disconnect } from '@starknetkit/core';

// Connect wallet
const connection = await connect({
    modalMode: 'alwaysAsk',
    webWalletUrl: 'https://web.argent.xyz'
});

// Disconnect wallet
await disconnect();
```

#### Contract State Management
```typescript
import { useContractRead } from '@starknetkit/react';

// Read collective data
const { data: collective } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'get_stark_collective',
    args: [collectiveId]
});
```

## 📊 Data Types

### Primitive Types
- `felt252`: Field element (Starknet's native type)
- `u256`: 256-bit unsigned integer
- `u32`: 32-bit unsigned integer
- `u64`: 64-bit unsigned integer
- `ContractAddress`: Starknet contract address
- `bool`: Boolean value

### Custom Types
- `HeroID`: Hero identifier (ContractAddress)
- `CollectiveID`: Collective identifier (u256)
- `CycleID`: Cycle identifier (u256)
- `TokenAddress`: Token contract address (ContractAddress)

## 🔐 Security Considerations

### Access Control
- **Owner Functions**: Only collective owners can perform certain operations
- **Hero Functions**: Only registered heroes can participate
- **State Validation**: All state changes are validated

### Input Validation
- **Parameter Checks**: All function parameters are validated
- **State Consistency**: Operations maintain system consistency
- **Error Handling**: Comprehensive error handling and reporting

### Event Security
- **Event Verification**: All events are cryptographically verified
- **Event Parsing**: Safe event parsing and handling
- **Event Logging**: Complete audit trail through events

## 🚀 Performance Considerations

### Gas Optimization
- **Efficient Storage**: Optimized data structures for gas efficiency
- **Batch Operations**: Support for batch operations where possible
- **Event Optimization**: Minimal event data to reduce gas costs

### Query Optimization
- **Indexed Queries**: Efficient data retrieval patterns
- **Caching**: Frontend caching for frequently accessed data
- **Pagination**: Support for paginated data retrieval

## 🔍 Error Handling

### Error Codes
- `INVALID_HERO`: Hero not found or not registered
- `INVALID_COLLECTIVE`: Collective not found or invalid
- `INSUFFICIENT_FUNDS`: Insufficient balance for operation
- `INVALID_STATE`: Invalid state for operation
- `ACCESS_DENIED`: Operation not allowed

### Error Handling Patterns
```typescript
try {
    await contract.join_collective(collectiveId);
} catch (error) {
    if (error.message.includes('INSUFFICIENT_FUNDS')) {
        // Handle insufficient funds
    } else if (error.message.includes('INVALID_COLLECTIVE')) {
        // Handle invalid collective
    }
}
```

## 📚 Related Documentation

- **[Smart Contract Architecture](../architecture/smart-contracts.md)** - Detailed contract design
- **[Frontend Architecture](../architecture/frontend.md)** - Frontend system design
- **[Developer Guide](../developer-guide/README.md)** - Development guidelines
- **[Security](../security/README.md)** - Security considerations

## 🤝 Support

### Getting Help
- **Discord**: Join our developer community
- **GitHub Issues**: Report API issues
- **Documentation**: Comprehensive guides and examples
- **Examples**: Code examples and tutorials

### Contributing
- **API Improvements**: Suggest API enhancements
- **Documentation**: Help improve documentation
- **Examples**: Contribute code examples
- **Testing**: Help test API functionality

---

**Need API help?** Check the specific sections above or join our [Discord community](https://discord.gg/cycle-stark) for real-time support! 