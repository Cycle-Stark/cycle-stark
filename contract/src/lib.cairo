use starknet::ContractAddress;
use dict::Felt252Dict;

/// To implement events use this code https://github.com/zkLend/zklend-v1-core/blob/master/src/market.cairo

type CollectiveID = u256;
type CycleID = u32;
type HeroID = ContractAddress;
type TokenAddress = ContractAddress;

#[derive(Drop, Copy, starknet::Store)]
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

#[derive(Copy, Drop, starknet::Store)]
struct CycleContribution {
    hero_id: HeroID,
    amount: u256
}

#[derive(Copy, Drop, Serde, starknet::Store)]
struct StarkCollective {
    id: CollectiveID,
    name: felt252,
    rule_1: felt252,
    rule_2: felt252,
    rule_3: felt252,
    hero_count: u32,
    cycle_amount: u256,
    cycles_count: u32,
    token: TokenAddress,
    start_date: u64,
    owner: HeroID,
    active_cycle: u32,
    has_started: bool,
    has_ended: bool,
    current_hero: HeroID,
    next_hero: HeroID,
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
        token: TokenAddress
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
    fn get_collective_hero(
        self: @TContractState, collective_id: CollectiveID, index: u32
    ) -> HeroID;
}


#[starknet::contract]
mod CycleStark {
    use cycle_stark::ICycleStark;
    use core::traits::Into;
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use core::array::ArrayTrait;
    use starknet::{get_caller_address, get_block_timestamp};
    use super::{
        StarkCollective, StarkHero, ContractAddress, Felt252Dict, CollectiveID, CycleID, HeroID,
        TokenAddress, CollectiveCycle, CycleContribution
    };

    // #[derive(Drop)]
    #[storage]
    struct Storage {
        stark_heroes: LegacyMap<HeroID, StarkHero>,
        heroes_count: u256,
        collectives_count: u256,
        stark_collectives: LegacyMap<CollectiveID, StarkCollective>,
        locked_starks: LegacyMap<
            (HeroID, CollectiveID), u256
        >, // Account address, Token Address, collective_id then amt locked
        collective_heroes: LegacyMap<(CollectiveID, u32), HeroID>,
        hero_collectives: LegacyMap<(HeroID, u32), CollectiveID>,
        collective_cycles: LegacyMap<(CollectiveID, u32), CollectiveCycle>,
        cycle_contributions: LegacyMap<(CycleID, u32), CycleContribution>
    }

    #[external(v0)]
    impl HelperFunctionsImpl of super::IHelperFunctions<ContractState> {
        fn get_heroes_count(self: @ContractState) -> u256 {
            self.heroes_count.read()
        }

        fn get_hero(self: @ContractState, hero_id: HeroID) -> StarkHero {
            self.stark_heroes.read(hero_id)
        }

        fn get_caller_address(self: @ContractState) -> ContractAddress {
            get_caller_address()
        }

        fn get_collective_hero(
            self: @ContractState, collective_id: CollectiveID, index: u32
        ) -> HeroID {
            self.collective_heroes.read((collective_id, index))
        }
    }

    #[external(v0)]
    impl CycleStarkImpl of super::ICycleStark<ContractState> {
        fn register_account(ref self: ContractState) {
            let hero_address: ContractAddress = get_caller_address();
            let existing_hero = self.stark_heroes.read(hero_address);
            if existing_hero.id != hero_address {
                let hero: StarkHero = StarkHero {
                    id: hero_address, is_active: true, escrow: 0, collectives_count: 0
                };
                self.stark_heroes.write(hero_address, hero);
                self.heroes_count.write(self.heroes_count.read() + 1);
            }
        }

        fn register_collective(
            ref self: ContractState,
            name: felt252,
            rule_1: felt252,
            rule_2: felt252,
            rule_3: felt252,
            cycle_amount: u256,
            token: TokenAddress
        ) {
            let hero_address: ContractAddress = get_caller_address();
            let mut hero: StarkHero = self.stark_heroes.read(hero_address);
            let collectives_count = self.collectives_count.read() + 1;
            self.collectives_count.write(collectives_count);
            // Adjust the collectives count for the hero before using the figure.
            hero.collectives_count += 1;
            self.stark_heroes.write(hero_address, hero);

            let collective = StarkCollective {
                id: collectives_count,
                name,
                rule_1,
                rule_2,
                rule_3,
                hero_count: 0,
                cycle_amount,
                cycles_count: 0,
                token,
                start_date: get_block_timestamp(),
                owner: hero_address,
                active_cycle: 0,
                has_started: false,
                has_ended: false,
                current_hero: hero_address,
                next_hero: hero_address,
            };

            self.stark_collectives.write(collectives_count, collective);
            self.hero_collectives.write((hero_address, hero.collectives_count), collectives_count);
        }

