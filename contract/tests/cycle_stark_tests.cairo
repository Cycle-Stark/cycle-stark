use core::result::ResultTrait;
use core::array::ArrayTrait;
use core::traits::Into;
use core::debug::PrintTrait;
use core::option::OptionTrait;
use core::traits::TryInto;
use cycle_stark::interfaces::IHelperFunctionsDispatcherTrait;
use cycle_stark::interfaces::{
    ICycleStarkDispatcherTrait, ICycleStarkDispatcher, IHelperFunctionsDispatcher
};
use snforge_std::{declare, ContractClassTrait};
use starknet::testing::{set_caller_address};
use starknet::{contract_address_const, ContractAddress};
use cycle_stark::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};

fn deploy() -> (ICycleStarkDispatcher, IHelperFunctionsDispatcher, ContractAddress) {
    // Declare and deploy a contract
    let contract = declare("CycleStark").unwrap();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();

    // Create a Dispatcher object for interaction with the deployed contract
    let main_dispatcher = ICycleStarkDispatcher { contract_address };
    let helper_dispatcher = IHelperFunctionsDispatcher { contract_address };

    (main_dispatcher, helper_dispatcher, contract_address)
}

#[test]
fn register_hero() {
    let (main_dispatcher, helper_dispatcher, _contract_address) = deploy();

    let hero_1 = helper_dispatcher.get_caller_address();

    main_dispatcher.register_account();
    let heroes_count = helper_dispatcher.get_heroes_count();
    assert(heroes_count == 1, 'Did not register the hero');

    let hero_1_from_contract = helper_dispatcher.get_hero(hero_1).try_into().unwrap();

    assert(hero_1_from_contract.id == hero_1, 'Hero 1 is not Hero 1');
}

#[test]
fn register_collective() {
    let (main_dispatcher, helper_dispatcher, _contract_address) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';
    let amt = 2_000_000_000_000_000_000;

    assert(helper_dispatcher.get_collectives(1).len() == 0, 'Getting collectives failes');

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: amt,
            fine: amt,
            token: token_address,
            start_date: 1699887711056,
            aim: 'Buy land for each other',
            decimals: 18,
            symbol: 'ETH'
        );

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.name == collective_name, 'Collective not found');
}


#[test]
fn join_collective() {
    let (main_dispatcher, helper_dispatcher, contract_address) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';
    let amt = 2_000_000_000_000_000_000;

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: amt,
            fine: amt,
            token: token_address,
            start_date: 1699887711056,
            aim: 'Buy land for each other',
            decimals: 18,
            symbol: 'ETH'
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
    let (main_dispatcher, helper_dispatcher, contract_address) = deploy();
    let token_address = contract_address_const::<1>();
    let collective_name = 'Collective 1';
    let amt = 2_000_000_000_000_000_000;

    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: amt,
            fine: amt,
            token: token_address,
            start_date: 1699887711056,
            aim: 'Buy land for each other',
            decimals: 18,
            symbol: 'ETH'
        );

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.name == collective_name, 'Collective not found');
    assert(helper_dispatcher.get_collectives(1).len() == 1, 'Retrieving collectives problems');

    main_dispatcher.join_collective(1);

    let caller_address = helper_dispatcher.get_caller_address();
    let hero = helper_dispatcher.get_collective_hero(1, 1);

    assert(caller_address == hero, 'Hero not registered');

    main_dispatcher.close_registrations(1);

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.has_started == true, 'Closing registrations failed');
    assert(collective.hero_count == 1, 'No hero registered here');
}

// #[test]
// #[fork("GoerliFork")]
// fn lock_new_stark() {
//     let (main_dispatcher, helper_dispatcher, contract_address) = deploy();

//     let token_address: ContractAddress =
//         0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7
//         .try_into()
//         .unwrap();

//     let token_dispatcher: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_address };

//     let my_address: ContractAddress =
//         0x048242eca329a05af1909fa79cb1f9a4275ff89b987d405ec7de08f73b85588f
//         .try_into()
//         .unwrap();
//     let collective_name = 'Collective 1';
//     let amt = 2_000_000_000_000_000_000;

//     let collective_name = 'Collective 1';

//     main_dispatcher
//         .register_collective(
//             name: 'Collective 1',
//             rule_1: 'Fine is expensive',
//             rule_2: 'No rule',
//             rule_3: '',
//             cycle_amount: amt,
//             fine: amt,
//             token: token_address,
//             start_date: 1699887711056,
//             aim: 'Buy land for each other',
//             decimals: 18,
//             symbol: 'ETH'
//         );

//     let collective = main_dispatcher.get_stark_collective(1);

//     start_prank(token_address, my_address);
//     token_dispatcher.approve(contract_address, 10_000_000_000_000_000_000);
//     stop_prank(token_address);
//     start_prank(contract_address, my_address);

//     main_dispatcher.join_collective(1);
//     main_dispatcher.close_registrations(1);

//     let collective = main_dispatcher.get_stark_collective(1);
//     assert(collective.hero_count == 1, 'Hero didnt join');
//     main_dispatcher.lock_new_stark(1, amt);

//     let caller_address = helper_dispatcher.get_caller_address();
//     let locked_amt = main_dispatcher.check_if_has_locked(1, caller_address);

//     assert(locked_amt == amt, 'Caller hero has not locked');
//     stop_prank(contract_address);
// }

