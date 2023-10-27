use starknet::ContractAddress;
use dict::Felt252Dict;
mod custom_array;

#[derive(Drop, Copy, starknet::Store)]
struct ReceivedStark {
    date: felt252,
    amount: felt252,
    token: felt252,
}

#[derive(Copy, Drop, Destruct)]
struct StarkHero {
    id: ContractAddress,
    escrow: felt252,
    is_active: bool,
    collectives: Felt252Dict<bool>,
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
// heroes: Array<ContractAddress>,
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
    fn check_if_has_locked(
        self: @TContractState,
        token: ContractAddress,
        collective_id: felt252,
        hero_id: ContractAddress
    ) -> u256;
}

#[starknet::interface]
trait IStoreArrayContract<TContractState> {
    fn store_array(ref self: TContractState, collective_id: felt252);
    fn read_collective_heroes(self: @TContractState, collective_id: felt252) -> Array<felt252>;
}


#[starknet::contract]
mod CycleStark {
    use core::array::ArrayTrait;
    use starknet::get_caller_address;
    use super::{StarkCollective, StarkHero, ContractAddress, Felt252Dict};

    // #[derive(Drop)]
    #[storage]
    struct Storage {
        stark_users: LegacyMap<ContractAddress, StarkHero>,
        stark_collectives: LegacyMap<felt252, StarkCollective>,
        locked_starks: LegacyMap<(ContractAddress, ContractAddress, felt252),
        u256>, // Account address, Token Address, collective_id then amt locked
        collective_heroes: LegacyMap<felt252, Array<felt252>>,
    // array: Array<felt252>,
    // collective_heroes: LegacyMap<(ContractAddress, felt252), bool>, // Hero_id, collective_id, true
    // hero_collectives: LegacyMap<ContractAddress, LegacyMap<felt252, bool>>, // account address, (collectiveid, bool)
    }


    // #[abi(embed_v0)]
    // impl StoreArrayImpl of super::IStoreArrayContract<ContractState> {
    //     fn store_array(ref self: ContractState, collective_id: felt252) {
    //         let arr = array![];
    //         let mut old: Array<felt252> = self.collective_heroes.read(collective_id);
    //         old.append('new');
    //         self.collective_heroes.write(collective_id, old);
    //     }

    //     fn read_collective_heroes(self: @ContractState, collective_id: felt252) -> Array<felt252> {
    //         self.collective_heroes.read(collective_id)
    //     }
    // }

    #[external(v0)]
    impl CycleStarkImpl of super::ICycleStark<ContractState> {
        fn register_account(ref self: ContractState) {
            let hero_ad: ContractAddress = get_caller_address();
            let hero: StarkHero = StarkHero { id: hero_ad, is_active: true, escrow: 0, collectives: Felt252Dict::new()};
            self.stark_users.write(hero_ad, hero);
        }

        fn register_collective(ref self: ContractState, s_c: StarkCollective) {
            self.stark_collectives.write(s_c.id, s_c);
        }

        fn get_stark_collective(self: @ContractState, id: felt252) -> StarkCollective {
            return self.stark_collectives.read(id);
        }

        fn register_hero_to_collective(
            ref self: ContractState, collective_id: felt252, amount: u256
        ) {}

        fn lock_new_stark(
            ref self: ContractState, token: ContractAddress, collective_id: felt252, amount: u256
        ) {
            self.locked_starks.write((get_caller_address(), token, collective_id), amount)
        }

        fn check_if_has_locked(
            self: @ContractState,
            token: ContractAddress,
            collective_id: felt252,
            hero_id: ContractAddress
        ) -> u256 {
            self.locked_starks.read((hero_id, token, collective_id))
        }
    }
}
