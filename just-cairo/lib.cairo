use array::ArrayTrait;

// s_c -> stark_collective
// s_h -> stark_hero

#[derive(Drop)]
struct ReceivedStark {
    date: felt252,
    amount: felt252,
    token: felt252
}

#[derive(Drop)]
struct StarkHero {
    id: felt252,
    escrow: felt252,
    is_active: bool,
    received_starks: Array<ReceivedStark>
}

#[derive(Drop)]
struct HeroContribution {
    hero_id: felt252,
    amount: felt252
}

#[derive(Drop)]
struct StarkCollective {
    id: felt252,
    expected_hero_count: u32,
    cycle_amount: felt252,
    heroes: Array<felt252>,
    current_hero_id: Option<felt252>,
    token: felt252,
    start_date: felt252,
    next_cycle_date: felt252,
    next_hero_id: Option<felt252>,
    next_hero_index: felt252,
    cycle_contributions: Array<HeroContribution>
}

struct LockedStark {
    hero_id: felt252,
    collective_id: felt252,
    amount_locked: felt252
}

trait IStarkCollective {
    fn add_stark_hero(ref self: StarkCollective, s_h: StarkHero);
    fn get_stark_hero(self: @StarkCollective, id: felt252);
    fn join_collective(ref self: StarkCollective, s_h: StarkHero);
    fn check_for_next_hero(self: @StarkCollective);
    fn contribute(ref self: StarkCollective, hero_id: felt252, amount: felt252);
    fn remit(ref self: StarkCollective);
}


impl CycleStarkImpl of IStarkCollective {
    fn add_stark_hero(ref self: StarkCollective, s_h: StarkHero) {}
    fn get_stark_hero(self: @StarkCollective, id: felt252) {}
    fn join_collective(ref self: StarkCollective, s_h: StarkHero) {}
    fn check_for_next_hero(self: @StarkCollective) {}
    fn contribute(ref self: StarkCollective, hero_id: felt252, amount: felt252) {}
    fn remit(ref self: StarkCollective) {}
}


struct Storage {
    stark_users: Array<StarkHero>,
    stark_collectives: Array<StarkCollective>,
    locked_starks: Array<LockedStark>,
}

trait IStorage {
    fn register_account(ref self: Storage, s_h: StarkHero);
    fn register_collective(ref self: Storage, s_c: StarkCollective);
    fn get_stark_collective(self: @Storage, id: felt252);
    fn lock_new_stark(ref self: Storage, hero_id: felt252, collective_id: felt252, amount: felt252);
    fn check_if_has_locked(self: @Storage, hero_id: felt252, collective_id: felt252);
}

impl StorageImpl of IStorage {
    fn register_account(ref self: Storage, s_h: StarkHero) {}
    fn register_collective(ref self: Storage, s_c: StarkCollective) {}
    fn get_stark_collective(self: @Storage, id: felt252) {}
    fn lock_new_stark(
        ref self: Storage, hero_id: felt252, collective_id: felt252, amount: felt252
    ) {}
    fn check_if_has_locked(self: @Storage, hero_id: felt252, collective_id: felt252) {}
}

