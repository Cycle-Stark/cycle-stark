use starknet::ContractAddress;
use cycle_stark::utils::{CollectiveID, CycleID, HeroID, TokenAddress};


#[starknet::contract]
mod CycleStark {
    use core::starknet::event::EventEmitter;
    use core::traits::Into;
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use core::array::ArrayTrait;
    use starknet::{get_caller_address, get_block_timestamp, get_contract_address};
    use cycle_stark::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use super::{ContractAddress, CollectiveID, CycleID, HeroID, TokenAddress};

    use cycle_stark::interfaces::{
        StarkCollective, StarkHero, CollectiveCycle, CycleContribution, ICycleStark,
        IHelperFunctions
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
        >, // Account address, Token Address, collective_id then amt locked // amt_to_lock = cycle_amount * collective_heroes_count
        collective_heroes: LegacyMap<(CollectiveID, u32), HeroID>,
        hero_collectives: LegacyMap<(HeroID, u32), CollectiveID>,
        collective_cycles: LegacyMap<(CollectiveID, u32), CollectiveCycle>,
        cycle_contributions: LegacyMap<(CollectiveID, CycleID, u32), CycleContribution>
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Hero: Hero,
        Collective: Collective,
        Cycle: Cycle,
        Lock: Lock,
        Contribute: Contribute,
        Remitance: Remitance,
    }

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
        #[key]
        cycle_amount: u256,
        fine: u256,
        token: TokenAddress,
        start_date: u64,
        owner: HeroID,
        has_started: bool,
        has_ended: bool
    }

    #[derive(Drop, starknet::Event)]
    struct Cycle {
        #[key]
        id: CycleID,
        #[key]
        has_ended: bool,
        contributions_count: u32,
    }


    #[derive(Drop, starknet::Event)]
    struct Lock {
        #[key]
        hero: HeroID,
        #[key]
        collective: CollectiveID,
        amount: u256,
    }


    #[derive(Drop, starknet::Event)]
    struct Contribute {
        #[key]
        hero: HeroID,
        #[key]
        collective: CollectiveID,
        cycle: CycleID,
        cycle_index: u32,
        amount: u256
    }

    #[derive(Drop, starknet::Event)]
    struct Remitance {
        #[key]
        hero: HeroID,
        #[key]
        collective: CollectiveID,
        cycle: CycleID,
        cycle_index: u32,
        amount: u256
    }

    #[external(v0)]
    impl HelperFunctionsImpl of IHelperFunctions<ContractState> {
        fn get_heroes_count(self: @ContractState) -> u256 {
            self.heroes_count.read()
        }

        fn get_hero(self: @ContractState, hero_id: HeroID) -> StarkHero {
            self.stark_heroes.read(hero_id)
        }

        fn get_caller_address(self: @ContractState) -> ContractAddress {
            get_caller_address()
        }

        fn get_contract_address(self: @ContractState) -> ContractAddress {
            get_contract_address()
        }

        fn get_collective_hero(
            self: @ContractState, collective_id: CollectiveID, index: u32
        ) -> HeroID {
            self.collective_heroes.read((collective_id, index))
        }

        fn get_collectives(self: @ContractState, page: u32) -> Array<StarkCollective> {
            let mut collectives = ArrayTrait::<StarkCollective>::new();
            let total_count = self.collectives_count.read();
            let mut count: u256 = 1;
            if total_count > 0 {
                loop {
                    collectives.append(self.stark_collectives.read(count));
                    count += 1;
                    if count > total_count {
                        break;
                    }
                };
            }
            collectives
        }

        fn get_hero_collectives(
            self: @ContractState, hero: HeroID, page: u32
        ) -> Array<StarkCollective> {
            let hero_ = self.stark_heroes.read(hero);
            let hero_collectives_count = hero_.collectives_count;
            // let mut hero_collectives_ids = ArrayTrait::<CollectiveID>::new();
            let mut collectives = ArrayTrait::<StarkCollective>::new();
            // let total_count = self.collectives_count.read();
            let mut count = 1;

            if hero_collectives_count > 0 {
                loop {
                    let collective_id = self.hero_collectives.read((hero, count));
                    collectives.append(self.stark_collectives.read(collective_id));
                    count += 1;
                    if count > hero_collectives_count {
                        break;
                    }
                };
            }
            collectives
        }

        fn get_collective_heroes(
            self: @ContractState, collective_id: CollectiveID
        ) -> Array<ContractAddress> {
            let collective = self.stark_collectives.read(collective_id);
            let heroes_count = collective.hero_count;
            let mut hero_addresses = ArrayTrait::<HeroID>::new();
            let mut count = 1;
            if heroes_count > 0 {
                loop {
                    let h_id = self.collective_heroes.read((collective_id, count));
                    hero_addresses.append(h_id);
                    count += 1;
                    if count > heroes_count {
                        break;
                    }
                }
            }
            hero_addresses
        }

        fn get_collective_cycles(
            self: @ContractState, collective_id: CollectiveID
        ) -> Array<CollectiveCycle> {
            let mut cycles = ArrayTrait::<CollectiveCycle>::new();
            let s_c = self.stark_collectives.read(collective_id);
            let cycles_count = s_c.cycles_count;
            let mut count = 1;
            if cycles_count > 0 {
                loop {
                    let cycle = self.collective_cycles.read((collective_id, count));
                    cycles.append(cycle);
                    count += 1;
                    if count > cycles_count {
                        break;
                    }
                }
            }
            cycles
        }
        fn get_cycle_contributions(
            self: @ContractState, collective_id: CollectiveID, cycle_id: CycleID
        ) -> Array<CycleContribution> {
            let mut contributions = ArrayTrait::<CycleContribution>::new();
            let s_c = self.stark_collectives.read(collective_id);
            let cycle = self.collective_cycles.read((collective_id, cycle_id));

            let contributions_count = cycle.contributions_count;
            let mut count = 1;

            if contributions_count > 0 {
                loop {
                    let contribution = self
                        .cycle_contributions
                        .read((collective_id, cycle_id, count));
                    contributions.append(contribution);
                    count += 1;
                    if count > contributions_count {
                        break;
                    }
                }
            }
            contributions
        }
    }

    #[external(v0)]
    impl CycleStarkImpl of ICycleStark<ContractState> {
        fn register_account(ref self: ContractState) {
            let hero_address: ContractAddress = get_caller_address();
            let existing_hero = self.stark_heroes.read(hero_address);
            if existing_hero.id != hero_address {
                let hero: StarkHero = StarkHero {
                    id: hero_address, is_active: true, escrow: 0, collectives_count: 0
                };
                self.stark_heroes.write(hero_address, hero);
                self.heroes_count.write(self.heroes_count.read() + 1);
                self.emit(Hero { id: hero_address });
            }
        }

        fn register_collective(
            ref self: ContractState,
            name: felt252,
            rule_1: felt252,
            rule_2: felt252,
            rule_3: felt252,
            cycle_amount: u256,
            fine: u256,
            token: TokenAddress, // add timestamp argument
            start_date: u64,
            aim: felt252,
            decimals: u32,
            symbol: felt252,
        ) {
            let hero_address: ContractAddress = get_caller_address();
            let mut hero = self.stark_heroes.read(hero_address);
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
                fine,
                token,
                start_date: get_block_timestamp(), // Add -> Convert calendar date to timestamp
                owner: hero_address,
                active_cycle: 0,
                has_started: false,
                has_ended: false,
                current_hero: hero_address,
                next_hero: hero_address,
                aim,
                decimals,
                symbol
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
            let hero_address: ContractAddress = get_caller_address();

            if s_c.has_started && amt_to_lock == amount {
                let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: s_c.token };
                let are_tokens_transfered = token
                    .transferFrom(hero_address, get_contract_address(), s_c.cycle_amount);
                if are_tokens_transfered {
                    self.locked_starks.write((hero_address, collective_id), amount)
                }
            }
        }

        fn check_if_has_locked(
            self: @ContractState, collective_id: CollectiveID, hero_id: HeroID
        ) -> u256 {
            self.locked_starks.read((hero_id, collective_id))
        }

        fn start_cycle(ref self: ContractState, collective_id: CollectiveID) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            if s_c.cycles_count < 1 {
                let receiver_hero = self.collective_heroes.read((collective_id, 1)); 
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
                let next_active_cycle = s_c.cycles_count + 1;
                let receiver_hero = self.collective_heroes.read((collective_id, next_active_cycle));
                let active_cycle = self
                    .collective_cycles
                    .read((collective_id, next_active_cycle - 1));
                if active_cycle.has_ended {
                    s_c.cycles_count = next_active_cycle;
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

            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: s_c.token };

            let are_tokens_transfered = token
                .transferFrom(hero_address, get_contract_address(), s_c.cycle_amount);

            if are_tokens_transfered {
                let mut active_cycle = self
                    .collective_cycles
                    .read((collective_id, s_c.active_cycle));
                active_cycle.contributions_count += 1;
                self.collective_cycles.write((collective_id, active_cycle.id), active_cycle);
                let cycle_contribution = CycleContribution {
                    hero_id: hero_address, amount: amount
                };
                self
                    .cycle_contributions
                    .write(
                        (collective_id, s_c.active_cycle, active_cycle.contributions_count),
                        cycle_contribution
                    );
            }
        }

        fn get_receiver_address(ref self: ContractState, collective_id: CollectiveID) -> HeroID {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let player = Option::<u32>::None;
            let active_hero_address = self
                .collective_heroes
                .read((collective_id, s_c.active_cycle));
            active_hero_address
        }

        fn remit(ref self: ContractState, collective_id: CollectiveID) {
            let mut s_c: StarkCollective = self.stark_collectives.read(collective_id);
            let active_hero_address = self.get_receiver_address(collective_id);
            let contract_address = get_contract_address();
            let mut active_cycle = self.collective_cycles.read((collective_id, s_c.active_cycle));

            if active_cycle.contributions_count == s_c.hero_count {
                let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: s_c.token };
                let amt_to_remit = s_c.cycle_amount * s_c.hero_count.into();
                let are_tokens_transfered = token.transfer(active_hero_address, amt_to_remit);
                if are_tokens_transfered {
                    active_cycle.has_ended = true;
                    self.collective_cycles.write((collective_id, active_cycle.id), active_cycle);
                    s_c.active_cycle = 0;
                    self.stark_collectives.write(collective_id, s_c);
                }
            }
        }
    }
}
