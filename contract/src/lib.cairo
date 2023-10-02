use array::ArrayTrait;

struct ReceivedStark{
    date: felt252,
    amount: felt252,
    token: felt252
}

// #[derive(Drop)]
struct StarkHero{
    id : felt252,
    escrow : felt252,
    is_active : bool,
    received_starks: Array<ReceivedStark>
}

// #[derive(Drop)]
struct StarkCollective{
    group_id: felt252,
    heros: Array<StarkHero>,
    current_hero_index: felt252,
    cycle_amount: felt252,
    token: felt252,
    start_date: felt252,

    next_cycle_date: felt252,
    next_hero_index: felt252,

}

#[starknet::interface]
trait IStarkCollective<TContractState> {
    fn add_stark_hero(ref self: TContractState, stark_user: StarkHero);
    fn get_stark_hero(self: @TContractState, id: felt252);
}

#[starknet::contract]
mod CycleStark {
    use cycle_stark::StarkHero;
    #[storage]
    struct Storage {
        balance: felt252, 
    }

    #[external(v0)]
    impl CycleStarkImpl of super::IStarkCollective<ContractState> {
        fn add_stark_hero(ref self: ContractState, stark_user: StarkHero){}
        fn get_stark_hero(self: @ContractState, id: felt252){}
    }
}