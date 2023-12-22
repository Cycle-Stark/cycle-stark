# Creating, deploying accounts, declaring and deploying contracts

## Create a new account

```sh
sncast -u https://starknet-goerli.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec account create -n argent_account --add-profile
```

## Make the new account default at scarb.toml

## Deploy the account

```sh
sncast --account argent_account account deploy -n argent_account1 --max-fee 4323000034584
```

## Declare the contract

```sh
sncast declare --contract-name CycleStark
``` 

## Deploy the contract with the class hash received

Go to scarb.toml file and return the default profile set since calling this command without `--profile` might result to an error

```sh
sncast --profile token_account deploy --class-hash 0xa5bf2ffd4baf1a8cfdee3e15567f3be44e1a284f0b4d44048f52e76c126cf4
```