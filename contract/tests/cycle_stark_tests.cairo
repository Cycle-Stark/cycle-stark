use core::option::OptionTrait;
use core::traits::TryInto;
use cycle_stark::IHelperFunctionsDispatcherTrait;
use cycle_stark::{ICycleStarkDispatcherTrait, ICycleStarkDispatcher, IHelperFunctionsDispatcher};
use snforge_std::{declare, ContractClassTrait};
use starknet::testing::{set_caller_address};
use starknet::{contract_address_const};

fn deploy() -> (ICycleStarkDispatcher, IHelperFunctionsDispatcher) {
    // Declare and deploy a contract
    let contract = declare('CycleStark');
    let contract_address = contract.deploy(@ArrayTrait::new()).unwrap();

    // Create a Dispatcher object for interaction with the deployed contract
    let main_dispatcher = ICycleStarkDispatcher { contract_address };
    let helper_dispatcher = IHelperFunctionsDispatcher { contract_address };

    (main_dispatcher, helper_dispatcher)
}

#[test]
fn register_hero() {
    let (main_dispatcher, helper_dispatcher) = deploy();

    let hero_1 = helper_dispatcher.get_caller_address();

    main_dispatcher.register_account();
    let heroes_count = helper_dispatcher.get_heroes_count();
    assert(heroes_count == 1, 'Did not register the hero');

    let hero_1_from_contract = helper_dispatcher.get_hero(hero_1).try_into().unwrap();

    assert(hero_1_from_contract.id == hero_1, 'Hero 1 is not Hero 1');
}

#[test]
fn register_collective() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.name == collective_name, 'Collective not found');
}


#[test]
fn join_collective() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.name == collective_name, 'Collective not found');

    main_dispatcher.join_collective(1);

    let caller_address = helper_dispatcher.get_caller_address();
    let hero = helper_dispatcher.get_collective_hero(1, 1);

    assert(caller_address == hero, 'Hero not registered');
}


#[test]
fn close_registrations() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.name == collective_name, 'Collective not found');

    main_dispatcher.join_collective(1);

    let caller_address = helper_dispatcher.get_caller_address();
    let hero = helper_dispatcher.get_collective_hero(1, 1);

    assert(caller_address == hero, 'Hero not registered');

    main_dispatcher.close_registrations(1);

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.has_started == true, 'Closing registrations failed');
    assert(collective.hero_count == 1, 'No hero registered here');
}

#[test]
fn lock_new_stark() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    let collective = main_dispatcher.get_stark_collective(1);

    main_dispatcher.join_collective(1);
    main_dispatcher.close_registrations(1);

    let collective = main_dispatcher.get_stark_collective(1);
    assert(collective.hero_count == 1, 'Hero didnt join');
    main_dispatcher.lock_new_stark(1, 2000);

    let caller_address = helper_dispatcher.get_caller_address();
    let locked_amt = main_dispatcher.check_if_has_locked(1, caller_address);

    assert(locked_amt == 2000, 'Caller hero has not locked');
}


#[test]
fn start_cycle() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    main_dispatcher.join_collective(1);
    main_dispatcher.close_registrations(1);
    main_dispatcher.lock_new_stark(1, 2000);
    main_dispatcher.start_cycle(1);

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.has_started == true, 'collective didnt start');
    assert(collective.active_cycle == 1, 'Cycle was not initiated');
}



#[test]
fn contribute() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    main_dispatcher.join_collective(1);
    main_dispatcher.close_registrations(1);
    main_dispatcher.lock_new_stark(1, 2000);
    main_dispatcher.start_cycle(1);
    main_dispatcher.contribute(1, 2000);

    let collective = main_dispatcher.get_stark_collective(1);
    let cycle = main_dispatcher.get_collective_cycle(1, collective.active_cycle);

    assert(cycle.contributions_count == 1, 'No contributions made');
}


#[test]
fn remit() {
    let (main_dispatcher, helper_dispatcher) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: 2000,
            token: token_address
        );

    main_dispatcher.join_collective(1);
    main_dispatcher.close_registrations(1);
    main_dispatcher.lock_new_stark(1, 2000);
    main_dispatcher.start_cycle(1);
    main_dispatcher.contribute(1, 2000);
    main_dispatcher.remit(1);

    let collective = main_dispatcher.get_stark_collective(1);
    assert(collective.active_cycle == 0, 'Remitting successful');
}
