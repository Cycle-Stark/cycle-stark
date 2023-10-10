use starknet::ContractAddress;

#[derive(Drop, Copy, starknet::Store)]
struct ReceivedStark {
    date: felt252,
    amount: felt252,
    token: felt252
}

#[derive(Copy, Drop, starknet::Store)]
struct StarkHero {
    id: ContractAddress,
    escrow: felt252,
    is_active: bool,
// received_starks: LegacyMap<felt252, ReceivedStark>
}

#[derive(Copy, Drop, starknet::Store)]
struct HeroContribution {
    hero_id: ContractAddress,
    amount: felt252
}

#[derive(Copy, Drop, Serde, starknet::Store)]
struct StarkCollective {
    id: felt252,
    expected_hero_count: u32,
    cycle_amount: felt252,
    current_hero_id: Option<felt252>,
    token: felt252,
    start_date: felt252,
    next_cycle_date: felt252,
    next_hero_id: Option<felt252>,
    next_hero_index: felt252,
// heroes: Array<felt252>,
// cycle_contributions: Array<HeroContribution>
}


#[starknet::interface]
trait IStarkCollective {
    fn add_stark_hero(ref self: StarkCollective, s_h: ContractAddress);
    fn get_stark_hero(self: @StarkCollective, id: felt252);
    fn join_collective(ref self: StarkCollective, s_h: ContractAddress);
    fn check_for_next_hero(self: @StarkCollective);
    fn contribute(ref self: StarkCollective, hero_id: felt252, amount: felt252);
    fn remit(ref self: StarkCollective);
}

impl CycleStarkImpl of IStarkCollective {
    fn add_stark_hero(ref self: StarkCollective, s_h: ContractAddress) {}
    fn get_stark_hero(self: @StarkCollective, id: felt252) {}
    fn join_collective(ref self: StarkCollective, s_h: ContractAddress) {}
    fn check_for_next_hero(self: @StarkCollective) {}
    fn contribute(ref self: StarkCollective, hero_id: felt252, amount: felt252) {}
    fn remit(ref self: StarkCollective) {}
}


#[starknet::interface]
trait ICycleStark<TContractState> {
    fn register_account(ref self: TContractState);
    fn register_collective(ref self: TContractState, s_c: StarkCollective);
    fn get_stark_collective(self: @TContractState, id: felt252) -> StarkCollective;
    fn register_hero_to_collective(ref self: TContractState, collective_id: felt252, amount: u256);
    fn lock_new_stark(
        ref self: TContractState, token: ContractAddress, collective_id: felt252, amount: u256
    );
    fn check_if_has_locked(self: @TContractState, token: ContractAddress, collective_id: felt252, hero_id: ContractAddress) -> u256;
}


#[starknet::contract]
mod CycleStark {
    use starknet::get_caller_address;
    use starknet::ContractAddress;
    use super::{StarkCollective, StarkHero};

    // #[derive(Drop)]
    #[storage]
    struct Storage {
        stark_users: LegacyMap<ContractAddress, StarkHero>,
        stark_collectives: LegacyMap<felt252, StarkCollective>,
        locked_starks: LegacyMap<(ContractAddress, ContractAddress, felt252),
        u256>, // Account address, Token Address, collective_id then amt locked
    }


    #[external(v0)]
    impl CycleStarkImpl of super::ICycleStark<ContractState> {

        fn register_account(ref self: ContractState) {
            let hero_ad: ContractAddress = get_caller_address();
            let hero: StarkHero = StarkHero { id: hero_ad, is_active: true, escrow: 0, };
            self.stark_users.write(hero_ad, hero);
        }

        fn register_collective(ref self: ContractState, s_c: StarkCollective) {
            self.stark_collectives.write(s_c.id, s_c);
        }

        fn get_stark_collective(self: @ContractState, id: felt252) -> StarkCollective {
            return self.stark_collectives.read(id);
        }

        fn register_hero_to_collective(ref self: ContractState, collective_id: felt252, amount: u256){

        }

        fn lock_new_stark(
            ref self: ContractState, token: ContractAddress, collective_id: felt252, amount: u256
        ) {
            self.locked_starks.write((get_caller_address(), token, collective_id), amount)
        }

        fn check_if_has_locked(self: @ContractState, token: ContractAddress, collective_id: felt252, hero_id: ContractAddress) -> u256 {
            self.locked_starks.read((hero_id, token, collective_id))
        }



    }
}