        fn get_stark_collective(
            self: @ContractState, collective_id: CollectiveID
        ) -> StarkCollective {
            return self.stark_collectives.read(collective_id);
        }

        fn get_collective_cycle(
            self: @ContractState, collective_id: CollectiveID, cycle_id: CycleID
        ) -> CollectiveCycle {
            return self.collective_cycles.read((collective_id, cycle_id));
        }

        fn join_collective(ref self: ContractState, collective_id: CollectiveID) {
            let hero_address: ContractAddress = get_caller_address();
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            if !s_c.has_started {
                // Adjust heroes count to mark an entry of a new hero
                s_c.hero_count += 1;
                self.collective_heroes.write((s_c.id, s_c.hero_count), hero_address);
                self.stark_collectives.write(s_c.id, s_c);
            }
        }

        fn close_registrations(ref self: ContractState, collective_id: CollectiveID) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let current_time = get_block_timestamp();

            if s_c.start_date <= current_time {
                s_c.has_started = true;
                self.stark_collectives.write(s_c.id, s_c);
            }
        }

        fn lock_new_stark(ref self: ContractState, collective_id: CollectiveID, amount: u256) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let amt_to_lock = s_c.cycle_amount * s_c.hero_count.into();
            if s_c.has_started && amt_to_lock == amount {
                self.locked_starks.write((get_caller_address(), collective_id), amount)
            }
        }

        fn check_if_has_locked(
            self: @ContractState, collective_id: CollectiveID, hero_id: HeroID
        ) -> u256 {
            self.locked_starks.read((hero_id, collective_id))
        }

        fn start_cycle(ref self: ContractState, collective_id: CollectiveID) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let receiver_hero = self.get_receiver_address(collective_id);
            if s_c.cycles_count < 1 {
                s_c.cycles_count += 1;
                let mut cycle: CollectiveCycle = CollectiveCycle {
                    id: s_c.cycles_count,
                    has_ended: false,
                    contributions_count: 0,
                    receiver_hero: receiver_hero
                };
                s_c.active_cycle = cycle.id;
                self.collective_cycles.write((collective_id, s_c.cycles_count), cycle);
                self.stark_collectives.write(collective_id, s_c);
            } else if s_c.cycles_count <= s_c.hero_count {
                let active_cycle = self.collective_cycles.read((collective_id, s_c.active_cycle));
                if active_cycle.has_ended {
                    s_c.cycles_count += 1;
                    let mut cycle: CollectiveCycle = CollectiveCycle {
                        id: s_c.cycles_count,
                        has_ended: false,
                        contributions_count: 0,
                        receiver_hero: receiver_hero
                    };
                    s_c.active_cycle = cycle.id;
                    self.collective_cycles.write((collective_id, s_c.cycles_count), cycle);
                    self.stark_collectives.write(collective_id, s_c);
                }
            }
        }

        fn contribute(ref self: ContractState, collective_id: CollectiveID, amount: u256) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let hero_address: ContractAddress = get_caller_address();
            let mut active_cycle = self.collective_cycles.read((collective_id, s_c.active_cycle));
            active_cycle.contributions_count += 1;
            self.collective_cycles.write((collective_id, active_cycle.id), active_cycle);
            let cycle_contribution = CycleContribution { hero_id: hero_address, amount: amount };
            self
                .cycle_contributions
                .write((s_c.active_cycle, active_cycle.contributions_count), cycle_contribution);
        }

        fn get_receiver_address(ref self: ContractState, collective_id: CollectiveID) -> HeroID {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let active_hero_address = self
                .collective_heroes
                .read((collective_id, s_c.active_cycle));
            active_hero_address
        }

        fn remit(ref self: ContractState, collective_id: CollectiveID) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let active_hero_address = self.get_receiver_address(collective_id);
            let mut active_cycle = self.collective_cycles.read((collective_id, s_c.active_cycle));
            active_cycle.has_ended = true;
            self.collective_cycles.write((collective_id, active_cycle.id), active_cycle);
            s_c.active_cycle = 0;
            self.stark_collectives.write(collective_id, s_c);
        // TODO: Write remitting functionality given the receiver hero address
        // self.start_cycle(collective_id);
        }
    }
}
