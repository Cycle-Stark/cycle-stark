use cycle_stark::utils::{CollectiveID, CycleID, HeroID, TokenAddress};
use starknet::ContractAddress;
use array::ArrayTrait;

#[derive(Drop, Serde, Copy, starknet::Store)]
struct ReceivedStark {
    date: felt252,
    amount: felt252,
    token: ContractAddress,
}

#[derive(Copy, Drop, Destruct, starknet::Store, Serde)]
struct StarkHero {
    id: ContractAddress,
    escrow: u256,
    is_active: bool,
    collectives_count: u32,
}

#[derive(Copy, Drop, Serde, starknet::Store)]
struct CycleContribution {
    hero_id: HeroID,
    amount: u256
}

#[derive(Copy, Drop, Serde, starknet::Store)]
struct StarkCollective {
    id: CollectiveID,
    name: felt252,
    rule_1: felt252, // 26 Characters
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

#[derive(Copy, Drop, Serde, starknet::Store)]
struct CollectiveCycle {
    id: CycleID,
    has_ended: bool,
    contributions_count: u32,
    receiver_hero: HeroID,
}

#[starknet::interface]
trait ICycleStark<TContractState> {
    fn register_account(ref self: TContractState);
    fn register_collective(
        ref self: TContractState,
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
    );
    fn get_stark_collective(self: @TContractState, collective_id: CollectiveID) -> StarkCollective;
    fn get_collective_cycle(
        self: @TContractState, collective_id: CollectiveID, cycle_id: CycleID
    ) -> CollectiveCycle;
    fn join_collective(ref self: TContractState, collective_id: CollectiveID);
    fn close_registrations(ref self: TContractState, collective_id: CollectiveID);


    fn lock_new_stark(ref self: TContractState, collective_id: CollectiveID, amount: u256);
    fn check_if_has_locked(
        self: @TContractState, collective_id: CollectiveID, hero_id: ContractAddress
    ) -> u256;

    fn start_cycle(ref self: TContractState, collective_id: CollectiveID);
    fn contribute(ref self: TContractState, collective_id: CollectiveID, amount: u256); // TODO
    fn get_receiver_address(ref self: TContractState, collective_id: CollectiveID) -> HeroID;
    fn remit(ref self: TContractState, collective_id: CollectiveID); // TODO
}

#[starknet::interface]
trait IHelperFunctions<TContractState> {
    fn get_heroes_count(self: @TContractState) -> u256;
    fn get_hero(self: @TContractState, hero_id: HeroID) -> StarkHero;
    fn get_caller_address(self: @TContractState) -> ContractAddress;
    fn get_contract_address(self: @TContractState) -> ContractAddress;
    fn get_collective_hero(
        self: @TContractState, collective_id: CollectiveID, index: u32
    ) -> HeroID;
    fn get_collectives(self: @TContractState, page: u32) -> Array<StarkCollective>;
    fn get_hero_collectives(self: @TContractState, hero: HeroID, page: u32) -> Array<StarkCollective>;
    fn get_collective_heroes(self: @TContractState, collective_id: CollectiveID) -> Array<ContractAddress>;
    fn get_collective_cycles(self: @TContractState, collective_id: CollectiveID) -> Array<CollectiveCycle>;
    fn get_cycle_contributions(self: @TContractState, collective_id: CollectiveID, cycle_id: CycleID) -> Array<CycleContribution>;
}