#[test]
fn contract_address() {
    let (main_dispatcher, helper_dispatcher, contract_address) = deploy();
    let contract_address_from_contract = helper_dispatcher.get_contract_address();

    assert(contract_address == contract_address_from_contract, 'Contract address mismatch');
}


#[test]
fn start_cycle() {
    let (main_dispatcher, helper_dispatcher, contract_address) = deploy();
    let token_address: ContractAddress =
        0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7
        .try_into()
        .unwrap();
    let collective_name = 'Collective 1';
    let amt = 2_000_000_000_000_000_000;
    main_dispatcher
        .register_collective(
            name: 'Collective 1',
            rule_1: 'Fine is expensive',
            rule_2: 'No rule',
            rule_3: '',
            cycle_amount: amt,
            fine: amt,
            token: token_address,
            start_date: 1699887711056,
            aim: 'Buy land for each other',
            decimals: 18,
            symbol: 'ETH'
        );

    main_dispatcher.join_collective(1);
    main_dispatcher.close_registrations(1);
    // main_dispatcher.lock_new_stark(1, amt);
    main_dispatcher.start_cycle(1);

    let collective = main_dispatcher.get_stark_collective(1);

    assert(collective.has_started == true, 'collective didnt start');
    assert(collective.active_cycle == 1, 'Cycle was not initiated');
}


// #[test]
// #[fork("GoerliFork")]
// fn contribute() {
//     let (main_dispatcher, helper_dispatcher, contract_address) = deploy();
//     let token_address: ContractAddress =
//         0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7
//         .try_into()
//         .unwrap();

//     let token_dispatcher: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_address };

//     let my_address: ContractAddress =
//         0x048242eca329a05af1909fa79cb1f9a4275ff89b987d405ec7de08f73b85588f
//         .try_into()
//         .unwrap();
//     let collective_name = 'Collective 1';
//     let amt = 2_000_000_000_000_000_000;

//     main_dispatcher
//         .register_collective(
//             name: 'Collective 1',
//             rule_1: 'Fine is expensive',
//             rule_2: 'No rule',
//             rule_3: '',
//             cycle_amount: amt,
//             fine: amt,
//             token: token_address,
//             start_date: 1699887711056,
//             aim: 'Buy land for each other',
//             decimals: 18,
//             symbol: 'ETH'
//         );

//     start_prank(token_address, my_address);
//     token_dispatcher.approve(contract_address, 10_000_000_000_000_000_000);
//     stop_prank(token_address);
//     start_prank(contract_address, my_address);
//     main_dispatcher.join_collective(1);
//     main_dispatcher.close_registrations(1);
//     main_dispatcher.lock_new_stark(1, amt);
//     main_dispatcher.start_cycle(1);
//     main_dispatcher.contribute(1, amt);
//     stop_prank(contract_address);

//     let collective = main_dispatcher.get_stark_collective(1);
//     let cycle = main_dispatcher.get_collective_cycle(1, collective.active_cycle);
//     let contract_balance = token_dispatcher.balanceOf(contract_address);
//     // contract_balance.print();
//     assert(cycle.contributions_count == 1, 'No contributions made');
// }


// #[test]
// #[fork("GoerliFork")]
// fn remit() {
//     let (main_dispatcher, helper_dispatcher, contract_address) = deploy();

//     let token_address: ContractAddress =
//         0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7
//         .try_into()
//         .unwrap();

//     let token_dispatcher: IERC20Dispatcher = IERC20Dispatcher { contract_address: token_address };

//     let my_address: ContractAddress =
//         0x048242eca329a05af1909fa79cb1f9a4275ff89b987d405ec7de08f73b85588f
//         .try_into()
//         .unwrap();
//     let collective_name = 'Collective 1';
//     let amt = 2_000_000_000_000_000_000;

//     let collective_name = 'Collective 1';

//     main_dispatcher
//         .register_collective(
//             name: 'Collective 1',
//             rule_1: 'Fine is expensive',
//             rule_2: 'No rule',
//             rule_3: '',
//             cycle_amount: amt,
//             fine: amt,
//             token: token_address,
//             start_date: 1699887711056,
//             aim: 'Buy land for each other',
//             decimals: 18,
//             symbol: 'ETH'
//         );

//     start_prank(token_address, my_address);
//     token_dispatcher.approve(contract_address, 10_000_000_000_000_000_000);
//     // token_dispatcher.approve(my_address, 10_000_000_000_000_000_000);
//     stop_prank(token_address);
//     start_prank(contract_address, my_address);
//     main_dispatcher.join_collective(1);
//     main_dispatcher.close_registrations(1);
//     main_dispatcher.lock_new_stark(1, amt);
//     main_dispatcher.start_cycle(1);
//     main_dispatcher.contribute(1, amt);
//     main_dispatcher.remit(1);

//     let contract_balance = token_dispatcher.balanceOf(contract_address);
//     let my_address_balance = token_dispatcher.balanceOf(my_address);
//     let collective = main_dispatcher.get_stark_collective(1);
//     let remaining_tokens_in_contract = collective.cycle_amount * collective.hero_count.into();
//     assert(collective.active_cycle == 0, 'Remitting successful');
//     assert(contract_balance == remaining_tokens_in_contract, 'Contract was not drained');

//     stop_prank(contract_address);
// }

